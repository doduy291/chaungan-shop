$(document).ready(function () {
  // DO POST
  $('#send-maxacnhan').click(function (e) {
    document.getElementById('count').style = 'color:red; font-weight: bold';
    var counter = 60;
    setInterval(function () {
      counter--;
      if (counter >= 0) {
        span = document.getElementById('count');
        span.innerHTML = counter;
        if (counter > 0) {
          $('#send-maxacnhan').prop('disabled', true);
        }
      }
      if (counter === 0) {
        $('#send-maxacnhan').prop('disabled', false);
        clearInterval(counter);
      }
    }, 1000);
    e.preventDefault();

    var hdkhData = {
      emailkh: $('#email-hdkh').text(),
      sohoadonkh: $('#sohoadon-hdkh').text(),
    };
    $.ajax({
      url: '/cart/send-cancel-code',
      method: 'post',
      dataType: 'json',
      data: { hdkhdata: hdkhData },
    });
  });
});
