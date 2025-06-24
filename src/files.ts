/**
 * File and Media Types
 */

// Base file interface
export interface BaseFile {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  path?: string;
  checksum?: string;
  uploadedAt: string;
  uploadedBy?: string;
}

// File metadata
export interface FileMetadata {
  title?: string;
  description?: string;
  alt?: string;
  tags?: string[];
  category?: string;
  author?: string;
  copyright?: string;
  exif?: ExifData;
  duration?: number; // for videos/audio
  dimensions?: {
    width: number;
    height: number;
  };
}

// EXIF data for images
export interface ExifData {
  make?: string;
  model?: string;
  software?: string;
  dateTime?: string;
  gps?: {
    latitude: number;
    longitude: number;
    altitude?: number;
  };
  camera?: {
    iso?: number;
    aperture?: string;
    shutterSpeed?: string;
    focalLength?: string;
    flash?: boolean;
  };
  orientation?: number;
}

// File with metadata
export interface File extends BaseFile {
  metadata?: FileMetadata;
  thumbnails?: FileThumbnail[];
  variants?: FileVariant[];
  isPublic: boolean;
  downloadCount?: number;
  lastAccessedAt?: string;
}

// File thumbnail
export interface FileThumbnail {
  size: 'small' | 'medium' | 'large';
  width: number;
  height: number;
  url: string;
  format: string;
}

// File variant (different formats/qualities)
export interface FileVariant {
  name: string;
  format: string;
  quality?: number;
  size: number;
  url: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

// Upload types
export interface FileUploadRequest {
  file: File | Blob;
  name?: string;
  folder?: string;
  isPublic?: boolean;
  metadata?: Partial<FileMetadata>;
  generateThumbnails?: boolean;
  generateVariants?: string[];
}

export interface FileUploadResponse {
  file: File;
  success: boolean;
  message?: string;
}

export interface MultiFileUploadResponse {
  files: File[];
  failed: {
    name: string;
    error: string;
  }[];
  success: boolean;
}

// Upload progress
export interface UploadProgress {
  fileId: string;
  fileName: string;
  loaded: number;
  total: number;
  percentage: number;
  speed: number; // bytes per second
  timeRemaining: number; // seconds
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'failed' | 'cancelled';
}

// Upload configuration
export interface UploadConfig {
  maxFileSize: number; // bytes
  maxFiles: number;
  allowedMimeTypes: string[];
  allowedExtensions: string[];
  generateThumbnails: boolean;
  thumbnailSizes: { width: number; height: number; name: string }[];
  generateVariants: boolean;
  variants: FileVariantConfig[];
  folder: string;
  isPublic: boolean;
  virusScan: boolean;
}

export interface FileVariantConfig {
  name: string;
  format: string;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  maintainAspectRatio: boolean;
}

// File operations
export type FileOperationType = 'upload' | 'download' | 'delete' | 'move' | 'copy' | 'rename' | 'share';

export interface FileOperation {
  id: string;
  type: FileOperationType;
  fileId: string;
  userId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  progress?: number;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

// File permissions
export interface FilePermissions {
  read: boolean;
  write: boolean;
  delete: boolean;
  share: boolean;
  download: boolean;
}

export interface FileAccessControl {
  owner: string;
  permissions: FilePermissions;
  sharedWith: {
    userId: string;
    permissions: FilePermissions;
    sharedAt: string;
    expiresAt?: string;
  }[];
  isPublic: boolean;
  publicUrl?: string;
}

// File sharing
export interface ShareLink {
  id: string;
  fileId: string;
  token: string;
  url: string;
  password?: boolean;
  expiresAt?: string;
  maxDownloads?: number;
  downloadCount: number;
  createdBy: string;
  createdAt: string;
  isActive: boolean;
}

export interface ShareRequest {
  fileId: string;
  expiresIn?: number; // seconds
  maxDownloads?: number;
  password?: string;
  allowPreview?: boolean;
}

// Folder/Directory types
export interface Folder {
  id: string;
  name: string;
  path: string;
  parentId?: string;
  description?: string;
  isPublic: boolean;
  fileCount: number;
  size: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  permissions: FilePermissions;
}

export interface FolderTree {
  folder: Folder;
  children: FolderTree[];
  files: File[];
}

// Media-specific types
export interface ImageFile extends File {
  type: 'image';
  dimensions: {
    width: number;
    height: number;
  };
  format: 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp' | 'svg' | 'bmp' | 'tiff';
  hasTransparency?: boolean;
  colorSpace?: string;
  dpi?: number;
}

export interface VideoFile extends File {
  type: 'video';
  duration: number;
  dimensions: {
    width: number;
    height: number;
  };
  format: 'mp4' | 'avi' | 'mov' | 'wmv' | 'flv' | 'webm' | 'mkv';
  bitrate?: number;
  framerate?: number;
  codec?: string;
  hasAudio?: boolean;
}

export interface AudioFile extends File {
  type: 'audio';
  duration: number;
  format: 'mp3' | 'wav' | 'flac' | 'aac' | 'ogg' | 'wma';
  bitrate?: number;
  sampleRate?: number;
  channels?: number;
  album?: string;
  artist?: string;
  genre?: string;
  year?: number;
}

export interface DocumentFile extends File {
  type: 'document';
  format: 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'txt' | 'rtf';
  pageCount?: number;
  wordCount?: number;
  hasPassword?: boolean;
  language?: string;
}

// Archive types
export interface ArchiveFile extends File {
  type: 'archive';
  format: 'zip' | 'rar' | 'tar' | 'gz' | '7z';
  fileCount: number;
  uncompressedSize: number;
  compressionRatio: number;
  hasPassword?: boolean;
  contents?: ArchiveContent[];
}

export interface ArchiveContent {
  name: string;
  path: string;
  size: number;
  isDirectory: boolean;
  lastModified: string;
}

// File search and filtering
export interface FileSearchParams {
  query?: string;
  mimeTypes?: string[];
  extensions?: string[];
  sizeMin?: number;
  sizeMax?: number;
  dateFrom?: string;
  dateTo?: string;
  folder?: string;
  tags?: string[];
  createdBy?: string;
  isPublic?: boolean;
}

export interface FileFilterOptions {
  type: 'all' | 'images' | 'videos' | 'audio' | 'documents' | 'archives' | 'other';
  size: 'all' | 'small' | 'medium' | 'large';
  date: 'all' | 'today' | 'week' | 'month' | 'year';
  owner: 'all' | 'me' | 'shared';
}

// File statistics
export interface FileStats {
  totalFiles: number;
  totalSize: number;
  byType: Record<string, { count: number; size: number }>;
  byExtension: Record<string, { count: number; size: number }>;
  uploadsByDate: Record<string, number>;
  mostDownloaded: File[];
  largestFiles: File[];
  recentFiles: File[];
}

// CDN and storage
export interface StorageProvider {
  name: string;
  type: 'local' | 's3' | 'gcs' | 'azure' | 'cloudinary' | 'imgur';
  config: Record<string, any>;
  isDefault: boolean;
  regions?: string[];
}

export interface CDNConfig {
  enabled: boolean;
  provider: string;
  domain: string;
  regions: string[];
  cacheControl: string;
  compression: boolean;
  imageOptimization: boolean;
}

// File processing
export interface ProcessingJob {
  id: string;
  fileId: string;
  type: 'thumbnail' | 'variant' | 'compress' | 'convert' | 'analyze';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: any;
  error?: string;
  createdAt: string;
  completedAt?: string;
}
