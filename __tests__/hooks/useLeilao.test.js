import { act, renderHook } from '@testing-library/react-hooks';
import useLeilao from '../../src/hooks/useLeilao';
import { ENVIADO, INVALIDO, MENOR_OU_IGUAL_AOS_LANCES, MENOR_QUE_VALOR_INICIAL, NAO_ENVIADO } from '../../src/negocio/constantes/estadosLance';
import {
	adicionaLance,
	obtemLancesDoLeilao,
} from '../../src/repositorio/lance';
import { obtemLeilao } from '../../src/repositorio/leilao';

jest.mock('../../src/repositorio/lance');
jest.mock('../../src/repositorio/leilao');

const mockLeilao = {
	id: 1,
	nome: 'Leilão 1',
	descricao: 'Descrição 1',
	valorInicial: 100,
};

const mockLeilaoAtualizado = {
	id: 1,
	nome: 'Leilão 1 atualizado',
	descricao: 'Descrição 1 atualizada',
	valorInicial: 100,
};

const mockLancesDoLeilao = [
	{
		id: 1,
		valor: 200,
	},
];

const mockLancesDoLeilaoAtualizado = [
	{
		id: 1,
		valor: 200,
	},
	{
		id: 2,
		valor: 150,
	},
];

describe('hooks/useLeilao', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		obtemLeilao.mockReturnValue(mockLeilao);
		obtemLancesDoLeilao.mockReturnValue(mockLancesDoLeilao);
	});
	it('deve retornar o leilão como primeiro parâmetro', async () => {
		const { result, waitForNextUpdate } = renderHook(() => useLeilao(1));
		expect(result.current[0]).toEqual({});

		await waitForNextUpdate();
		expect(result.current[0]).toEqual({
			...mockLeilao,
			lances: mockLancesDoLeilao,
		});
	});

	it('deve retornar uma função pra atualizar o leilão como segundo parâmetro', async () => {
		const { result, waitForNextUpdate } = renderHook(() => useLeilao(1));
		await waitForNextUpdate();

		obtemLeilao.mockReturnValue(mockLeilaoAtualizado);
		obtemLancesDoLeilao.mockReturnValue(mockLancesDoLeilaoAtualizado);

		expect(result.current[0]).toEqual({
			...mockLeilao,
			lances: mockLancesDoLeilao,
		});

		await act(() => result.current[1]());

		expect(result.current[0]).toEqual({
			...mockLeilaoAtualizado,
			lances: mockLancesDoLeilaoAtualizado,
		});
	});

	describe('quando é feita uma tentativa de enviar lance, o terceiro parâmetro', () => {
		it('deve enviar um lance válido se for válido', async () => {
			adicionaLance.mockReturnValue(true);

			const { result, waitForNextUpdate } = renderHook(() => useLeilao(1));
			await waitForNextUpdate();

			let statusLance;
			await act(async () => (statusLance = await result.current[2]('300')));

			expect(statusLance).toEqual(ENVIADO);
			expect(adicionaLance).toHaveBeenCalledWith({
				leilaoId: mockLeilao.id,
				valor: 300,
			});
		});

		it('deve rejeitar o lance caso o valor não for numérico', async () => {
			const { result, waitForNextUpdate } = renderHook(() => useLeilao(1));
			await waitForNextUpdate();

			let statusLance;
			await act(async () => (statusLance = await result.current[2]('a')));

			expect(statusLance).toEqual(INVALIDO);
			expect(adicionaLance).not.toHaveBeenCalled();
		});

    it('deve rejeitar o lance caso o valor for menor ou igual a outros lances', async () => {
			const { result, waitForNextUpdate } = renderHook(() => useLeilao(1));
			await waitForNextUpdate();

			let statusLance;
			await act(async () => (statusLance = await result.current[2]('110')));

			expect(statusLance).toEqual(MENOR_OU_IGUAL_AOS_LANCES);
			expect(adicionaLance).not.toHaveBeenCalled();
		});

    it('deve rejeitar o lance caso o valor for menor que o valor inicial', async () => {
			const { result, waitForNextUpdate } = renderHook(() => useLeilao(1));
			await waitForNextUpdate();

			let statusLance;
			await act(async () => (statusLance = await result.current[2]('50')));

			expect(statusLance).toEqual(MENOR_QUE_VALOR_INICIAL);
			expect(adicionaLance).not.toHaveBeenCalled();
		});

    it('deve rejeitar o lance caso adicionaLance retornar false', async () => {
			adicionaLance.mockReturnValue(false);

			const { result, waitForNextUpdate } = renderHook(() => useLeilao(1));
			await waitForNextUpdate();

			let statusLance;
			await act(async () => (statusLance = await result.current[2]('300')));

			expect(statusLance).toEqual(NAO_ENVIADO);
			expect(adicionaLance).toHaveBeenCalledWith({
				leilaoId: mockLeilao.id,
				valor: 300,
			});
		});
	});
});
