import { formataMaiorLanceDoLeilao } from '../../../src/negocio/formatadores/lance';

describe('negocio/formatadores/lance', () => {
	describe('formataMaiorLanceDoLeilao', () => {
		it('deve retornar o maior lance quando receber uma array de lances', () => {
			const lances = [
				{
					valor: 1000,
					leilaoId: 1,
					id: 1,
				},
				{
					valor: 1500,
					leilaoId: 1,
					id: 2,
				},
				{
					valor: 500,
					leilaoId: 1,
					id: 3,
				},
			];
			const resultado = formataMaiorLanceDoLeilao(lances, 100);
			expect(resultado).toBe(1500);
		});
	});
});
