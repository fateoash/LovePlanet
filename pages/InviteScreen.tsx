import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ImageBackground, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-root-toast';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const InviteScreen = ({ navigation }: any) => {

  const [userinfo, setUserinfo] = useState<any>({})
  const [inviteCode, setInviteCode] = useState<any>('')
  const [imgUrl, setImgUrl] = useState<any>(null)

  useEffect(() => {
    AsyncStorage.getItem('token').then((value: string | null) => {
      fetch('https://taohua10.cn/api/trends-service/user/queryuser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'token': value || ''
        },
        body: JSON.stringify({}),
      }).then(res => res.json()).then((res: any) => {
        if (res.code == 0) {
          setUserinfo(res.data)
        }
      })
      fetch('https://taohua10.cn/api/trends-service/user/createReferralCode', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'token': value || ''
        },
        body: JSON.stringify({}),
      }).then(res => res.json()).then(async (res: any) => {
        if (res.code == 0) {
          setInviteCode(res.data)
          const blobRes = await fetch(`https://taohua10.cn/api/trends-service/user/generate/v3?content=${res.data}`, {
            method: 'GET',
            headers: {
              'token': value || ''
            },
          })
          const blob = await blobRes.blob();

          blob && blobToDataURI(blob, (dataURI: any) => {
            setImgUrl(dataURI)
          });
        }
      })
    });
  }, [])

  const copyToClipboard = async (text: any) => {
    await Clipboard.setString(text);
    Toast.show('复制成功');
  };

  const blobToDataURI = (blob: any, callback: any) => {
    // 创建一个FileReader实例
    let reader = new FileReader();
    reader.onload = function (e) {
      e && e.target && callback(e.target.result);
    };
    reader.readAsDataURL(blob);
  };

  const saveToGalaxy = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      try {
        const base64Code = imgUrl.split('data:application/octet-stream;base64,')[1];
        const filename = FileSystem.cacheDirectory + 'temp.png';

        await FileSystem.writeAsStringAsync(filename, base64Code, {
          encoding: FileSystem.EncodingType.Base64,
        });

        MediaLibrary.saveToLibraryAsync(filename).then(() => {
          Toast.show('保存成功')
        }).catch(() => {
          Toast.show('请稍后再试')
        });
      } catch (e) {
        console.log(e)
      }

    } else {
      // handle permission disallowed case 
    }
  }

  return (
    <>
      <ImageBackground style={{
        width: Dimensions.get('window').width,
        height: 226,
        backgroundColor: '#202123'
      }} source={require('../assets/images/invite.png')}>
        <View style={{
          width: '100%',
          height: 56,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Text style={{ fontWeight: '500', fontSize: 16, color: '#FFFFFF' }}>邀请好友</Text>
        </View>
      </ImageBackground>

      <View style={styles.root}>
        <View style={{ borderRadius: 4, backgroundColor: '#17181A', opacity: 0.6, display: 'flex', alignItems: 'center', marginTop: -106 }}>
          <Text style={{ color: '#ffffff', marginTop: 60 }}>{userinfo.nickname}</Text>
          <Text style={{ color: '#ffffff', marginTop: 8 }}>{userinfo.username}</Text>
          <Image style={{
            width: 240,
            height: 240,
            marginTop: 32
          }}
            source={{ uri: imgUrl }}
          ></Image>
          <Pressable style={{
            width: 343,
            height: 88,
            backgroundColor: '#2A2B2D',
            marginTop: 53,
            borderBottomRightRadius: 16,
            borderBottomLeftRadius: 16,
            alignItems: 'center'
          }}
            onPress={() => {
              copyToClipboard(inviteCode);
            }}>
            <Text style={{ color: '#ffffff', marginTop: 18, fontSize: 12 }}>点击复制邀请码</Text>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ color: '#ffffff', fontSize: 18, opacity: 0.65 }}>邀请码：</Text>
              <Text style={{ color: '#ffffff', fontSize: 18 }}>{inviteCode}</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => saveToGalaxy()}>
        <Text style={styles.textStyle}>保存到相册</Text>
      </Pressable>
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
      <Image style={{
        width: 88,
        height: 88,
        marginTop: 20,
        borderRadius: 44,
        left: (Dimensions.get('window').width - 88) / 2,
        top: 56,
        position: 'absolute'
      }}
        source={{ uri: userinfo.faceImage || 'https://wesmessage.com/images/head.png' }}
      ></Image>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#202123',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: Dimensions.get('window').width - 32,
    height: 40,
    elevation: 2,
    position: 'absolute',
    bottom: 16,
    left: 16
  },
  buttonOpen: {
    backgroundColor: '#F14D8C',
  },
  buttonClose: {
    backgroundColor: '#F14D8C',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 18
  },
});

export default InviteScreen;