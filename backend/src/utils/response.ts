import { HttpException, HttpStatus } from '@nestjs/common';
import { ISuccessResponse } from 'src/interface/response.interface';
import { ResponseStatus, ResponseCode } from './enums';

export const OK = <data>(data: any, message: string): ISuccessResponse<data> => {
  return { 
    status: ResponseStatus.SUCCESS, 
    statusCode: ResponseCode.CREATED, 
    message, 
    data 
  };
};

export const CREATED = <data>(data: any, message: string): ISuccessResponse<data> => {
  return { 
    status: ResponseStatus.SUCCESS, 
    statusCode: ResponseCode.CREATED, 
    message, 
    data 
  };
};

export const BAD_REQUEST = (data: any[] = [], message: string): never => {
  throw new HttpException(
    { status: ResponseStatus.ERROR, 
      statusCode: ResponseCode.BAD_REQUEST, 
      message, 
      data 
    },
    HttpStatus.BAD_REQUEST,
  );
};

export const CONFLICT = (data = [], message: string): never => {
  throw new HttpException(
    { 
      status: ResponseStatus.ERROR, 
      statusCode: ResponseCode.CONFLICT, 
      message, 
      data 
    },
    HttpStatus.CONFLICT,
  );
};

export const UNAUTHORIZED = (data: any, message: string): never => {
  throw new HttpException(
    { 
      status: ResponseStatus.ERROR, 
      statusCode: ResponseCode.UNAUTHORIZED, 
      message, 
      data 
    },
    HttpStatus.UNAUTHORIZED,
  );
};

export const FORBIDDEN = (data: any, message: string): never => {
  throw new HttpException(
    { status: ResponseStatus.ERROR, 
      statusCode: ResponseCode.FORBIDDEN, 
      message, 
      data 
    },
    HttpStatus.FORBIDDEN,
  );
};

export const NOTFOUND = (data = [], message: string): never => {
  throw new HttpException(
    { 
      status: ResponseStatus.ERROR, 
      statusCode: ResponseCode.NOT_FOUND, 
      message, 
      data
    },
    HttpStatus.NOT_FOUND
  )
}
