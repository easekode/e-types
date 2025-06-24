/**
 * Error Handling Types
 */

// Base error interface
export interface BaseError {
  name: string;
  message: string;
  code?: string;
  stack?: string;
  timestamp: string;
  requestId?: string;
}

// Application error
export interface AppError extends BaseError {
  statusCode: number;
  details?: any;
  field?: string;
  isOperational: boolean;
}

// Validation error
export interface ValidationError extends BaseError {
  field: string;
  value?: any;
  constraint?: string;
  children?: ValidationError[];
}

// HTTP error
export interface HttpError extends BaseError {
  status: number;
  statusText: string;
  url?: string;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

// Network error
export interface NetworkError extends BaseError {
  isNetworkError: true;
  timeout?: boolean;
  offline?: boolean;
  dns?: boolean;
  connection?: boolean;
}

// Business logic error
export interface BusinessError extends BaseError {
  businessCode: string;
  context?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Authentication error
export interface AuthError extends BaseError {
  authCode: 'INVALID_CREDENTIALS' | 'TOKEN_EXPIRED' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'ACCOUNT_LOCKED' | 'ACCOUNT_DISABLED';
  retryAfter?: number;
  remainingAttempts?: number;
}

// Database error
export interface DatabaseError extends BaseError {
  dbCode?: string;
  query?: string;
  table?: string;
  constraint?: string;
}

// File system error
export interface FileSystemError extends BaseError {
  path: string;
  operation: 'read' | 'write' | 'delete' | 'create' | 'move' | 'copy';
  permissions?: boolean;
  notFound?: boolean;
  exists?: boolean;
}

// External service error
export interface ExternalServiceError extends BaseError {
  service: string;
  endpoint?: string;
  statusCode?: number;
  retry?: boolean;
  backoff?: number;
}

// Parsing error
export interface ParseError extends BaseError {
  input?: string;
  position?: number;
  expected?: string;
  actual?: string;
}

// Configuration error
export interface ConfigError extends BaseError {
  configKey: string;
  expectedType?: string;
  actualType?: string;
  required?: boolean;
}

// Rate limit error
export interface RateLimitError extends BaseError {
  limit: number;
  remaining: number;
  resetTime: string;
  retryAfter: number;
}

// Timeout error
export interface TimeoutError extends BaseError {
  timeout: number;
  operation: string;
}

// Concurrent access error
export interface ConcurrencyError extends BaseError {
  resource: string;
  conflictVersion?: number;
  currentVersion?: number;
}

// Error context
export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  traceId?: string;
  userAgent?: string;
  ip?: string;
  url?: string;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  timestamp: string;
  environment: string;
  version: string;
}

// Error metadata
export interface ErrorMetadata {
  fingerprint?: string;
  tags?: Record<string, string>;
  extra?: Record<string, any>;
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
  breadcrumbs?: Breadcrumb[];
}

export interface Breadcrumb {
  message: string;
  category?: string;
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
  timestamp: string;
  data?: Record<string, any>;
}

// Error handling result
export interface ErrorResult<T = any> {
  success: false;
  error: BaseError;
  data?: T;
  context?: ErrorContext;
  metadata?: ErrorMetadata;
}

export interface SuccessResult<T = any> {
  success: true;
  data: T;
  error?: never;
}

export type Result<T = any> = SuccessResult<T> | ErrorResult<T>;

// Error recovery
export interface ErrorRecovery {
  canRecover: boolean;
  strategy?: 'retry' | 'fallback' | 'ignore' | 'escalate';
  maxAttempts?: number;
  backoffMs?: number;
  fallbackValue?: any;
}

// Error report
export interface ErrorReport {
  id: string;
  error: BaseError;
  context: ErrorContext;
  metadata: ErrorMetadata;
  recovery?: ErrorRecovery;
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  notes?: string;
}

// Error handler
export type ErrorHandler<T extends BaseError = BaseError> = (
  error: T,
  context?: ErrorContext
) => Promise<ErrorRecovery | void>;

// Error filter
export type ErrorFilter<T extends BaseError = BaseError> = (error: T) => boolean;

// Error transformer
export type ErrorTransformer<T extends BaseError = BaseError, U extends BaseError = BaseError> = (
  error: T
) => U;

// Error logger
export interface ErrorLogger {
  log: (error: BaseError, context?: ErrorContext, metadata?: ErrorMetadata) => Promise<void>;
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
}

// Error aggregation
export interface ErrorAggregation {
  errors: BaseError[];
  count: number;
  firstOccurrence: string;
  lastOccurrence: string;
  fingerprint: string;
  resolved: boolean;
}

// Error statistics
export interface ErrorStats {
  total: number;
  byType: Record<string, number>;
  byStatusCode: Record<number, number>;
  byTimeframe: Record<string, number>;
  resolved: number;
  unresolved: number;
  averageResolutionTime: number;
}

// Client-side error types
export interface ClientError extends BaseError {
  userAgent: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
  fileName?: string;
  componentStack?: string;
}

export interface JavaScriptError extends ClientError {
  type: 'javascript';
  stack: string;
}

export interface ReactError extends ClientError {
  type: 'react';
  componentStack: string;
  errorBoundary?: string;
}

export interface PromiseRejectionError extends ClientError {
  type: 'unhandledRejection';
  reason: any;
}

// Error boundary types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

export interface ErrorBoundaryProps {
  fallback?: any; // React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: any) => void;
  children: any; // React.ReactNode;
}

// Global error handler
export interface GlobalErrorHandler {
  handleError: (error: BaseError, context?: ErrorContext) => Promise<void>;
  reportError: (error: BaseError, context?: ErrorContext) => Promise<void>;
  isRetryable: (error: BaseError) => boolean;
  getSeverity: (error: BaseError) => 'low' | 'medium' | 'high' | 'critical';
}
