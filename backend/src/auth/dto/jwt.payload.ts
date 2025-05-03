import { Position } from '@prisma/client';

export type JWTPayload = {
  sub: string;
  role: Position;
};
