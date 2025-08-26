import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { PrismaModule } from '@app/prisma';
import { APP_GUARD } from '@nestjs/core';
import { JwtAccessGuard } from './auth/guards/jwt-access.guard';
import { RoleGuard } from './auth/guards/roles-guard';

@Module({
  imports: [AuthModule, StudentModule, ClassModule, PrismaModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
