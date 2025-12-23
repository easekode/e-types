/**
 * FCM Event Types and Data Structures
 *
 * This module defines the event types and data structures for Firebase Cloud Messaging (FCM)
 * notifications used throughout the application.
 *
 * @module fcmEvents
 */

export enum FCMEventType {
  MANDATE_SUCCESS = 'MANDATE_SUCCESS',

  LUMPSUM_SUCCESS = 'LUMPSUM_SUCCESS',

  ENACH_ACTIVE = 'ACTIVE',
}

/**
 * FCM Event Data payload interface
 * Represents the data structure received from FCM notifications
 */
export interface FCMEventData {
  /**
   * The type of FCM event
   */
  type: FCMEventType | string;

  /**
   * Additional data fields (optional)
   * Can include mandate details, payment info, etc.
   */
  [key: string]: any;
}

/**
 * Type guard to check if a string is a valid FCM event type
 */
export const isFCMEventType = (value: string): value is FCMEventType => {
  return Object.values(FCMEventType).includes(value as FCMEventType);
};
