/**
 * Main exports - All type definitions
 * 
 * This file serves as the main entry point for all type definitions
 * in the e-types package. Import types from here for both backend
 * and frontend applications.
 */

// Authentication types
export * from './auth';

// API and HTTP types
export * from './api';

// Common utility types
export * from './common';

// Database and entity types
export * from './database';

// Error handling types (with renamed exports to avoid conflicts)
export {
  BaseError,
  AppError,
  ValidationError as ErrorValidationError,
  HttpError,
  NetworkError,
  BusinessError,
  AuthError as ErrorAuthError,
  DatabaseError,
  FileSystemError,
  ExternalServiceError,
  ParseError,
  ConfigError,
  RateLimitError,
  TimeoutError,
  ConcurrencyError,
  ErrorContext,
  ErrorMetadata,
  Breadcrumb,
  ErrorResult,
  SuccessResult,
  Result,
  ErrorRecovery,
  ErrorReport,
  ErrorHandler,
  ErrorFilter,
  ErrorTransformer,
  ErrorLogger,
  ErrorAggregation,
  ErrorStats,
  ClientError,
  JavaScriptError,
  ReactError,
  PromiseRejectionError,
  ErrorBoundaryState,
  ErrorBoundaryProps,
  GlobalErrorHandler
} from './errors';

// File and media types (with renamed exports to avoid conflicts)
export {
  BaseFile,
  FileMetadata,
  ExifData,
  File,
  FileThumbnail,
  FileVariant,
  FileUploadRequest,
  FileUploadResponse as FileUploadResponseType,
  MultiFileUploadResponse,
  UploadProgress as FileUploadProgress,
  UploadConfig as FileUploadConfig,
  FileVariantConfig,
  FileOperationType,
  FileOperation,
  FilePermissions,
  FileAccessControl,
  ShareLink,
  ShareRequest,
  Folder,
  FolderTree,
  ImageFile,
  VideoFile,
  AudioFile,
  DocumentFile,
  ArchiveFile,
  ArchiveContent,
  FileSearchParams,
  FileFilterOptions,
  FileStats,
  StorageProvider,
  CDNConfig,
  ProcessingJob
} from './files';

// Notification and messaging types (with renamed exports to avoid conflicts)
export {
  BaseNotification,
  NotificationType,
  NotificationPriority,
  NotificationStatus,
  UserNotification,
  NotificationAction,
  PushNotification,
  PushPayload,
  EmailNotification,
  EmailAttachment,
  EmailTemplate,
  SMSNotification,
  InAppNotification,
  NotificationSettings as NotificationUserSettings,
  NotificationChannel,
  GlobalNotificationSettings,
  QuietHours,
  DeviceRegistration,
  NotificationTemplate,
  TemplateVariable,
  NotificationCampaign,
  NotificationAudience,
  AudienceSegment,
  AudienceFilter,
  NotificationSchedule,
  RecurringSchedule,
  CampaignStats,
  ChannelStats,
  NotificationEvent,
  NotificationEventType,
  NotificationProvider,
  ProviderConfig,
  RateLimit as NotificationRateLimit,
  NotificationQueue,
  NotificationSubscription,
  NotificationAnalytics
} from './notifications';

// UI component types
export * from './ui';

// Configuration types (with renamed exports to avoid conflicts)
export {
  Environment,
  AppConfig,
  AppSettings,
  ServerConfig,
  CORSConfig,
  RateLimitConfig,
  SessionConfig,
  UploadConfig as ServerUploadConfig,
  DatabaseConfig as ConfigDatabaseConfig,
  CacheConfig,
  StorageConfig,
  EmailConfig,
  SMSConfig,
  PushConfig,
  AuthConfig,
  OAuthProviderConfig,
  SecurityConfig,
  LoggingConfig,
  MonitoringConfig,
  FeatureFlags,
  FeatureFlag,
  FeatureCondition,
  FeatureVariant,
  IntegrationConfig,
  UIConfig,
  EnvironmentVariables,
  ConfigValidation,
  RuntimeConfig
} from './config';

// Additional commonly used types for both backend and frontend

