import { ErrorCode, HttpException } from "./root";

export class NotFoundException extends HttpException {
  constructor(message: string, errorCodes: ErrorCode) {
    super(message, errorCodes, 404, null);
  }
}
