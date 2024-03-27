import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, Dimensions } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: any) => {
  const [district, setDistrict] = useState('86');
  const [phone, setPhone] = useState('');
  const [identify, setIdentify] = useState('');
  const [type, setType] = useState(1);
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [fetchingSMS, setFetchingSMS] = useState(false)

  const onLoginOrRegister = () => {
    if (!agree) {
      Toast.show('请先勾选同意用户协议及隐私协议', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
      return;
    }
    // if (type != 1 && (!account || !password)) {
    //   Toast.show('请输入账号和密码', {
    //     duration: Toast.durations.SHORT,
    //     position: Toast.positions.CENTER,
    //   });
    //   return;
    // }

    if (type == 1 && (!phone || !identify)) {
      Toast.show('请输入手机号码及验证码', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
      return;
    }
    // if (type == 3) {
    //   fetch('https://taohua10.cn/trends-service/register', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: JSON.stringify({
    //       username: account,
    //       password: password,
    //       faceImage: '',
    //       nickname: '',
    //     }),
    //   }).then(res => res.json()).then((res: any) => {
    //     // Toast.show(JSON.stringify(res), {
    //     //   duration: Toast.durations.SHORT,
    //     //   position: Toast.positions.CENTER,
    //     // });
    //     if (res.code == 0) {
    //       Toast.show('注册成功', {
    //         duration: Toast.durations.SHORT,
    //         position: Toast.positions.CENTER,
    //       });
    //       setTimeout(() => {
    //         setType(2)
    //       }, 500)
    //     }
    //   });
    // } else if (type == 2) {
    //   fetch('https://taohua10.cn/trends-service/login', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: JSON.stringify({
    //       username: account,
    //       password: password,
    //     }),
    //   }).then(res => res.json()).then((res: any) => {
    //     if (res.code == 0) {
    //       AsyncStorage.setItem('token', res.data.usertoken, () => {
    //         navigation.replace('HomeTab')
    //       });
    //     }
    //   });
    // }else {
    fetch('https://taohua10.cn/api/trends-service/codeLogin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: identify,
        phoneNumber: phone
      }),
    }).then(res => res.json()).then((res: any) => {
      if (res.code == 0) {
        Toast.show('登录成功', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        })
        AsyncStorage.setItem('token', res.data.usertoken, () => {
          navigation.replace('HomeTab')
        });
      } else {
        Toast.show(res.msg, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        })
      }
    }).catch(e => {
      Toast.show('请检查网络', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
    });;
    // }
  }

  const getSMScode = () => {
    setFetchingSMS(true);
    fetch(`https://taohua10.cn/api/trends-service/messages/sendCode?phoneNumber=${phone}`, {
      method: 'GET',
    }).then(res => res.json()).then((res: any) => {
      setFetchingSMS(false);
      if (res.code == 0) {
        Toast.show('已发送', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
      }
    }).catch(e => {
      Toast.show('请检查网络', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
    });
  }

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#FF98DA', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
        style={styles.top}>
        <Text style={styles.title}>{type == 1 ? '手机验证码登陆' : type == 2 ? '账户密码登录' : '注册'}</Text>
        <Text style={styles.desc}>{type == 1 ? '未注册的手机号将自动注册并登录' : type == 2 ? '使用账号和密码进行登录' : '输入注册账户和密码'}</Text>
        {type == 1 && <View style={styles.container}>
          <Text style={{
            lineHeight: 48,
            fontSize: 14
          }}>+</Text>
          <TextInput
            style={styles.inputDistrict}
            onChangeText={setDistrict}
            value={district}
            maxLength={4}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPhone}
            placeholder="请输入手机号"
            value={phone}
            maxLength={15}
            keyboardType="numeric"
          />
        </View>}
        {type == 1 && <View style={styles.container}>
          <TextInput
            style={{ ...styles.input, paddingLeft: 0 }}
            onChangeText={setIdentify}
            value={identify}
            placeholder="请输入验证码"
            keyboardType="numeric"
            maxLength={6}
          />
          <Pressable onPress={() => getSMScode()}>
            <Text style={{
              lineHeight: 48,
              marginRight: 12,
              color: fetchingSMS ? '#D8D8D8' : '#000000'
            }}>获取验证码</Text>
          </Pressable>
        </View>}
        {type != 1 && <View style={styles.container}>
          <TextInput
            style={{ ...styles.input, paddingLeft: 0 }}
            onChangeText={setAccount}
            value={account}
            placeholder="请输入账号"
          />
        </View>}
        {type != 1 && <View style={styles.container}>
          <TextInput
            style={{ ...styles.input, paddingLeft: 0 }}
            onChangeText={setPassword}
            value={password}
            placeholder="请输入密码"
            secureTextEntry={true}
          />
        </View>}
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* <Pressable style={{
            marginTop: 26,
            marginLeft: 16,
          }} onPress={() => {
            if (type == 1) {
              setType(2)
            } else {
              setType(1)
            }
          }}>
            <Text style={{
              lineHeight: 24,
              marginRight: 12
            }}>{type == 1 ? '账号密码登录' : '手机验证码登录'}</Text>
          </Pressable> */}
          {type == 2 && <Pressable style={{
            marginTop: 26,
            marginLeft: 16,
          }} onPress={() => {
            if (type == 2) {
              setType(3)
            } else {
              setType(2)
            }
          }}>
            <Text style={{
              lineHeight: 24,
              marginRight: 16
            }}>{type == 2 ? '注册账户' : '返回登录'}</Text>
          </Pressable>}
        </View>
        <Pressable style={{
          width: Dimensions.get('window').width - 32,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 8,
          elevation: 3,
          backgroundColor: 'black',
          marginLeft: 16,
          marginTop: 12
        }}
          onPress={onLoginOrRegister}>
          <Text style={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
          }}>{type != 3 ? '登录' : '注册'}</Text>
        </Pressable>
      </LinearGradient>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 16,
        alignItems: 'center'
      }}>
        <Pressable onPress={() => setAgree(!agree)}>
          <Image
            style={{ width: 16, height: 16, objectFit: 'contain', marginRight: 8 }}
            source={agree ? require('../assets/images/checked.png') : require('../assets/images/check.png')}
          />
        </Pressable>
        <Text style={{ color: '#9BA6A3' }}>我已阅读并同意</Text>
        <Pressable>
          <Text style={{
            color: 'black'
          }}>用户协议，隐私政策保护政策</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  top: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex'
  },
  container: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D8D8D8',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 12,
  },
  title: {
    marginTop: 76,
    marginLeft: 16,
    fontSize: 20,
    fontWeight: '500',
    color: '#333333'
  },
  desc: {
    marginTop: 8,
    marginLeft: 16,
    color: '#9BA6A3',
    fontSize: 14,
    marginBottom: 50
  },
  inputDistrict: {
    height: 48,
    width: 41,
    borderRightWidth: 1,
    borderColor: '#D8D8D8',
    paddingRight: 8,
    fontSize: 14
  },
  input: {
    height: 48,
    flex: 1,
    fontSize: 14,
    paddingLeft: 12
  },
});

export default Login;