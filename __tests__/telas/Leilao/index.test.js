import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import Leilao from '../../../src/telas/Leilao';
import Topo from '../../../src/telas/Leilao/componentes/Topo';
import Lance from '../../../src/telas/Leilao/componentes/Lance';
import EnviaLance from '../../../src/telas/Leilao/componentes/EnviaLance';
import useLeilao from '../../../src/hooks/useLeilao';

const leilao = {
	id: 1,
	nome: 'Leilão 1',
	lances: [
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
	],
};

const mockObtemLeilao = jest.fn();
const mockEnviaLance = jest.fn(() => ({ valido: true }));

jest.mock('../../../src/hooks/useLeilao', () =>
	jest.fn(() => [leilao, mockObtemLeilao, mockEnviaLance])
);

jest.mock('../../../src/telas/Leilao/componentes/Topo');
jest.mock('../../../src/telas/Leilao/componentes/Lance');
jest.mock('../../../src/telas/Leilao/componentes/EnviaLance');

jest.mock('@react-navigation/native', () => ({
	useRoute: jest.fn().mockReturnValue({
		params: {
			id: 1,
		},
	}),
}));

describe('telas/Leilao', () => {
	const [leilao, obtemLeilao, enviaLance] = useLeilao();

	beforeAll(() => {
		Topo.mockImplementation(({ nome }) => <Text>Nome: {nome}</Text>);
		Lance.mockImplementation(({ valor }) => <Text>Valor: {valor}</Text>);
		EnviaLance.mockImplementation(({ enviaLance }) => (
			<TouchableWithoutFeedback onPress={enviaLance}>
				<Text>Enviar lance</Text>
			</TouchableWithoutFeedback>
		));
	});

  beforeEach(() => {
    jest.clearAllMocks();
  });

	it('deve renderizar lista de lances na tela', () => {
		const { getByText } = render(<Leilao />);

		expect(getByText('Valor: 500')).toBeTruthy();
		expect(getByText('Valor: 1000')).toBeTruthy();
		expect(getByText('Valor: 700')).toBeTruthy();
		expect(obtemLeilao).not.toHaveBeenCalled();
		expect(enviaLance).not.toHaveBeenCalled();
	});

	it('deve chamar enviaLance quando o lance for enviado e recarregar o leilão', async () => {
		const { getByText } = render(<Leilao />);

		fireEvent.press(getByText('Enviar lance'));

		expect(mockEnviaLance).toHaveBeenCalledTimes(1);
		expect(mockObtemLeilao).not.toHaveBeenCalled();

		await waitFor(() => {
			expect(mockObtemLeilao).toHaveBeenCalledTimes(1);
		});
	});

	it('deve atualizar a lista quando recarrega a tela', async () => {
		const { getByTestId } = render(<Leilao />);
		const flatlist = getByTestId('flatlist-id');

		act(() => {
			flatlist.props.onRefresh();
		});

		await waitFor(() => expect(mockObtemLeilao).toHaveBeenCalledTimes(1));
	});
});
