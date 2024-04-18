import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, Image, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { RootState } from '../store';
import PaymentModal from '../components/PaymentModal';
import { PagingList } from '../components/PagingList';
import { VideoSocials } from '../components/VideoSocials';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PayChannelModal from '../components/PayChannelModal';

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
  const [token, setToken] = useState('');
  const [orderId, setOrderId] = useState('');
  const [payChannel, setPayChannel] = useState(false);
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    initToken();
  }, [])

  const initToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
      } else {
        navigation.replace('Login')
      }
    } catch (e) {
      navigation.replace('Login')
    }
  }

  const onPay = (id: any) => {
    fetch('https://taohua10.cn/api/order-service/order/createOrder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      },
      body: `memberPayId=${id}&videoId=${videoId}`
    }).then(res => res.json())
      .then((res: any) => {
        if (res.code == 0) {
          setOrderId(res.data)
          setPayModalVisible(false);
          setPayChannel(true);
        } else {
          Toast.show('订单创建失败');
        }
      }).catch(() => {
        Toast.show('网络错误');
      })
  }

  const gotoPay = (channel: any) => {
    fetch('https://taohua10.cn/api/pay-service/alipay/trade-precreate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      },
      body: `orderId=${orderId}&payChannel=${channel}`
    }).then(res => {
      // console.log(res)
      return res.json()
    })
      .then((res: any) => {
        // res.code == 0 && aliPay(res.data)
        if (res.code == 0) {
          Linking.canOpenURL(res.data).then(supported => {
            if (supported) {
              Linking.openURL(res.data);
            } else {
              console.log('无法打开链接: ' + res.data);
            }
          });
        }
      })
  }

  // const onPay = () => {
  //   Alert.alert('1223')
  // }

  useEffect(() => {
    const index = videoList.findIndex((video: any) => video.id == item.id);
    setPageIndex(index);
  }, []);

  useEffect(() => {
    if (pageIndex) {
      if (videoList[pageIndex] && (videoList[pageIndex] as any).status == 4) {
        setVideoId((videoList[pageIndex] as any).id);
        setPayModalVisible(true);
      }
    }
  }, [pageIndex]);

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
        renderItem={({ item, index }: { item: any, index: number }) => {
          // console.log(item)
          return (
            item.status != 4 ? <VideoSocials
              data={item}
              currentIndex={pageIndex}
              index={index}
            /> : <Image blurRadius={5}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              source={{ uri: item.coverPath }}></Image>
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
      <PayChannelModal modalVisible={payChannel} onClick={gotoPay} onClose={() => { setPayChannel(false) }}></PayChannelModal>
      <Pressable style={{
        position: 'absolute',
        top: 16,
        left: 16
      }}
        onPress={() => {
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