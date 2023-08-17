import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NativeBaseProvider } from 'native-base';
import Quadras from "../Quadras";
import { Alert } from "react-native";

const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('Quadras', () => {
    describe('in load the component', () => {
        test('render the component', () => {
            const rendered = render(<Quadras/>);
    
            expect(rendered).toBeTruthy();
        });
        test('map the images', () => {
            const {getAllByTestId} = render(<Quadras/>);
    
            expect(getAllByTestId('imageQuadra').length).toBe(2);
        });
        test('check if render the buttons', () => {
            const {getAllByText} = render(<Quadras/>);
    
            expect(getAllByText('Reservar').length).toBe(2);
        });
    
        test('check if render the labels', () => {
            const {getAllByText} = render(<Quadras/>);
    
            expect(getAllByText(/esta é a quadra/i).length).toBe(2);
        });
    });

    describe('actions in modal', () => {
        test('check if render modal', () => {
            const {getByTestId, getAllByText} = render(
                <NativeBaseProvider initialWindowMetrics={inset}><Quadras/></NativeBaseProvider>
            );

            fireEvent.press(getAllByText('Reservar')[0]);

            expect(getByTestId('modalReserves')).toBeTruthy();
        });

        test('check title modal', () => {
            const {getByTestId, getAllByText} = render(
                <NativeBaseProvider initialWindowMetrics={inset}><Quadras/></NativeBaseProvider>
            );

            fireEvent.press(getAllByText('Reservar')[0]);

            expect(getByTestId('titleModal').children[0]).toBe('Marcar data para quadra ');
            expect(getByTestId('titleModal').children[1]).toBe('2');
        });

        test('check if render calendar icon', () => {
            const {getByTestId, getAllByText} = render(
                <NativeBaseProvider initialWindowMetrics={inset}><Quadras/></NativeBaseProvider>
            );

            fireEvent.press(getAllByText('Reservar')[0]);

            expect(getByTestId('calendarIcon')).toBeTruthy();
        });

        test('check if render clock icon', () => {
            const {getByTestId, getAllByText} = render(
                <NativeBaseProvider initialWindowMetrics={inset}><Quadras/></NativeBaseProvider>
            );

            fireEvent.press(getAllByText('Reservar')[1]);

            expect(getByTestId('clockIcon')).toBeTruthy();
        });

        test('check if render cancel option', () => {
            const {getByText, getAllByText} =  render(
                <NativeBaseProvider initialWindowMetrics={inset}><Quadras/></NativeBaseProvider>
            );

            fireEvent.press(getAllByText('Reservar')[1]);

            expect(getByText('Cancelar')).toBeTruthy();
        });

        test('check if render conclude option', () => {
            const {getByText, getAllByText} =  render(
                <NativeBaseProvider initialWindowMetrics={inset}><Quadras/></NativeBaseProvider>
            );

            fireEvent.press(getAllByText('Reservar')[1]);

            expect(getByText('Concluir')).toBeTruthy();
        });

        test('cancel option press', () => {
            const {getByText, getAllByText, queryByText} =  render(
                <NativeBaseProvider initialWindowMetrics={inset}><Quadras/></NativeBaseProvider>
            );

            fireEvent.press(getAllByText('Reservar')[1]);

            fireEvent.press(getByText('Cancelar'));

            expect(queryByText('Cancelar')).toBeNull();
        });
    });

    describe('verify reserves', () => {
        
        test('conclude option press: with no data', () => {
            jest.spyOn(Alert, 'alert');

            const {getByText, getAllByText} =  render(
                <NativeBaseProvider initialWindowMetrics={inset}><Quadras/></NativeBaseProvider>
            );

            fireEvent.press(getAllByText('Reservar')[1]);

            fireEvent.press(getByText('Concluir'));

            expect(Alert.alert).toBeCalledWith('Erro ao reservar.', 'Preencha a data e hora.');
        });
        
        test('date invalid: hour', () => {
            jest.spyOn(Alert, 'alert');

            const {getByText, getAllByText} =  render(
                <NativeBaseProvider initialWindowMetrics={inset}><Quadras hour='00:00'/></NativeBaseProvider>
            );

            fireEvent.press(getAllByText('Reservar')[1]);

            fireEvent.press(getByText('Concluir'));

            expect(Alert.alert).toBeCalledWith(
                'Erro ao reservar.', 'Horário indispnível, selecione uma nova data e hora.'
            );
        });
        
        test('date invalid: day', () => {
            jest.spyOn(Alert, 'alert');

            const date = new Date('2100-11-11');

            const {getByText, getAllByText} =  render(
                <NativeBaseProvider initialWindowMetrics={inset}>
                    <Quadras hour='20:00' day={date}/>
                </NativeBaseProvider>
            );

            fireEvent.press(getAllByText('Reservar')[1]);

            fireEvent.press(getByText('Concluir'));

            expect(Alert.alert).toBeCalledWith(
                'Erro ao reservar.', 'Horário indispnível, selecione uma nova data e hora.'
            );
        });
        
    });
});