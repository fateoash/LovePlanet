import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-root-toast';

const ModifyInfoScreen = ({ navigation }: any) => {

  const [userinfo, setUserinfo] = useState<any>({})
  const [gender, setGender] = useState(3);
  const [nickname, setNickname] = useState<any>('')
  const [faceImage, setFaceImage] = useState<any>('')
  const [token, setToken] = useState<any>(null)

  useEffect(() => {
    AsyncStorage.getItem('token').then((value: string | null) => {
      setToken(value);
      fetchUserInfo(value);
    });
  }, [])

  const fetchUserInfo = (value : any) => {
    fetch('https://taohua10.cn/api/trends-service/user/queryuser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'token': value || token
        },
        body: JSON.stringify({}),
      }).then(res => res.json()).then((res: any) => {
        if (res.code == 0) {
          setToken(value);
          setUserinfo(res.data);
          setNickname(res.data.nickname)
          setFaceImage(res.data.faceImage)
          setGender(res.data.sex)
        }
      })
  }

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo'
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled video picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else {
          if (response.assets) {
            const { uri, fileName } = response.assets[0];
            uploadImage(uri, fileName);
          }
        }
      }
    );
  };

  const uploadImage = async (uri: any, fileName: any) => {

    const formData = new FormData();
    formData.append('file', {
      name: fileName,
      uri: uri,
      type: 'image/\*'
    });

    try {
      fetch('https://taohua10.cn/api/trends-service/oss/uploadFile2', {
        method: 'POST',
        body: formData,
      }).then(res => res.json()).then(res => {
        if (res.code == 0) {
          setFaceImage(res.data)
        }
      })
    } catch (error) { }
  };

  const save = () => {
    fetch('https://taohua10.cn/api/trends-service/user/updateUserInfo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      },
      body: `faceImage=${encodeURI(faceImage)}&nickName=${nickname}&sex=${gender}`
    }).then(res => res.json()).then((res: any) => {
      if (res.code == 0) {
        Toast.show('修改成功', {
          duration: Toast.durations.SHORT,
        })
        fetchUserInfo(token);
      } else {
        Toast.show(res.msg, {
          duration: Toast.durations.SHORT,
        })
      }
    }).catch(() => { })
  }

  return (
    <>
      <View style={{
        width: '100%',
        height: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#202123'
      }}
      >
        <Text style={{ fontWeight: '500', fontSize: 16, color: '#FFFFFF' }}>个人资料</Text>
      </View>
      <View style={styles.root}>
        <View style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          height: 56,
          paddingLeft: 16,
          paddingRight: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#202123',
        }}>
          <Text style={{
            color: 'white',
            fontWeight: '400',
            fontSize: 16,
            lineHeight: 24,
            opacity: 0.5
          }}>头像</Text>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => pickImage()}>
            <Image style={{ width: 36, height: 36, marginRight: 12 }} source={{ uri: faceImage || 'https://wesmessage.com/images/head.png' }}></Image>
            <MaterialCommunityIcons name="chevron-right" color="#FFFFFF" size={16}></MaterialCommunityIcons>
          </Pressable>
        </View>
        <View
          style={{
            width: '100%',
            height: 8,
            backgroundColor: '#1C1D1E'
          }}
        ></View>
        <View style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          height: 56,
          paddingLeft: 16,
          paddingRight: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#202123',
        }}>
          <Text style={{
            color: 'white',
            fontWeight: '400',
            fontSize: 16,
            lineHeight: 24,
            opacity: 0.5
          }}>昵称</Text>
          <TextInput
            style={{
              textAlign: 'right',
              color: 'rgba(255,255,255,0.7)',
              textAlignVertical: 'top',
              width: '60%',
            }}
            multiline={true}
            placeholder=''
            placeholderTextColor='rgba(255,255,255,0.5)'
            autoFocus={false}
            maxLength={15}
            onChangeText={text => { setNickname(text) }}
            value={nickname}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 8,
            backgroundColor: '#1C1D1E'
          }}
        ></View>
        <View style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          height: 56,
          paddingLeft: 16,
          paddingRight: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#202123',
        }}>
          <Text style={{
            color: 'white',
            fontWeight: '400',
            fontSize: 16,
            lineHeight: 24,
            opacity: 0.5
          }}>性别</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="1"
              status={gender == 1 ? 'checked' : 'unchecked'}
              onPress={() => setGender(1)}
            >
            </RadioButton>
            <Text style={{ color: '#ffffff', marginRight: 12 }}>男</Text>
            <RadioButton
              value="0"
              status={gender == 0 ? 'checked' : 'unchecked'}
              onPress={() => setGender(0)}
            >
            </RadioButton>
            <Text style={{ color: '#ffffff' }}>女</Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 8,
            backgroundColor: '#1C1D1E'
          }}
        ></View>
        <View style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          height: 56,
          paddingLeft: 16,
          paddingRight: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#202123',
        }}>
          <Text style={{
            color: 'white',
            fontWeight: '400',
            fontSize: 16,
            lineHeight: 24,
            opacity: 0.5
          }}>手机</Text>
          <Text style={{
            color: 'white',
            fontWeight: '400',
            fontSize: 16,
            lineHeight: 24,
            opacity: 0.5
          }}>{userinfo.phoneNumber}</Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 8,
            backgroundColor: '#1C1D1E'
          }}
        ></View>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => save()}>
          <Text style={styles.textStyle}>保存</Text>
        </Pressable>
      </View>
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
    bottom: 16
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

export default ModifyInfoScreen;