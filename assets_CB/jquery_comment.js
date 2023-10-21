// <!-- jquery for disable / enable comment submit button Ver.2.2-->
// <!-- jquery for disable / enable comment submit button Ver.2.2-->


var fields = "#user_input, #comment_input";
var commentField = "#comment_input";
var submitButton = $('#submitButton');

$(fields).on('keyup', function() {
  if (allFilled()) {
    submitButton.removeAttr('disabled');
  } else {
    submitButton.attr('disabled', 'disabled');
  }
});

submitButton.on('click', function() {
  // Perform your submit logic here

  // Disable the submit button
  submitButton.attr('disabled', 'disabled');

  // Clear the textarea fields
  $(commentField).val('');
});

function allFilled() {
  var filled = true;
  $(fields).each(function() {
    if ($(this).val() == '') {
      filled = false;
      return false; // Exit the loop if any field is empty
    }
  });
  return filled;
}

// <!-- jquery for disable / enable comment Submit button End Here-->
// <!-- jquery for disable / enable comment Submit button End Here-->



// <!-- jquery for remaining textarea characters remaining Start Here-->
$(document).ready(function() {
var text_max = 200;
$('#textarea_feedback').html(text_max + '/200 characters');

$('#comment_input').keyup(function() {
    var text_length = $('#comment_input').val().length;
    var text_remaining = text_max - text_length;

    $('#textarea_feedback').html(text_remaining + '/200 characters');
});
});
// <!-- jquery for remaining textarea characters remaining End Here-->


    




// <!-- Jquery for Show / Hide more comments-->
// <!-- Jquery for Show / Hide more comments-->
// $(function() {
//   $(".comment-box").each(function(index) {
//     $(this).children(".user-comment-box").slice(0, -11).show();
//   });

//   $(".see-more").click(function(e) {
//     e.preventDefault();
//     var $link = $(this);
//     var $div = $link.closest('.comment-box');

//     if ($link.hasClass('visible')) {
//       $link.text('Show all comments ⥥');
//       $div.children(".user-comment-box").slice(-11).slideUp()
//     } else {
//       $link.text('Show less comments ⥣');
//       $div.children(".user-comment-box").slideDown();
//     }

//     $link.toggleClass('visible');
//   });
// });
// <!-- Jquery for Show / Hide more comments End Here-->
// <!-- Jquery for Show / Hide more comments End Here-->


