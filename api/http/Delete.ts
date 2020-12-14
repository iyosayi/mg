import { NextFunction, Request, Response } from 'express'
import { httpResponse } from '../helpers/http-response'
import { DeleteMethod } from '../interfaces/IHttp'

export class DeleteController implements DeleteMethod {
  constructor(private deleteMethod: any) {
    this.remove = this.remove.bind(this)
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      let { id } = req.body
      const newItem = await this.deleteMethod.remove({ id })
      const apiResponse = httpResponse(req, res)
      return apiResponse({
        status: true,
        statusCode: 200,
        message: 'Resource deleted successfully',
        data: newItem
      })
    } catch (error) {
      next(error)
    }
  }
}
