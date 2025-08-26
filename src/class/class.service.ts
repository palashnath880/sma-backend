import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { PrismaService } from '@app/prisma';
import { Class, Student } from '@prisma/client';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new class
   * @param createClassDto
   * @returns
   */
  create(createClassDto: CreateClassDto): Promise<Class> {
    return this.prisma.class.create({
      data: createClassDto,
    });
  }

  /**
   * Enroll a student in a class
   * @param classId
   * @param studentId
   * @returns
   */
  async enrollClass(classId: string, studentId: string): Promise<any> {
    // check student
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });
    if (!student) throw new NotFoundException('Student not found.');

    await this.prisma.student.update({
      where: { id: studentId },
      data: { class_id: classId },
    });

    return { message: 'UPDATED' };
  }

  /**
   * Get students in a class
   * @param classId
   * @returns
   */
  getAllStudentsInClass(classId: string): Promise<Student[]> {
    return this.prisma.student.findMany({
      where: { class_id: classId },
    });
  }
}
