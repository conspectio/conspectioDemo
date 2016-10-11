
// require in jquery
const $ = require("jquery");
const setupGetUserMedia =  require('./setupGetUserMedia');

const setupDom = () => {

  const parentElement = $('#conspectioBroadcasterContainer');

  //   <div class="row">
  //    <div class="col-xs-12">
  //     <div class="thumbnail">
  //       <div class="caption">
  //         <h2>Broadcast to the World!</h2>
  //         <p>Add an event name and hit start!</p>
  //       </div>
  //       <div id='broadcasterinputs'>
  //         <input id = 'eventTag' type = 'text' placeholder = 'tag your stream here'>
  //         <input id = 'startButton' class = "btn btn-success btn-sm" type = 'submit' value = 'start' onclick = 'sendEventTag()'>
  //         <input id = 'stopButton' class = "btn btn-danger btn-sm" type = 'submit' value = 'stop' onclick = 'stopStream()' disabled>
  //       </div>
  //       <div id = 'videoContainer'>
  //         <video id = 'broadcastStream' autoplay='true'></video>
  //       </div>
  //       <div id = 'broadcastMsg'></div>
  //     </div>
  //   </div>
  // </div>

    
  const broadcasterStream = $('<video></video>').attr(
    {
      'id': 'broadcasterStream',
      'autoplay': true
    }
  );
  
  const videoContainer = $('<div></div>').append(broadcasterStream);
  //parentElement.append(videoContainer);

  const broadcastMsg = $('<div></div>').attr(
    {
      'id': 'broadcastMsg'
    }
  );

  //parentElement.append(broadcastMsg);

  const eventTag = $('<input></input>').attr(
    {
      'id': 'eventTag',
      'type': 'text',
      'placeholder': 'tag your stream here'
    }
  );

  const startButton = $('<input></input>').attr(
    {
      'id': 'startButton',
      'class': 'btn btn-success btn-sm',
      'type': 'submit',
      'value': 'start',
      // 'onclick': 'sendEventTag'
    }
  );
  
  const stopButton = $('<input></input>').attr(
    {
      'id': 'stopButton',
      'class': 'btn btn-danger btn-sm',
      'type': 'submit',
      'value': 'stop',
      // 'onclick': 'stopStream',
      'disabled': true
    }
  );

  const inputDiv = $('<div></div>').attr({
    'id': 'broadcasterinputs'
  });

  inputDiv.append(eventTag);
  inputDiv.append(startButton);
  inputDiv.append(stopButton);


  const row = $('<div></div>').attr({
    'class': 'row'
  });

  const col = $('<div></div>').attr({
    'class': 'col-xs-6'
  });
  row.append(col);
  const thumbnail = $('<div></div>').attr({
    'class': 'thumbnail'
  });
  row.append(thumbnail);
  const caption = $('<div></div>').attr({
    'class': 'caption'
  });
  const title = $('<h2>Broadcast to the World!</h2>');
  const headline = $('<p>Add an event name and hit start!</p>');
  caption.append(title);
  caption.append(headline);

  thumbnail.append(caption);
  thumbnail.append(inputDiv);
  thumbnail.append(videoContainer)
  thumbnail.append(broadcastMsg)
  parentElement.append(row);

  // setup dom event handlers
  function sendEventTag() {
    
    const eventTag = $('#eventTag').val();

    // store eventTag value to conspectio.broadcasterEventTag
    conspectio.broadcasterEventTag = eventTag;

    if(eventTag.length) {
      $('#startButton').prop('disabled', true);
      $('#stopButton').prop('disabled', false);

      // TODO: possible to further decouple with socket?
      conspectio.socket.emit('sendEventTag', eventTag);

      // invoke setupGetUserMedia
      setupGetUserMedia();

    } else {
      alert('please enter a tag name to start streaming');
    }
  };

  function stopStream() {
    conspectio.broadcasterStream.getTracks()[0].stop();
    $('#startButton').prop('disabled', false);
    $('#stopButton').prop('disabled', true);
    conspectio.socket.emit('removeBroadcaster', conspectio.broadcasterEventTag);
    $('#broadcastMsg').empty();
    $('#broadcastMsg').html(`<h4>You have stopped streaming</h4>`);
  };

  $('#startButton').on('click', sendEventTag);
  $('#stopButton').on('click', stopStream);
};

module.exports = setupDom;