export class Exception extends Error {
  constructor(message, innerException = null) {
    super(message);
    this.message = message;
    this.innerException = innerException;
  }
}


export class NetworkException extends Error {
  constructor(message, statuscode, innerException = null) {
    super(message);
    this.message = message;
    this.status = statuscode;
    this.innerException = innerException;
  }
}

