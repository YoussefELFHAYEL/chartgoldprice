// Weight conversions
export const GRAMS_PER_OZ = 31.1035;
export const GRAMS_PER_KG = 1000;

export type WeightUnit = 'oz' | 'gram' | 'kg';

export function convertToGrams(value: number, unit: WeightUnit): number {
    switch (unit) {
        case 'oz':
            return value * GRAMS_PER_OZ;
        case 'kg':
            return value * GRAMS_PER_KG;
        case 'gram':
        default:
            return value;
    }
}

export function convertFromGrams(grams: number, unit: WeightUnit): number {
    switch (unit) {
        case 'oz':
            return grams / GRAMS_PER_OZ;
        case 'kg':
            return grams / GRAMS_PER_KG;
        case 'gram':
        default:
            return grams;
    }
}

// Karat to purity conversion
export type Karat = '24K' | '22K' | '18K' | '14K';

export const KARAT_PURITY: Record<Karat, number> = {
    '24K': 0.999, // 99.9% pure
    '22K': 0.917, // 91.7% pure
    '18K': 0.750, // 75% pure
    '14K': 0.583, // 58.3% pure
};

export function calculateGoldValue(
    pricePerOz: number,
    weight: number,
    weightUnit: WeightUnit,
    karat: Karat
): number {
    // Convert everything to grams for calculation
    const weightInGrams = convertToGrams(weight, weightUnit);
    const pricePerGram = pricePerOz / GRAMS_PER_OZ;
    const purity = KARAT_PURITY[karat];

    return weightInGrams * pricePerGram * purity;
}
