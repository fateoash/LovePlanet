import React, { useEffect, useState, memo, useRef, createRef } from 'react';
import Video from 'react-native-video';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';

interface VideoProps {
  uri: string;
  index: any;
  currentIndex: any;
}

export const CFVideo = memo((props: VideoProps) => {
  const {
    uri = '',
    index,
    currentIndex
  } = props;

  const [paused, setPaused] = useState(index != currentIndex)

  useEffect(() => {
  }, [])

  const tap = () => {
    console.log(`index:${index}`)
    console.log(`currentIndex:${currentIndex}`)
    console.log(`正在播放：${!((index != currentIndex) || paused)}`)
    setPaused(!paused)
  }

  return (
    <Pressable onPress={tap} style={{ flex: 1 }}>
      <Video repeat={true} paused={paused || index != currentIndex} source={{ uri: uri }} style={{ flex: 1 }} resizeMode='contain' />
    </Pressable>
  );
});
