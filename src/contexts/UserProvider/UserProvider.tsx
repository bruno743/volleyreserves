import React, {createContext, useState, useContext} from 'react';

type UserContextData = {
  nick: string;
  nome: string;
  isSigned: boolean;
  reservas: Reserva[];
  updateReservas: any;
  updateLog: any;
  updateNick: any;
  updateName: any;
};

export type Reserva = {
  quadra: string;
  date: Date;
  hora: string;
};


export const UserContext = createContext<UserContextData>({
  nick: '',
  nome: '',
  isSigned: false,
  reservas: [],
  updateReservas: () => {},
  updateLog: () => {},
  updateNick: () => {},
  updateName: () => {},
});

const UserProvider = ({children}:any) => {
  const [listReservas, setReservas] = useState([]);
  const [isLoged, setLogin] = useState(false);
  const [nickName, setNickName] = useState('');
  const [name, setName] = useState('');
  return (
    <UserContext.Provider value={{
      nick: nickName,
      nome: name,
      isSigned: isLoged,
      reservas: listReservas,
      updateReservas: setReservas,
      updateLog: setLogin,
      updateNick: setNickName,
      updateName: setName,
      }}>
        {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export {UserProvider, useUser};