// Date and time types
export interface DateRange {
  start: string;
  end: string;
}

export interface TimeRange {
  startTime: string;
  endTime: string;
}

export interface Duration {
  value: number;
  unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';
}

// Location and geography types
export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  formatted?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
}

export interface Location {
  id?: string;
  name?: string;
  address?: Address;
  coordinates?: Coordinates;
  timezone?: string;
}

// Contact information types
export interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
}

// Organization types
export interface Organization {
  id: string;
  name: string;
  description?: string;
  type: 'company' | 'nonprofit' | 'government' | 'educational' | 'other';
  size?: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  industry?: string;
  website?: string;
  logo?: string;
  address?: Address;
  contact?: ContactInfo;
  founded?: string;
  employees?: number;
  revenue?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Team and membership types
export interface Team {
  id: string;
  name: string;
  description?: string;
  organizationId?: string;
  members: TeamMember[];
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  userId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  permissions: string[];
  joinedAt: string;
  invitedBy?: string;
  status: 'active' | 'invited' | 'suspended';
}

// Invitation types
export interface Invitation {
  id: string;
  email: string;
  role: string;
  organizationId?: string;
  teamId?: string;
  invitedBy: string;
  token: string;
  expiresAt: string;
  acceptedAt?: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  createdAt: string;
}

// Audit log types
export interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId: string;
  userId: string;
  ip?: string;
  userAgent?: string;
  changes?: {
    before?: Record<string, any>;
    after?: Record<string, any>;
  };
  metadata?: Record<string, any>;
  timestamp: string;
}

// Settings types
export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    desktop: boolean;
  };
  privacy: {
    profileVisible: boolean;
    searchableByEmail: boolean;
    searchableByPhone: boolean;
    allowDirectMessages: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    sessionTimeout: number;
    passwordChangeRequired: boolean;
  };
  preferences: Record<string, any>;
  updatedAt: string;
}

// Subscription and billing types
export interface Subscription {
  id: string;
  userId: string;
  organizationId?: string;
  planId: string;
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAt?: string;
  cancelledAt?: string;
  trialStart?: string;
  trialEnd?: string;
  quantity: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  interval: 'day' | 'week' | 'month' | 'year';
  intervalCount: number;
  trialDays?: number;
  features: string[];
  limits: Record<string, number>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Payment types
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled' | 'refunded';
  paymentMethod: string;
  description?: string;
  metadata?: Record<string, any>;
  customerId: string;
  subscriptionId?: string;
  invoiceId?: string;
  createdAt: string;
  updatedAt: string;
}

// Analytics and metrics types
export interface Metric {
  name: string;
  value: number;
  unit?: string;
  timestamp: string;
  dimensions?: Record<string, string>;
  metadata?: Record<string, any>;
}

export interface Analytics {
  metrics: Metric[];
  timeRange: DateRange;
  granularity: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  filters?: Record<string, any>;
}

// Feature usage tracking
export interface FeatureUsage {
  userId: string;
  feature: string;
  action: string;
  value?: number;
  properties?: Record<string, any>;
  timestamp: string;
  sessionId?: string;
  deviceId?: string;
}

// Health check and status types
export interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'down' | 'maintenance';
  version?: string;
  uptime: number;
  responseTime: number;
  lastCheck: string;
  dependencies?: ServiceStatus[];
  metadata?: Record<string, any>;
}

// Webhook types
export interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret?: string;
  isActive: boolean;
  headers?: Record<string, string>;
  retryPolicy?: {
    maxAttempts: number;
    backoffMs: number;
    exponential: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  event: string;
  payload: Record<string, any>;
  status: 'pending' | 'delivered' | 'failed' | 'expired';
  attempts: number;
  nextAttempt?: string;
  response?: {
    statusCode: number;
    headers: Record<string, string>;
    body: string;
  };
  createdAt: string;
  deliveredAt?: string;
}

// Export convenience type unions
export type ID = string;
export type Timestamp = string;
export type URL = string;
export type Email = string;
export type PhoneNumber = string;
export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
export type JSONObject = { [key: string]: JSONValue };
export type JSONArray = JSONValue[];
