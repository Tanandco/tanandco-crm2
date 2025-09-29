import express from 'express';
import { bioStarClient } from './services/biostar-client';
import { bioStarStartup } from './services/biostar-startup';
import { storage } from './storage';
import { insertCustomerSchema, insertMembershipSchema } from '@shared/schema';
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

  // CRM Customer Management Endpoints

  // Get all customers
  app.get('/api/customers', async (req, res) => {
    try {
      const customers = await storage.getCustomers();
      res.json({
        success: true,
        data: customers
      });
    } catch (error: any) {
      console.error('Get customers failed:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get customers',
        details: error.message
      });
    }
  });

  // Get customer by ID
  app.get('/api/customers/:id', async (req, res) => {
    try {
      const customer = await storage.getCustomer(req.params.id);
      if (!customer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found'
        });
      }
      res.json({
        success: true,
        data: customer
      });
    } catch (error: any) {
      console.error('Get customer failed:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get customer',
        details: error.message
      });
    }
  });

  // Search customers
  app.get('/api/customers/search/:query', async (req, res) => {
    try {
      const customers = await storage.searchCustomers(req.params.query);
      res.json({
        success: true,
        data: customers
      });
    } catch (error: any) {
      console.error('Search customers failed:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to search customers',
        details: error.message
      });
    }
  });

  // Create new customer
  app.post('/api/customers', async (req, res) => {
    try {
      const validatedData = insertCustomerSchema.parse(req.body);
      
      // Check if customer with this phone already exists
      const existingCustomer = await storage.getCustomerByPhone(validatedData.phone);
      if (existingCustomer) {
        return res.status(409).json({
          success: false,
          error: 'לקוח עם מספר טלפון זה כבר קיים במערכת'
        });
      }
      
      const customer = await storage.createCustomer(validatedData);
      res.status(201).json({
        success: true,
        data: customer
      });
    } catch (error: any) {
      console.error('Create customer failed:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Invalid customer data',
          details: error.errors
        });
      }
      res.status(500).json({
        success: false,
        error: 'Failed to create customer',
        details: error.message
      });
    }
  });

  // Update customer
  app.put('/api/customers/:id', async (req, res) => {
    try {
      const validatedData = insertCustomerSchema.partial().parse(req.body);
      const customer = await storage.updateCustomer(req.params.id, validatedData);
      
      if (!customer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found'
        });
      }
      
      res.json({
        success: true,
        data: customer
      });
    } catch (error: any) {
      console.error('Update customer failed:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Invalid customer data',
          details: error.errors
        });
      }
      res.status(500).json({
        success: false,
        error: 'Failed to update customer',
        details: error.message
      });
    }
  });

  // Delete customer
  app.delete('/api/customers/:id', async (req, res) => {
    try {
      const customer = await storage.getCustomer(req.params.id);
      if (!customer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found'
        });
      }
      
      await storage.deleteCustomer(req.params.id);
      res.json({
        success: true,
        message: 'Customer deleted successfully'
      });
    } catch (error: any) {
      console.error('Delete customer failed:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete customer',
        details: error.message
      });
    }
  });

  // Get customer memberships
  app.get('/api/customers/:id/memberships', async (req, res) => {
    try {
      const memberships = await storage.getMembershipsByCustomer(req.params.id);
      res.json({
        success: true,
        data: memberships
      });
    } catch (error: any) {
      console.error('Get customer memberships failed:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get customer memberships',
        details: error.message
      });
    }
  });

  // Create membership for customer
  app.post('/api/customers/:id/memberships', async (req, res) => {
    try {
      const membershipData = { ...req.body, customerId: req.params.id };
      const validatedData = insertMembershipSchema.parse(membershipData);
      
      const membership = await storage.createMembership(validatedData);
      res.status(201).json({
        success: true,
        data: membership
      });
    } catch (error: any) {
      console.error('Create membership failed:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Invalid membership data',
          details: error.errors
        });
      }
      res.status(500).json({
        success: false,
        error: 'Failed to create membership',
        details: error.message
      });
    }
  });

  // Integrate with BioStar face recognition for customer identification
  app.post('/api/customers/identify-by-face', async (req, res) => {
    try {
      const { image } = identifyFaceSchema.parse(req.body);
      
      // Check if BioStar is ready
      if (!bioStarStartup.ensureReady()) {
        return res.status(503).json({
          success: false,
          error: 'BioStar system not available',
          message: 'Please try again later or use manual entry'
        });
      }
      
      // Identify face using BioStar
      const faceResult = await bioStarClient.identifyFace(image);
      
      if (faceResult && faceResult.userId) {
        // Find customer by face recognition ID
        const customer = await storage.getCustomerByFaceId(faceResult.userId);
        
        if (customer) {
          // Get customer memberships as well
          const memberships = await storage.getMembershipsByCustomer(customer.id);
          
          res.json({
            success: true,
            data: {
              customer,
              memberships,
              confidence: faceResult.confidence || 0
            }
          });
        } else {
          res.status(404).json({
            success: false,
            error: 'Customer not found in CRM system',
            biostarUserId: faceResult.userId
          });
        }
      } else {
        res.status(404).json({
          success: false,
          error: 'Face not recognized',
          message: 'Please try again or use manual entry'
        });
      }
    } catch (error: any) {
      console.error('Face identification failed:', error);
      res.status(500).json({
        success: false,
        error: 'Face identification failed',
        details: error.message
      });
    }
  });

  // Identify customer by face and return customer data
  app.post('/api/customers/identify-by-face', async (req, res) => {
    try {
      // For testing purposes, simulate successful identification
      // In production, this would call biostarClient.identify()
      const mockFaceId = 'test-face-id-123';
      
      // Find customer by face recognition ID
      const customer = await storage.getCustomerByFaceId(mockFaceId);
      
      if (!customer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found for this face ID',
          faceId: mockFaceId
        });
      }

      res.json({
        success: true,
        data: customer,
        faceId: mockFaceId
      });
    } catch (error: any) {
      console.error('Face identification failed:', error);
      res.status(500).json({
        success: false,
        error: 'Face identification failed',
        details: error.message
      });
    }
  });

  // Associate face ID with existing customer
  app.post('/api/customers/:id/associate-face', async (req, res) => {
    try {
      const customer = await storage.getCustomer(req.params.id);
      if (!customer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found'
        });
      }

      // For testing purposes, simulate successful face registration
      const mockFaceId = `face-${req.params.id}-${Date.now()}`;

      // Update customer with face recognition ID
      const updatedCustomer = await storage.updateCustomer(req.params.id, {
        faceRecognitionId: mockFaceId
      });

      res.json({
        success: true,
        data: updatedCustomer,
        faceId: mockFaceId
      });
    } catch (error: any) {
      console.error('Face association failed:', error);
      res.status(500).json({
        success: false,
        error: 'Face association failed',
        details: error.message
      });
    }
  });

  // Explicit DELETE endpoint for customers
  app.delete('/api/customers/:id', async (req, res) => {
    try {
      const customer = await storage.getCustomer(req.params.id);
      if (!customer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found'
        });
      }
      
      await storage.deleteCustomer(req.params.id);
      res.json({
        success: true,
        message: 'Customer deleted successfully'
      });
    } catch (error: any) {
      console.error('Delete customer failed:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete customer',
        details: error.message
      });
    }
  });
}