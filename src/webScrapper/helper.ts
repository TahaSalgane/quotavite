import axios from 'axios';

export const httpResponse = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (Exception) {
        return null;
    }
};
