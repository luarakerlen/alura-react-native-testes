import {
	obtemLancesDoLeilao,
	adicionaLance,
} from '../../src/repositorio/lance';
import apiLeiloes from '../../src/servicos/apiLeiloes';

jest.mock('../../src/servicos/apiLeiloes');

const mockLances = [
	{
		id: 1,
		leilaoId: 1,
		valor: 1000,
	},
	{
		id: 2,
		leilaoId: 1,
		valor: 2000,
	},
];

const lance = {
	id: 3,
	leilaoId: 1,
	valor: 3000,
};

const mockRequisicao = (retorno) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: retorno,
			});
		}, 200);
	});
};

const mockRequisicaoErro = () => {
	return new Promise((_, reject) => {
		setTimeout(() => {
			reject();
		}, 200);
	});
};

describe('repositorio/lance', () => {
	beforeEach(() => {
		apiLeiloes.get.mockClear();
		apiLeiloes.post.mockClear();
	});
	describe('obtemLancesDoLeilao', () => {
		it('deve retornar uma lista de lances', async () => {
			apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLances));

			const leiloes = await obtemLancesDoLeilao(1);
			expect(leiloes).toEqual(mockLances);
			expect(apiLeiloes.get).toHaveBeenCalledWith(
				'/lances?leilaoId=1&_sort=valor&_order=desc'
			);
			expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
		});

		it('deve retornar uma lista vazia quando a requisição falhar', async () => {
			apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());

			const leiloes = await obtemLancesDoLeilao(1);
			expect(leiloes).toEqual([]);
			expect(apiLeiloes.get).toHaveBeenCalledWith(
				'/lances?leilaoId=1&_sort=valor&_order=desc'
			);
			expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
		});
	});

	describe('adicionaLance', () => {
		it('deve retornar true quando a requisição der certo', async () => {
			apiLeiloes.post.mockImplementation(() => mockRequisicao());

			const resultado = await adicionaLance(lance);
			expect(resultado).toBeTruthy();
			expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', lance);
			expect(apiLeiloes.post).toHaveBeenCalledTimes(1);
		});

		it('deve retornar false quando a requisição falhar', async () => {
			apiLeiloes.post.mockImplementation(() => mockRequisicaoErro());

			const resultado = await adicionaLance(lance);
			expect(resultado).toBeFalsy();
			expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', lance);
			expect(apiLeiloes.post).toHaveBeenCalledTimes(1);
		});
	});
});
