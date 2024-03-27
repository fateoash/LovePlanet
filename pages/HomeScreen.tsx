import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import MasonryList from '@react-native-seoul/masonry-list';
import type { RootState } from '../store';
import { setSelectStar, setStarList, setVideoList } from '../store/cyberstar';
import { setUnreadNumber } from '../store/baseInfo';
import AddCyberstarModal from '../components/AddCyberstarModal';
import PaymentModal from '../components/PaymentModal';
import PayChannelModal from '../components/PayChannelModal';
import Item from '../components/CyberstarItem';
import Toast from 'react-native-root-toast';
import Alipay from '@uiw/react-native-alipay';
import SplashScreen from 'react-native-splash-screen';
import { useIsFocused, CommonActions } from '@react-navigation/native';

let scheme = `alipay` + `chongfen`
Alipay.setAlipayScheme(scheme);
Alipay.setAlipaySandbox(true);
async function aliPay(payInfo: any) {
  // 支付宝端支付
  const result = await Alipay.alipay(payInfo);
}

const HomeScreen = ({ navigation, route }: any) => {
  const starList = useSelector((state: RootState) => state.cyberstar.starList);
  const selectStar = useSelector((state: RootState) => state.cyberstar.selectStar);
  const videoList = useSelector((state: RootState) => state.cyberstar.videoList);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [payChannel, setPayChannel] = useState(false);
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [token, setToken] = useState('');
  const [orderId, setOrderId] = useState('');
  const isFocused = useIsFocused();
  let timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    initToken();
    return () => clearInterval(timer.current);
  }, [])

  useEffect(() => {
    if (token && isFocused) {
      fetchCyberList(token);
    }
  }, [isFocused])

  useEffect(() => {
    if (selectStar != null) {
      fetchVideoList();
    }
  }, [selectStar])

  const addCyberStar = (val: string) => {
    setModalVisible(false);
    if (!val) {
      return;
    }
    fetch('https://taohua10.cn/api/trends-service/user/codeBecameUserFans', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      },
      body: `referralCode=${val}`
    }).then(res => res.json()).then((res: any) => {
      if (res.code == 0) {
        fetchCyberList(token);
      } else {
        Toast.show(res.msg, {
          duration: Toast.durations.SHORT,
        })
      }
    }).catch(() => { })
  }

  const onClose = () => {
    setModalVisible(false);
  }

  const initToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
        fetchCyberList(value);
        timer.current = setInterval(() => {
          value && fetchUnread(value);
        }, 5000);
      } else {
        navigation.replace('Login')
      }
    } catch (e) {
      navigation.replace('Login')
    }
    SplashScreen.hide();
  }

  const fetchCyberList = (token: any) => {
    fetch('https://taohua10.cn/api/trends-service/user/queryUserList', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      },
      body: ``
    }).then(res => res.json())
      .then((res: any) => {
        if (res.code == 0) {
          const params = route.params || {}
          let index = 0;
          if (params.id) {
            index = starList.findIndex((item: any) => {
              return item.id == params.id;
            })
            if (index == -1) index = 0;
            navigation.dispatch(CommonActions.setParams({ id: '' }));
          }
          dispatch(setStarList(res.data.records))
          dispatch(setSelectStar(index))
        }
      }).catch(() => {
        dispatch(setStarList([]))
      })
  }

  const fetchUnread = (token: any) => {
    fetch('https://taohua10.cn/api/trends-service/messages/queryMessageCount', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'token': token
      },
      body: ``
    }).then(res => res.json())
      .then((res: any) => {
        if (res.code == 0) {
          dispatch(setUnreadNumber(res.data))
        }
      }).catch(() => {
        dispatch(setUnreadNumber(0))
      })
  }

  const fetchVideoList = () => {
    fetch('https://taohua10.cn/api/trends-service/manage/queryUserDesc', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      },
      body: `userId=${(starList[selectStar || 0] as any).id}`
    }).then(res => res.json())
      .then((res: any) => {
        if (res.code == 0) {
          dispatch(setVideoList(res.data.records));
        }
      }).catch(() => {
        Toast.show('网络错误');
      })
  }

  const onVideoClick = (item: any) => {
    if (item && item.status == 4) {
      setPayModalVisible(true);
    } else {
      navigation.navigate('Video', { item })
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
      body: `memberPayId=${id}`
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
      return res.blob()
    })
      .then((res: any) => {
        // res.code == 0 && aliPay(res.data)
        console.log(res)
      })
  }

  const renderCyberstar = ({ item, index }: { item: any, index: any }) => (
    <Pressable onPress={() => dispatch(setSelectStar(index))}>
      <Item name={item.nickname} head={item.faceImage} selected={index == selectStar} />
    </Pressable>
  );

  const renderWaterfall = ({ item = {} }: { item: any }) => (
    <Pressable onPress={() => { onVideoClick(item) }} style={{ display: 'flex', alignItems: 'center' }}>
      <View style={{ width: (Dimensions.get('window').width - 44) / 3, height: (Dimensions.get('window').width - 44) / 9 * 4, marginBottom: 8 }}>
        <Image blurRadius={item.status == 4 ? 5 : 0}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          source={{ uri: item.coverPath || (starList[selectStar || 0] as any).faceImage }}></Image>
      </View>
      {
        item.status == 4 && <Image style={{ width: 40, height: 40, position: 'absolute', top: 55 }} source={require('../assets/images/lock.png')}></Image>
      }
    </Pressable>
  );

  return (
    <>
      <View style={{
        width: '100%',
        height: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#353535'
      }}
      >
        <Text style={{ fontWeight: '500', fontSize: 16, color: '#FFFFFF' }}>动态列表</Text>
        <Pressable style={{ position: 'absolute', right: 12 }} onPress={() => setModalVisible(true)}>
          <Image style={{ width: 24, height: 24 }} source={require('../assets/images/add.png')} />
        </Pressable>
      </View>
      <View style={styles.root}>
        {
          starList.length == 0 &&
          <>
            <Image
              style={styles.emptyImage}
              source={require('../assets/images/default.png')}
            />
            <Text style={styles.emptyText}>暂未有关注的博主</Text>
            <Pressable
              style={styles.addCyberstar}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.addCyberstarText}>去输入邀请码</Text>
            </Pressable>
          </>
        }
        {
          starList.length > 0 &&
          <View style={{ width: Dimensions.get('window').width, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <View style={{ paddingLeft: 16, paddingRight: 16, marginTop: 10, height: 102, width: '100%' }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1 }}
                data={starList}
                renderItem={renderCyberstar}
                keyExtractor={(_, index) => `star${index}`}
                horizontal={true}
              ></FlatList>
            </View>
            <View
              style={styles.videoContainer}>
              {videoList.length == 0 && <>
                <Image
                  style={styles.emptyImage}
                  source={require('../assets/images/default.png')}
                />
                <Text style={styles.emptyText}>该博主暂未发表视频</Text>
              </>}
              {videoList.length > 0 && <MasonryList
                contentContainerStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
                data={videoList}
                keyExtractor={(item): string => item.id}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                renderItem={renderWaterfall}
                refreshing={false}
                onRefresh={() => { }}
                onEndReachedThreshold={0.1}
                onEndReached={() => { }}
              />}
            </View>
          </View>
        }
        {selectStar != null && starList[selectStar] && <PaymentModal modalVisible={payModalVisible} onClick={setPayModalVisible} cyberstar={starList[selectStar]} onPay={onPay}></PaymentModal>}
        <AddCyberstarModal modalVisible={modalVisible} onClick={addCyberStar} onClose={onClose}></AddCyberstarModal>
        <PayChannelModal modalVisible={payChannel} onClick={gotoPay} onClose={() => { setPayChannel(false) }}></PayChannelModal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#353535',
  },
  emptyImage: {
    marginTop: 150,
    width: 148,
    height: 148
  },
  emptyText: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    color: 'white',
    opacity: 0.5,
  },
  addCyberstar: {
    marginTop: 34,
    color: '#ffffff',
    width: 145,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F14D8C',
    textAlign: 'center',
    lineHeight: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addCyberstarText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 18
  },
  videoContainer: {
    flex: 1,
    // width: Dimensions.get('window').width,
    backgroundColor: '#242424',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flexGrow: 1,
  }
});

export default HomeScreen;