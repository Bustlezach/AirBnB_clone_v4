$(document).ready(function () {
  const filterObj = { states: {}, amenities: {}, cities: {} };
  const limitStr = (strInput) => {
    if (strInput.length < 20) {
      return (strInput);
    }
    return (strInput.slice(0, 30) + '...');
  };
  const renderAmenity = (data = {}) => {
    const filterData = {};
    for (const [key, value] of Object.entries(data)) {
      filterData[key] = Object.keys(value);
    }
    const sectionPlaces = $('section.places');
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search/',
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(filterData),
      success: (places) => {
        const filterPlaces = places.map(place => (`
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
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
        sectionPlaces.html(filterPlaces);
      }
    });
  };

  $.get('http://localhost:5001/api/v1/status', function (res) {
    if (res.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  renderAmenity();

  for (const amenityInput of $('.amenities li > input[type=checkbox]')) {
    $(amenityInput).on('click', (e) => {
      if (amenityInput.checked) {
        filterObj.amenities[$(amenityInput).attr('data-id')] = $(amenityInput).attr('data-name');
      } else {
        delete filterObj.amenities[$(amenityInput).attr('data-id')];
      }
      $('div.amenities > h4').text(limitStr(Object.values(filterObj.amenities).join(', ')));
    });
  }
  for (const stateInput of $('.locations li input[type=checkbox].state')) {
    $(stateInput).on('click', () => {
      if (stateInput.checked) {
        filterObj.states[$(stateInput).attr('data-id')] = $(stateInput).attr('data-name');
      } else {
        delete filterObj.states[$(stateInput).attr('data-id')];
      }
      $('div.locations > h4').text(Object.values(filterObj.states).join(', '));
    });
    for (const cityInput of $('.locations li input[type=checkbox].city')) {
      $(cityInput).on('click', (e) => {
        if (cityInput.checked) {
          filterObj.cities[$(cityInput).attr('data-id')] = $(cityInput).attr('data-name');
        } else {
          delete filterObj.cities[$(cityInput).attr('data-id')];
        }
      });
    }
  }
  $('section.filters>button').on('click', () => renderAmenity(filterObj));
  $(document).keypress((e) => {
    if (e.which === 13) { renderAmenity(filterObj); }
  });
});
