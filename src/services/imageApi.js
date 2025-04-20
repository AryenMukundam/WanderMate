const API_KEY = '-_2Q8ICCIebOD0gB5GBPj4WTzZQraMZJRDH_cHKIXrg';
const BASE_URL = 'https://api.unsplash.com/search/photos';

/**
 * 
 * @param {string} location 
 * @param {Object} options 
 * @param {number} options.width
 * @param {number} options.height 
 * @returns {Promise<string>}
 */
export const getCityImage = async (location, options = {}) => {
  try {
    const params = new URLSearchParams({
      query: `${location} city landscape`,
      per_page: 1,
      client_id: API_KEY,
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      // Get the image URL with width and height parameters
      // Unsplash allows dimension modifications using the &w= and &h= format
      let imageUrl = data.results[0].urls.regular;
      
      // Apply width and height transformations if specified
      if (options.width || options.height) {
        const url = new URL(imageUrl);
        if (options.width) {
          url.searchParams.set('w', options.width);
        }
        if (options.height) {
          url.searchParams.set('h', options.height);
        }
        return url.toString();
      }
      
      return imageUrl;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching city image:', error);
    return null;
  }
};

/**
 * Fallback function to get a placeholder image when API fails
 * @param {string} text - Text to display on the placeholder
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} - URL for a placeholder image
 */
export const getPlaceholderImage = (text, width = 800, height = 400) => {
  return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text || 'No Image')}`;
};