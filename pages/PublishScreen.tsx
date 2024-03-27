import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, Dimensions } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

const PublishScreen = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState<string | undefined>(undefined);

  const pickVideo = () => {
    launchImageLibrary(
      {
        mediaType: 'video'
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled video picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else {
          if (response.assets) {
            const { uri } = response.assets[0];
            uploadVideo(uri);
          }
        }
      }
    );
  };

  const uploadVideo = async (uri: any) => {

    const formData = new FormData();
    formData.append('file', {
      name: 'video.mp4',
      uri: uri,
      type: 'video/mp4'
    });

    try {
      fetch('https://taohua10.cn/api/trends-service/video/uploadvideo', {
        method: 'POST',
        body: formData,
      }).then(res => res.json()).then(res => {
        if (res.code == 0) {
          setUrl(res.data)
        }
      })
    } catch (error) { }
  };

  const handleClick = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        fetch('https://taohua10.cn/api/trends-service/video/insertVideo', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': value
          },
          body: `desc=${desc}&videoUrl=${url}`
        }).then(res => res.json())
          .then((res: any) => {
            Toast.show('发布成功')
          })
      }
    } catch (e) {
      Toast.show('发布失败')
    }
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
        <Text style={{ fontWeight: '500', fontSize: 16, color: '#FFFFFF' }}>发布视频</Text>
      </View>
      <View style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        height: 64,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#202123',
        paddingBottom: 16,
      }}>
        <Text style={{
          color: 'white',
          fontWeight: '400',
          fontSize: 16,
          lineHeight: 24,
          opacity: 0.5
        }}>标题名称</Text>
        <TextInput
          style={{
            textAlign: 'right',
            color: 'rgba(255,255,255,0.7)'
          }}
          placeholder='请输入标题名称'
          placeholderTextColor='rgba(255,255,255,0.5)'
          autoFocus={false}
          maxLength={15}
          onChangeText={text => { setTitle(text) }}
          value={title}
        />
      </View>
      <View style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#202123',
        paddingBottom: 16,
      }}>
        <Text style={{
          color: 'white',
          fontWeight: '400',
          fontSize: 16,
          lineHeight: 24,
          opacity: 0.5
        }}>视频介绍</Text>
        <TextInput
          style={{
            textAlign: 'right',
            color: 'rgba(255,255,255,0.7)',
            textAlignVertical: 'top',
            width: '60%',
          }}
          multiline={true}
          placeholder='请输入介绍'
          placeholderTextColor='rgba(255,255,255,0.5)'
          autoFocus={false}
          maxLength={200}
          onChangeText={text => { setDesc(text) }}
          value={desc}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: 8,
          backgroundColor: '#1C1D1E'
        }}
      ></View>
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
          }}>上传视频</Text>
        </View>
        <Pressable
          style={{
            width: Dimensions.get('window').width - 32,
            borderRadius: 8,
            height: 143,
            backgroundColor: '#2C2E30',
            marginLeft: 16,
            marginRight: 16,
            display: 'flex',
            alignItems: 'center'
          }}
          onPress={pickVideo}
        >
          <Image
            style={{
              width: 49,
              height: 49,
              marginTop: 23
            }}
            source={require('../assets/images/video.png')}
          />
          <Text style={{
            color: 'white',
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 18,
            opacity: 0.5,
            marginTop: 18
          }}>点击上传视频</Text>
          <Text style={{
            color: 'white',
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 18,
            opacity: 0.5,
            marginTop: 5
          }}>仅支持mp4格式，时间不超过60分钟</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => handleClick()}>
          <Text style={styles.textStyle}>发布</Text>
        </Pressable>
      </View>
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

export default PublishScreen;