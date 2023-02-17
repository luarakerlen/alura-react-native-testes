import React from 'react';
import { render, within } from '@testing-library/react-native';
import Topo from '../../../../src/telas/Leilao/componentes/Topo';

jest.mock('../../../../src/negocio/formatadores/moeda.js', () => ({
  formataDecimalParaReal: jest.fn((valor) => `R$ ${valor}`),
}));

const lances = [
	{
		id: 1,
		valor: 500,
	},
	{
		id: 2,
		valor: 1000,
	},
	{
		id: 3,
		valor: 700,
	},
];

describe('telas/Leilao/componentes/Topo', () => {
	it('deve mostrar as informações na tela', () => {
		const { getByText, getByA11yHint } = render(
			<Topo
				nome='Nome teste'
				descricao='Descrição teste'
				lances={lances}
				valorInicial={200}
				cor='blue'
				icone='tv'
			/>
		);

		expect(getByText('Nome teste')).toBeTruthy();
		expect(getByText('Descrição teste')).toBeTruthy();
		expect(within(getByA11yHint('Valor Inicial')).getByText(/R\$\s200/)).toBeTruthy();
		expect(within(getByA11yHint('Melhor lance')).getByText(/R\$\s1000/)).toBeTruthy();
	});
});
