import axios from 'axios';

const API_KEY = '39074542-79d6f6cab525b018e6eb706a0';

axios.defaults.baseURL = 'https://pixabay.com';

const fetchImages = async (query, page = 1) => {
  const response = await axios.get('/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      page,
      per_page: 12,
      orientation: 'horizontal',
    },
  });

  return response.data;
};

export default fetchImages;