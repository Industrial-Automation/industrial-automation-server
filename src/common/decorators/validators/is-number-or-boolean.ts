import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: false })
@Injectable()
export class IsNumberOrBooleanValidatorConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === 'number' || typeof value === 'boolean';
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must number or boolean`;
  }
}

export function IsNumberOrBoolean(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNumberOrBooleanValidatorConstraint
    });
  };
}
