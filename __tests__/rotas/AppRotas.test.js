import React from 'react';
import { render } from '@testing-library/react-native';
import AppRotas from '../../src/rotas/AppRotas';
import Leilao from '../../src/telas/Leilao';
import ListaLeiloes from '../../src/telas/ListaLeiloes';
import { View } from 'react-native';

jest.mock('../../src/telas/Leilao');
jest.mock('../../src/telas/ListaLeiloes');

describe('rotas/AppRotas', () => {
	beforeAll(() => {
		Leilao.mockImplementation(() => <View testID='leilao-id' />);
		ListaLeiloes.mockImplementation(() => <View testID='lista-leiloes-id' />);
	});
	it('deve renderizar corretamente', () => {
		const { toJSON } = render(<AppRotas />);
		expect(toJSON()).toMatchSnapshot();
	});
});
