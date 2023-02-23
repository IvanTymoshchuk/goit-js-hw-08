// Add imports above this line
import { galleryItems } from './gallery-items';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainerEl = document.querySelector('.gallery');
const imagesEl = createGalleryImg(galleryItems);
galleryContainerEl.insertAdjacentHTML('beforeend', imagesEl);

function createGalleryImg(item) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<ul class="gallery">
        <li>
 <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
</li>
</ul>`;
    })
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionType: 'alt',
});
