/**
 * Common types used across the application
 */

// Base entity with common fields
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// User roles
export type UserRole = 'admin' | 'tenant_admin' | 'user';

// Margin types for pricing
export type MarginType = 'percentage' | 'fixed_amount' | 'fixed_price' | 'disabled';

// Margin configuration
export interface Margin {
  type: MarginType;
  value: number;
}

// Pagination params
export interface PaginationParams {
  page: number;
  limit: number;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API Response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// Order status
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

// Payment status
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
