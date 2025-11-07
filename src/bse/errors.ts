/**
 * BSE Error Types
 *
 * Shared error types that may be used across multiple client applications
 */

/**
 * BSE Error Response
 * Generic error response structure from BSE APIs
 */
export interface BseErrorResponse {
  status: 'error';
  data: null;
  messages?: Array<{
    msgid?: string;
    errcode?: string;
    msgcode?: string;
  }>;
}

/**
 * Queued Request
 * Represents a request waiting in the queue during token refresh
 */
export interface QueuedRequest {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
  timestamp: number;
}

/**
 * Token Manager State
 * Internal state tracking for the token manager
 */
export interface TokenManagerState {
  isRefreshing: boolean;
  queuedRequests: QueuedRequest[];
  lastRefreshAttempt: number | null;
  consecutiveFailures: number;
  currentBackoffDelay: number;
}
