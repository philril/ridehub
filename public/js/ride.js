$( document ).ready(function() {

  $('#join').click(function(event){
    event.preventDefault();
    var $id = parseInt($('#ride_id').html())
    $.ajax({
      type: 'post',
      url: '/join_ride',
      data: {ride_id: $id},
    }).done(function(response){
      // If user is already joined, raise alert.
      if ($('#attendees').find('li[value='+response['first_name'] + "_" + response['last_name']+']').length > 0)
        {
          $('#join').on('click', function(event){event.preventDefault()})
          $('#join').text("You've joined this ride!")
          alert("You've already joined this ride!")
      } else {
        // If says "none yet," replace "none yet" with name
        if ($('#none').length > 0)
          {
            $('#none').replaceWith("<li value="+response['first_name'] + "_" + response['last_name']+"><a href='/user/"+response['id']+"''>" +response['first_name'] + " " + response['last_name']+"</a></li>")
            $('#join').on('click', function(event){event.preventDefault()})
            $('#join').text("You've joined this ride!")
          }
          // else

          console.log(response)
        //If user is already in database, don't add them
        else if (response == undefined)
          {
            console.log("in else if")
            $('#join').on('click', function(event){event.preventDefault()})
            $('#join').text("You've joined this ride!")
          }
        else
          {
            $('#attendees:last').append("<ul><li value="+response['first_name'] + "_" + response['last_name']+"><a href='/user/"+response['id']+"''>" +response['first_name'] + " " + response['last_name']+"</a></li></ul>")
            $('#join').on('click', function(event){event.preventDefault()})
            $('#join').text("You've joined this ride!")
          }
      console.log("ajax succeeds")
      }
    })
  })
});

var lat = parseFloat($('#ride_lat').html());
var longit = parseFloat($('#ride_long').html());

function initialize() {
  var myLatlng = new google.maps.LatLng(lat,longit);
  console.log(lat, longit)

  var mapOptions = {
    zoom: 15,
    center: myLatlng
  }

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  });
}

google.maps.event.addDomListener(window, 'load', initialize);