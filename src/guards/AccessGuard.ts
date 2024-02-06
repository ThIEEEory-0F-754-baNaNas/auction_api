import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: User }>();
    const user = request.user;

    const userId = this.getField(request, 'userId');
    if (userId && userId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }

  getField(request: Request, field: string) {
    const result =
      request.params[field] ?? request.query[field] ?? request.body[field];

    if (!result) {
      throw new ForbiddenException('This user has no permission to do this');
    }
    return result;
  }
}
