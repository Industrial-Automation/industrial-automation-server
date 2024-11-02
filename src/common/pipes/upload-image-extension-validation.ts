import { extname } from 'path';

import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UploadImageExtensionValidatorPipe implements PipeTransform {
  private readonly allowedExtensions = ['.png', '.jpg', '.jpeg'];

  transform(value: Express.Multer.File): Express.Multer.File {
    if (!value) {
      throw new BadRequestException('File is required for this request');
    }

    const extension = extname(value.originalname);
    if (!this.allowedExtensions.includes(extension)) {
      throw new BadRequestException(`File type ${extension} not supported`);
    }

    return value;
  }
}

export const UploadImageExtensionValidator = new UploadImageExtensionValidatorPipe();
