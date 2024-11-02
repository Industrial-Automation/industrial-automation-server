import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

import { SERVER_RESPONSE_STATUS } from '../types';

export const CustomValidationPipe = new ValidationPipe({
  exceptionFactory(rawErrors: ValidationError[]) {
    let errors: any[] = [];

    const iterate = (validationError: ValidationError) => {
      const property = validationError.property;
      const constraints = validationError.constraints;

      errors.push({ property, constraints });

      if (validationError.children) {
        for (const child of validationError.children) {
          iterate(child);
        }
      }
    };

    for (const validationError of rawErrors) {
      iterate(validationError);
    }

    errors = errors
      .filter((error) => error.constraints)
      .map((error) => ({
        property: error.property,
        errors: Object.values(error.constraints)
      }));

    const response = {
      error: {
        message: 'Validation error'
      },
      data: { errors },
      status: SERVER_RESPONSE_STATUS.VALIDATION_ERROR
    };

    return new BadRequestException(response);
  },
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true
});
