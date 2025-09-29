import { bioStarClient } from './biostar-client';

interface StartupConfig {
  username?: string;
  password?: string;
  autoRetry?: boolean;
  retryInterval?: number; // milliseconds
  maxRetries?: number;
}

class BioStarStartupService {
  private isInitialized = false;
  private isInitializing = false;
  private retryCount = 0;
  private config: StartupConfig = {};

  async initialize(config: StartupConfig = {}): Promise<boolean> {
    if (this.isInitialized) return true;
    if (this.isInitializing) return false;

    this.isInitializing = true;
    this.config = {
      autoRetry: true,
      retryInterval: 5000,
      maxRetries: 5,
      ...config
    };

    try {
      // Get credentials from environment variables
      const username = config.username || process.env.BIOSTAR_USERNAME;
      const password = config.password || process.env.BIOSTAR_PASSWORD;

      if (!username || !password) {
        console.warn('BioStar credentials not provided. Manual authentication required.');
        this.isInitializing = false;
        return false;
      }

      console.log('Initializing BioStar connection...');
      
      // Test connection first
      const isConnected = await bioStarClient.testConnection();
      if (!isConnected) {
        throw new Error('Unable to reach BioStar server');
      }

      // Authenticate
      const authenticated = await bioStarClient.authenticate(username, password);
      if (!authenticated) {
        throw new Error('BioStar authentication failed');
      }

      this.isInitialized = true;
      this.retryCount = 0;
      console.log('BioStar connection initialized successfully');
      
      // Setup periodic refresh
      this.setupPeriodicRefresh();
      
      return true;
    } catch (error) {
      console.error('BioStar initialization failed:', error);
      
      if (this.config.autoRetry && this.retryCount < (this.config.maxRetries || 5)) {
        this.retryCount++;
        console.log(`Retrying BioStar initialization in ${this.config.retryInterval}ms (attempt ${this.retryCount})`);
        
        setTimeout(() => {
          this.isInitializing = false;
          this.initialize(this.config);
        }, this.config.retryInterval);
      } else {
        this.isInitializing = false;
      }
      
      return false;
    } finally {
      this.isInitializing = false;
    }
  }

  private setupPeriodicRefresh(): void {
    // Refresh authentication every 20 hours (before 24-hour expiry)
    setInterval(async () => {
      try {
        const isAuth = await bioStarClient.isAuthenticated();
        if (!isAuth) {
          console.log('BioStar session expired, re-authenticating...');
          await this.initialize(this.config);
        }
      } catch (error) {
        console.error('BioStar periodic refresh failed:', error);
      }
    }, 20 * 60 * 60 * 1000); // 20 hours
  }

  async getStatus(): Promise<{
    initialized: boolean;
    connected: boolean;
    authenticated: boolean;
    lastError?: string;
  }> {
    try {
      const connected = await bioStarClient.testConnection();
      const authenticated = this.isInitialized && await bioStarClient.isAuthenticated();
      
      return {
        initialized: this.isInitialized,
        connected,
        authenticated
      };
    } catch (error: any) {
      return {
        initialized: this.isInitialized,
        connected: false,
        authenticated: false,
        lastError: error.message
      };
    }
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  async ensureReady(): Promise<boolean> {
    if (this.isReady()) return true;
    if (this.isInitializing) {
      // Wait for current initialization to complete
      while (this.isInitializing) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return this.isReady();
    }
    
    return await this.initialize(this.config);
  }
}

// Singleton instance
export const bioStarStartup = new BioStarStartupService();