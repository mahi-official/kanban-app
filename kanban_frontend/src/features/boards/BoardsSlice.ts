import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import BoardInstance from '../../apis/BoardAPI'

export interface BoardState {
    boards: BoardInstance[];
    status: 'idle' | 'loading' | 'failed' | 'success';
}

const initialState: BoardState = {
    boards: [],
    status: 'idle',
}

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {

        addBoard(state, action) {
            state.boards.push(action.payload)
        },

        modifyBoard(state, action) {
            let idx: number = state.boards.findIndex((b) => b.id === action.payload.id)!
            let updatedBoards = Array.from(state.boards)
            action.payload.tasks = updatedBoards[idx].tasks
            updatedBoards.splice(idx, 1, action.payload)
            state.boards = updatedBoards
        },

        setBoards(state, action) {
            state.boards = action.payload
        },

        setStatus(state, action: PayloadAction<'idle' | 'loading' | 'failed' | 'success'>) {
            state.status = action.payload
        }
    }
})

export const { addBoard, setBoards, modifyBoard, setStatus } = boardsSlice.actions
export default boardsSlice.reducer