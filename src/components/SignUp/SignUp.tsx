import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../contexts/UserProvider/UserProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp = () => {
  const { isSigned, updateLog, updateNick, updateName } = useUser();
  const navigation = useNavigation<any>();

  const [nickName, setNickName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const alertaSenhasDiferentes = () => {
    Alert.alert('Erro ao cadastrar.', 'As senhas não conferem.');
  }

  const alertaCamposIncorretos = () => {
    Alert.alert(
      'Erro ao cadastrar.',
      'Todos os campos devem ser preenchidos. Cada campo deve possuir no mínimo seis caracteres.'
    );
  }

  const signUp = () => {
    auth().createUserWithEmailAndPassword(nickName, password)
    .then(() => {
      updateLog(!isSigned);
      updateNick(nickName);
      updateName(name);
      setName('');
      setNickName('');
      setPassword('');
      setConfirmPassword('');
      firestore().collection('users').add({
        email: nickName,
        nome: name
      });
      navigation.navigate('Navigator');
    })
    .catch(error => {console.log(error)})
  }

  return (
    <View style={styles.container}>
      <Text>Cadastro</Text>
      <View>
        <Text>Nome:</Text>
        <TextInput
          value={name}
          style={styles.input}
          onChangeText={setName}
        />
        <Text>Username:</Text>
        <TextInput
          value={nickName}
          style={styles.input}
          onChangeText={setNickName}
        />
        <Text>Senha:</Text>
        <TextInput
          value={password}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setPassword}
        />
        <Text>Confirme a senha:</Text>
        <TextInput
          value={confirmPassword}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setConfirmPassword}
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
            navigation.navigate('Login');
            setName('');
            setNickName('');
            setPassword('');
            setConfirmPassword('');
          }}
        >Login</Text>
        <Button
            onPress={() => {
              if(nickName.length < 6 || name.length < 6 || password.length < 6){
                alertaCamposIncorretos();
              } else if (password !== confirmPassword){
                alertaSenhasDiferentes();
              } else {
                signUp();
              }
            }}
            title='Cadastrar'
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

export default SignUp;