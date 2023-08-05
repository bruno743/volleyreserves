import React from 'react';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator initialRouteName='Home' screenOptions={{headerStyle: {backgroundColor: '#1D5D9B'}}}>
            <Drawer.Screen name='Home' component={Home} />
            <Drawer.Screen name='Profile' component={Profile} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;