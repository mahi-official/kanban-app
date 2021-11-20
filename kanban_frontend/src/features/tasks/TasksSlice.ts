import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import TaskInstance from '../../apis/TaskAPI'

export interface TaskState {
  tasks: TaskInstance[]
  showDialog: boolean
  status: 'idle' | 'loading' | 'failed' | 'success'
}

const initialState: TaskState = {
  tasks: [],
  showDialog: false,
  status: 'idle',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    
    addTask(state, action) {
      state.tasks.push(action.payload)
    },

    modifyTask(state, action) {
      let idx: number = state.tasks.findIndex((b) => b.id === action.payload.id)!
      let updatedTasks = Array.from(state.tasks);
      updatedTasks.splice(idx, 1, action.payload)
      state.tasks = updatedTasks
    },

    setTasks(state, action) {
      state.tasks = action.payload
    },

    setStatus(state, action: PayloadAction<'idle' | 'loading' | 'failed' | 'success'>) {
      state.status = action.payload
    },

  }
})

export const { addTask, modifyTask, setTasks, setStatus } = tasksSlice.actions
export default tasksSlice.reducer