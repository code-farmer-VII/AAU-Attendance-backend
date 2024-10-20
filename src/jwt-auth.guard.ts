import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TeacherService } from './teacher/teacher.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly teacherService: TeacherService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.getType() === 'http'
      ? context.switchToHttp().getRequest()
      : GqlExecutionContext.create(context).getContext().req;

    const token = ctx.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const user = await this.teacherService.validateUser(token);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    ctx.user = user;
    return true;
  }
}
