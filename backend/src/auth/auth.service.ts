import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JWTPayload } from './dto/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserByPassword(key: string, password: string) {
    const user = await this.userService.findOne({ username: key });
    if (!user) return null;
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) return null;
    return user;
  }

  login(user: User) {
    const payload: JWTPayload = {
      sub: user.id,
      role: user.position,
    };
    return this.jwtService.sign(payload);
  }
}
