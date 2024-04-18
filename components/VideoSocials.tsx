import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Alert } from 'react-native';
import { CFVideo } from './Video';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import Toast from 'react-native-root-toast';

interface VideoSocialsProps {
  data: any;
  currentIndex: any;
  index: any
}

export const VideoSocials: React.FC<VideoSocialsProps> = (props) => {
  const { data, currentIndex, index } = props;
  const selectStar = useSelector((state: RootState) => state.cyberstar.selectStar);
  const starList = useSelector((state: RootState) => state.cyberstar.starList);

  useEffect(() => {
    // Alert.alert('videoItem')
  }, [])

  return (
    <View style={{ ...styles.container }}>
      <CFVideo
        uri={data.videoPath}
        currentIndex={currentIndex}
        index={index}
      />
      {/* <View
        style={styles.join}
      >
        <Image style={{ width: 30, height: 30 }} source={require('../assets/images/join.png')} ></Image>
        <Text style={styles.joinText}>加入该博主粉丝团，解锁博主全部视频</Text>
      </View> */}
      <View
        style={styles.cyberstar}
      >
        <Image style={{ width: 54, height: 54, borderRadius: 28 }} source={{ uri: (starList[selectStar || 0] as any).faceImage }}></Image>
        <View style={{ marginLeft: 8, display: 'flex', flexDirection: 'column' }}>
          <Text style={{ ...styles.cyberText, marginBottom: 5 }}>{(starList[selectStar || 0] as any).nickname}</Text>
          <Text style={styles.cyberText}>{(starList[selectStar || 0] as any).fansCounts} 粉丝</Text>
        </View>
      </View>
      <Text style={styles.desc} numberOfLines={1}>{data.videoDesc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  remain: {
    position: 'absolute',
    top: 32,
    width: 130,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.64)',
    left: (Dimensions.get('window').width - 130) / 2,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  remainText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  join: {
    position: 'absolute',
    bottom: 116,
    width: Dimensions.get('window').width - 32,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F14B8B',
    left: 16,
    display: 'flex',
    paddingLeft: 16,
    alignItems: 'center',
    flexDirection: 'row'
  },
  joinText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingLeft: 20
  },
  cyberstar: {
    position: 'absolute',
    bottom: 46,
    left: 0,
    marginLeft: 16,
    width: 300,
    height: 54,
    display: 'flex',
    flexDirection: 'row'
  },
  cyberText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'left'
  },
  desc: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'left',
    position: 'absolute',
    bottom: 8,
    left: 16,
    maxWidth: 360,
    height: 22,
    lineHeight: 22,
  }
});
