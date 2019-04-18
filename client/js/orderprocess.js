function showSection(nextSection, currentSection) {
  var x = document.getElementById(nextSection);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

  var y = document.getElementById(currentSection);
  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }
}

function showSubmitButton() {
  var s = document.getElementById('submitButton');
  if (s.style.display === "none") {
    s.style.display = "block";
  }
}


//Input Validation Source: https://stackoverflow.com/questions/5614399/disabling-submit-button-until-all-fields-have-values

//****************Material Select Input***********************************************

var $matInputForm = $('input:radio'),
    $matSelectNext = $('#matSelectNext');

$matSelectNext.attr('disabled', true);
$matInputForm.change(function () {
    var trigger1 = false;
    $matInputForm.each(function () {
        if (!$(this).val()) {
            trigger1 = true;
        }
    });
    trigger1 ? $matSelectNext.attr('disabled', true) : $matSelectNext.removeAttr('disabled');
});

//****************Photo Select Input***********************************************

var $fileInputForm = $('input:file'),
    $fileSelectNext = $('#fileSelectNext');

$fileSelectNext.attr('disabled', true);
$fileInputForm.change(function () {
    var trigger2 = false;
    $fileInputForm.each(function () {
        if (!$(this).val()) {
            trigger2 = true;
        }
    });
    trigger2 ? $fileSelectNext.attr('disabled', true) : $fileSelectNext.removeAttr('disabled');
});

//***************Shipping Info Input**********************************************

var $shipInput = $('input:text'),
    $shipInfoNext = $('#shipInfoNext');

$shipInfoNext.attr('disabled', true);
$shipInput.keyup(function () {
    var trigger3 = false;
    $shipInput.each(function () {
        if (!$(this).val()) {
            trigger3 = true;
        }
    });
    trigger3 ? $shipInfoNext.attr('disabled', true) : $shipInfoNext.removeAttr('disabled');
});



