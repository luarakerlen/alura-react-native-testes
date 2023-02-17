import { renderHook } from '@testing-library/react-hooks';
import useLeilao from '../../src/hooks/useLeilao';
import { obtemLancesDoLeilao } from '../../src/repositorio/lance';
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
});
