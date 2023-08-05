import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Navigator from './DrawerNavigator';
//import { useUser } from './contexts/UserProvider/UserProvider';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

  //const {isSigned, updateName, updateNick} = useUser();

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsuscribe = auth().onAuthStateChanged(_user => {
      setUser(_user);
    });

    return unsuscribe;
  }, []);

  return (
    <Stack.Navigator>
      {user 
      ? <Stack.Screen name='Navigator' component={Navigator} options={{headerShown: false}}></Stack.Screen>
      : <Stack.Screen name='Login' component={Login} options={{headerShown: false}}></Stack.Screen>
      }
      <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigator;