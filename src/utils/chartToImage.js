// Chart to Image Conversion Utility
// Converts Recharts components to PNG images for PDF embedding

import html2canvas from 'html2canvas';

/**
 * Convert a chart element to a base64 PNG image
 * @param {HTMLElement} chartElement - The DOM element containing the chart
 * @param {Object} options - html2canvas options
 * @returns {Promise<string>} Base64 encoded PNG image
 */
export const convertChartToImage = async (chartElement, options = {}) => {
    if (!chartElement) {
        throw new Error('Chart element is required');
    }

    const defaultOptions = {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: false,
        ...options
    };

    try {
        const canvas = await html2canvas(chartElement, defaultOptions);
        return canvas.toDataURL('image/png');
    } catch (error) {
        console.error('Error converting chart to image:', error);
        throw error;
    }
};

/**
 * Convert multiple charts to images
 * @param {Object} chartRefs - Object with chart references
 * @returns {Promise<Object>} Object with base64 images
 */
export const convertChartsToImages = async (chartRefs) => {
    const images = {};

    for (const [key, ref] of Object.entries(chartRefs)) {
        if (ref && ref.current) {
            images[key] = await convertChartToImage(ref.current);
        }
    }

    return images;
};
