import { Request, Response } from 'express'
import { GeneralError } from './Errors'

export const handleError = (error: Error, req: Request, res: Response) => {
  if (error instanceof GeneralError) {
    return res.status(error.getErrorCode()).json({
      status: false,
      title: error.name,
      message: error.message,
      stack: error.stack
    })
  }

  return res.status(500).json({
    status: false,
    title: error.name,
    message: error.message,
    stack: error.stack
  })
}
