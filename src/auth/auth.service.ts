import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@app/prisma';
import { LoginDto } from './dto/login.dio';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   *  user signup.
   * @returns A success message.
   */
  async signup(data: SignupDto) {
    // check user exists at this email
    const getUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (getUser) {
      throw new ConflictException('User already exists at this email.');
    }

    // generate salt
    const salt = await bcrypt.genSalt();

    // hash password
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // insert user into database
    await this.prisma.user.create({
      data: {
        email: data.email,
        password_hash: hashedPassword,
        name: data.name,
        role: data.role,
      },
    });

    return { message: 'User signed up successfully' };
  }

  /**
   * user login.
   * @returns access token & session token.
   */
  async login(
    data: LoginDto,
  ): Promise<{ access: string; refresh: string; message: string }> {
    // check user
    const getUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!getUser) {
      throw new NotFoundException('User not found at this email.');
    }

    // check password
    const isPasswordMatch = await bcrypt.compare(
      data.password,
      getUser.password_hash,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password is incorrect.');
    }

    // generate access token
    const access = await this.jwtService.signAsync(
      { id: getUser.id, role: getUser.role },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' },
    );

    // generate refresh token
    const refresh = await this.jwtService.signAsync(
      { id: getUser.id, role: getUser.role },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
    );

    return { message: 'User logged in successfully', access, refresh };
  }

  /**
   * verify refresh token and get access token
   * @param token
   * @returns
   */
  async refreshToken(token: string) {
    const payload = await this.verifyRefreshToken(token);

    // access token
    const access = await this.jwtService.signAsync(
      { id: payload.id, role: payload.role },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' },
    );

    return { access };
  }

  /**
   * Verify access token and return user.
   * @param token
   * @returns
   */
  async verifyAccessToken(token: string): Promise<User> {
    const payload: User = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });

    const getUser = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!getUser) throw new NotFoundException('User not found.');

    return getUser;
  }

  /**
   * Verify refresh token and return user.
   * @param token
   * @returns
   */
  async verifyRefreshToken(token: string): Promise<User> {
    const payload: User = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    const getUser = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!getUser) throw new NotFoundException('User not found.');

    return getUser;
  }

  /**
   * Get unique user.
   * @param search
   * @returns
   */
  async getUniqueUser(search: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: search }, { id: search }],
      },
    });
  }
}
