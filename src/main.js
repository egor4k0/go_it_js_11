import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
// src/main.js
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery } from './js/render-functions.js';


const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter a search query!', position: 'topRight' });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);

    if (data.hits.length === 0) {
      iziToast.info({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
  } catch (err) {
    iziToast.error({ message: 'Something went wrong. Please try again later.', position: 'topRight' });
  } finally {
    hideLoader();
  }
});
