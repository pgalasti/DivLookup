// API Service for fetching data from local Flask backend

/**
 * Search for companies by query string.
 * @param {string} query 
 * @returns {Promise<Array<{ticker: string, name: string}>>}
 */
export const searchCompanies = async (query) => {
    if (!query) return [];
    try {
        const response = await fetch(`/api/companies?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error searching companies:", error);
        return [];
    }
};

/**
 * Get company details and dividend history.
 * @param {string} ticker 
 * @returns {Promise<{ticker: string, name: string, dividends: Array<{date: string, amount: number}>}>}
 */
export const getCompanyDetails = async (ticker) => {
    try {
        const response = await fetch(`/api/companies/${ticker}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error(`Error fetching details for ${ticker}:`, error);
        throw error;
    }
};
