import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { PrismaService } from '@app/prisma';
import { Student } from '@prisma/client';
import { GetStudentsDto } from './dto/get-students.dto';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new student
   * @param createStudentDto
   * @returns The created student
   */
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = await this.prisma.student.create({
      data: {
        name: createStudentDto.name,
        age: createStudentDto.age,
        ...(createStudentDto.class_id && {
          class: { connect: { id: createStudentDto.class_id } },
        }),
        ...(createStudentDto.user_id && {
          user: { connect: { id: createStudentDto.user_id } },
        }),
      },
    });

    return newStudent;
  }

  /**
   * Get all students
   * @returns All students
   */
  async findAll(params: GetStudentsDto): Promise<Student[]> {
    const pageNum = parseInt(params.page, 10) || 1;
    const limitNum = parseInt(params.limit, 10) || 20;

    const skip = (pageNum - 1) * limitNum;
    const take = limitNum;

    const students = await this.prisma.student.findMany({
      include: { class: true, user: true },
      skip,
      take,
    });
    return students;
  }

  /**
   * Get one unique student by ID or email
   * @param search - User ID or email
   * @returns
   */
  findOne(search: string): Promise<Student | null> {
    return this.prisma.student.findFirst({
      where: { OR: [{ id: search }, { user: { email: search } }] },
      include: { class: true, user: true },
    });
  }
}
