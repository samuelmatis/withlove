
/* Main function */

$(function() {

    $('.map').click(function(){

        var map = $('.map-box');
        var box = $(this).closest('.box');
        var instance = $(this);

        if( map.is(':visible') ) {

            if( box.find('.map-box').size() > 0 ) {
                if ( !map.is(':animated')) {
                    map.hide('slide', {direction: 'right'}, function() { instance.removeClass('active'); });
                }
            }
            else {
                if ( !map.is(':animated')) {
                    map.hide('slide', { direction: 'right'}, function() { map.parent().find('.map').removeClass('active'); box.prepend(map); instance.addClass('active'); map.show('slide', {direction: 'right'}, 1000); }, 1000 );
                }
            }

        }
        else {
            box.prepend(map);
            map.show('slide', {direction: 'right'}, function() { instance.addClass('active'); } );
        }

    });

});