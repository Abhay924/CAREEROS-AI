import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateEducationDto {
  @IsString()
  @IsNotEmpty()
  school!: string;

  @IsString()
  @IsNotEmpty()
  degree!: string;

  @IsString()
  @IsNotEmpty()
  field!: string;

  @IsInt()
  @Min(1950)
  @Max(2100)
  startYear!: number;

  @IsOptional()
  @IsInt()
  @Min(1950)
  @Max(2100)
  endYear?: number;

  @IsOptional()
  @IsNumber()
  cgpa?: number;
}