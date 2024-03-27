import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, Pressable, Dimensions, ImageBackground } from 'react-native';
import type { RootState } from '../store';
import { useSelector } from 'react-redux';

const PaymentModal = (props: { modalVisible: boolean; onClick: Function; cyberstar: any; onPay: Function }) => {
  const { modalVisible, onClick, cyberstar, onPay } = props;
  const memberPayInfo = useSelector((state: RootState) => state.payinfo.memberPayInfo);
  const timesPayInfo = useSelector((state: RootState) => state.payinfo.timesPayInfo);
  const [selectTab, setSelectTab] = useState(0);
  const [selectIndex, setSelectIndex] = useState(0);
  const handleClick = (v: boolean) => {
    onClick(v);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleClick(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.title}>
            <Text style={styles.modalText}>解锁视频</Text>
            <Pressable
              style={styles.close}
              onPress={() => handleClick(false)}>
              <Image style={{ width: 18, height: 18 }} source={require('../assets/images/x.png')}></Image>
            </Pressable>
          </View>
          <View style={styles.divider}></View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <Text style={{ fontSize: 12, fontWeight: '400', color: 'rgba(255,255,255,0.69)' }}>解锁</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 16, marginRight: 16 }}>
              <Image style={{ width: 32, height: 32, borderRadius: 16 }} source={{ uri: cyberstar.faceImage }}></Image>
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#ffffff', marginLeft: 8 }}>{cyberstar.nickname}</Text>
            </View>
            <Text style={{ fontSize: 12, fontWeight: '400', color: 'rgba(255,255,255,0.69)' }}>的视频</Text>
          </View>
          <View style={{ width: Dimensions.get('window').width, height: 44, backgroundColor: '#202123', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Pressable style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: selectTab == 0 ? '#17181A' : 'transparent' }}
              onPress={() => { setSelectTab(0); setSelectIndex(0) }}>
              <Image style={{ width: 20, height: 18 }} source={require('../assets/images/crown.png')}></Image>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#ffffff', marginLeft: 6 }}>会员包月</Text>
            </Pressable>
            <Pressable style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: selectTab == 1 ? '#17181A' : 'transparent' }}
              onPress={() => { setSelectTab(1); setSelectIndex(0) }}>
              <Image style={{ width: 24, height: 24 }} source={require('../assets/images/flash.png')}></Image>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#ffffff', marginLeft: 4 }}>会员包月</Text>
            </Pressable>
          </View>
          <View style={{ width: '100%', height: 125, display: 'flex', flexDirection: 'row', marginTop: 20, marginBottom: 27 }}>
            {[...(selectTab == 0 ? memberPayInfo : timesPayInfo)].map((item: any, index: number) => {
              return (
                <Pressable style={{
                  width: '33%',
                  height: 125,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: selectIndex == index ? '#F36295' : 'rgba(255,255,255,0.24)',
                  marginRight: 9,
                  overflow: 'hidden'
                }}
                  key={`memberPay${index}`}
                  onPress={() => { setSelectIndex(index) }}>
                  <ImageBackground style={{ width: 42, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }} source={require('../assets/images/tag.png')}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#ffffff' }}>{item.name}</Text>
                  </ImageBackground>
                  <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 45, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, color: selectIndex == index ? '#F36295' : 'rgba(255,255,255,0.7)', marginBottom: 6, marginRight: 4 }}>¥</Text>
                    <Text style={{ fontSize: 32, color: selectIndex == index ? '#F36295' : 'rgba(255,255,255,0.7)', fontWeight: '600' }}>{item.price}</Text>
                  </View>
                  <Text style={{ width: '100%', textAlign: 'center', fontSize: 16, color: '#999999', textDecorationLine: 'line-through' }}>¥{item.originalPrice}</Text>
                  {
                    selectIndex == index &&
                    <Text style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#F36295', fontSize: 10, color: '#ffffff', textAlign: 'center' }}>{item.desc}</Text>
                  }
                </Pressable>
              )
            })}
          </View>
          <Pressable style={{ width: '100%', marginBottom: 32 }} onPress={() => onPay([...(selectTab == 0 ? memberPayInfo : timesPayInfo)][selectIndex].id)}>
            <ImageBackground style={{ width: '100%', height: 48, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              source={require('../assets/images/button.png')} resizeMode="contain">
              <Text style={{ fontWeight: '400', fontSize: 14, color: '#ffffff' }}>确认协议并支付</Text>
              <View style={{ position: 'absolute', right: 40, height: 48, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: '400', marginRight: 4, marginTop: 2 }}>¥</Text>
                <Text style={{ fontWeight: '600', fontSize: 18, color: '#ffffff' }}>{[...(selectTab == 0 ? memberPayInfo : timesPayInfo)][selectIndex].price}</Text>
              </View>
            </ImageBackground>
          </Pressable>
          <View style={{ width: '100%', height: 106 }}>
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
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    backgroundColor: '#353535',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    padding: 16,
    width: '100%',
    height: 553,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 18
  },
  modalText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22
  },
  title: {
    height: 22,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  close: {
    width: 36,
    height: 36,
    position: 'absolute',
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  divider: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'black',
    marginTop: 16,
    marginBottom: 16,
    opacity: 0.2
  },
});

export default PaymentModal