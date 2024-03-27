import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


const AccountScreen = ({ navigation }: any) => {

  const [userinfo, setUserinfo] = useState<any>({})
  const [income, setIncome] = useState<any>({})
  const [recommend, setRecommend] = useState<any>({})
  const [token, setToken] = useState<any>('')
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    if (!token) {
      AsyncStorage.getItem('token').then((value: string | null) => {
        setToken(value)
        fetchUser(value)
        fetchIncome(value);
        fetchRecommend(value);
      });
    } else {
      fetchUser(token)
      fetchIncome(token);
      fetchRecommend(token);
    }

  }, [isFocused])

  const fetchUser = (value: any) => {
    fetch('https://taohua10.cn/api/trends-service/user/queryuser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'token': value
      },
      body: JSON.stringify({}),
    }).then(res => res.json()).then((res: any) => {
      if (res.code == 0) {
        setUserinfo(res.data)
      }
    })
  }

  const fetchIncome = (value: any) => {
    fetch('https://taohua10.cn/api/trends-service/user/queryIncome', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'token': value
      },
      body: JSON.stringify({}),
    }).then(res => res.json()).then((res: any) => {
      if (res.code == 0) {
        setIncome(res.data)
      }
    })
  }

  const fetchRecommend = (value: any) => {
    fetch('https://taohua10.cn/api/trends-service/user/recommendUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'token': value
      },
      body: JSON.stringify({}),
    }).then(res => res.json()).then((res: any) => {
      if (res.code == 0) {
        setRecommend(res.data)
      }
    })
  }

  return (
    <View style={styles.root}>
      <View style={{
        width: '100%',
        height: 84,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#202123',
        paddingTop: 28,
        paddingLeft: 16,
        paddingRight: 16
      }}
      >
        <Pressable style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1
        }}
          onPress={() => navigation.navigate('ModifyInfo')}
        >
          <Image style={{
            width: 54,
            height: 54,
            borderRadius: 27
          }}
            source={{ uri: userinfo.faceImage || 'https://wesmessage.com/images/head.png' }}>
          </Image>
          <View style={{
            display: 'flex',
            flex: 1,
            height: 54,
            marginLeft: 12
          }}>
            <View style={{
              display: 'flex',
              flexDirection: 'row'
            }}>
              <Text style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 16,
                lineHeight: 18,
                marginTop: 8
              }}>{userinfo.nickname}</Text>
              <Image
                style={{
                  width: 16,
                  height: 16,
                  marginTop: 8,
                  marginLeft: 4
                }}
                source={require('../assets/images/icon_back.png')}
              />
            </View>
            <Text style={{
              color: 'white',
              fontWeight: '400',
              fontSize: 12,
              lineHeight: 18,
              marginTop: 6,
              opacity: 0.69
            }}>id：{userinfo.id}</Text>
          </View>
        </Pressable>
        <Pressable
          style={{
            width: 76,
            borderRadius: 14,
            height: 28,
            backgroundColor: '#F14B8B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => {
            navigation.navigate('Invite')
          }}
        >
          <Text style={{
            color: 'white',
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 24,
          }}>生成邀请码</Text>
        </Pressable>
      </View>
      <View style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        height: 32,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#202123',
        paddingBottom: 16,
      }}>
      </View>
      {/* <ImageBackground source={require('../assets/images/gotopay.png')} resizeMode="cover" style={{
        width: Dimensions.get('window').width - 32,
        height: (Dimensions.get('window').width - 32) * 75 / 343,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16
      }}>
        <View style={{
          flex: 1
        }}>
          <Text style={{
            color: '#622A00',
            fontWeight: '500',
            fontSize: 16
          }}>开通会员</Text>
          <Text style={{
            color: '#622A00',
            fontWeight: '400',
            fontSize: 12
          }}>解锁全网博主视频</Text>
        </View>
        <Pressable
          style={{
            width: 80,
            borderRadius: 2,
            height: 30,
            backgroundColor: '#2A1200',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}
        >
          <Text style={{
            color: 'white',
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 24,
          }}>立即开通</Text>
          <Image
            style={{
              width: 12,
              height: 12,
              marginLeft: 4
            }}
            source={require('../assets/images/icon_back.png')}
          />
        </Pressable>
      </ImageBackground> */}
      <View style={{ width: '100%', height: 8, backgroundColor: '#1C1D1E', marginTop: 16, marginBottom: 16 }}></View>
      <View style={{
        width: Dimensions.get('window').width - 32,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#2C2E30',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <View style={{
          width: 90,
          height: 48,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text style={{ fontWeight: '500', fontSize: 16, lineHeight: 22, color: '#FFFFFF' }}>{income.monthlyIncome}</Text>
          <Text style={{ fontWeight: '400', fontSize: 12, lineHeight: 18, color: '#FFFFFF', opacity: 0.6 }} numberOfLines={1}>本月收益 (元)</Text>
        </View>
        <ImageBackground style={{ width: 1, height: 40, backgroundColor: '#D8D8D8', opacity: 0.15 }}></ImageBackground>
        <View style={{
          width: 80,
          height: 48,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text style={{ fontWeight: '500', fontSize: 16, lineHeight: 22, color: '#FFFFFF' }}>{userinfo.fansCounts}</Text>
          <Text style={{ fontWeight: '400', fontSize: 12, lineHeight: 18, color: '#FFFFFF', opacity: 0.6 }}>粉丝量</Text>
        </View>
        <ImageBackground style={{ width: 1, height: 40, backgroundColor: '#D8D8D8', opacity: 0.15 }}></ImageBackground>
        <View style={{
          width: 80,
          height: 48,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text style={{ fontWeight: '500', fontSize: 16, lineHeight: 22, color: '#FFFFFF' }}>{income.allIncome}</Text>
          <Text style={{ fontWeight: '400', fontSize: 12, lineHeight: 18, color: '#FFFFFF', opacity: 0.6 }}>总收益 (元)</Text>
        </View>
      </View>
      <View style={{ width: '100%', height: 8, backgroundColor: '#1C1D1E', marginTop: 16, marginBottom: 16 }}></View>
      <View style={{ width: Dimensions.get('window').width - 32, height: 109 }}>
        <Text style={{ fontWeight: '500', fontSize: 16, color: '#ffffff', marginBottom: 21 }}>会员权益</Text>
        <View style={{ width: '100%', display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image style={{ width: 38, height: 38 }} source={require('../assets/images/ad1.png')}></Image>
            <Text style={{ marginTop: 8, color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>超清看</Text>
          </View>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image style={{ width: 38, height: 38 }} source={require('../assets/images/ad2.png')}></Image>
            <Text style={{ marginTop: 8, color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>抢先看</Text>
          </View>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image style={{ width: 38, height: 38 }} source={require('../assets/images/ad3.png')}></Image>
            <Text style={{ marginTop: 8, color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>免费看</Text>
          </View>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image style={{ width: 38, height: 38 }} source={require('../assets/images/ad4.png')}></Image>
            <Text style={{ marginTop: 8, color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>超大优惠</Text>
          </View>
        </View>
      </View>
      <View style={{ width: '100%', height: 8, backgroundColor: '#1C1D1E', marginBottom: 16, marginTop: 16 }}></View>
      <View style={{ paddingLeft: 16, paddingRight: 16, height: 213, width: '100%' }}>
        <Text style={{ fontWeight: '500', fontSize: 16, color: '#ffffff', marginBottom: 21 }}>热门主播</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
          data={recommend}
          contentContainerStyle={{alignItems: 'flex-start', justifyContent: 'flex-start'}}
          renderItem={({ item, index }) => {
            return <Pressable style={{ width: 134, height: 125, marginRight: 12 }} key={'recommond' + index} onPress={() => {
              fetch('https://taohua10.cn/api/trends-service/user/fans', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'token': token
                },
                body: `fansId=${item.id}`
              }).then(res => res.json())
                .then((res: any) => {
                  navigation.navigate('Home', {id: item.id});
                })
            }}>
              <Image style={{ width: 134, height: 76, borderRadius: 4 }} source={{ uri: item.faceImage }}></Image>
              <Text style={{ marginTop: 8, color: '#FFFFFF', fontSize: 14, lineHeight: 20 }} numberOfLines={1}>{item.nickName || '大美'}</Text>
              <Text style={{ marginTop: 8, color: '#FFFFFF', fontSize: 12, lineHeight: 17, opacity: 0.5 }} numberOfLines={1}>{item.desc}</Text>
            </Pressable>
          }}
          keyExtractor={(_, index) => `star${index}`}
          horizontal={true}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#202123',
  }
});

export default AccountScreen;