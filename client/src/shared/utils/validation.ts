import { ZodError } from 'zod';

export function formatZodError(error: ZodError): string {
  return error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
}

export function getFieldError(error: ZodError, field: string): string | undefined {
  const fieldError = error.issues.find(err => err.path.join('.') === field);
  return fieldError?.message;
}
