export enum MimeType {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  PDF = 'application/pdf',
  MSWORD = 'application/msword',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  MP4 = 'video/mp4',
  AVI = 'video/x-msvideo',
  MPEG = 'video/mpeg',
  MOV = 'video/quicktime',
  CSV = 'text/csv',
}

export const mimeTypeToExtension: { [key in MimeType]: string } = {
  [MimeType.PNG]: 'png',
  [MimeType.JPEG]: 'jpeg',
  [MimeType.JPG]: 'jpg',
  [MimeType.PDF]: 'pdf',
  [MimeType.MSWORD]: 'doc',
  [MimeType.DOCX]: 'docx',
  [MimeType.MP4]: 'mp4',
  [MimeType.AVI]: 'avi',
  [MimeType.MPEG]: 'mpeg',
  [MimeType.MOV]: 'mov',
  [MimeType.CSV]: 'csv',
};
