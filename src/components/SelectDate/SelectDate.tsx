import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';

const SelectDate = (props:any) => {

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={styles.dateActions}>
        <Text>{date.toString().slice(4, -18)}</Text>
        <Text 
          onPress={() => setOpen(true)}
          style={styles.pressText}
        >Selecionar data</Text>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        mode='date'
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          props.getDate(date);
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  dateActions: {
    flexDirection: 'row',
    gap: 18,
  },
  pressText: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#1D5D9B',
  },
})

export default SelectDate;