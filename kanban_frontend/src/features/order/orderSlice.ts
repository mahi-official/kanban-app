import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export type BoardTaskRelation = {
    [brd: string] : string[]
}

interface OrderState {
    order: BoardTaskRelation[]
}

const initialState: OrderState = {
  order: []
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

    setBoardsOrder(state, action: PayloadAction<{[key: string] : string[]}[]>) {
        state.order = action.payload
    },

    addBoardToOrder(state, action: PayloadAction<string>) {
        state.order.push({[action.payload]: []})
    },

    setTasksOrder(state, action: PayloadAction<{[key: string] : string[]}>){
        let updatedOrder = Array.from(state.order)
        let idx:number = updatedOrder.findIndex((bt: BoardTaskRelation) => Object.keys(bt) === Object.keys(action.payload))
        updatedOrder[idx] = action.payload
        state.order = updatedOrder
    },

    addTaskToOrder(state, action: PayloadAction<{bid: string, tid:string}>) {
        let updatedOrder = Array.from(state.order)
        let idx:number = updatedOrder.findIndex((bt: BoardTaskRelation) => Object.keys(bt).includes(action.payload.bid))
        let updatedTaskList = [...updatedOrder[idx][action.payload.bid], action.payload.tid]
        updatedOrder[idx] = {[action.payload.bid]: updatedTaskList}
        state.order = updatedOrder
    },

  }
})

export const {setBoardsOrder, setTasksOrder, addTaskToOrder, addBoardToOrder} = orderSlice.actions
export default orderSlice.reducer

export const getTaskOrder = createSelector(
    [(state: RootState) => state.orderState.order,
     (state, board: string) => board
    ],
    (items, board) => {
        for (const bd of items){
            if (Object.keys(bd).includes(board)) return bd[board]
        }
        return []
    }
)