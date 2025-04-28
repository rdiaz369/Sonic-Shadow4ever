# Changelog

<ins> [0.4.0] - 2025 - 04 - 27 </ins>

Added:

    * Implemented a quiz feature using `react-quiz-component` to test users' knowledge of Sonic and Green Hills.
    * Added a "Favorites" feature on the home page, allowing logged-in users to add or remove characters from their favorites list, displayed on their profile tab.
    * Added character images on the home page for a more visual and engaging experience.
    * Implemented a forgot passowrd link that reroutes the user to a page where they enter the email they registered with to reset their password.
    * Implemented Elastic Search using Algolia that can group characters based on similar words based on their characteristics.

    
Changed:

    * Styled the authentication module using Bootstrap for improved UI consistency
    * Styled add and delete characters
    * Styled Profile page


<ins> [0.3.0] - 2025 - 04 - 01 </ins>

Added:

    * Introduced User Register with email, name, password
    * Introduced User Login with email, Password
    * Added Credentials to out back4app database
    * Added a protected route for data security
    * Added a Logout Button to log the user out
    * Added Authentication to ensure user was logged in before continuing to website
    * Added Profile to Navigation
    * Have an alert system to alert you if you are authenticated or not


<ins> [0.2.0] - 2025 - 03 - 09 </ins>

Added:

    * Introduced Powers class with fields nameOfPower, age, and gender.
    * Added relationship between Character and Powers via character name pointer.
    * Impleneted Parsing and Routing to replace our navigation
    * Implemented all .jsx files instead of .html
    
Changed:

    * Used Online DataBase back4app as our JSON instead of locally sourcing it


<ins> [0.1.0] - 2025 - 02 - 14 </ins>

Added:

    * Initial Release of Application using .html and anchor tags for navigation
    * Used a local JSON to extract our data and map it to our application
    * We were able to add to our data, filter our data, and change the order
    * Had 3 different forms where we could input more information
