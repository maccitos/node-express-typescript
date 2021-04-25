export default class ErrorHandler extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    const defaultCode = 500;
    const defaultMessage = 'Something went wrong';
    this.statusCode = statusCode || defaultCode;
    this.message = message || defaultMessage;
  }
}
