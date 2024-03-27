import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native';

const Item = ({ name, head, selected }: { name: string, head: string, selected: boolean }) => {
  return (
    <View style={styles.item}>
      <Image style={styles.head} source={{ uri: head }}></Image>
      <Text ellipsizeMode='tail' style={styles.name}>{name}</Text>
      {selected && <View style={{
        width: 0,
        height: 0,
        borderWidth: 16,
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#242424',
        borderTopColor: 'transparent',
        marginTop: -8
      }}></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 72,
    height: 102,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 18
  },
  name: {
    width: 72,
    height: 18,
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center'
  },
  head: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginBottom: 8
  }
});

export default Item;