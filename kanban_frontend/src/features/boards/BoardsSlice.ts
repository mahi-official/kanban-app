import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import BoardInstance from '../../apis/BoardAPI'

export interface BoardState {
  boards: {[key: string]: BoardInstance }
  board: BoardInstance | null
  showDialog: boolean
}

const initialState: BoardState = {
  boards: {},
  board: null,
  showDialog: false,
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {

    setBoards(state, action:PayloadAction<BoardInstance[]>) {
      action.payload.forEach(b =>{
        state.boards[b.id] = b
      })
    },

    addBoard(state, action: PayloadAction<BoardInstance>) {
      state.boards[action.payload.id] = action.payload
    },

    modifyBoard(state, action: PayloadAction<BoardInstance>) {
      state.boards = {...state.boards, [action.payload.id]: action.payload}
    },

    showBoardDialog(state, action) {
      state.board = action.payload
      state.showDialog = true
    },

    hideBoardDialog(state) {
      state.showDialog = false
      state.board = null
    },
  }
})

export const { setBoards, addBoard, modifyBoard, showBoardDialog, hideBoardDialog } = boardsSlice.actions
export default boardsSlice.reducer