import { NextFunction, Request, Response } from 'express'
import { GeneralError } from '../helpers/Errors'
import { httpError, httpResponse } from '../helpers/http-response'
import { PostMethod } from '../interfaces/IHttp'

export class PostController implements PostMethod {
  constructor(private postMethod: any) {
    this.add = this.add.bind(this)
  }

  async add (req: Request, res: Response, next: NextFunction) {
    try {
      let { ...incomingHttpBody } = req.body
      type Source = {
        ip: string
        browser: string | string[] | undefined
        referrer: string | undefined
      }
      let source = {} as Source
      source.ip = req.ip
      source.browser = req.headers['user-agent']
      if (req.headers.Referer) {
        source.referrer = req.headers.referer
      }
      const newItem = await this.postMethod.add({ source, ...incomingHttpBody })
      const apiResponse = httpResponse(req, res)
      return apiResponse({
        status: true,
        statusCode: 201,
        message: 'Resource created successfully',
        data: newItem
      })
    } catch (error) {
      const makeHttpError = httpError(req, res)
      if(error instanceof GeneralError) {
        return makeHttpError({
          statusCode: error.getErrorCode(),
          title: error.name,
          errorMessage: error.message,
          stack: error.stack
        })
      }
    }
  }
}
