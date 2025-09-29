import { 
  type User, 
  type InsertUser, 
  type Customer, 
  type InsertCustomer,
  type Membership,
  type InsertMembership,
  type Product,
  type InsertProduct,
  type Transaction,
  type InsertTransaction
} from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Customer operations
  getCustomers(): Promise<Customer[]>;
  getCustomer(id: string): Promise<Customer | undefined>;
  getCustomerByPhone(phone: string): Promise<Customer | undefined>;
  getCustomerByFaceId(faceId: string): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: string, customer: Partial<InsertCustomer>): Promise<Customer | undefined>;
  deleteCustomer(id: string): Promise<void>;
  searchCustomers(query: string): Promise<Customer[]>;

  // Membership operations
  getMembershipsByCustomer(customerId: string): Promise<Membership[]>;
  getMembership(id: string): Promise<Membership | undefined>;
  createMembership(membership: InsertMembership): Promise<Membership>;
  updateMembership(id: string, membership: Partial<InsertMembership>): Promise<Membership | undefined>;
  deleteMembership(id: string): Promise<void>;

  // Product operations
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<void>;
  getProductsByCategory(category: string): Promise<Product[]>;

  // Transaction operations
  getTransactions(): Promise<Transaction[]>;
  getTransaction(id: string): Promise<Transaction | undefined>;
  getTransactionsByCustomer(customerId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: string, transaction: Partial<InsertTransaction>): Promise<Transaction | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private customers: Map<string, Customer>;
  private memberships: Map<string, Membership>;
  private products: Map<string, Product>;
  private transactions: Map<string, Transaction>;

  constructor() {
    this.users = new Map();
    this.customers = new Map();
    this.memberships = new Map();
    this.products = new Map();
    this.transactions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Customer operations
  async getCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }

  async getCustomer(id: string): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async getCustomerByPhone(phone: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(
      (customer) => customer.phone === phone,
    );
  }

  async getCustomerByFaceId(faceId: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(
      (customer) => customer.faceRecognitionId === faceId,
    );
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = randomUUID();
    const customer: Customer = { 
      fullName: insertCustomer.fullName,
      phone: insertCustomer.phone,
      email: insertCustomer.email || null,
      isNewClient: insertCustomer.isNewClient ?? true,
      healthFormSigned: insertCustomer.healthFormSigned ?? false,
      faceRecognitionId: insertCustomer.faceRecognitionId || null,
      notes: insertCustomer.notes || null,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.customers.set(id, customer);
    return customer;
  }

  async updateCustomer(id: string, updates: Partial<InsertCustomer>): Promise<Customer | undefined> {
    const customer = this.customers.get(id);
    if (!customer) return undefined;
    
    const updated = { 
      ...customer, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.customers.set(id, updated);
    return updated;
  }

  async deleteCustomer(id: string): Promise<void> {
    this.customers.delete(id);
  }

  async searchCustomers(query: string): Promise<Customer[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.customers.values()).filter(
      (customer) =>
        customer.fullName.toLowerCase().includes(searchTerm) ||
        customer.phone.includes(searchTerm) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm))
    );
  }

  // Membership operations
  async getMembershipsByCustomer(customerId: string): Promise<Membership[]> {
    return Array.from(this.memberships.values()).filter(
      (membership) => membership.customerId === customerId
    );
  }

  async getMembership(id: string): Promise<Membership | undefined> {
    return this.memberships.get(id);
  }

  async createMembership(insertMembership: InsertMembership): Promise<Membership> {
    const id = randomUUID();
    const membership: Membership = { 
      customerId: insertMembership.customerId,
      type: insertMembership.type,
      balance: insertMembership.balance ?? 0,
      totalPurchased: insertMembership.totalPurchased ?? 0,
      expiryDate: insertMembership.expiryDate || null,
      isActive: insertMembership.isActive ?? true,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.memberships.set(id, membership);
    return membership;
  }

  async updateMembership(id: string, updates: Partial<InsertMembership>): Promise<Membership | undefined> {
    const membership = this.memberships.get(id);
    if (!membership) return undefined;
    
    const updated = { 
      ...membership, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.memberships.set(id, updated);
    return updated;
  }

  async deleteMembership(id: string): Promise<void> {
    this.memberships.delete(id);
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      name: insertProduct.name,
      nameHe: insertProduct.nameHe,
      description: insertProduct.description || null,
      descriptionHe: insertProduct.descriptionHe || null,
      price: insertProduct.price,
      category: insertProduct.category,
      stock: insertProduct.stock ?? 0,
      isActive: insertProduct.isActive ?? true,
      imageUrl: insertProduct.imageUrl || null,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updated = { 
      ...product, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    this.products.delete(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  // Transaction operations
  async getTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }

  async getTransaction(id: string): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async getTransactionsByCustomer(customerId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (transaction) => transaction.customerId === customerId
    );
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = { 
      customerId: insertTransaction.customerId,
      type: insertTransaction.type,
      amount: insertTransaction.amount,
      currency: insertTransaction.currency ?? "ILS",
      status: insertTransaction.status,
      paymentMethod: insertTransaction.paymentMethod || null,
      cardcomTransactionId: insertTransaction.cardcomTransactionId || null,
      metadata: insertTransaction.metadata || null,
      id,
      createdAt: new Date()
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async updateTransaction(id: string, updates: Partial<InsertTransaction>): Promise<Transaction | undefined> {
    const transaction = this.transactions.get(id);
    if (!transaction) return undefined;
    
    const updated = { ...transaction, ...updates };
    this.transactions.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
