import React from 'react';
import { act, render, waitFor } from '@testing-library/react-native';
import ListaLeiloes from '../../../src/telas/ListaLeiloes';
import Leilao from '../../../src/telas/ListaLeiloes/componentes/Leilao';
import { Text } from 'react-native';

jest.mock('../../../src/telas/ListaLeiloes/componentes/Leilao');

const mockObtemLeiloes = jest.fn();
jest.mock('../../../src/hooks/useListaLeiloes', () =>
	jest.fn(() => [
		[
			{
				id: 1,
				nome: 'Leilão 1',
			},
			{
				id: 2,
				nome: 'Leilão 2',
			},
		],
		mockObtemLeiloes,
	])
);

describe('telas/ListaLeiloes', () => {
	it('deve renderizar lista de leiloes na tela', () => {
		Leilao.mockImplementation(({ nome }) => <Text>Teste: {nome}</Text>);
		const { getByText } = render(<ListaLeiloes />);

		expect(getByText('Teste: Leilão 1')).toBeTruthy();
		expect(getByText('Teste: Leilão 2')).toBeTruthy();
		expect(mockObtemLeiloes).not.toHaveBeenCalled();
	});

	it('deve atualizar a lista quando recarrega a tela', async () => {
		const { getByTestId } = render(<ListaLeiloes />);
		const flatlist = getByTestId('flatlist-id');

		act(() => {
			flatlist.props.onRefresh();
		});

		await waitFor(() => expect(mockObtemLeiloes).toHaveBeenCalledTimes(1));
	});
});
