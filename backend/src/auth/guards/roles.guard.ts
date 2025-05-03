import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Position } from '@prisma/client';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '../dto/jwt.payload';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    // get the router's required roles from its roles decorator
    const requiredRoles = this.reflector.getAllAndOverride<Position[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;
    const request = context.switchToHttp().getRequest<Request>();

    // get payload from request
    const payload = await this.verifyToken(request);

    // check if role in payload is in required roles
    return !!(payload && requiredRoles.includes(payload.role));
  }

  // get token from headers and verify, return jwt payload if valid
  private async verifyToken(request: Request) {
    const authHeader = request.headers.authorization || '';
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      return null;
    }
    try {
      const payload = await this.jwtService.verifyAsync<JWTPayload>(token);
      return payload;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return null;
    }
  }
}
