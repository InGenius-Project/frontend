export interface IResponse<Result = unknown> {
  statusCode: number;
  message?: string;
  isError?: boolean;
  responseException?: {
    exceptionMessage: string;
  };
  result?: Result;
}
