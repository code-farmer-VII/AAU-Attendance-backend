import { registerEnumType } from '@nestjs/graphql';

export enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
  Late = 'Late',
}

registerEnumType(AttendanceStatus, {
  name: 'AttendanceStatus',
});
