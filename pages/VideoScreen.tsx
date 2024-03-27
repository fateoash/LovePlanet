import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { RootState } from '../store';
import PaymentModal from '../components/PaymentModal';
import { PagingList } from '../components/PagingList';
import { VideoSocials } from '../components/VideoSocials';
import Toast from 'react-native-root-toast';

interface VideoPageProps {
  route: any;
  navigation: any;
}

const VideoPage: React.FC<VideoPageProps> = ({ route, navigation }) => {
  const { item } = route.params;
  const starList = useSelector((state: RootState) => state.cyberstar.starList);
  const selectStar = useSelector((state: RootState) => state.cyberstar.selectStar);
  const videoList = useSelector((state: RootState) => state.cyberstar.videoList);
  const [payModalVisible, setPayModalVisible] = useState(false);

  const [pageIndex, setPageIndex] = useState(-1);

  const onPay = () => {
    // Alert.alert('1223')
  }

  useEffect(() => {
    const index = videoList.findIndex((video: any) => video.id == item.id);
    setPageIndex(index);
  }, []);

  const fetchVideoStream = async (params: {
    afterIndex?: number;
    length?: number;
  }) => {
    const { afterIndex, length = 10 } = params;
    const index =
      afterIndex === undefined
        ? 0
        : videoList.findIndex((item, index) => index > afterIndex);
    if (index === -1) {
      return { data: [], remain: 0 };
    } else {
      const data = videoList.slice(index, length);
      return { data, remain: videoList.length - index - data.length };
    }
  };

  return (
    <View style={styles.video}>
      {pageIndex > -1 && <PagingList
        query={fetchVideoStream}
        currentIndex={pageIndex}
        renderItem={({ item, index }) => {
          return (
            <VideoSocials
              data={item}
              currentIndex={pageIndex}
              index={index}
            />
          );
        }}
        onPageIndexChanged={(index) => {
          setPageIndex(index);
          // Toast.show('剩余观看：20', {
          //   duration: Toast.durations.LONG,
          //   position: Toast.positions.TOP,
          // })
        }}
      />}
      <PaymentModal modalVisible={payModalVisible} onClick={setPayModalVisible} cyberstar={starList[selectStar || 0]} onPay={onPay}></PaymentModal>
      <Pressable style={{
        position: 'absolute',
        top: 16,
        left: 16
      }}
      onPress={()=>{
        navigation.goBack()
      }}>
        <MaterialCommunityIcons name="chevron-left" color={'rgba(255,255,255,0.5)'} size={24} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#353535',
  }
});

export default VideoPage;