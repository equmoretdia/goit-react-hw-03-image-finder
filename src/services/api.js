import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '40252258-b27561441daedadb4fc814a5c',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export default async function fetchPictures(query, page) {
  try {
    const response = await axiosInstance({
      params: {
        q: query,
        page: page,
      },
    });
    const pictures = response.data;
    console.log(pictures);
    return pictures;
  } catch (error) {
    throw error;
  }
}
