$(document).ready(() => {
  const amenityId = {};
  for (const amenityInput of $('li > input[type=checkbox]')) {
    $(amenityInput).on('click', (e) => {
      if (amenityInput.checked) {
        amenityId[$(amenityInput).attr('data-id')] = $(amenityInput).attr('data-name');
      } else {
        delete amenityId[$(amenityInput).attr('data-id')];
      }
      $('div.amenities > h4').text(Object.values(amenityId).join(', '));
    });
  }
});
