// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { Provider } from 'react-redux'
import store from './store'
import HomeScreen from './pages/HomeScreen'
import PublishScreen from './pages/PublishScreen'
import AccountScreen from './pages/AccountScreen'
import LoginScreen from './pages/LoginScreen'
import VideoScreen from './pages/VideoScreen'
import MessageScreen from './pages/MessageScreen'
import InviteScreen from './pages/InviteScreen';
import ModifyInfoScreen from './pages/ModifyInfoScreen';
import { View } from 'react-native';


const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function UserInfoScreen() {
  return (
    <View>用户信息</View>
  )
}

function PropertyScreen() {
  return (
    <View>我的收益</View>
  )
}

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function HomeTabs() {

  const unreadNumber = useSelector((state: RootState) => state.baseInfo.unreadNumber);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#F14B8B"
      inactiveColor="#8F8F90"
      activeIndicatorStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
      barStyle={{ backgroundColor: '#202123' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Publish"
        component={PublishScreen}
        options={{
          tabBarLabel: '发布',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="send" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarLabel: '消息',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message-text" color={color} size={24} />
          ),
          tabBarBadge: unreadNumber <= 0 ? false : unreadNumber,
        }} />
      <Tab.Screen
        name="Me"
        component={AccountScreen}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" color={color} size={24} />
          ),
        }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{
        backgroundColor: '#000000'
      }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="HomeTab" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Video" component={VideoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserInfo" component={UserInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Property" component={PropertyScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Invite" component={InviteScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ModifyInfo" component={ModifyInfoScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;