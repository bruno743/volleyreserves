import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../Home';

describe('Home', () => {

    beforeEach(() => {
        jest.spyOn(React, 'useEffect').mockImplementation(cb => cb());
    });
    test('render the component', () => {
        const rendered = render(<Home />);

        expect(rendered).toBeTruthy();
    });

    test('render title page', () => {
        const {getByText} = render(<Home/>);

        expect(getByText('Home')).toBeTruthy();
    });

    test('render children', () => {
        const {debug} = render(<Home/>);

        debug();
    });
});