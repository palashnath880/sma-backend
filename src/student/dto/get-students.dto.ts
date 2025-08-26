import { IsString } from 'class-validator';

export class GetStudentsDto {
  @IsString()
  page: string;

  @IsString()
  limit: string;
}
