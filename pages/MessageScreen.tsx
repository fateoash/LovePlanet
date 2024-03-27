import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const MessageScreen = ({route}: any) => {

  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState('');

  const isFocused = useIsFocused();

  let timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    initToken();
  }, [])

  useEffect(()=>{
    if(!isFocused){
      return
    }
    token && fetchList()
    timer.current = setInterval(() => {
      token && fetchList()
    }, 5000);
    return () => {
      clearInterval(timer.current)
    };
  }, [isFocused])

  const initToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
        clearUnread(value);
      }
    } catch (e) { }
  }

  const clearUnread = (token: any) => {
    fetch('https://taohua10.cn/api/trends-service/messages/messageClear', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'token': token
      },
      body: ``
    })
  }

  const fetchList = () => {
    fetch('https://taohua10.cn/api/trends-service/messages/querySystemMessageList', {
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
          const m = res.data.map((item: any) => {
            return {
              head: require('../assets/images/ringring.png'),
              name: item.title,
              content: item.content,
              time: item.time
            }
          })
          setMessages(m)
        }
      }).catch(() => { })
  }

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={{
        width: Dimensions.get('window').width - 32,
        height: 44,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 26
      }}>
        <Image style={{ width: 44, height: 44, marginRight: 11 }} source={require('../assets/images/ringring.png')}></Image>
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
        }}>
          <Text style={{
            fontSize: 16,
            color: 'white',
            fontWeight: '500',
            marginBottom: 4
          }}>{item.name}</Text>
          <Text style={{
            fontSize: 12,
            color: 'white',
            fontWeight: '400',
            marginBottom: 4,
            opacity: 0.7
          }}>{item.content}</Text>
        </View>
        <Text style={{
          fontSize: 12,
          color: 'white',
          fontWeight: '400',
          marginBottom: 4,
          opacity: 0.3
        }}>{item.time}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={{
        width: '100%',
        height: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#202123',
      }}
      >
        <Text style={{ fontWeight: '500', fontSize: 16, color: '#FFFFFF' }}>消息</Text>
      </View>
      <View style={{
        width: '100%',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        height: 64,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#202123',
        paddingBottom: 16,
      }}>
        <FlatList
          style={{ marginTop: 30, flex: 1 }}
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          extraData={{}}
        />
      </View>

    </>
  );
};

export default MessageScreen;