import axios from 'axios';

const API_URL = 'http://localhost:5001';

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
    }
};

export const getApplications = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/applications/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching applications:', error);
    }
};

export const submitApplication = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/applications`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error submitting application:', err);
        throw err;
    }
};


