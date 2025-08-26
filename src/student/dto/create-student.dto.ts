import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsUUID()
  class_id: string;

  @IsString()
  @IsUUID()
  user_id: string;
}
