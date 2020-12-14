/* eslint-disable no-unused-expressions */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from '../users/routes/user.route'
import {handleError} from '../helpers/try-catch-handler'
import mongoose from 'mongoose'

class App {
  public app: Application
  private userRoutes: UserRoutes = new UserRoutes()
  private url: string =
    'mongodb://DESKTOP-SNA1HQK:27017,DESKTOP-SNA1HQK:27018,DESKTOP-SNA1HQK:27019/escrow?replicaSet=rs'

  constructor() {
    this.app = express()
    this.mongoSetup()
    this.config()
    this.userRoutes.routes(this.app)
    this.errorHandler()
  }

  
  private mongoSetup(): void {
    mongoose.Promise = global.Promise
    mongoose.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => console.log('Connected to DB'))
  }

  private config(): void {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
  }
  
  private errorHandler(): void {
    this.app.use(async(error: Error, req:Request, res: Response, next: NextFunction) => {
      return handleError(error, req, res)
    })

  }
}

export default new App().app

