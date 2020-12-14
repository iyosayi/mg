import { NextFunction, Request, Response } from 'express'
import { httpResponse } from '../helpers/http-response'
import { PatchMethod } from '../interfaces/IHttp'

export class PatchController implements PatchMethod {
  constructor(private patchMethod: any) {
    this.update = this.update.bind(this)
  }

  async update(req: Request, res: Response, next: NextFunction) {
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
      const newItem = await this.patchMethod.update({
        source,
        ...incomingHttpBody
      })
      const apiResponse = httpResponse(req, res)
      return apiResponse({
        status: true,
        statusCode: 200,
        message: 'Resource updated successfully',
        data: newItem
      })
    } catch (error) {
      next(error)
    }
  }
}
