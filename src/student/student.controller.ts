import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GetStudentsDto } from './dto/get-students.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/')
  @Roles(['admin'])
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get('/')
  @Roles(['admin', 'teacher'])
  findAll(@Query() query: GetStudentsDto) {
    const page = query.page;
    const limit = query.limit;

    return this.studentService.findAll({ limit, page });
  }

  /**
   * This route for all authorized users ( admin, teacher and student)
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }
}
