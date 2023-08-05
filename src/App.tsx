import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import {UserProvider} from './contexts/UserProvider/UserProvider';
import { NativeBaseProvider } from 'native-base';

const App = () => {

  return(
    <NavigationContainer>
      <UserProvider>
        <NativeBaseProvider>
          <StackNavigator />
        </NativeBaseProvider>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
