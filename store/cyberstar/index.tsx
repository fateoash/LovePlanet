import { createSlice } from '@reduxjs/toolkit'

export const cyberstarSlice = createSlice({
  name: 'cyberstar',
  initialState: {
    selectStar: null,
    starList: [
      // {
      //   url: 'https://wesmessage.com/images/head.png',
      //   name: '芝士超级宇宙'
      // }
    ],
    videoList: [
      
    ]
  },
  reducers: {
    setSelectStar: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.selectStar = action.payload
    },
    setStarList: (state, action) => {
      state.starList = action.payload
    },
    setVideoList: (state, action) => {
      state.videoList = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { setSelectStar, setStarList, setVideoList } = cyberstarSlice.actions

export default cyberstarSlice.reducer