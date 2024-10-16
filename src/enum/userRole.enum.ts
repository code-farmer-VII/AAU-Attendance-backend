import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  Teacher = 'Teacher',
  CafeteriaController = 'CafeteriaController',
}

registerEnumType(UserRole, {
  name: 'UserRole', // GraphQL name for the enum
});
