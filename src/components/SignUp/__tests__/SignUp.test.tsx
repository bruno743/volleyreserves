import React from "react";
import {render, fireEvent} from '@testing-library/react-native';
import SignUp from "../SignUp";
import {Alert} from 'react-native';

describe('SignUp', () => {
    describe('just load the page', () => {
        test('render the component', () => {
            const rendered = render(<SignUp />);

            expect(rendered).toBeTruthy();
        });

        test('shows the option to login page', () => {
            const {getByText} = render(<SignUp />);

            expect(getByText('Login')).toBeTruthy();
        });

        test('shows the register button', () => {
            const {getByText} = render(<SignUp />);

            expect(getByText('Cadastrar')).toBeTruthy();
        });

        test('shows the page title', () => {
            const {getByText} = render(<SignUp />);

            expect(getByText('Cadastro')).toBeTruthy();
        });
    });

    describe('press events', () => {
        test('incorrect information: strings size', () => {
            jest.spyOn(Alert, 'alert');

            const {getByText, getByTestId} = render(<SignUp />);

            fireEvent.changeText(getByTestId('inputName'), '12345');
            fireEvent.changeText(getByTestId('inputUser'), '12345');
            fireEvent.changeText(getByTestId('inputPassword'), '12345');
            fireEvent.changeText(getByTestId('inputConfirmPassword'), '12345');

            fireEvent.press(getByText('Cadastrar'));

            expect(Alert.alert).toBeCalledWith(
                'Erro ao cadastrar.',
                'Todos os campos devem ser preenchidos. Cada campo deve possuir no mínimo seis caracteres.'
            );
        });

        test('incorrect information: different passwords', () => {
            jest.spyOn(Alert, 'alert');

            const {getByText, getByTestId} = render(<SignUp />);

            fireEvent.changeText(getByTestId('inputName'), '123456');
            fireEvent.changeText(getByTestId('inputUser'), '123456');
            fireEvent.changeText(getByTestId('inputPassword'), '123456');
            fireEvent.changeText(getByTestId('inputConfirmPassword'), '123457');

            fireEvent.press(getByText('Cadastrar'));

            expect(Alert.alert).toBeCalledWith('Erro ao cadastrar.', 'As senhas não conferem.');
        });

        test('clean text input on option login press', () => {
            const {getByTestId, getByText} = render(<SignUp />);

            const inputName = getByTestId('inputName');
            const inputUser = getByTestId('inputUser');
            const inputPasword = getByTestId('inputPassword');
            const inputConfirmPassword = getByTestId('inputConfirmPassword');

            fireEvent.changeText(inputName, '123456');
            fireEvent.changeText(inputUser, '123456');
            fireEvent.changeText(inputPasword, '123456');
            fireEvent.changeText(inputConfirmPassword, '123457');

            fireEvent.press(getByText('Login'));

            expect(inputName.props.value).toBe('');
            expect(inputUser.props.value).toBe('');
            expect(inputPasword.props.value).toBe('');
            expect(inputConfirmPassword.props.value).toBe('');
        });
    });
});