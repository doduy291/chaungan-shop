var number = document.getElementById('num-product');
// Listen for input event on numInput.
number.onkeydown = function (e) {
  // Number Numpad
  if (
    !(
      (e.keyCode > 96 && e.keyCode < 106) ||
      //Number Keyboard
      (e.keyCode > 48 && e.keyCode < 58) ||
      e.keyCode == 8
    )
  ) {
    return false;
  }
};
