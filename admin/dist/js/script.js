
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
                    map.hide('slide', { direction: 'right'}, function() { map.parent().find('.map').removeClass('active'); box.prepend(map); instance.addClass('active'); map.show('slide', {direction: 'right'}); });
                }
            }

        }
        else {
            box.prepend(map);
            map.show('slide', {direction: 'right'}, function() { instance.addClass('active'); } );
        }

    });

    $('.name-box').click(function(e) {
        if (e.target !== this) {
            e.stopPropagation();
        }
        else {
            var category = $(this).attr('data-category');

            var selected = $('.category.'+category);
            $('.category-picker').prepend(selected);

            fadeLI($('.category'), 0, $('.category').length);
        }

    });

    $('.category').click(function() {

        var element = $('.name-box');

        element.attr('class', '')
               .addClass('name-box')
               .addClass($(this).data('category'))
               .attr('data-category', $(this).data('category'));

        fadeLO($('.category'), 0, $('.category').length);
    });

    function fadeLI(elem, i, length) {
        if( i < length ) {
            elem.eq(i).fadeIn(100, function() { fadeLI(elem, i+1, length); });
        }
        else return false;

    }

    function fadeLO(elem, i, length) {
        if( i < length ) {
            elem.eq(length-1).fadeOut(100, function() { fadeLO(elem, 0, length-1); });
        }
        else return false;

    }
});