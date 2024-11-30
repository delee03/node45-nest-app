import { SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE = 'responseMessage';
export const ResponseMessage = (message) =>
  SetMetadata(RESPONSE_MESSAGE, message);
