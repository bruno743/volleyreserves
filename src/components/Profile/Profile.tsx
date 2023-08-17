import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
//import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUser } from '../../contexts/UserProvider/UserProvider';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  
  //const navigation = useNavigation<any>();
  const { nick, nome, reservas, updateLog, isSigned, updateName, updateNick } = useUser();
  
  const logout = () => {
    auth().signOut();
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.boxLogout}>
        <Icon
          name='logout'
          size={30}
          onPress={() => {
            updateLog(!isSigned);
            updateName('');
            updateNick('');
            logout();
            //navigation.navigate('Login');
          }}
          testID='logoutIcon'
        />
      </View>
      <View style={styles.container}>
        <Text
          style={{fontWeight: '900', textDecorationColor: '#000', fontSize: 24}}
          testID='userTitle'  
        >{nick}</Text>
        <Text
          style={{fontSize: 16, marginBottom: 35,}}
          testID='usernameTitle'
        >{nome}</Text>
        {reservas.map((item, index) => <View key={index} style={styles.reservesArea}>
            <Text style={styles.reservesText}>Quadra {item.quadra.toString()}: </Text>
            <Text style={styles.reservesText}>{item.date.toString().slice(4, -18)}</Text>
            <Text style={styles.reservesText}>às {item.hora}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 75,
    gap: 8,
  },
  reservesArea: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
  },
  reservesText: {
    fontSize: 18,
  },
  boxLogout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 5,
    marginRight: 5,
    width: 50,
    height: 50,
  },
});

export default Profile;