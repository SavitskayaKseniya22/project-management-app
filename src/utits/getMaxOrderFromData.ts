import { ColumnResponseAll, TaskResponse } from '../store/slices/types';

export const getMaxOrderFromData = (list: ColumnResponseAll[] | TaskResponse[]) => {
  const values = list.map((item: ColumnResponseAll | TaskResponse) => {
    return item.order;
  });

  const maxValue = values.sort(function (a, b) {
    return b - a;
  })[0];

  return maxValue;
};
