import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AttendanceService } from './attendance/attendance.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly attendanceService: AttendanceService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.getType() === 'http' ? context.switchToHttp().getRequest() : GqlExecutionContext.create(context).getContext().req;
    
    const token = ctx.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    const user = await this.attendanceService.checkAttendance(token);
    ctx.user = user;
    return true;
  }
}
