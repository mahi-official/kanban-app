import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface AppState {
    dragDisabled: boolean
    darkMode: boolean
}

const initialState: AppState = {
    dragDisabled: false,
    darkMode: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    disableDrag(state, action: PayloadAction<boolean>) {
        state.dragDisabled = action.payload
    },

    enableDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload
  },

  }
})

export const {disableDrag, enableDarkMode} = appSlice.actions
export default appSlice.reducer
