class GetService {
  constructor(service, wrapAsync) {
    this.service = service()
    this.wrapAsync = wrapAsync
  }

  wrapAsync(async (httpRequest) => {
    
  })
}