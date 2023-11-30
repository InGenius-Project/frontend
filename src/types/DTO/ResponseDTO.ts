export interface ResponseDTO<Data = unknown> {
  Success: boolean;
  StatusCode: number;
  Message: string;
  Data?: Data;
  Exception?: string;
}
