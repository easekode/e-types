/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Common API Response Types - using any types for flexible external API integration
 */

// Enums for HTTP status codes
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

// API response status
export enum ApiStatusInternal {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'pending',
  PENDING = 'pending',
  IDLE = 'idle',
}

// Sort order enum
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

// API constants
export const API_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_TIMEOUT: 30000,
  MAX_RETRIES: 3,
  RATE_LIMIT_WINDOW: 60000, // 1 minute
} as const;

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  requestId?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
    field?: string;
    validationErrors?: ValidationError[];
  };
  timestamp: string;
  requestId?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}

export interface PaginationParams<T = Record<string, never>, S = string> {
  limit?: number | string;
  page?: number | string;
  sortBy?: S;
  sortDirection?: 'asc' | 'desc';
  search?: string;
  filter?: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  filters?: Record<string, any>;
}

export interface CursorPaginationParams {
  cursor?: string;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface CursorPaginatedResponse<T> {
  items: T[];
  pagination: {
    nextCursor?: string;
    prevCursor?: string;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  };
}

export interface SortOption {
  field: string;
  label: string;
  order: 'asc' | 'desc';
}

export interface FilterOption {
  field: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number' | 'boolean';
  options?: { value: any; label: string }[];
}

export interface SearchParams {
  query: string;
  fields?: string[];
  exact?: boolean;
  caseSensitive?: boolean;
}

// HTTP Methods
export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

// API Status codes
export type ApiStatusCode =
  | 200
  | 201
  | 204
  | 400
  | 401
  | 403
  | 404
  | 409
  | 422
  | 429
  | 500
  | 502
  | 503;

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  retries?: number;
  cache?: boolean;
}

export interface RequestResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestConfig;
}

// File upload types
export interface FileUpload {
  file: File | Blob;
  fieldName: string;
  fileName?: string;
  mimeType?: string;
}

export interface FileUploadResponse {
  id: string;
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// Rate limiting
export interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

// Health check
export interface HealthCheck {
  status: 'healthy' | 'unhealthy' | 'degraded';
  version: string;
  uptime: number;
  timestamp: string;
  services: {
    database: 'healthy' | 'unhealthy';
    cache: 'healthy' | 'unhealthy';
    storage: 'healthy' | 'unhealthy';
    [key: string]: 'healthy' | 'unhealthy';
  };
}

// Webhook types
export interface WebhookPayload<T = any> {
  id: string;
  event: string;
  data: T;
  timestamp: string;
  version: string;
  signature?: string;
}

export interface WebhookResponse {
  received: boolean;
  processed: boolean;
  message?: string;
}
