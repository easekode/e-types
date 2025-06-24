/**
 * Common API Response Types
 */

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

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
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
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

// API Status codes
export type ApiStatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | 502 | 503;

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
