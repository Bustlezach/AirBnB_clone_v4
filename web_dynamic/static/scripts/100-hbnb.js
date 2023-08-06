$(document).ready(function () {

  const states = {};
  const cities = {};
  const amenities = {};

  $('#states > li > input[type="checkbox"]').change(function() {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    
    if (this.checked) {
      states[id] = name;
    } else {
      delete states[id];
    }
    
    updateLocations();
  });

  $('#cities > li > input[type="checkbox"]').change(function() {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    
    if (this.checked) {
      cities[id] = name;
    } else {
      delete cities[id];
    }
    
    updateLocations();
  });

  $('button').click(function() {
    $.ajax({
      url: '/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        'states': Object.keys(states),
        'cities': Object.keys(cities),
        'amenities': Object.keys(amenities),
      }),
      success: res,
    });
  });

  function updateLocations() {
    const locations = Object.assign({}, states, cities);
    const locationsText = Object.values(locations).join(', ');

    if (Object.values(locations).length === 0) {
      $('.locations h4').html('&nbsp;');
    } else {
      $('.locations h4').text(locationsText);
    }
  }

  function res(data) {
    $('SECTION.places').empty();
    const articles = data.map(place => `
      <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">
            ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
          </div>
          <div class="number_rooms">
            ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}
          </div>
          <div class="number_bathrooms">
            ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}
          </div>
        </div>
        <div class="description">${place.description}</div>
      </article>
    `);

    $('SECTION.places').append(articles.join(''));
  }


  const amenityId = {};
  const limitStr = (strInput) => {
    if (strInput.length < 20) {
      return (strInput);
    }
    return (strInput.slice(0, 30) + '...');
  };
  const renderAmenity = (data = {}) => {
    const sectionPlaces = $('section.places');
    $.ajax({
      type: 'POST',
      url: '/api/v1/places_search/',
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ amenities: Object.keys(data) }),
      success: (places) => {
        const amenityPlaces = places.map(place => (`
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">
                                ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
                            </div>
                            <div class="number_rooms">
                                ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}
                            </div>
                            <div class="number_bathrooms">
                                ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}
                            </div>
                        </div>
                        <div class="description">${place.description}</div>
            </article>`));
        sectionPlaces.html(amenityPlaces);
      }
    });
  };

  $.get('http://0.0.0.0:5001/api/v1/status', function (res) {
    if (res.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  renderAmenity();

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
  $('section.filters>button').on('click', () => renderAmenity(amenityId));
});
