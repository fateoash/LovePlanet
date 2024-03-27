import { createSlice } from '@reduxjs/toolkit'

export const payinfoSlice = createSlice({
  name: 'counter',
  initialState: {
    memberPayInfo: [{
      id: 1,
      name: '周卡',
      price: '99',
      originalPrice: '199',
      desc: '小试牛刀'
    }, {
      id: 2,
      name: '月卡',
      price: '299',
      originalPrice: '799',
      desc: '优惠力度最大'
    }],
    timesPayInfo: [
      {
        id: 3,
        name: '10次',
        price: '24',
        originalPrice: '98',
        desc: '小试牛刀'
      },
      {
        id: 4,
        name: '30次',
        price: '58',
        originalPrice: '888',
        desc: '优惠力度最大'
      },
      {
        id: 5,
        name: '50次',
        price: '88',
        originalPrice: '2288',
        desc: '尊贵专享'
      }
    ]
  },
  reducers: {
    setMemberPayInfo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.memberPayInfo = action.payload;
    },
    setTimesPayInfo: (state, action) => {
      state.timesPayInfo = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMemberPayInfo, setTimesPayInfo } = payinfoSlice.actions

export default payinfoSlice.reducer