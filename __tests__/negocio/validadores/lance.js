import {
	validaFormatoNumericoDoLance,
	validaLance,
} from '../../../src/negocio/validadores/lance';

describe('negocio/validadores/lance', () => {
	describe('validaFormatoNumericoDoLance', () => {
		it('deve retornar "Lance válido" para um valor válido de lance', () => {
			const resultado = validaFormatoNumericoDoLance('1000,99');
			expect(resultado).toBe('Lance válido');
		});

		it('deve retornar "Lance inválido" para um valor inválido de lance', () => {
			const resultado = validaFormatoNumericoDoLance('10.50');
			expect(resultado).toBe(
				'Lance inválido, digite um valor como: "100" ou "99,99"'
			);
		});
	});

	describe('validaLance', () => {
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
		const valorInicial = 100;

		it('deve retornar "Lance menor que o valor inicial" quando o lance for menor do que o valor inicial', () => {
			const resultado = validaLance(50, { lances, valorInicial });
			expect(resultado).toBe('Lance menor que o valor inicial');
		});

		it('deve retornar "Lance menor que o maior lance já realizado" quando o lance for menor ou igual aos já existentes', () => {
			const resultado = validaLance(1300, { lances, valorInicial });
			expect(resultado).toBe('Lance menor que o maior lance já realizado');
		});

		it('deve retornar "Lance válido" quando o lance for maior do que os já existentes', () => {
			const resultado = validaLance(2000, { lances, valorInicial });
			expect(resultado).toBe('Lance válido');
		});
	});
});
