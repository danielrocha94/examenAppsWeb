$(() => {
  var socket = io();
  socket.emit('loadHistory');

  $('form').submit(function () {
    var text = $('#message').val();
    var initials = $('#initials').val();
    let message = { text, initials }
    socket.emit('storeMessage', message);
    socket.emit('message', initials+" says: "+text);
    $('#message').val('');
    return false;
  });

  socket.on('history', function (history) {
    $("#history").html("");
    history.map((message) => {
      $('<li>').text(message).appendTo('#history');
    })
  });

});

