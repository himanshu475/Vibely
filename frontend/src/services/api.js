import axios from "axios";

const api = axios.create({
    baseURL: 'https://vibely-2k9m.onrender.com/api',
});

// Helper function to handle common axios error structure defensively
const handleApiError = (err) => {
    // 1. Check if the error has a response object AND data property (4xx or 5xx from server)
    if (err.response && err.response.data) {
        // Throw the specific error object/message from the backend (e.g., {msg: 'User already exists'})
        throw err.response.data;
    }
    
   
    throw { msg: err.message || 'An unexpected network error occurred. Please check your connection.' };
};

export const registerUser = async (FormData) => {
    try {
        const res = await api.post('/auth/register', FormData);
        return res.data;
    } catch (err) {
        throw handleApiError(err);
    }
}

export const loginUser = async (FormData) => {
    try {
        const res = await api.post('/auth/login', FormData);
        return res.data;
    } catch (err) {
        throw handleApiError(err);
    }
}

export const updateUserProfile = async (FormData, token) => {
    try {
        const res = await api.patch('/auth/profile', FormData, {
            headers: {
                'x-auth-token': token,
            },
        });
        return res.data;
    } catch (err) {
        throw handleApiError(err);
    }
};


export const getUserProfile = async (token) => {
  try {
    const res = await api.get('/auth/me', {
      headers: {
        'x-auth-token': token,
      },
    });
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

// Fetch events with optional filters: city, category, tags (comma-separated string or array)
export const getEvents = async ({ token, city, category, tags } = {}) => {
  try {
    const params = {};

    if (city) params.city = city;
    if (category) params.category = category;

    if (tags && Array.isArray(tags) && tags.length) {
      params.tags = tags.join(',');
    } else if (typeof tags === 'string' && tags.trim()) {
      params.tags = tags;
    }

    const config = { params };

    if (token) {
      config.headers = { 'x-auth-token': token };
    }

    const res = await api.get('/events', config);

    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

// Create a new event
export const createEvent = async (data, token) => {
  try {
    const res = await api.post('/events', data, {
      headers: {
        'x-auth-token': token,
      },
    });
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

// Join an event
export const joinEvent = async (eventId, token) => {
  try {
    const res = await api.post(`/events/${eventId}/join`, null, {
      headers: {
        'x-auth-token': token,
      },
    });
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

// Get join requests for events hosted by the current user
export const getJoinRequests = async (token) => {
  try {
    const res = await api.get('/events/requests', {
      headers: {
        'x-auth-token': token,
      },
    });
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

// Accept a join request
export const acceptJoinRequest = async (eventId, userId, token) => {
  try {
    const res = await api.post(`/events/${eventId}/requests/${userId}/accept`, null, {
      headers: {
        'x-auth-token': token,
      },
    });
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

// Get events for current user (hosted and participating)
export const getMyEvents = async (token) => {
  try {
    const res = await api.get('/events/me', {
      headers: {
        'x-auth-token': token,
      },
    });
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};