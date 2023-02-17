import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import AppRotas from '../src/rotas/AppRotas';
import App from '../App';

jest.mock('../src/rotas/AppRotas');

describe('App', () => {
	beforeAll(() => {
		AppRotas.mockImplementation(() => <View testID='app-rotas-id' />);
	});

	it('deve renderizar corretamente', () => {
		const { toJSON } = render(<App />);
		expect(toJSON()).toMatchSnapshot();
	});
});
