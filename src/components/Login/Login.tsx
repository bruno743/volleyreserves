import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useUser } from '../../contexts/UserProvider/UserProvider';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Login = () => {

  const { isSigned, updateLog, updateNick, updateName } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');

  const alertaLogin = () => {
    Alert.alert('Erro ao logar.', 'Usuário ou senha incorretos.');
  };

  const toSignUp = () => {
    setNickName('');
    setPassword('');
    navigation.navigate('SignUp');
  };

  const login = () => {
    auth().signInWithEmailAndPassword(nickName, password)
    .then(() => {
      updateLog(!isSigned);
      updateNick(nickName);
      firestore()
      .collection('users')
      .where('email', '==', nickName)
      .get()
      .then(querySnapshot => {updateName(querySnapshot.docs[0].data().nome.toString())});
      setNickName('');
      setPassword('');
      navigation.navigate('Navigator');
    })
    .catch(error => {console.log(error)})
  }
  
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <View>
        <Text>Username:</Text>
        <TextInput
          value={nickName}
          style={styles.input}
          onChangeText={setNickName}
          testID='inputUser'
        />
        <Text>Senha:</Text>
        <TextInput
          value={password}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setPassword}
          testID='inputPassword'
        />
      </View>
      <View style={styles.actions}>
        <Text
          style={{
            paddingTop: 7,
            color: '#1D5D9B',
            fontSize: 18,
          }}
          onPress={() => {
            toSignUp();
          }}
          testID='registerOptionClick'
        >Cadastro</Text>
        <Button
            testID='loginButton'
            onPress={() => {
              if(nickName.length < 6 || password.length < 6){
                alertaLogin();
              } else {
                login();
              }
            }}
            title='Login'
            color={'#1D5D9B'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  actions: {
    flexDirection: 'row',
    gap: 18,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    height: 35,
    width: 230,
  },
});

export default Login;