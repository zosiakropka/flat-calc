(function($) {

  var evaled = false;

  ////////////////////////////////////////////////////////////////////////////
  // Numbers
  var numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  for (var i in numbers) {
    var number_button = createButton('number', '' + numbers[i]).click(appendCallback);
    $("#numbers-container").append(number_button);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Delimiter
  var delimiter_button = createButton('delimiter', '.', true).click(appendCallback);
  $("#numbers-container").append(delimiter_button);

  ////////////////////////////////////////////////////////////////////////////
  // Basic operations
  var basic_operations = ['+', '-', '*', '/'];
  for (var i in basic_operations) {
    var basic_button = createButton('basic', basic_operations[i]).click(appendCallback);
    $("#basic-container").append(basic_button);
  }

  var summarize_button = createButton('summarize', '=', true).click(summarizeCallback);
  $("#advanced-container").append(summarize_button);

  ////////////////////////////////////////////////////////////////////////////
  // Advanced operations
  var advanced_operations = {
    sin: Math.sin,
    cos: Math.cos,
    ln: Math.log,
    pow: Math.pow
  };
  for (var fun in advanced_operations) {
    var advanced_button = createButton('advanced', fun).click(wrapAndEvalCallback);
    $("#advanced-container").append(advanced_button);
  }

  ////////////////////////////////////////////////////////////////////////////
  // StripLast button
  var strip_last_button= createButton('strip-last', '⌫', true).click(stripLastCallback);
  $("#advanced-container").append(strip_last_button);

  function createButton(group, value, id) {
    if (typeof id === 'undefined') {
      id = group + '-' + value;
    } else if (id === true) {
      id = group;
    }
    var button = document.createElement('input');
    button.type = 'button';
    button.class = group;
    button.id = id;
    button.value = value;

    return $(button).addClass(group);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Clear
  var clear_button = createButton('clear', 'C', true).click(clearCallback);
  $("#advanced-container").append(clear_button);
  
  ////////////////////////////////////////////////////////////////////////////
  // Callbacks
  function stripLastCallback(event) {
    if ($.inArray($("#display").val(), ["NaN", "Infinity", "-Infinity"]) > 0) {
      $("#display").val('');
    } else {
      $("#display").val($("#display").val().slice(0, -1));
    }
  }

  function appendCallback(event) {
    if ($.inArray($("#display").val(), ["NaN", "Infinity", "-Infinity"]) > 0) {
      $("#display").val('');
    }
    var next;
    try {
      if (evaled && $(event.target).hasClass('number')) {
        next = $(event.target).val();
      } else {
        next = $("#display").val() + '' + $(event.target).val();
      }
      eval(next + '' + 0);
      $("#display").val(next);
      evaled = false;
    } catch (err) {
    }
  }

  function summarizeCallback(event) {
    try {
      var result = eval($("#display").val());
      $("#display").val(result);
      evaled = true;
    } catch (err) {}
  }

  function wrapAndEvalCallback(event) {
    try {
      var current = $("#display").val();
      var operation = $(event.target).val();
      if (current) {
        var next = advanced_operations[operation](eval(current));
        $("#display").val(next);
        evaled = true;
      }
    } catch (err) {}
  }

 function clearCallback(event) {
   $("#display").val('');
 }

})(jQuery);