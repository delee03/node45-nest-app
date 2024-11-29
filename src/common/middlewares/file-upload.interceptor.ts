import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as multer from 'multer';
import { ParseFilePipeBuilder } from '@nestjs/common';
import * as path from 'path';
import { diskStorage } from 'multer';
import * as fs from 'fs';

// Ensure that the 'images' directory exists
fs.mkdirSync('images', { recursive: true });

const storageLocal = diskStorage({
  destination: function (_, __, cb) {
    cb(null, 'images'); // Save to 'images' folder
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname);
    const fileName = 'local' + '-' + uniqueSuffix + fileExt;
    cb(null, fileName);
  },
});

@Injectable()
export class CustomFileInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const file = request.file;

    // Validate the file manually before proceeding with storage
    const pipe = new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: /image\/(png|jpg|jpeg)/, // Validate file type
      })
      .addMaxSizeValidator({
        maxSize: 1000, // Max size in bytes
      })
      .build();

    try {
      // Perform the validation manually
      pipe.transform(file);
    } catch (error) {
      // If validation fails, throw an exception and don't save the file
      throw new BadRequestException('File validation failed. ' + error.message);
    }

    // If validation passes, continue with storage using storageLocal
    const multerUpload = multer({ storage: storageLocal }).single('avatar');
    return new Observable<void>((observer) => {
      multerUpload(
        request,
        context.switchToHttp().getResponse(),
        (err: any) => {
          if (err) {
            observer.error(
              new BadRequestException('File upload failed. ' + err.message),
            );
          } else {
            observer.next();
          }
          observer.complete();
        },
      );
    }).pipe(() => next.handle());
  }
}
