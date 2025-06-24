/**
 * Application Configuration Types
 */

// Application environment
export type Environment = 'development' | 'staging' | 'production' | 'test';

// Base configuration
export interface AppConfig {
  app: AppSettings;
  server: ServerConfig;
  database: DatabaseConfig;
  cache: CacheConfig;
  storage: StorageConfig;
  email: EmailConfig;
  sms: SMSConfig;
  push: PushConfig;
  auth: AuthConfig;
  security: SecurityConfig;
  logging: LoggingConfig;
  monitoring: MonitoringConfig;
  features: FeatureFlags;
  integrations: IntegrationConfig;
  ui: UIConfig;
}

// Application settings
export interface AppSettings {
  name: string;
  version: string;
  description?: string;
  environment: Environment;
  debug: boolean;
  url: string;
  apiUrl: string;
  cdnUrl?: string;
  supportEmail: string;
  timezone: string;
  locale: string;
  currency: string;
  maintenance: {
    enabled: boolean;
    message?: string;
    allowedIPs?: string[];
  };
}

// Server configuration
export interface ServerConfig {
  host: string;
  port: number;
  https: boolean;
  cors: CORSConfig;
  rateLimit: RateLimitConfig;
  compression: boolean;
  trust_proxy: boolean;
  session: SessionConfig;
  uploads: UploadConfig;
}

export interface CORSConfig {
  enabled: boolean;
  origin: string | string[] | boolean;
  methods: string[];
  allowedHeaders: string[];
  credentials: boolean;
  maxAge?: number;
}

export interface RateLimitConfig {
  enabled: boolean;
  windowMs: number;
  max: number;
  message?: string;
  standardHeaders: boolean;
  legacyHeaders: boolean;
}

export interface SessionConfig {
  secret: string;
  name: string;
  maxAge: number;
  secure: boolean;
  httpOnly: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  rolling: boolean;
}

export interface UploadConfig {
  maxFileSize: number;
  maxFiles: number;
  allowedMimeTypes: string[];
  destination: string;
  preservePath: boolean;
}

// Database configuration (extending from database.ts)
export interface DatabaseConfig {
  type: 'postgres' | 'mysql' | 'sqlite' | 'mongodb';
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
  pool: {
    min: number;
    max: number;
    idle: number;
    acquire: number;
    evict: number;
  };
  logging: boolean;
  migrations: {
    directory: string;
    tableName: string;
    schemaName?: string;
  };
  seeds: {
    directory: string;
  };
}

// Cache configuration
export interface CacheConfig {
  type: 'memory' | 'redis' | 'memcached';
  host?: string;
  port?: number;
  password?: string;
  ttl: number;
  max: number;
  prefix: string;
  compression: boolean;
}

// Storage configuration
export interface StorageConfig {
  type: 'local' | 's3' | 'gcs' | 'azure';
  local?: {
    directory: string;
    baseUrl: string;
  };
  s3?: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucket: string;
  };
  gcs?: {
    projectId: string;
    keyFilename: string;
    bucket: string;
  };
  azure?: {
    accountName: string;
    accountKey: string;
    containerName: string;
  };
  cdn?: {
    enabled: boolean;
    domain: string;
  };
}

// Email configuration
export interface EmailConfig {
  provider: 'smtp' | 'sendgrid' | 'mailgun' | 'ses' | 'postmark';
  from: {
    name: string;
    email: string;
  };
  replyTo?: {
    name: string;
    email: string;
  };
  smtp?: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  apiKey?: string;
  templates: {
    directory: string;
    cache: boolean;
  };
}

// SMS configuration
export interface SMSConfig {
  provider: 'twilio' | 'nexmo' | 'sns';
  accountSid?: string;
  authToken?: string;
  apiKey?: string;
  apiSecret?: string;
  from: string;
  region?: string;
}

// Push notification configuration
export interface PushConfig {
  fcm?: {
    projectId: string;
    privateKey: string;
    clientEmail: string;
  };
  apns?: {
    keyId: string;
    teamId: string;
    bundleId: string;
    privateKey: string;
    production: boolean;
  };
  web?: {
    vapidPublicKey: string;
    vapidPrivateKey: string;
    subject: string;
  };
}

