var categoryCount = 1;
var categoryArray = [];

categoryArray = JSON.parse(localStorage.getItem('categoryArray'));
// Push the new data (whether it be an object or anything else) onto the array
localStorage.setItem('categoryArray', JSON.stringify(categoryArray));








queryURL = "https://api.giphy.com/v1/gifs/search?";

window.onload = function () {
    var $savedCategories = JSON.parse(localStorage.getItem('categoryArray'));
    console.log($savedCategories);
    if ($savedCategories.length === 0) {

    }
    else {
        $savedCategories.forEach(element => {
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

    var $categoryAdd = $('#categoryAdd').val().toLowerCase();
    if ($categoryAdd === '') {
        alert("Cannot submit an empty category.");
    }
    else {
        addCategoryButton($categoryAdd);
    }
});

addCategoryButton = function ($categoryAdd) {

    if (categoryArray.includes($categoryAdd)) {
        console.log('used this');
    }
    else {
        categoryArray.push($categoryAdd);
        localStorage.setItem('categoryArray', JSON.stringify(categoryArray));
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


