$(document).ready(function(){
//    $.ajax({
//        type: 'GET',
//        url: 'http://0.0.0.0:5001/api/v1/status/',
//        method: 'GET',
//        success: function(res){
//            if (res.status === 'ok'){
//                $('#api_status').addClass('available');
//            } else {
//                $('#api_status').removeClass('available');
//            }
//        },
//    });

     $.get('http://0.0.0.0:5001/api/v1/status/', function(res) {
        if (res.status === 200) {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
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
