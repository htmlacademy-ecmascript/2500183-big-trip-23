export const markUpDestinationPhotos = (photos) => photos.length ? `<div class="event__photos-container">
<div class="event__photos-tape">
  ${photos.map((photo) => `<img class="event__photo" src= "${photo.src}" alt="${photo.description}">`).join('')}
</div>
</div>` : '';
