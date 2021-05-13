$(document).ready(function () {
  // DO POST
  const colors = document.querySelectorAll('.color');
  const sizes = document.querySelectorAll('.size');

  function changeColor() {
    colors.forEach((c) => c.classList.remove('color-active'));
    this.classList.add('color-active');
  }

  function changeSize() {
    sizes.forEach((size) => size.classList.remove('size-active'));
    this.classList.add('size-active');
  }

  colors.forEach((c) => c.addEventListener('click', changeColor));
  sizes.forEach((size) => size.addEventListener('click', changeSize));

  $('.color, .size').click(function (e) {
    e.preventDefault();
    var colorsp = $('.color.color-active').data('color');
    var sizesp = $('.size.size-active').text();
    var tensanpham = $('#tensanpham').val();

    if (colorsp || sizesp !== undefined || '') {
      var priceCondition = {
        sizesp: sizesp,
        colorsp: colorsp,
        tensanpham: tensanpham,
      };

      $.ajax({
        url: '/product-detail/get-price-size-color',
        method: 'post',
        dataType: 'json',
        data: { pricecondition: priceCondition },
        success: function (data) {
          const formatter = new Intl.NumberFormat({
            minimumFractionDigits: 0,
          });
          if (data.dataPrice.giabanle !== null) {
            $('#getPriceSizeColor').replaceWith(
              '<span class="cl2" style="font-size: 18px;" id="getPriceSizeColor">' +
                formatter.format(data.dataPrice.giabanle) +
                ' VNĐ </span>'
            );

            $('.getImageSizeColor').attr(
              'data-thumb',
              'data:image/jpeg;base64,' + data.dataImage
            );
            $('.getImageSizeColor .wrap-pic-w img').attr(
              'src',
              'data:image/jpeg;base64,' + data.dataImage
            );
            $('.getImageSizeColor .wrap-pic-w a').attr(
              'href',
              'data:image/jpeg;base64,' + data.dataImage
            );
            $('li[role=presentation] img').attr(
              'src',
              'data:image/jpeg;base64,' + data.dataImage
            );
          }
          console.clear();
        },
        error: (error) => {
          console.log(JSON.stringify(error));
        },
      });
    }
  });

  $('.addcartbtn').click(function (e) {
    e.preventDefault();
    var spData = {
      sizesp: $('.size.size-active').text(),
      colorsp: $('.color.color-active').data('color'),
      soluong: $('#num-product').val(),
      tensanpham: $('#tensanpham').val(),
    };
    $.ajax({
      url: '/order/addtocart',
      method: 'post',
      dataType: 'json',
      data: { spdata: spData },
      success: function (response) {
        if (response.result == 'redirect') {
          //redirecting to main page from here.
          window.location.replace(response.url);
        }
        console.clear();
      },
      error: function (data) {
        $('#error-group').css('display', 'block');
        var errors = JSON.parse(data.responseText);
        var errorsContainer = $('#errors');
        errorsContainer.innerHTML = '';
        var errorsList = '';

        for (var i = 0; i < errors.length; i++) {
          if (errors[i].msg !== 'Invalid value') {
            errorsList += '<li>' + errors[i].msg + '</li>';
          }
        }
        errorsContainer.html(errorsList);
      },
      timeout: 5000,
    });
  });
});
