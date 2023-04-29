import { galleryItems } from './gallery-items.js';

const instance = basicLightbox.create(`
        <img
        class="gallery__image"
        src=''/>`);
    
const imgEl = instance.element().querySelector('.gallery__image');
const galleryListEl = document.querySelector('.gallery');

galleryListEl.insertAdjacentHTML("afterbegin", createGalleryItems(galleryItems));
galleryListEl.addEventListener('click', onGalleryListElClick);

function createGalleryItems(galleryItems) {
   return galleryItems.map(galleryItem => {
        return `<li class="gallery__item">
  <a class="gallery__link" href="${galleryItem.original}">
    <img
      class="gallery__image"
      src="${galleryItem.preview}"
      data-source="${galleryItem.original}"
      alt="${galleryItem.description}"
    />
  </a>
</li>`
    }).join('');
};

function onGalleryListElClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    createAndShowModal(e);
    window.addEventListener('keydown', onModalKeyDownEsc);
};

function createAndShowModal(event) {
    imgEl.attributes.src.value = `${event.target.dataset.source}`;
    instance.show();
};

function onModalKeyDownEsc(event) {
        if (event.key === 'Escape') {
            instance.close();
            window.removeEventListener('keydown', onModalKeyDownEsc);
        }
};