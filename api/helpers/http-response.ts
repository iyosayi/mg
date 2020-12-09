import { Request, Response, response } from 'express'

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

export function makeHttpError(error: IHttpError) {
  const toReturn = {
    errors: [
      {
        title: error.title,
        error: error.errorMessage,
        stack: error.stack
      }
    ]
  }

  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: error.statusCode,
    data: JSON.stringify(toReturn)
  }
}

export const apiResponse = (req: Request, res: Response) => {
  return (http: IHttpResponse) => {
    const toReturn = {
      status: http.status,
      message: http.message,
      data: http.data
    }
  
    return res.status(http.statusCode).send(toReturn)

  }
}
