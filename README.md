# giftastic

A basic gif generator application using html/css/javascript and primarily jquery for populating the page. Also utilizes localStorage for minimal data persistence. Api call made with ajax.

The application begins with no categories and features an input text field to allow the user to create their own category to add. Upon load, localStorage is checked for any preexisting categories. Upon submission of the user's desired category, the application validates that the user has not submitted an empty request to the addCategory function, but also checks to see if they have chosen a limit for the number of gifs returned.

There is some added validation to ensure that the user does not create multiple of the same category, and that any previously searched category for that session that returned no results is not able to be searched again. A button created for an unnsuccessful request will also be removed upon returning no results, and then ciphoned out of future button creations for that session.

Upon a successful query, (clicking the chosen category button), the gifs will generate in a still state on the page, and once clicked will animate. 