import { NextFunction, Request, Response } from 'express'

export interface HttpResponse {
  status: boolean
  statusCode: number
  message: string
  data: object
}

export interface HttpRequest extends Request {
  body: object
  pathParams: object
  // query: object
  ip: string
  method: string
  path: string
  user: object
  headers: {
    'Content-Type': string
    Referer: string
    'User-Agent': string
    'x-auth-token': string
    'x-renewed-token': string
  }
}

export interface PostMethod {
  add: (req: Request, res: Response, next: NextFunction) => Promise<any>
}

export interface GetMethod {
  getUseCase(id?: string): Promise<HttpResponse>
}
