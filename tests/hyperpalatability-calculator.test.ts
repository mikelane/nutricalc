import { isHyperpalatable } from 'src/lib/hyperpalatability-calculator';
import { describe, expect, it } from 'vitest';

describe('Hyperpalatable food calculator', () => {
	const name = 'Hyperpalatable food';
	const brand = 'Test Brand';

	describe('Non-hyperpalatable food', () => {
		const name = 'Non-hyperpalatable food';
		describe('FSOD', () => {
			it('is not hyperpalatable if fat ratio is within range but the sodium ratio is out of range', () => {
				expect(
					isHyperpalatable({
						name,
						brand,
						servingWeight: 500,
						calories: 1000,
						totalCarbohydrates: 100,
						totalSugars: 10,
						totalFat: 1,
						sodium: 10000
					})
				).toStrictEqual({
					isHyperpalatable: false,
					name: name,
					notes: []
				});
			});

			it('is not hyperpalatable if fat ratio is outside range but the sodium ratio is within range', () => {
				expect(
					isHyperpalatable({
						name,
						brand,
						servingWeight: 500,
						calories: 1000,
						totalCarbohydrates: 1,
						totalSugars: 1,
						totalFat: 35,
						sodium: 1
					})
				).toStrictEqual({
					isHyperpalatable: false,
					name: name,
					notes: []
				});
			});
		});

		describe('FS', () => {
			it('is not hyperpalatable if fat ratio is within range but the sugar ratio is out of range', () => {
				expect(
					isHyperpalatable({
						name,
						brand,
						servingWeight: 500,
						calories: 1000,
						totalCarbohydrates: 100,
						totalSugars: 1000,
						totalFat: 1,
						sodium: 10000
					})
				).toStrictEqual({
					isHyperpalatable: false,
					name: name,
					notes: []
				});
			});

			it('is not hyperpalatable if fat ratio is outside range but the sugar ratio is within range', () => {
				expect(
					isHyperpalatable({
						name,
						brand,
						servingWeight: 500,
						calories: 1000,
						totalCarbohydrates: 1,
						totalSugars: 1,
						totalFat: 1000,
						sodium: 1
					})
				).toStrictEqual({
					isHyperpalatable: false,
					name: name,
					notes: []
				});
			});
		});

		describe('CSOD', () => {
			it('is not hyperpalatable if carbohydrate ratio is within range but the sodium ratio is out of range', () => {
				expect(
					isHyperpalatable({
						name,
						brand,
						servingWeight: 500,
						calories: 1000,
						totalCarbohydrates: 1,
						totalSugars: 10,
						totalFat: 1,
						sodium: 1000
					})
				).toStrictEqual({
					isHyperpalatable: false,
					name: name,
					notes: []
				});
			});

			it('is not hyperpalatable if carbohydrate ratio is outside range but the sodium ratio is within range', () => {
				expect(
					isHyperpalatable({
						name,
						brand,
						servingWeight: 500,
						calories: 1000,
						totalCarbohydrates: 1000,
						totalSugars: 1,
						totalFat: 35,
						sodium: 1
					})
				).toStrictEqual({
					isHyperpalatable: false,
					name: name,
					notes: []
				});
			});
		});
	});

	describe('Hyperpalatable food', () => {
		it('is FSOD hyperpalatable', () => {
			expect(
				isHyperpalatable({
					name,
					brand,
					servingWeight: 100,
					calories: 1000,
					totalCarbohydrates: 1,
					totalSugars: 1,
					totalFat: 1000,
					sodium: 300
				})
			).toStrictEqual({
				isHyperpalatable: true,
				name: name,
				notes: ['Outside FSOD range']
			});
		});

		it('is FSOD and FS hyperpalatable', () => {
			expect(
				isHyperpalatable({
					name,
					brand,
					servingWeight: 100,
					calories: 1000,
					totalCarbohydrates: 1,
					totalSugars: 1000,
					totalFat: 1000,
					sodium: 300
				})
			).toStrictEqual({
				isHyperpalatable: true,
				name: name,
				notes: ['Outside FSOD range', 'Outside FS range']
			});
		});

		it('is FSOD and CSOD hyperpalatable', () => {
			expect(
				isHyperpalatable({
					name,
					brand,
					servingWeight: 100,
					calories: 1000,
					totalCarbohydrates: 1000,
					totalSugars: 1,
					totalFat: 1000,
					sodium: 500
				})
			).toStrictEqual({
				isHyperpalatable: true,
				name: name,
				notes: ['Outside FSOD range', 'Outside CSOD range']
			});
		});

		it('is FS hyperpalatable', () => {
			expect(
				isHyperpalatable({
					name,
					brand,
					servingWeight: 500,
					calories: 1000,
					totalCarbohydrates: 1,
					totalSugars: 1000,
					totalFat: 1000,
					sodium: 1
				})
			).toStrictEqual({
				isHyperpalatable: true,
				name,
				notes: ['Outside FS range']
			});
		});

		it('is CSOD hyperpalatable', () => {
			expect(
				isHyperpalatable({
					name,
					brand,
					servingWeight: 100,
					calories: 1000,
					totalCarbohydrates: 1000,
					totalSugars: 1,
					totalFat: 1,
					sodium: 500
				})
			).toStrictEqual({
				isHyperpalatable: true,
				name: name,
				notes: ['Outside CSOD range']
			});
		});

		it('is FSOD, FS, and CSOD hyperpalatable', () => {
			expect(
				isHyperpalatable({
					name,
					brand,
					servingWeight: 100,
					calories: 1000,
					totalCarbohydrates: 1000,
					totalSugars: 1000,
					totalFat: 1000,
					sodium: 500
				})
			).toStrictEqual({
				isHyperpalatable: true,
				name: name,
				notes: ['Outside FSOD range', 'Outside FS range', 'Outside CSOD range']
			});
		});
	});
});
