import { createSlice } from '@reduxjs/toolkit'

export const videoListSlice = createSlice({
  name: 'cyberstar',
  initialState: {
    videoList: [
      {
        "id": 10,
        "uri": "https://cloud.video.taobao.com/play/u/2200661645252/p/2/e/6/t/1/221798729194.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 1024,
        "comment": 5
      },
      {
        "id": 11,
        "uri": "https://cloud.video.taobao.com/play/u/516544213/p/2/e/6/t/1/250707633677.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 2048,
        "comment": 5
      },
      {
        "id": 12,
        "uri": "https://cloud.video.taobao.com/play/u/3242896596/p/2/e/6/t/1/50018030456.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 666,
        "comment": 5
      },
      {
        "id": 13,
        "uri": "https://cloud.video.taobao.com/play/u/4052605156/p/2/e/6/t/1/248138962428.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 666,
        "comment": 5
      },
      {
        "id": 14,
        "uri": "https://cloud.video.taobao.com/play/u/2051473113/p/2/e/6/t/1/50002156892.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 666,
        "comment": 5
      },
      {
        "id": 15,
        "uri": "https://cloud.video.taobao.com/play/u/2456588367/p/2/e/6/t/1/231181910657.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 666,
        "comment": 5
      },
      {
        "id": 16,
        "uri": "https://cloud.video.taobao.com/play/u/1650770904/p/2/e/6/t/1/238649934153.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 666,
        "comment": 5
      },
      {
        "id": 17,
        "uri": "https://cloud.video.taobao.com/play/u/1765309207/p/2/e/6/t/1/259289261065.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 666,
        "comment": 5
      },
      {
        "id": 18,
        "uri": "https://cloud.video.taobao.com/play/u/2456588367/p/2/e/6/t/1/50047118240.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 666,
        "comment": 5
      },
      {
        "id": 19,
        "uri": "https://cloud.video.taobao.com/play/u/2201512805864/p/2/e/6/t/1/257259116344.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 666,
        "comment": 5
      },
      {
        "id": 20,
        "uri": "https://cloud.video.taobao.com/play/u/2103660293/p/2/e/6/t/1/234913293008.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 666,
        "comment": 5
      },
      {
        "id": 21,
        "uri": "https://cloud.video.taobao.com/play/u/2456588367/p/2/e/6/t/1/250726209089.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 666,
        "comment": 5
      },
      {
        "id": 22,
        "uri": "https://cloud.video.taobao.com/play/u/1739528632/p/2/e/6/t/1/249427101113.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 666,
        "comment": 5
      },
      {
        "id": 23,
        "uri": "https://cloud.video.taobao.com/play/u/1602475441/p/2/e/6/t/1/224430839093.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 666,
        "comment": 5
      },
      {
        "id": 24,
        "uri": "https://cloud.video.taobao.com/play/u/3177573446/p/2/e/6/t/1/257259652059.mp4",
        "title": "Dance",
        "author": "Li Si",
        "date": 1587643048602,
        "like": 666,
        "comment": 5
      }]
  },
  reducers: {
    setVideoList: (state, action) => {
      state.videoList = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { setVideoList } = videoListSlice.actions

export default videoListSlice.reducer