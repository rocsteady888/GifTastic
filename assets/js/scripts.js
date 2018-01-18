$( document ).ready(function() {
    console.log( "ready!" );

    var animals = [
      "cheetah",
      "panda",
      "tiger",
      "lion",
      "bear",
      "dog",
      "wolf",
      "stag",
      "ram"
    ];

    var btnsDiv = $(".animal-buttons");
    for ( i = 0; i < animals.length; i++ ) {
      btnsDiv.append("<button class='btn'>" + animals[i] + "</button>");
    }

    $( document ).on("click", ".btn", function() {
      $(".images").empty();
      // Storing our giphy API URL for a random new image
      let searchTerm = $(this).text();
      console.log(searchTerm);
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=GoEY1pjOIXX2XiJgXsUma6zZWKJjvSX0&limit=10";

      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .then(function(response) {

        // Saving the image_original_url property

        // Creating and storing an image tag
        var newImage = $("<img>");

        for ( j = 0; j < response.data.length; j++ ) {
          $(".images").append(
          "<img src='" + response.data[j].images.original_still.url + "'" +
          "alt='" + response.data[j].slug + "'" +
          "data-still='" + response.data[j].images.original.url + "'" +
          "data-animate='" + response.data[j].images.original_still.url + "'" +
          "data-state='animate'" +
          "class='animalImage'>");
          $(".images").append("<p>" + response.data[j].rating + "</p>");
        }
        console.log(response);
      });
    });

    $( document ).on("click", ".animalImage", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      console.log("animate");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

    $("#add-animal").on("click", function(event) {
      event.preventDefault();
      // This line grabs the input from the textbox
      var animal = $("#search-input").val().trim();

      // Adding movie from the textbox to our array
      animals.push(animal);
      btnsDiv.append("<button class='btn'>" + animal + "</button>");
    });



});
