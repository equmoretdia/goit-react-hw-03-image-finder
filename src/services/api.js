import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '40252258-b27561441daedadb4fc814a5c';
const imageType = 'photo';
const orientation = 'horizontal';
const picturesPerPage = 40;

export default async function fetchPictures(query, page) {
  const response = await axios(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=${imageType}&orientation=${orientation}&per_page=${picturesPerPage}`
  );
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.status);
  }
  const pictures = response.data;
  console.log(pictures);
  return pictures;
}
