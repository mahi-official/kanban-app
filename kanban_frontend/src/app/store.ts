import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/TasksSlice'
import boardsReducer from '../features/boards/BoardsSlice'
import orderReducer from '../features/order/orderSlice'
import appReducer from '../features/common/appSlice'

export const store = configureStore({
  reducer: {
    tasksState: tasksReducer,
    boardsState: boardsReducer,
    orderState: orderReducer,
    appState: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
