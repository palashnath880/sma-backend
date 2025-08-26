import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class EnrollClassDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  studentId: string;
}
