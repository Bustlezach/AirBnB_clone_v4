$(document).ready(function () {
  $.get('http://localhost/api/v1/status/', function (res) {
    if (res.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  const limitStr = (strInput) => {
    if (strInput.length < 20) {
      return (strInput);
    }
    return (strInput.slice(0, 30) + '...');
  };

  const amenityId = {};
  for (const amenityInput of $('li > input[type=checkbox]')) {
    $(amenityInput).on('click', (e) => {
      if (amenityInput.checked) {
        amenityId[$(amenityInput).attr('data-id')] = $(amenityInput).attr('data-name');
      } else {
        delete amenityId[$(amenityInput).attr('data-id')];
      }
      $('div.amenities > h4').text(limitStr(Object.values(amenityId).join(', ')));
    });
  }
});
