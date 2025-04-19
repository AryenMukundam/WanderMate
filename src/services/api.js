const API_KEY = '5ae2e3f221c38a28845f05b66890f0af77db3220bd80e64d949f7691'; 

// Fetch destinations from the API
export async function searchDestinations(query) {
  try {
    const response = await fetch(
      `https://api.opentripmap.com/0.1/en/places/geoname?name=${query}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
}

// Get destination details from the API
export async function getDestinationDetails(xid) {
  try {
    const response = await fetch(
      `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching destination details:', error);
    throw error;
  }
}

// Get attractions near a destination
export async function getAttractions(lat, lon, radius = 1000, limit = 10) {
  try {
    const response = await fetch(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&limit=${limit}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching attractions:', error);
    throw error;
  }
}