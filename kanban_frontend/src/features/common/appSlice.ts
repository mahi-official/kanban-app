import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface AppState {
    dragDisabled: boolean
}

const initialState: AppState = {
    dragDisabled: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    disableDrag(state, action: PayloadAction<boolean>) {
        state.dragDisabled = action.payload
    },

  }
})

export const {disableDrag} = appSlice.actions
export default appSlice.reducer
