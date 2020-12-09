class GeneralError extends Error {
  constructor(public value: string) {
    super(value)
  }

  getErrorCode() {
    if (this instanceof UniqueConstraintError) return 409
    if (this instanceof UnauthorizedError) return 401
    if (
      this instanceof InvalidPropertyError ||
      this instanceof RequiredParameterError ||
      this instanceof MessageBrokerError ||
      this instanceof SendGridError
    ) {
      return 400
    }

    return 500
  }
}

class RequiredParameterError extends GeneralError {
  constructor(public param: string) {
    super(`${param} cannot be null or undefined.`)

    this.name = 'RequiredParameterError'
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParameterError)
    }
  }
}

class UniqueConstraintError extends GeneralError {
  constructor(public value: string) {
    super(`${value} must be unique.`)

    this.name = 'UniqueConstraintError'
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError)
    }
  }
}

class InvalidPropertyError extends GeneralError {
  constructor(public msg: string) {
    super(msg)

    this.name = 'InvalidPropertyError'
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPropertyError)
    }
  }
}

class UnauthorizedError extends GeneralError {
  constructor(public message: string) {
    super(message)
    this.name = 'UnauthorizedError'

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError)
    }
  }
}

class DatabaseError extends GeneralError {
  constructor(public message: string) {
    super(message)
    this.name = 'MongoDBError'

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseError)
    }
  }
}

class SendGridError extends GeneralError {
  constructor(public message: string) {
    super(message)

    this.name = 'SendGridError'

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SendGridError)
    }
  }
}

class MessageBrokerError extends GeneralError {
  constructor(public message: string) {
    super(message)

    this.name = 'MessageBrokerError'

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MessageBrokerError)
    }
  }
}

export {
  RequiredParameterError,
  InvalidPropertyError,
  UniqueConstraintError,
  UnauthorizedError,
  DatabaseError,
  SendGridError,
  MessageBrokerError,
  GeneralError
}
