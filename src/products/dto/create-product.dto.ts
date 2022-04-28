import { Tags } from 'src/shared/enums/tags.enum';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsDate,
  MinLength,
  MaxLength,
  Min,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  id: any;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @IsNotEmpty()
  @MinLength(0, {
    message: 'Title is too short',
  })
  @MaxLength(25, {
    message: 'Title is too long- max value = 25 chars',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  count: number;

  @IsEnum(Tags)
  @IsArray()
  tags: Array<Tags>;
}
