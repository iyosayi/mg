import { NextFunction, Request, Response } from 'express'
import { httpResponse } from '../helpers/http-response'
import { GetMethod } from '../interfaces/IHttp'

export class GetController implements GetMethod {
  constructor(private getMethod: any) {
    this.get = this.get.bind(this)
  }

  async get(req: Request, res: Response, next: NextFunction) {
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
      const newItem = await this.getMethod.get({
        source,
        ...incomingHttpBody
      })
      const apiResponse = httpResponse(req, res)
      return apiResponse({
        status: true,
        statusCode: 200,
        message: 'Resource gotten successfully',
        data: newItem
      })
    } catch (error) {
      next(error)
    }
  }
}
