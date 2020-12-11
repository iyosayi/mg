import { Request, Response } from 'express'
import { GeneralError } from '../helpers/Errors'
import { httpError, httpResponse } from '../helpers/http-response'
import { PatchMethod } from '../interfaces/IHttp'

export class PatchController implements PatchMethod {
  constructor(private patchMethod: any) {
    this.update = this.update.bind(this)
  }

  async update (req: Request, res: Response) {
    try {
      let { ...incomingHttpBody } = req.body
      const {id} = req.params
      // type Source = {
      //   ip: string
      //   browser: string | string[] | undefined
      //   referrer: string | undefined
      // }
      // let source = {} as Source
      // source.ip = req.ip
      // source.browser = req.headers['user-agent']
      // if (req.headers.Referer) {
      //   source.referrer = req.headers.referer
      // }
      const newItem = await this.patchMethod.update({id, ...incomingHttpBody })
      const apiResponse = httpResponse(req, res)
      return apiResponse({
        status: true,
        statusCode: 20,
        message: 'Resource updated successfully',
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
