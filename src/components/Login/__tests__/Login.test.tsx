import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import Login from "../Login";
import { Alert } from "react-native";

describe('Login', () => {
    describe('just load the page', () => {
        test('render the component', () => {
            const rendered = render(<Login />);

            expect(rendered).toBeTruthy();
        });
        test('shows the option to register page', () => {
            const {getByTestId} = render(<Login />);

            expect(getByTestId('registerOptionClick')).toBeTruthy();
        });
        test('shows the login button', () => {
            const {getByTestId} = render(<Login />);

            expect(getByTestId('loginButton')).toBeTruthy();
        });
    });

    describe('press events', () => {
        test('login with user & password incorrects', () => {
            jest.spyOn(Alert, 'alert');
            
            const {getByTestId} = render(<Login />);

            fireEvent.press(getByTestId('loginButton'));

            expect(Alert.alert).toBeCalled();
        });

        test('clean text input on option register press', () => {
            const {getByTestId} = render(<Login />);

            const inputUser = getByTestId('inputUser');
            const inputPassword = getByTestId('inputUser');
            
            fireEvent.changeText(inputUser, '123456');
            fireEvent.changeText(inputPassword, '123456');
            
            fireEvent.press(getByTestId('registerOptionClick'));

            expect(inputUser.props.value).toBe('');
            expect(inputPassword.props.value).toBe('');
        });

    });
});