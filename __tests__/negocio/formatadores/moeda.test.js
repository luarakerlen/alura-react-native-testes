import { formataBrasileiroParaDecimal } from '../../../src/negocio/formatadores/moeda';

describe('negocio/formatadores/moeda', () => {
	describe('formataBrasileiroParaDecimal', () => {
		it('deve retornar 8.59 quando o valor for "8,59"', () => {
			const resultado = formataBrasileiroParaDecimal('8,59');
			expect(resultado).toBe(8.59);
		});
	});
});
