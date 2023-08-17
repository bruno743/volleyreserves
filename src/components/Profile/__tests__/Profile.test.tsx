import React, {useEffect} from "react";
import { render, fireEvent } from '@testing-library/react-native';
import Profile from "../Profile";
import { useUser, UserProvider } from "../../../contexts/UserProvider/UserProvider";

const TestingComponent = () => {
    const {updateName, updateNick, updateReservas} = useUser();
    
    useEffect(() => {
        updateName('noomee');
        updateNick('niick');
        updateReservas([
            {
                quadra: '1',
                date: 'Sat Nov 11 2023 00:00:00 GMT-0300',
                hora: '20:00',
                user: 'user',
            },
            {
                quadra: '1',
                date: 'Sat Nov 11 2023 00:00:00 GMT-0300',
                hora: '21:00',
                user: 'user',
            }
        ]);
    }, []);

    return (
        <>
            <p>nothing</p>
        </>
    );
};

describe('Profile', () => {
    test('render logout icon', () => {
        const {getByTestId} = render(<Profile/>);

        expect(getByTestId('logoutIcon')).toBeTruthy();
    });

    test('render user email', () => {
        const {getByTestId} = render(<Profile/>);

        expect(getByTestId('userTitle')).toBeTruthy();
    });

    test('render user name', () => {
        const {getByTestId} = render(<Profile/>);

        expect(getByTestId('usernameTitle')).toBeTruthy();
    });

    test('rendered titles', async () => {
        
        const {findByText} = render(
            <UserProvider>
                <TestingComponent/>
                <Profile/>
            </UserProvider>
        );
        
        expect(await findByText('noomee')).toBeTruthy();
        expect(await findByText('niick')).toBeTruthy();

    });

    test('check if render reserves', async () => {
        
        const {findAllByText} = render(
            <UserProvider>
                <TestingComponent/>
                <Profile/>
            </UserProvider>
        );
        
        expect((await findAllByText(/Quadra/i)).length).toBe(2);
        expect((await findAllByText(/às/i))).toBeTruthy();

    });

    test('check if render information reserve correctly', async () => {
        
        const {findByText} = render(
            <UserProvider>
                <TestingComponent/>
                <Profile/>
            </UserProvider>
        );
        
        expect(await findByText(/20:00/)).toBeTruthy();

    });
    
    test('press icon logout', () => {
        const {getByTestId} = render(
            <UserProvider>
                <TestingComponent/>
                <Profile/>
            </UserProvider>
        );

        fireEvent.press(getByTestId('logoutIcon'));

        expect(getByTestId('userTitle').children).toEqual([]);
        expect(getByTestId('usernameTitle').children).toEqual([]);
    });
});