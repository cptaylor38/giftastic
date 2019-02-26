var categoryCount = 1;


queryURL = "https://api.giphy.com/v1/gifs/search?";



$("#categoryAddButton").on("click", function (event) {
    event.preventDefault();

    var $categoryAdd = $('#categoryAdd').val();

    $gifSelect = $('#gifCategories');
    $categoryButton = $('<button>');
    $categoryButton.text($categoryAdd);
    $categoryButton.attr({
        'id': 'item-' + categoryCount,
        'data-category': $categoryAdd
    });
    $categoryButton.addClass('gifButton');


    $gifSelect.append($categoryButton);

});

$(document.body).on('click', '.gifButton', function (event) {
    event.preventDefault();

    var $gifLoad = $('#gifLoad');
    $gifLoad.empty();

    var $gifCategory = $(this).attr('data-category');

    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            q: '' + $gifCategory,
            apikey: 'fcEH4tpKk10gcbgphb7MecpbedH4Hq4U',
            limit: '6'
        }
    }).then(function (response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass('gifDiv');

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var categoryImage = $("<img>");
            categoryImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(categoryImage, p);

            $gifLoad.prepend(gifDiv);
        }
    });
});


