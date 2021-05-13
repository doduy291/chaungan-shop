// store filter for each group
var filters = [];

// quick search regex
var qsRegex;

// init Isotope
var $grid = $('.isotope-grid').isotope({
  itemSelector: '.isotope-item',
  layoutMode: 'fitRows',
  getSortData: {
    giabanthapcao: '.giaban parseInt',
    giabancaothap: '.giaban parseInt',
  },
  sortAscending: {
    giabanthapcao: true,
    giabancaothap: false,
  },
  filter: function () {
    var $this = $(this);
    var searchResult = qsRegex ? $this.text().match(qsRegex) : true;
    return searchResult;
  },
});

//Filter Price Comp
var filterFns = {
  // show if number is greater than 50

  priceless100: function () {
    var number = $(this).find('.giaban').text();
    return parseFloat(number.replace(/\,/g, ''), 10) < 100000;
  },
  price100200: function () {
    var number = $(this).find('.giaban').text();
    return (
      parseFloat(number.replace(/\,/g, ''), 10) >= 100000 &&
      parseFloat(number, 10) < 200000
    );
  },
  price200300: function () {
    var number = $(this).find('.giaban').text();
    return (
      parseFloat(number.replace(/\,/g, ''), 10) >= 200000 &&
      parseFloat(number, 10) < 300000
    );
  },
};

// Event Click

// bind sort button click
$('.menu-sort li').on('click', 'a', function () {
  var sortValue = $(this).data('sort-value');
  $grid.isotope({ sortBy: sortValue });
});

// bind filter button click
$('.price-filter li').on('click', 'a', function () {
  var filterValue = $(this).data('filter');
  // use filterFn if matches value
  filterValue = filterFns[filterValue] || filterValue;
  $grid.isotope({ filter: filterValue });
});

// Tag Filter

// change is-checked class on buttons
$('.tag-filter').on('click', 'a', function (event) {
  var $target = $(event.currentTarget);
  $target.toggleClass('tag-link-active');
  var isActived = $target.hasClass('tag-link-active');
  var filter = $target.data('tag');
  if (isActived) {
    addFilter(filter);
  } else {
    removeFilter(filter);
  }
  // filter isotope
  // group filters together, inclusive
  $grid.isotope({ filter: filters.join(',') });
});

function addFilter(filter) {
  if (filters.indexOf(filter) == -1) {
    filters.push(filter);
  }
}
function removeFilter(filter) {
  var index = filters.indexOf(filter);
  if (index != -1) {
    filters.splice(index, 1);
  }
}

// Filter link active
$('.menu-sort li a').on('click', function () {
  $('.menu-sort li a').removeClass('filter-link-active');
  $(this).addClass('filter-link-active');
});
$('.price-filter li a').on('click', function () {
  $('.price-filter li a').removeClass('filter-link-active');
  $(this).addClass('filter-link-active');
});

var $quicksearch = $('#quicksearch').keyup(
  debounce(function () {
    qsRegex = new RegExp($quicksearch.val(), 'gi');
    $grid.isotope();
  })
);
// debounce so filtering doesn't happen every millisecond
function debounce(fn, threshold) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout(timeout);
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply(_this, args);
    }
    timeout = setTimeout(delayed, threshold);
  };
}
