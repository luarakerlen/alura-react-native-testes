import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import EnviaLance from '../../../../src/telas/Leilao/componentes/EnviaLance';
import {
	ENVIADO,
	NAO_ENVIADO,
} from '../../../../src/negocio/constantes/estadosLance';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('telas/Leilao/componentes/EnviaLance', () => {
	it('deve enviar o lance quando o botão for pressionado', async () => {
		const enviaLance = jest.fn(
			() => new Promise((resolve) => resolve(ENVIADO))
		);

		const { getByPlaceholderText, getByA11yHint, getByText } = render(
			<EnviaLance enviaLance={enviaLance} cor='blue' />
		);

		const input = getByPlaceholderText('R$');
		const botao = getByA11yHint('Enviar lance');

		fireEvent.changeText(input, '10');
		fireEvent.press(botao);

		await waitFor(() => expect(enviaLance).toHaveBeenCalledWith('10'));
		expect(getByText(ENVIADO)).toBeTruthy();
		expect(() => getByText(NAO_ENVIADO)).toThrow();
	});

  it('deve não enviar o lance quando o botão for pressionado', async () => {
		const enviaLance = jest.fn(
			() => new Promise((resolve) => resolve(NAO_ENVIADO))
		);

		const { getByPlaceholderText, getByA11yHint, getByText } = render(
			<EnviaLance enviaLance={enviaLance} cor='blue' />
		);

		const input = getByPlaceholderText('R$');
		const botao = getByA11yHint('Enviar lance');

		fireEvent.changeText(input, 'a');
		fireEvent.press(botao);

		await waitFor(() => expect(enviaLance).toHaveBeenCalledWith('a'));
		expect(getByText(NAO_ENVIADO)).toBeTruthy();
		expect(() => getByText(ENVIADO)).toThrow();
	});
});
