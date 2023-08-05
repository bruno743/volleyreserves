import { View, Text, StyleSheet, FlatList, Button, Modal, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import SelectDate from '../SelectDate/SelectDate';
import SelectTime from '../SelectTime/SelectTime';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUser, Reserva } from '../../contexts/UserProvider/UserProvider';

const Quadras = () => {

    const dataQuadras = [
        {
            'id': 2,
        },
        {
            'id': 1,
        },
    ];
    
    const { updateReservas, reservas } = useUser();

    const [modalVisible, setModalVisible] = useState(false);
    const [idQuadra, setId] = useState(1);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');

    const addReserva = (reserva:Reserva) => {
        const reservasUpdated = reservas.concat([reserva]);
        updateReservas(reservasUpdated);
    }

    const alertReserva = () => {
        Alert.alert('Erro ao reservar.', 'Preencha a data e hora.')
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={dataQuadras}
                renderItem={({item}) => <View style={styles.itemFromList}>
                    <Image
                        source={require('../../../assets/images/arena_image.png')}
                        style={{
                            width: 300,
                            height: 250,
                            borderWidth: 2,
                            borderColor: '#1D5D9B',
                            borderRadius: 4,
                        }}
                    />
                    <Text style={{fontSize: 16}}>Esta é a quadra {item.id}</Text>
                    <Button
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            setId(item.id);
                        }}
                        title='Reservar'
                        color={'#1D5D9B'}
                    />
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={styles.modalPosition}>
                            <View style={styles.modalView}>
                                <Text>Marcar data para quadra {idQuadra}</Text>
                                <View style={styles.chooseTime}>
                                    <Icon
                                        name='today'
                                        size={25}
                                    />
                                    <SelectDate getDate={setDate} quadra={idQuadra} />
                                </View>
                                <View style={styles.chooseTime}>
                                    <Icon
                                        name='schedule'
                                        size={25}
                                        style={{paddingTop: 12}}
                                    />
                                    <SelectTime getTime={setTime} />
                                </View>
                                <View style={styles.actionsModal}>
                                    <Text
                                        style={styles.pressText}
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                            setDate(new Date());
                                            setTime('');
                                        }}
                                    >Cancelar</Text>
                                    <Text
                                        style={styles.pressText}
                                        onPress={() => {
                                            if(time.length < 1){
                                                alertReserva();
                                            } else {
                                                setModalVisible(!modalVisible);
                                                addReserva({quadra: idQuadra.toString(), date: date, hora: time});
                                                setDate(new Date());
                                                setTime('');
                                            }
                                        }}
                                    >Concluir</Text>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    itemFromList: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        paddingBottom: 45,
        gap: 20,
    },
    modalPosition: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 18,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap: 30,
    },
    actionsModal: {
        flexDirection: 'row',
        marginTop: 16,
        padding: 6,
        gap: 50,
    },
    pressText: {
        fontSize: 15,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#1D5D9B',
      },
    chooseTime: {
        flexDirection: 'row',
        gap: 18,
    },
});

export default Quadras;