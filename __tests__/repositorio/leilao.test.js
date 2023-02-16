import { obtemLeilao, obtemLeiloes } from '../../src/repositorio/leilao';
import apiLeiloes from '../../src/servicos/apiLeiloes';

jest.mock('../../src/servicos/apiLeiloes');

const mockLeiloes = [
	{
		id: 1,
		nome: 'Leilão 1',
		descricao: 'Descrição 1',
	},
	{
		id: 2,
		nome: 'Leilão 2',
		descricao: 'Descrição 2',
	},
];

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

describe('repositorio/leilao', () => {
	beforeEach(() => {
		apiLeiloes.get.mockClear();
	});
	describe('obtemLeiloes', () => {
		it('deve retornar uma lista de leilões', async () => {
			apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));

			const leiloes = await obtemLeiloes();
			expect(leiloes).toEqual(mockLeiloes);
			expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
			expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
		});

		it('deve retornar uma lista vazia quando a requisição falhar', async () => {
			apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());

			const leiloes = await obtemLeiloes();
			expect(leiloes).toEqual([]);
			expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
			expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
		});
	});

	describe('obtemLeilao', () => {
		it('deve retornar um objeto leilao', async () => {
			apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes[0]));

			const leilao = await obtemLeilao(1);
			console.log(leilao);
			expect(leilao).toEqual(mockLeiloes[0]);
			expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes/1');
			expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
		});

		it('deve retornar um objeto vazio quando a requisição falhar', async () => {
			apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());

			const leilao = await obtemLeilao(10);
			expect(leilao).toEqual({});
			expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes/10');
			expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
		});
	});
});
