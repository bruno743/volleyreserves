import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Quadras from '../Quadras/Quadras';

const Home = () => {

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30}}>Home</Text>
      <Quadras />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 75,
  },
});

export default Home;