import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { EnrollClassDto } from './dto/enroll-class.dto';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post('/')
  @Roles(['admin'])
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Post('/:id/enroll')
  @Roles(['admin', 'teacher'])
  enrollStudent(
    @Body() enrollClassDto: EnrollClassDto,
    @Param('id') id: string,
  ) {
    return this.classService.enrollClass(id, enrollClassDto.studentId);
  }

  /**
   * This route for all authorized users ( admin, teacher and student)
   */
  @Get('/:id/students')
  getStudentsInAClass(@Param('id') id: string) {
    return this.classService.getAllStudentsInClass(id);
  }
}
