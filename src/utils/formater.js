/**
 * A utility function to format a numeric price into a currency string.
 * It adds commas for thousands and ensures two decimal places.
 * @param {string | number} price - The price to format.
 * @returns {string} The formatted price string (e.g., "$ 12,345.67").
 */
export const formatPrice = (price) => {
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) {
        return '$ 0.00';
    }
    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    // The formatter includes the currency symbol, but we'll use our own.
    return `$ ${formatter.format(priceNum).replace('$', '').trim()}`;
};