// Authentication configuration
export interface AuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
    refreshExpiresIn: string;
    algorithm: string;
    issuer: string;
    audience: string;
  };
  oauth: {
    google?: OAuthProviderConfig;
    facebook?: OAuthProviderConfig;
    github?: OAuthProviderConfig;
    apple?: OAuthProviderConfig;
  };
  password: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
    maxAttempts: number;
    lockoutDuration: number;
  };
  session: {
    maxSessions: number;
    concurrentSessions: boolean;
  };
}

export interface OAuthProviderConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string[];
}

// Security configuration
export interface SecurityConfig {
  encryption: {
    algorithm: string;
    key: string;
    iv: string;
  };
  hashing: {
    algorithm: string;
    saltRounds: number;
  };
  headers: {
    xss: boolean;
    nosniff: boolean;
    frameguard: boolean;
    hsts: boolean;
    csp: boolean;
  };
  csrf: {
    enabled: boolean;
    cookie: boolean;
  };
}

// Logging configuration
export interface LoggingConfig {
  level: 'error' | 'warn' | 'info' | 'debug' | 'trace';
  format: 'json' | 'text';
  console: boolean;
  file: {
    enabled: boolean;
    filename: string;
    maxSize: string;
    maxFiles: number;
  };
  database: {
    enabled: boolean;
    table: string;
  };
  external: {
    enabled: boolean;
    provider: 'winston' | 'bunyan' | 'pino';
    config: Record<string, any>;
  };
}

// Monitoring configuration
export interface MonitoringConfig {
  enabled: boolean;
  metrics: {
    enabled: boolean;
    endpoint: string;
    interval: number;
  };
  healthCheck: {
    enabled: boolean;
    endpoint: string;
    checks: string[];
  };
  apm: {
    enabled: boolean;
    provider: 'elastic' | 'datadog' | 'newrelic';
    config: Record<string, any>;
  };
  errorTracking: {
    enabled: boolean;
    provider: 'sentry' | 'rollbar' | 'bugsnag';
    config: Record<string, any>;
  };
}

// Feature flags
export interface FeatureFlags {
  [key: string]: boolean | FeatureFlag;
}

export interface FeatureFlag {
  enabled: boolean;
  rollout?: number; // percentage
  audience?: string[];
  conditions?: FeatureCondition[];
  variants?: FeatureVariant[];
}

export interface FeatureCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'in' | 'not_in';
  value: any;
}

export interface FeatureVariant {
  name: string;
  weight: number;
  config?: Record<string, any>;
}

// Integration configuration
export interface IntegrationConfig {
  analytics?: {
    google?: {
      trackingId: string;
      enabled: boolean;
    };
    mixpanel?: {
      token: string;
      enabled: boolean;
    };
  };
  payment?: {
    stripe?: {
      publicKey: string;
      secretKey: string;
      webhookSecret: string;
    };
    paypal?: {
      clientId: string;
      clientSecret: string;
      sandbox: boolean;
    };
  };
  social?: {
    facebook?: {
      appId: string;
      appSecret: string;
    };
    twitter?: {
      apiKey: string;
      apiSecret: string;
    };
  };
}

// UI configuration
export interface UIConfig {
  theme: {
    default: 'light' | 'dark' | 'system';
    allowUserChange: boolean;
  };
  layout: {
    sidebar: boolean;
    header: boolean;
    footer: boolean;
    breadcrumbs: boolean;
  };
  features: {
    search: boolean;
    notifications: boolean;
    userMenu: boolean;
    languageSwitch: boolean;
    themeSwitch: boolean;
  };
  branding: {
    logo: string;
    favicon: string;
    title: string;
    description: string;
    keywords: string[];
  };
}

// Environment variables mapping
export interface EnvironmentVariables {
  NODE_ENV: Environment;
  PORT: string;
  HOST: string;
  DATABASE_URL: string;
  REDIS_URL: string;
  JWT_SECRET: string;
  ENCRYPTION_KEY: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  SENDGRID_API_KEY: string;
  STRIPE_SECRET_KEY: string;
  SENTRY_DSN: string;
  [key: string]: string;
}

// Configuration validation
export interface ConfigValidation {
  required: string[];
  optional: string[];
  deprecated: string[];
  types: Record<string, 'string' | 'number' | 'boolean' | 'object' | 'array'>;
  defaults: Record<string, any>;
}

// Runtime configuration
export interface RuntimeConfig {
  startTime: string;
  uptime: number;
  version: string;
  environment: Environment;
  nodeVersion: string;
  platform: string;
  architecture: string;
  memory: {
    used: number;
    total: number;
    limit?: number;
  };
  cpu: {
    usage: number;
    cores: number;
  };
}
