import { galleryItems } from './gallery-items.js';

let instance;
const galleryListEl = document.querySelector('.gallery');
galleryListEl.insertAdjacentHTML("afterbegin", galleryItemCreate(galleryItems));
galleryListEl.addEventListener('click', onGalleryListElClick);

function galleryItemCreate(galleryItems) {
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
    instance = basicLightbox.create(`
    <div class="modal">
        <img 
         class="gallery__image"
         src='${event.target.dataset.source}'
        />
    </div>`);

    instance.show();
};

function onModalKeyDownEsc(event) {
        if (event.key === 'Escape') {
            instance.close();
            window.removeEventListener('keydown', onModalKeyDownEsc);
        }
};