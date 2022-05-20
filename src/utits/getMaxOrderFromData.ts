import { ColumnResponseAll } from '../store/slices/types';

export const getMaxOrderFromData = (list: ColumnResponseAll[]) => {
  const values = list.map((item: ColumnResponseAll) => {
    return item.order;
  });

  const maxValue = values.sort(function (a, b) {
    return b - a;
  })[0];

  return maxValue;
};
