export enum FileVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export interface FileType {
  url: string;
  fileType: string;
  name: string;
  alt: string;
  visibility?: FileVisibility;
}
