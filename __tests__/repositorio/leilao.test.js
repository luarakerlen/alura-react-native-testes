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

describe('repositorio/leilao', () => {
	describe('obtemLeiloes', () => {
		it('deve retornar uma lista de leilões', async () => {
			apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));

			const leiloes = await obtemLeiloes();
			expect(leiloes).toEqual(mockLeiloes);
		});
	});
});
