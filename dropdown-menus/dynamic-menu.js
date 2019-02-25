$(document).ready(function () {
    //PARENT MENU LINKS behavior
    $('.parentmenu').hover(
        function () {
            $('.mnu').hide(); //start by hiding all other menu panels that may be displayed
            var div = $(this).attr('data-menuid');
            $('#' + div).css('left', $(this).position().left + 'px');
            $('#' + div).css('top', eval(Math.floor($(this).offset().top) + $(this).outerHeight(false)) + 'px');
            $('#' + div).fadeIn(); //using .fadeIn instead of .show allows mouseover event to trigger directly after mouseout
        }, function (e) {
            var bottom = eval(Math.floor($(this).offset().top) + $(this).outerHeight(false));
            if (e.pageY < eval(bottom)) //all but bottom
                $('.mnu').fadeOut();
        }
    );

    //MENU PANELS - hide menu panels if exit via TOP or BOTTOM
    $('.mnu').mouseleave(function (e) {
        var top = Math.floor($(this).offset().top);
        var bottom = eval(top + $(this).outerHeight(true));
        if (e.pageY <= eval(top) || e.pageY >= eval(bottom))
            $('.mnu').fadeOut();
    });

    //MENU ITEMS, hide menu panels when exiting LEFT or RIGHT edge (except if submenu or first item in submenu)
    $('.mnuitem').mouseleave(function (e) {
        var left = $(this).offset().left;
        var right = eval(left + $(this).outerWidth(true));
        if (e.pageX <= eval(left) && $(this).hasClass('closeparent')) //left edge - close parent and submenu
            $('.mnu').fadeOut();
        else if (e.pageX <= eval(left) && $(this).is('[data-submenuid]')) //left edge - close all
            $('.mnu').fadeOut();
        else if (e.pageX >= eval(right) && !$(this).is('[data-submenuid]')) //right edge - don't close if there's a sub-menu
            $('.mnu').fadeOut();
        else if (e.pageX <= eval(left) && !$(this).hasClass('submenustayopen')) //left edge - close main menu
            $(this).parent('.mnu').fadeOut();
    });

    $('div[data-submenuid]').addClass('submenu').hover(
        function () {
            //show sub-menu
            var div = $(this).attr('data-submenuid');
            $('#' + div).css('left', $(this).parent('.mnu').position().left + $(this).parent('.mnu').width() + 'px');
            $('#' + div).css('top', $(this).parent('.mnu').position().top + $(this).position().top + 'px');
            $('#' + div).fadeIn();

            //mark submenu items that should NOT hide panels on exit left
            var menuItemsCount = $(this).parent('.mnu').find('div').length;
            var submenuItemsCount = $('#' + div + ' > div').length;
            var curIdx = $('div.mnuitem').index(this);
            var numToMark = eval(menuItemsCount) - eval(curIdx) - 1;
            if (eval(numToMark) > eval(submenuItemsCount))
                numToMark = submenuItemsCount;
            $('#' + div + ' div:gt(' + numToMark + ')').addClass('closeparent');
            $('#' + div + ' div').first().addClass('submenustayopen');
            //--- end marking submenu items ---
        }, function (e) {
            //hide sub-menu only, not parent
            var div = $(this).attr('data-submenuid');
            var top = Math.floor($(this).offset().top);
            var bottom = eval(top + $(this).outerHeight(false));
            if (e.pageY <= eval(top) || e.pageY >= eval(bottom)) //exit top or bottom
                $('#' + div).fadeOut();
        }
    );
});
