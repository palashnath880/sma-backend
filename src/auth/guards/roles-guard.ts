import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Reflector } from '@nestjs/core';
import { User, UserRole } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  // Check if user role matches any of the required roles
  matchRoles(roles: UserRole[], userRole: UserRole): boolean {
    return roles.some((role) => userRole.includes(role));
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<UserRole[]>('roles', ctx.getHandler());

    if (!roles) return true;

    const req = ctx.switchToHttp().getRequest();
    const user: User = req.user;

    // User not authenticated
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    // get user from prisma
    const dbUser = await this.authService.getUniqueUser(user.id);
    if (!dbUser) throw new UnauthorizedException('User not found');

    return this.matchRoles(roles, dbUser.role);
  }
}
