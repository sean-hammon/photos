export interface File {
  id: number;
  mimetype: string;
  height?: number;
  width?: number;
  offset?: number;
  path: string;
}
