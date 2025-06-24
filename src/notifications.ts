/**
 * Notification and Messaging Types
 */

// Base notification interface
export interface BaseNotification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  createdAt: string;
  scheduledAt?: string;
  sentAt?: string;
  readAt?: string;
  expiresAt?: string;
}

export type NotificationType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'system'
  | 'user'
  | 'marketing'
  | 'security'
  | 'reminder';

export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

export type NotificationStatus =
  | 'pending'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'failed'
  | 'expired';

// User notification
export interface UserNotification extends BaseNotification {
  userId: string;
  data?: Record<string, any>;
  actions?: NotificationAction[];
  icon?: string;
  image?: string;
  sound?: string;
  badge?: number;
  category?: string;
  thread?: string;
  group?: string;
  url?: string;
  deepLink?: string;
}

// Notification action
export interface NotificationAction {
  id: string;
  title: string;
  icon?: string;
  url?: string;
  destructive?: boolean;
  requiresAuth?: boolean;
  input?: {
    placeholder: string;
    buttonTitle: string;
  };
}

// Push notification
export interface PushNotification extends BaseNotification {
  deviceTokens: string[];
  platform: 'ios' | 'android' | 'web' | 'all';
  payload: PushPayload;
  deliveryReceipt?: boolean;
  clickTracking?: boolean;
  analytics?: boolean;
}

export interface PushPayload {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  badge?: number;
  sound?: string;
  vibrate?: number[];
  data?: Record<string, any>;
  actions?: NotificationAction[];
  category?: string;
  thread?: string;
  collapseKey?: string;
  timeToLive?: number;
  priority?: 'normal' | 'high';
  restrictedPackageName?: string;
  dryRun?: boolean;
}

// Email notification
export interface EmailNotification extends BaseNotification {
  to: string[];
  cc?: string[];
  bcc?: string[];
  from: string;
  replyTo?: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];
  template?: EmailTemplate;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface EmailAttachment {
  filename: string;
  content: string | ArrayBuffer | Uint8Array;
  contentType: string;
  disposition?: 'attachment' | 'inline';
  contentId?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  text?: string;
  variables: Record<string, any>;
}

// SMS notification
export interface SMSNotification extends BaseNotification {
  phoneNumber: string;
  message: string;
  sender?: string;
  unicode?: boolean;
  deliveryReport?: boolean;
  validityPeriod?: number;
}

// In-app notification
export interface InAppNotification extends BaseNotification {
  userId: string;
  component?: string;
  position?:
    | 'top'
    | 'bottom'
    | 'center'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  duration?: number;
  dismissible?: boolean;
  sticky?: boolean;
  showCloseButton?: boolean;
  animation?: 'slide' | 'fade' | 'bounce' | 'zoom';
}

// Notification settings
export interface NotificationSettings {
  userId: string;
  channels: NotificationChannel[];
  globalSettings: GlobalNotificationSettings;
  updatedAt: string;
}

export interface NotificationChannel {
  type: NotificationType;
  enabled: boolean;
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  quietHours?: QuietHours;
  frequency?: 'immediate' | 'daily' | 'weekly' | 'never';
}

export interface GlobalNotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  marketing: boolean;
  digest: boolean;
  quietHours: QuietHours;
  timezone: string;
}

export interface QuietHours {
  enabled: boolean;
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  days: number[]; // 0-6, Sunday = 0
}

// Device registration for push notifications
export interface DeviceRegistration {
  id: string;
  userId: string;
  token: string;
  platform: 'ios' | 'android' | 'web';
  appVersion: string;
  osVersion: string;
  deviceModel?: string;
  isActive: boolean;
  registeredAt: string;
  lastUsedAt: string;
}

// Notification template
export interface NotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  title: string;
  body: string;
  variables: TemplateVariable[];
  channels: ('email' | 'push' | 'sms' | 'inApp')[];
  emailTemplate?: EmailTemplate;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'url';
  required: boolean;
  defaultValue?: any;
  description?: string;
}

// Notification campaign
export interface NotificationCampaign {
  id: string;
  name: string;
  description?: string;
  templateId: string;
  audience: NotificationAudience;
  schedule: NotificationSchedule;
  variables: Record<string, any>;
  channels: ('email' | 'push' | 'sms' | 'inApp')[];
  status:
    | 'draft'
    | 'scheduled'
    | 'running'
    | 'completed'
    | 'paused'
    | 'cancelled';
  stats: CampaignStats;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationAudience {
  type: 'all' | 'segment' | 'users' | 'roles';
  userIds?: string[];
  roles?: string[];
  segment?: AudienceSegment;
  filters?: AudienceFilter[];
}

export interface AudienceSegment {
  id: string;
  name: string;
  query: Record<string, any>;
}

export interface AudienceFilter {
  field: string;
  operator:
    | 'equals'
    | 'not_equals'
    | 'contains'
    | 'not_contains'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'not_in';
  value: any;
}

export interface NotificationSchedule {
  type: 'immediate' | 'scheduled' | 'recurring';
  sendAt?: string;
  recurring?: RecurringSchedule;
  timezone?: string;
}

export interface RecurringSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  days?: number[]; // for weekly
  dayOfMonth?: number; // for monthly
  endDate?: string;
  maxOccurrences?: number;
}

// Campaign statistics
export interface CampaignStats {
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;
  totalUnsubscribed: number;
  totalBounced: number;
  totalFailed: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  unsubscribeRate: number;
  bounceRate: number;
  byChannel: Record<string, ChannelStats>;
}

export interface ChannelStats {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  failed: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
}

// Notification events
export interface NotificationEvent {
  id: string;
  notificationId: string;
  userId?: string;
  deviceId?: string;
  type: NotificationEventType;
  timestamp: string;
  metadata?: Record<string, any>;
}

export type NotificationEventType =
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'clicked'
  | 'dismissed'
  | 'unsubscribed'
  | 'bounced'
  | 'failed';

// Notification providers
export interface NotificationProvider {
  id: string;
  name: string;
  type: 'email' | 'push' | 'sms';
  config: ProviderConfig;
  isActive: boolean;
  isDefault: boolean;
  rateLimit?: RateLimit;
}

export interface ProviderConfig {
  apiKey?: string;
  apiSecret?: string;
  endpoint?: string;
  sender?: string;
  region?: string;
  [key: string]: any;
}

export interface RateLimit {
  requests: number;
  period: number; // seconds
  burst?: number;
}

// Notification queue
export interface NotificationQueue {
  id: string;
  notification: BaseNotification;
  priority: number;
  attempts: number;
  maxAttempts: number;
  nextAttempt?: string;
  error?: string;
  createdAt: string;
  processedAt?: string;
}

// Subscription management
export interface NotificationSubscription {
  id: string;
  userId: string;
  type: NotificationType;
  endpoint?: string; // for web push
  keys?: {
    p256dh: string;
    auth: string;
  };
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
}

// Notification analytics
export interface NotificationAnalytics {
  period: {
    start: string;
    end: string;
  };
  totalNotifications: number;
  byType: Record<NotificationType, number>;
  byChannel: Record<string, number>;
  byStatus: Record<NotificationStatus, number>;
  engagement: {
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
  };
  trends: {
    date: string;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
  }[];
}
