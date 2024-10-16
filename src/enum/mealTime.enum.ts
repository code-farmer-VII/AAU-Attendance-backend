import { registerEnumType } from '@nestjs/graphql';

export enum MealTime {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
}

registerEnumType(MealTime, {
  name: 'MealTime',
});
