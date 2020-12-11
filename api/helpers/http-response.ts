import { Request, Response } from 'express'

interface IHttpError {
  statusCode: number
  title: string
  errorMessage: string
  stack: string | undefined
}

interface IHttpResponse {
  status: boolean
  statusCode: number
  message: string
  data: object
}

export function httpError(req: Request, res: Response) {
  return (error: IHttpError) => {
    const toReturn = {
      errors: [
        {
          title: error.title,
          error: error.errorMessage,
          stack: error.stack
        }
      ]
    }
    return res.status(error.statusCode).send(toReturn)
  }
}

export const httpResponse = (req: Request, res: Response) => {
  return (http: IHttpResponse) => {
    const toReturn = {
      status: http.status,
      message: http.message,
      data: http.data
    }
  
    return res.status(http.statusCode).send(toReturn)

  }
}


