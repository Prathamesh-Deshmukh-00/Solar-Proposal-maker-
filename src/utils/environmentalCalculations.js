// Environmental Impact Calculations for Solar Systems
// Based on standard solar industry metrics

/**
 * Calculate environmental impact metrics for a solar system
 * @param {number} annualGeneration - Annual energy generation in kWh
 * @returns {Object} Environmental impact metrics
 */
export const calculateEnvironmentalImpact = (annualGeneration) => {
    const YEARS = 30; // System lifetime
    const CO2_PER_KWH = 0.82; // kg CO2 offset per kWh (India grid average)
    const FOREST_PER_TON = 0.85; // metric tons CO2 absorbed per acre/year
    const COAL_PER_KWH = 0.4; // kg coal avoided per kWh

    const totalGeneration = annualGeneration * YEARS;

    return {
        // Total CO2 offset over system lifetime (metric tons)
        co2Offset: parseFloat(((totalGeneration * CO2_PER_KWH) / 1000).toFixed(2)),

        // Equivalent forest area per year (acres/year)
        forestEquivalent: parseFloat((((totalGeneration * CO2_PER_KWH) / 1000) / FOREST_PER_TON / YEARS).toFixed(2)),

        // Total coal burn avoided (metric tons)
        coalAvoided: parseFloat(((totalGeneration * COAL_PER_KWH) / 1000).toFixed(2))
    };
};
