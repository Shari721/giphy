$(document).ready(function() {

var sports = [
"baseball",
"football",
"soccer",
"hockey",
"tennis",
"basketball",
"boxing"
];

function addButtons() {

	$("#buttonsHere").empty();

		for (var i = 0; i < sports.length; i++) {
			var a = $("<button>");
			a.addClass("sports");
			a.attr("data-name", sports[i]);
			a.text(sports[i]);
			$("#buttonsHere").append(a);
		}
}

addButtons();



  $("#add-sport").on("click", function(event) {
    event.preventDefault();
    var sport = $("#sport-input").val().trim();
    sports.push(sport);

    addButtons();
  });

  
$(document).on("click", ".sports", function() {
      var sport = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        sport + "&api_key=dc6zaTOxFJmzC&limit=10";

$("#gifsHere").empty();

		 $.ajax({
	           url: queryURL,
	           method: "GET"
	        })


		 .done(function(response) {

        for (var j = 0; j < response.data.length; j++) {
         var results = response.data;
        var rating = results[j].rating;
          var sportDiv = $("<div class='item'>");
        	var img = $("<img>");

var p = $("<p>").text("Rating: " + rating);

        	img.attr("src", response.data[j].images.fixed_height_still.url);
        img.attr('animated', response.data[j].images.fixed_height.url);

            sportDiv.append(p);
            sportDiv.append(img);

        	$("#gifsHere").prepend(sportDiv);
        
}

          $("#gifsHere").on("click", "img", function() {

        var c = $(this).attr('src');

        $(this).attr('src', $(this).attr('animated'));

            $(this).attr('animated', c);
          });
        });

    });
});

      