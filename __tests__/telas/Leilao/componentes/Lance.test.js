import React from 'react';
import { render } from '@testing-library/react-native';
import Lance from '../../../../src/telas/Leilao/componentes/Lance';

jest.mock('../../../../src/negocio/formatadores/moeda.js', () => ({
	formataDecimalParaReal: jest.fn((valor) => `R$ ${valor}`),
}));

describe('telas/Leilao/componentes/Lance', () => {
	it('deve mostrar as informações na tela', () => {
		const { getByText } = render(
			<Lance id={1} valor={1000} cor='blue' />
		);

		expect(getByText('#1')).toBeTruthy();
		expect(getByText(/R\$\s1000/)).toBeTruthy();
	});
});
