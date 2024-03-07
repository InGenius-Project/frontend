export interface IResponse<Result = unknown> {
  version: string;
  statusCode: number;
  message?: string;
  isError?: boolean;
  responseException?: {
    exceptionMessage: string;
  };
  result?: Result;
}
