import { ErrorCode, HttpException } from "./root";

export class BadRequestsException extends HttpException {
  constructor(message: string, errorCodes: ErrorCode) {
    super(message, errorCodes, 400, null);
  }
}
