import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Leilao from '../../../../src/telas/ListaLeiloes/componentes/Leilao';
// import { useNavigation } from '@react-navigation/native';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
	return {
		useNavigation: () => ({
			navigate: mockedNavigate,
		}),
	};
});

describe('telas/ListaLeiloes/componentes/Leilao', () => {
	it('deve mostrar as informações na tela', () => {
		const { getByText, getByTestId } = render(
			<Leilao
				id={1}
				nome='Nome teste'
				valorInicial={199.9}
				icone='tv'
				cor='blue'
			/>
		);

		expect(getByText('Nome teste')).toBeTruthy();
		expect(getByText(/R\$\s199,90/)).toBeTruthy();
	});

	it('deve chamar a navegação com os parâmetros corretos', () => {
		const { getByTestId } = render(
			<Leilao
				id={1}
				nome='Nome teste'
				valorInicial={199.9}
				icone='tv'
				cor='blue'
			/>
		);

		const cartao = getByTestId('cartao-id');
		fireEvent.press(cartao);

		expect(mockedNavigate).toHaveBeenCalledWith('Leilao', { id: 1 });
	});
});

// describe('', () => {
// 	it('', () => {});
// });
