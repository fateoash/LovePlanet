import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Modal, Pressable, TextInput, Dimensions } from 'react-native';
import Toast from 'react-native-root-toast';

const AddCyberstarModal = (props: { modalVisible: boolean; onClick: Function; onClose: Function }) => {
  const { modalVisible, onClick, onClose } = props;
  const [value, onChangeText] = React.useState('');
  const handleClick = () => {
    onClick(value);
    onChangeText('');
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onClose();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.title}>
            <Text style={styles.modalText}>验证邀请码</Text>
            <Pressable
              style={styles.close}
              onPress={() => onClose()}>
              <Image style={styles.close} source={require('../assets/images/x.png')}></Image>
            </Pressable>
          </View>
          <View style={styles.divider}></View>
          <TextInput
            style={styles.textInput}
            placeholder='请输入邀请码'
            placeholderTextColor='rgba(255,255,255,0.5)'
            autoFocus={true}
            onChangeText={text => onChangeText(text)}
            value={value}
          />
          <View style={{ width: Dimensions.get('window').width, height: 8, backgroundColor: '#2A2A2A', marginBottom: 8 }}></View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => handleClick()}>
            <Text style={styles.textStyle}>验证</Text>
          </Pressable>
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
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    height: 270,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: Dimensions.get('window').width - 32,
    height: 40,
    elevation: 2,
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
    width: 18,
    height: 18,
    position: 'absolute',
    right: 0
  },
  divider: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'black',
    marginTop: 16,
    marginBottom: 38,
    opacity: 0.2
  },
  textInput: {
    fontSize: 14,
    width: '100%',
    height: 44,
    backgroundColor: '#2A2A2A',
    padding: 12,
    color: '#FFFFFF',
    marginBottom: 48,
    borderRadius: 4,
  }
});

export default AddCyberstarModal