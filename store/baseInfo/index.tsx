import { createSlice } from '@reduxjs/toolkit'

export const baseSlice = createSlice({
  name: 'baseInfo',
  initialState: {
    unreadNumber: 0,
  },
  reducers: {
    setUnreadNumber: (state, action) => {
      state.unreadNumber = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUnreadNumber } = baseSlice.actions

export default baseSlice.reducer