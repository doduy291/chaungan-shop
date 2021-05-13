(function ($) {
  'use strict';

  if (window.location.pathname === '/product') {
    sessionStorage.clear();
  }
  /*[ Load page ]
    ===========================================================*/
  $('.animsition').animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 1500,
    outDuration: 800,
    linkElement: '.animsition-link',
    loading: true,
    loadingParentElement: 'html',
    loadingClass: 'animsition-loading-1',
    loadingInner: '<div class="loader05"></div>',
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: ['animation-duration', '-webkit-animation-duration'],
    overlay: false,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: 'html',
    transition: function (url) {
      window.location.href = url;
    },
  });

  /*[ Back to top ]
    ===========================================================*/
  var windowH = $(window).height() / 2;

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > windowH) {
      $('#myBtn').css('display', 'flex');
    } else {
      $('#myBtn').css('display', 'none');
    }
  });

  $('#myBtn').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 300);
  });

  /*==================================================================
    [ Fixed Header ]*/
  var headerDesktop = $('.container-menu-desktop');
  var wrapMenu = $('.wrap-menu-desktop');

  if ($('.top-bar').length > 0) {
    var posWrapHeader = $('.top-bar').height();
  } else {
    var posWrapHeader = 0;
  }

  if ($(window).scrollTop() > posWrapHeader) {
    $(headerDesktop).addClass('fix-menu-desktop');
    $(wrapMenu).css('top', 0);
  } else {
    $(headerDesktop).removeClass('fix-menu-desktop');
    $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
  }

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > posWrapHeader) {
      $(headerDesktop).addClass('fix-menu-desktop');
      $(wrapMenu).css('top', 0);
    } else {
      $(headerDesktop).removeClass('fix-menu-desktop');
      $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
    }
  });

  /*==================================================================
    [ Menu mobile ]*/
  $('.btn-show-menu-mobile').on('click', function () {
    $(this).toggleClass('is-active');
    $('.menu-mobile').slideToggle();
  });

  var arrowMainMenu = $('.arrow-main-menu-m');

  for (var i = 0; i < arrowMainMenu.length; i++) {
    $(arrowMainMenu[i]).on('click', function () {
      $(this).parent().find('.sub-menu-m').slideToggle();
      $(this).toggleClass('turn-arrow-main-menu-m');
    });
  }

  $(window).resize(function () {
    if ($(window).width() >= 992) {
      if ($('.menu-mobile').css('display') == 'block') {
        $('.menu-mobile').css('display', 'none');
        $('.btn-show-menu-mobile').toggleClass('is-active');
      }

      $('.sub-menu-m').each(function () {
        if ($(this).css('display') == 'block') {
          console.log('hello');
          $(this).css('display', 'none');
          $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
        }
      });
    }
  });
  /*==================================================================
    [ Filter / Search product ]*/
  $('.js-show-search').on('click', function () {
    $(this).toggleClass('show-search');
    $('.panel-search').slideToggle(400);
  });

  /*==================================================================
    [ Cart ]*/
  $('.js-show-cart').on('click', function () {
    $('.js-panel-cart').addClass('show-header-cart');
  });

  $('.js-hide-cart').on('click', function () {
    $('.js-panel-cart').removeClass('show-header-cart');
  });

  /*==================================================================
    [ Cart ]*/
  $('.js-show-sidebar').on('click', function () {
    $('.js-sidebar').addClass('show-sidebar');
  });

  $('.js-hide-sidebar').on('click', function () {
    $('.js-sidebar').removeClass('show-sidebar');
  });

  /*==================================================================
    [ +/- num product ]*/
  $('.btn-num-product-down').on('click', function () {
    var numProduct = Number($(this).next().val());
    if (numProduct > 1)
      $(this)
        .next()
        .attr('value', numProduct - 1);
  });

  $('.btn-num-product-up').on('click', function () {
    var numProduct = Number($(this).prev().val());
    $(this)
      .prev()
      .attr('value', numProduct + 1);
  });

  /*==================================================================
    [ Rating ]*/
  $('.wrap-rating').each(function () {
    var item = $(this).find('.item-rating');
    var rated = -1;
    var input = $(this).find('input');
    $(input).val(0);

    $(item).on('mouseenter', function () {
      var index = item.index(this);
      var i = 0;
      for (i = 0; i <= index; i++) {
        $(item[i]).removeClass('zmdi-star-outline');
        $(item[i]).addClass('zmdi-star');
      }

      for (var j = i; j < item.length; j++) {
        $(item[j]).addClass('zmdi-star-outline');
        $(item[j]).removeClass('zmdi-star');
      }
    });

    $(item).on('click', function () {
      var index = item.index(this);
      rated = index;
      $(input).val(index + 1);
    });

    $(this).on('mouseleave', function () {
      var i = 0;
      for (i = 0; i <= rated; i++) {
        $(item[i]).removeClass('zmdi-star-outline');
        $(item[i]).addClass('zmdi-star');
      }

      for (var j = i; j < item.length; j++) {
        $(item[j]).addClass('zmdi-star-outline');
        $(item[j]).removeClass('zmdi-star');
      }
    });
  });
  /*==================================================================
    [ Header Active Selected ]*/
  // Header Menu
  var page = window.location.pathname;
  $('.main-menu')
    .find('a[href="' + page + '"]')
    .parent('li')
    .addClass('active-menu');

  /*==================================================================
    [ Product Filter Active Selected ]*/
  // Loai do
  // if (sessionStorage.getItem('ldFilter') == 'ldfilter-nam') {
  //   $('.ld-filter a').removeClass('filter-link-active');
  //   $('.ld-filter .ld-nam').addClass('filter-link-active');
  // }

  // $('.ld-filter .ld-nam').click(function () {
  //   sessionStorage.setItem('ldFilter', 'ldfilter-nam');
  //   $('.ld-filter a').removeClass('filter-link-active');
  //   $(this).addClass('filter-link-active');
  // });
  if (sessionStorage.getItem('clickTimKiem') == 'eventClickTimKiem') {
    $('.js-show-search').trigger('click');
  }
  $('.js-show-search').click(function () {
    sessionStorage.setItem('clickTimKiem', 'eventClickTimKiem');
  });

  $('.hang-filter a').click(function () {
    if (typeof Storage !== 'undefined') {
      sessionStorage.setItem('hangFilter', $(this).data('hang'));
    }
  });
  $('#' + sessionStorage.getItem('hangFilter')).addClass('tag-link-active');
  console.log(sessionStorage.getItem('hangFilter'))

  //Search Product
  var inputTimeout;
  function clickAutoSearch() {
    $('.auto-click-searchprd').trigger('click');
  }

  $('#quicksearch').keyup(function () {
    if (inputTimeout) {
      clearTimeout(inputTimeout);
    }
    inputTimeout = setTimeout(clickAutoSearch, 1000);
  });
})(jQuery);
