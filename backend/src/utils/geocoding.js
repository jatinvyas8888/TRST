import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const getCoordinates = async (address) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;
    
    console.log('Geocoding URL:', url);
    console.log('Using API Key:', GOOGLE_MAPS_API_KEY);

    try {
        const response = await axios.get(url);
        console.log('Geocoding API Response:', response.data);
        
        if (response.data.status === "OK") {
            const { lat, lng } = response.data.results[0].geometry.location;
            console.log('Found coordinates:', { lat, lng });
            return { latitude: lat, longitude: lng };
        } else {
            console.log('Geocoding failed with status:', response.data.status);
            console.log('Error message:', response.data.error_message);
            return { latitude: null, longitude: null };
        }
    } catch (error) {
        console.error("Geocoding error:", error.response?.data || error.message);
        return { latitude: null, longitude: null };
    }
}; 