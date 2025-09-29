import express from 'express';
import { bioStarClient } from './services/biostar-client';
import { bioStarStartup } from './services/biostar-startup';
import { z } from 'zod';

// Validation schemas
const identifyFaceSchema = z.object({
  image: z.string().min(1, 'Image data required'),
  antiSpoofing: z.boolean().optional().default(true),
  liveDetection: z.boolean().optional().default(true)
});

const registerFaceSchema = z.object({
  userId: z.string().min(1, 'User ID required'),
  image: z.string().min(1, 'Image data required')
});

const createUserSchema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  department: z.string().optional(),
  position: z.string().optional(),
  accessLevel: z.number().min(0).max(255).default(1)
});

export function registerRoutes(app: express.Application) {
  // System status endpoint
  app.get('/api/biostar/status', async (req, res) => {
    try {
      const status = await bioStarStartup.getStatus();
      
      res.json({
        success: true,
        data: status
      });
    } catch (error: any) {
      console.error('BioStar status check failed:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get BioStar status',
        details: error.message
      });
    }
  });

  // Authenticate with BioStar (RESTRICTED - Admin only)
  app.post('/api/biostar/auth', async (req, res) => {
    // Security: Only allow in development mode
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        error: 'Authentication endpoint disabled in production'
      });
    }
    
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: 'Username and password are required'
        });
      }
      
      const authenticated = await bioStarClient.authenticate(username, password);
      
      if (authenticated) {
        res.json({
          success: true,
          data: {
            authenticated: true,
            timestamp: new Date().toISOString()
          }
        });
      } else {
        res.status(401).json({
          success: false,
          error: 'Authentication failed'
        });
      }
    } catch (error: any) {
      console.error('BioStar authentication failed:', error);
      res.status(500).json({
        success: false,
        error: 'Authentication error',
        details: error.message
      });
    }
  });

  // Face identification endpoint
  app.post('/api/biostar/identify', async (req, res) => {
    try {
      const validatedData = identifyFaceSchema.parse(req.body);
      
      // Ensure BioStar is ready
      const isReady = await bioStarStartup.ensureReady();
      if (!isReady) {
        return res.status(503).json({
          success: false,
          error: 'BioStar system not available. Please use manual entry or contact staff.'
        });
      }
      
      const result = await bioStarClient.identifyFace(validatedData.image);
      
      if (result) {
        res.json({
          success: true,
          data: result
        });
      } else {
        res.json({
          success: false,
          error: 'Face not recognized or confidence too low'
        });
      }
    } catch (error: any) {
      console.error('Face identification failed:', error);
      
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Invalid request data',
          details: error.errors
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Face identification error',
        details: error.message
      });
    }
  });

  // Face registration endpoint
  app.post('/api/biostar/register', async (req, res) => {
    try {
      const validatedData = registerFaceSchema.parse(req.body);
      
      // Check if authenticated
      const isAuth = await bioStarClient.isAuthenticated();
      if (!isAuth) {
        return res.status(401).json({
          success: false,
          error: 'Not authenticated with BioStar'
        });
      }
      
      const result = await bioStarClient.registerFace(validatedData.userId, validatedData.image);
      
      if (result) {
        res.json({
          success: true,
          data: result
        });
      } else {
        res.status(400).json({
          success: false,
          error: 'Face registration failed'
        });
      }
    } catch (error: any) {
      console.error('Face registration failed:', error);
      
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Invalid request data',
          details: error.errors
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Face registration error',
        details: error.message
      });
    }
  });

  // User management endpoints
  app.get('/api/biostar/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      const isAuth = await bioStarClient.isAuthenticated();
      if (!isAuth) {
        return res.status(401).json({
          success: false,
          error: 'Not authenticated with BioStar'
        });
      }
      
      const user = await bioStarClient.getUser(id);
      
      if (user) {
        res.json({
          success: true,
          data: user
        });
      } else {
        res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
    } catch (error: any) {
      console.error('Get user failed:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get user',
        details: error.message
      });
    }
  });

  app.post('/api/biostar/users', async (req, res) => {
    try {
      const validatedData = createUserSchema.parse(req.body);
      
      const isAuth = await bioStarClient.isAuthenticated();
      if (!isAuth) {
        return res.status(401).json({
          success: false,
          error: 'Not authenticated with BioStar'
        });
      }
      
      const user = await bioStarClient.createUser(validatedData);
      
      if (user) {
        res.status(201).json({
          success: true,
          data: user
        });
      } else {
        res.status(400).json({
          success: false,
          error: 'Failed to create user'
        });
      }
    } catch (error: any) {
      console.error('Create user failed:', error);
      
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Invalid request data',
          details: error.errors
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to create user',
        details: error.message
      });
    }
  });

  // Access logs endpoint
  app.get('/api/biostar/logs', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      
      const isAuth = await bioStarClient.isAuthenticated();
      if (!isAuth) {
        return res.status(401).json({
          success: false,
          error: 'Not authenticated with BioStar'
        });
      }
      
      const logs = await bioStarClient.getAccessLogs(limit);
      
      res.json({
        success: true,
        data: logs
      });
    } catch (error: any) {
      console.error('Get access logs failed:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get access logs',
        details: error.message
      });
    }
  });
}