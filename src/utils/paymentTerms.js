// Payment Terms Configuration

/**
 * Default payment terms structure for solar installations
 * Can be customized per project
 */
export const DEFAULT_PAYMENT_TERMS = [
    {
        stage: 1,
        percentage: 10,
        label: 'Advance',
        description: 'Initial advance payment'
    },
    {
        stage: 2,
        percentage: 60,
        label: 'Procurement',
        description: 'Upon procurement of materials'
    },
    {
        stage: 3,
        percentage: 10,
        label: 'On installation',
        description: 'Upon completion of installation'
    },
    {
        stage: 4,
        percentage: 10,
        label: 'Net metering',
        description: 'Upon net metering approval'
    }
];

/**
 * Calculate payment amounts based on total cost
 * @param {number} totalCost - Total project cost
 * @param {Array} terms - Payment terms array (optional, uses defaults if not provided)
 * @returns {Array} Payment schedule with amounts
 */
export const calculatePaymentSchedule = (totalCost, terms = DEFAULT_PAYMENT_TERMS) => {
    return terms.map(term => ({
        ...term,
        amount: Math.round((totalCost * term.percentage) / 100)
    }));
};
