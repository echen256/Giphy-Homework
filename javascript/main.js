
var objects = [
    "Makishima", "Motoko", "Joker", "Bane"
];
rebuildButtons();

function rebuildButtons() {
    $("#root").empty();
    for (var i = 0; i < objects.length; i++) {
        var d = $("<button>");
        d.text(objects[i]);
        d.addClass("gifButton");
        d.addClass("btn");
        $("#root").append(d);
    }

    $(".gifButton").click(function () {
        $("#images").empty();
        for (var j = 0; j < 10; j++) {
            var url = queryURL + "&tag=" + $(this).text() + "&rating=PG-13";
             $.ajax({
                url: url,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var imageUrl = response.data.images.original_still.url;
                var image = $("<img>");

                image.attr("src", imageUrl);
                image.attr("alt", "image");
                image.attr("static", imageUrl);
                image.attr("paused", true);
                image.attr("animated", response.data.images.original.url);
                image.addClass("gif");
                image.click(onGifClick);
                var rating = $("<div>");
                rating.text(response.data.rating);
                image.append(rating);
                $("#images").append(image);
            });
        }

    });
}



$("#submit").click(function () {
    event.preventDefault();
    var val = $("#search").val();
     if (!objects.includes(val) && val !== "") {
        objects.push(val);
        rebuildButtons();
    }


});


var apiKey = "api_key=dc6zaTOxFJmzC";
var queryURL = "https://api.giphy.com/v1/gifs/random?" + apiKey;


function onGifClick() {
    var gif = $(this);
    var paused = gif.attr("paused") == 'true';
    if (paused) {
        gif.attr("src", gif.attr("animated"));
    } else {
        gif.attr("src", gif.attr("static"));

    }
    gif.attr("paused", !paused);
};
