import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import TaskInstance from '../../apis/TaskAPI'

export interface TaskState {
  tasks: {[key:string]: TaskInstance}
  showDialog: boolean
  task: TaskInstance | null
  board: string | null
}

const initialState: TaskState = {
  tasks: {},
  showDialog: false,
  task: null,
  board: null
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {

    setTasks(state, action: PayloadAction<TaskInstance[]>) {
      action.payload.forEach(t =>{
        state.tasks[t.id] = t
      })
    },
    
    addTask(state, action: PayloadAction<TaskInstance>) {
      state.tasks[action.payload.id] = action.payload
    },

    modifyTask(state, action: PayloadAction<TaskInstance>) {
      state.tasks = {...state.tasks, [action.payload.id]: action.payload}
    },

    showTaskDialog(state, action) {
      state.board = action.payload.board ?? null
      state.task = action.payload.task
      state.showDialog = true
    },

    hideTaskDialog(state) {
      state.showDialog = false
      state.task = null
      state.board = null
    },

  }
})

export const {setTasks, addTask, modifyTask, showTaskDialog, hideTaskDialog} = tasksSlice.actions
export default tasksSlice.reducer