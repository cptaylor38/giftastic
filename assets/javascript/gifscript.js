var categoryCount = 1;
var categoryArray = [];
var savedArray = [];
var badQuery = [];

queryURL = "https://api.giphy.com/v1/gifs/search?";


window.onload = function () {
    var categoryArray = JSON.parse(localStorage.getItem('savedCategories'));
    if (categoryArray) {
        categoryArray.forEach(element => {
            savedArray.push(element);
            $gifSelect = $('#gifCategories');
            $categoryButton = $('<button>');
            $categoryButton.text(element);
            $categoryButton.attr({
                'id': 'item-' + categoryCount,
                'data-category': element
            });
            $categoryButton.addClass('gifButton');
            $gifSelect.append($categoryButton);
        });
    }

}

$("#categoryAddButton").on("click", function (event) {
    event.preventDefault();
    var $limit = $('#limitSelect').val();
    var $alerts = $('#alerts');

    if ($limit === '4' || $limit === '8' || $limit === '12') {
        $alerts.empty();

        var $categoryAdd = $('#categoryAdd').val().toLowerCase();

        if ($categoryAdd === '') {
            $alerts.text("You have to enter a category first.");
        }
        else {
            addCategoryButton($categoryAdd);
        }
    }
    else {
        $alerts.text("Please choose the amount of gifs you would like to load.");
    }
});

addCategoryButton = function ($categoryAdd) {
    $('#categoryAdd').val('');
    if (savedArray.includes($categoryAdd) || badQuery.includes($categoryAdd)) {
        console.log('used this');
        if (badQuery.includes($categoryAdd)) {
            $('#alerts').text("This search returned no results last time. Please try another.");
        }
    }
    else {
        savedArray.push($categoryAdd);
        localStorage.setItem("savedCategories", JSON.stringify(savedArray));

        $gifSelect = $('#gifCategories');
        $categoryButton = $('<button>');
        $categoryButton.text($categoryAdd);
        $categoryButton.attr({
            'id': 'item-' + categoryCount,
            'data-category': $categoryAdd
        });
        $categoryButton.addClass('gifButton');
        $gifSelect.append($categoryButton);
    }
}

$(document.body).on('click', '.gifButton', function (event) {
    event.preventDefault();
    var self = this;
    $('#alerts').empty();
    var $gifLoad = $('#gifLoad');
    $gifLoad.empty();
    var $limit = $('#limitSelect').val();

    var $gifCategory = $(this).attr('data-category');

    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            q: '' + $gifCategory,
            apikey: 'fcEH4tpKk10gcbgphb7MecpbedH4Hq4U',
            limit: $limit
        }
    }).then(function (response) {
        var results = response.data;
        console.log(results);
        if (results.length === 0) {
            $('#alerts').text("No results found. Please try another search.");
            self.remove();
            savedArray.splice(savedArray.indexOf($(self).attr('data-category')));
            localStorage.setItem("savedCategories", JSON.stringify(savedArray));
            badQuery.push($(self).attr('data-category'));
            console.log(badQuery);
        }
        else {
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass('gifDiv');

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var $categoryImage = $("<img>");
                $categoryImage.attr({
                    "src": results[i].images.fixed_height_still.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state": "still"
                });
                $categoryImage.addClass('gif');

                gifDiv.prepend($categoryImage, p);

                $gifLoad.prepend(gifDiv);
            }
        }

        $(".gif").on("click", function () {
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
                $(this).attr()
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
});







