import { ResponseCode, ResponseStatus } from "src/utils/enums";

export interface ISuccessResponse<data> {
    status: ResponseStatus;
    statusCode: ResponseCode;
    message: string;
    data: data | null
  }
  
  export interface IErrorResponse {
    status: ResponseStatus;
    statusCode: ResponseCode;
    message: string;
  }