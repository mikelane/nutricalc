const CALORIES_PER_GRAM_OF_CARBOHYDRATE = 4;
const CALORIES_PER_GRAM_OF_SUGAR = 4;
const CALORIES_PER_GRAM_OF_FAT = 9;

const formatter = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 4,
	maximumFractionDigits: 4
});

export interface Food {
	name: string;
	brand?: string;
	servingWeight: number;
	calories: number;
	totalCarbohydrates: number;
	totalSugars: number;
	totalFat: number;
	sodium: number;
}

export interface HyperpalatableResponse {
	isHyperpalatable: boolean;
	name: string;
	notes?: string[];
}

const getFatCalories = (fat: number): number => fat * CALORIES_PER_GRAM_OF_FAT;

const getCarbCalories = (carbs: number): number => carbs * CALORIES_PER_GRAM_OF_CARBOHYDRATE;

const getSugarCalories = (sugar: number): number => sugar * CALORIES_PER_GRAM_OF_SUGAR;

const getFatToCalorieRatio = (fatCalories: number, totalCalories: number): number =>
	parseFloat(formatter.format(fatCalories / totalCalories));

const getSodiumToWeightRatio = (sodium: number, weight: number): number =>
	parseFloat(formatter.format(sodium / 1000 / weight));

const isFsodFatToCalorieRatioInRange = (food: Food): boolean =>
	getFatToCalorieRatio(getFatCalories(food.totalFat), food.calories) < 0.25;

const isFsodSodiumToWeightRatioInRange = (food: Food): boolean =>
	getSodiumToWeightRatio(food.sodium, food.servingWeight) < 0.003;

const isSugarToCalorieRatioInRange = (food: Food): boolean =>
	getSugarCalories(food.totalSugars) / food.calories < 0.2;

const isFsFatToCalorieRatioInRange = (food: Food): boolean =>
	getFatToCalorieRatio(getFatCalories(food.totalFat), food.calories) < 0.2;

const isCsodCarbohydrateToCalorieRatioInRange = (food: Food): boolean =>
	getCarbCalories(food.totalCarbohydrates) / food.calories <= 0.4;

const isCsodSodiumToWeightRatioInRange = (food: Food): boolean =>
	getSodiumToWeightRatio(food.sodium, food.servingWeight) <= 0.003;

const isOutsideFsodRange = (food: Food): boolean =>
	!(isFsodFatToCalorieRatioInRange(food) || isFsodSodiumToWeightRatioInRange(food));

const isOutsideFsRange = (food: Food): boolean =>
	!(isFsFatToCalorieRatioInRange(food) || isSugarToCalorieRatioInRange(food));

const isOutsideCsodRange = (food: Food): boolean =>
	!(isCsodCarbohydrateToCalorieRatioInRange(food) || isCsodSodiumToWeightRatioInRange(food));

export const isHyperpalatable = (food: Food): HyperpalatableResponse => {
	const notes: string[] = [];

	if (isOutsideFsodRange(food)) {
		notes.push('Outside FSOD range');
	}

	if (isOutsideFsRange(food)) {
		notes.push('Outside FS range');
	}

	if (isOutsideCsodRange(food)) {
		notes.push('Outside CSOD range');
	}

	return {
		isHyperpalatable: notes.length > 0,
		name: food.name,
		notes
	};
};
