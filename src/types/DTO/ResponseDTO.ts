export interface ResponseDTO<Result = unknown> {
  message: string;
  result?: Result;
  isError: boolean;
}
