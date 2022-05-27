import { AppDispatch, errorSlice } from '../store';

/*forgive me father, for I have sinned*/

export async function fetchTaskList(dispatch: AppDispatch, columnId: string, boardId: string) {
  const url = `/boards/${boardId}/columns/${columnId}/tasks`;
  const listResp = await fetch(url);
  if (listResp.ok) {
    const list = await listResp.json();
    return list;
  } else {
    const err = {
      data: { statusCode: listResp.status, message: listResp.statusText },
      status: listResp.status,
    };
    dispatch(errorSlice.actions.updateError(err));
  }
}
