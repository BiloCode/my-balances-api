import { addMonths, startOfMonth } from 'date-fns';

export const getDateRange = (startDate: Date, length: number) => {
  return Array.from({ length }, (_, i) =>
    startOfMonth(addMonths(startDate, i)),
  );
};
