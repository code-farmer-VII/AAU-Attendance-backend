// jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TeacherService } from './teacher/teacher.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly teacherService: TeacherService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    const user = await this.teacherService.validateUser(token);
    request.user = user;
    return true;
  }
}
