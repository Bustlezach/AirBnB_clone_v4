$(document).ready(function(){
//    $.ajax({
//        type: 'GET',
//        url: 'http://0.0.0.0:5001/api/v1/places_search/',
//        method: 'GET',
//        success: function(res){
//            if (res.status === 'ok'){
//                $('#api_status').addClass('available');
//            } else {
//                $('#api_status').removeClass('available');
//            }
//        },
//    });

     $.get('http://0.0.0.0:5001/api/v1/places_search/', function(res) {
        if (res.status === 200) {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });


    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({}),
        success: function(response) {
            const places = response.places;
            const sectionPlaces = $('section.places');
    
            places.forEach(place => {
                const article = `
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
                    </article>`;
                
                sectionPlaces.append(article);
            });
        },
    });
    

    const amenities = {};

    $('.amenities input[type="checkbox"]').change(function(){
        if ($(this).is(':checked')){
            amenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenities[$(this).data('id')];
        }
        $('.amenities h4').text(Object.values(amenities).join(', '));
    });
});
