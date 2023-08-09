import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Quadras from '../Quadras/Quadras';
import { useUser } from '../../contexts/UserProvider/UserProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Home = () => {

  const { updateName, updateNick, updateReservas } = useUser();

  useEffect(() => {
    const email = auth().currentUser?.email;
    updateNick(email);
    firestore()
    .collection('users')
    .where('email', '==', email)
    .get()
    .then(querySnapshot => {updateName(querySnapshot.docs[0].data().nome.toString())});

    firestore()
    .collection('reservas')
    .where('user', '==', email)
    .get()
    .then(querySnapshot => {
      const listReservas: any = [];
      querySnapshot.docs.forEach(documentSnapshot => {listReservas.push(documentSnapshot.data())});
      updateReservas(listReservas);
    });
  }, []);

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