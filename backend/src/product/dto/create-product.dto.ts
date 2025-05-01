import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  desc: string;

  @IsNumber()
  @ApiProperty()
  categoryId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  price: number;
}
