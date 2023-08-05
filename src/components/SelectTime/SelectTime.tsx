import React, { useState } from 'react';
import { Select, Box, Center } from 'native-base';

const SelectTime = (props:any) => {

    const [hora, setHora] = useState('');

    return <Center>
        <Box maxW="300">
            <Select
                selectedValue={hora}
                minWidth="200"
                accessibilityLabel="Escolha um horário"
                placeholder="Escolha um horário"
                _selectedItem={{
                    bg: "teal.600",
                }}
                mt={1}
                onValueChange={itemValue => {setHora(itemValue); props.getTime(itemValue);}}
                _item={{flex: 1, alignItems: 'center', pb: 22}}
            >
                <Select.Item label="17:00" value="17:00" />
                <Select.Item label="18:00" value="18:00" />
                <Select.Item label="19:00" value="19:00" />
                <Select.Item label="20:00" value="20:00" />
                <Select.Item label="21:00" value="21:00" />
                <Select.Item label="22:00" value="22:00" />
            </Select>
        </Box>
        </Center>;
};

export default SelectTime;