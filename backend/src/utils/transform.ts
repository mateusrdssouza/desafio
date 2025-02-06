import { plainToInstance } from 'class-transformer';

export function transformToDto<T>(dtoClass: new () => T, data: any): T {
  return plainToInstance(dtoClass, data, {
    excludeExtraneousValues: true,
  });
}
