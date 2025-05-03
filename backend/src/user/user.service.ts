import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserData: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({
        data: {
          ...createUserData,
          password: await hash(createUserData.password, 10),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' // Prisma's conflict error code
      ) {
        throw new ConflictException('Username already exists');
      }
      throw error; // Re-throw other errors
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({ where });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    try {
      return this.prisma.user.delete({ where });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025' // Prisma's "Record not found" error code
      ) {
        throw new NotFoundException('User not found');
      }
      throw error; // Re-throw other errors
    }
  }
}
