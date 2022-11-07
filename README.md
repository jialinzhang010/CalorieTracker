# Calorie Tracker

## Overview

Calories Tracker is a web app that will allow users to keep track of their intake of calories and how much they burned everyday. Users can register and login. When signing up, users have to enter their gender, weight, and height. Once they're logged in, they can record how much food they ate, and then the users can view the calculated calories. Then the app will give suggestion to the users as well, such as food bias.

## Data Model

The application will store Users, Diets, and Food. There is also a database which stores the information of food.

* users can have multiple diets everyday.
* each Diet consists of different kinds of food(by embedding).
* The user will not be able to enter texts when selecting food. They will have a list of food to choose. 

An Example User:

```javascript
{
  username: "username123",
  password: "mypassword123",
  gender: "male",
  age: 18,
  height: 175,
  weight: 60,
  diets: // an array of references to Diets documents
  calorie_intake: 2000,
}
```

An Example Diet with Embedded Items:

```javascript
{
  user: // a reference to a User object
  name: "Breakfast",
  food: // an array of food
  
}
```
An Example Food:

```javascript
{
  user: // a reference to a User object
  diet: // a reference to a diet object
  info:  // a refernce to a foodInfo object
  quantity: 100
}
```
An Example FoodInfo:

```javascript
{
    name: 'beef',
    category: 'meat',
    calorie: 250.5,   // kcal/100g
    unit: 'g'
}
```

## [Link to Commented First Draft Schema](db.mjs) 


## Wireframes
/sign_up - page for signing up

![sign up](documentation/sign_up.png)

/login - page for login

![login](documentation/login.png)

/today - page for showing today's activities

![today](documentation/today.png)

today/new_diet - page for adding a new diet

![new diet](documentation/new_diet.png)

today/diet_type - page for showing a specific diet

![new diet](documentation/breakfast.png)

today/suggestion - page for showing total calorie intake and burned today and the suggrestion

![suggestion](documentation/suggestion.png)


## Site map

![site map](documentation/site_map.png)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new diet
4. as a user, I can view all of the diets I've created
5. as a user, I can view all of the food I've added to an existing diet
6. as a user, I can add food to an existing diet
7. as a user, I can view the calorie intake and the customized suggestion on my diet.

## Research Topics

* (5 points) Automated functional testing for all of your routes using Headless Chrome
    * I will follow the instructions on `https://developer.chrome.com/blog/headless-karma-mocha-chai/`.
    * Headless Chrome is a way to run the Chrome browser without the full browser UI. 
    * I'm using Headless Chrome because my JavaScript tests will be executed in the same environment as users of your site.
    * I will use Karma as a runner and Mocha+Chai for authoring tests. 
* (3 points) Perform client side form validation using custom JavaScript or JavaScript library
    * Client side form validation ensures all required form controls are filled out, in the correct format before submitting data to the server.
    * Client side form validation helps ensure data submitted matches the requirements set forth in the various form controls.
    * The user can fix the invalid data straight away to prevent sending bad data to server.
* (2 points) Use a CSS framework or UI toolkit.
    * I will use Semantic UI to design the layout of the app.
    * Semantic UI is a development framework that helps create beautiful, responseive layouts using human-friendly HTML.

    10 points total out of 10 required points

## [Link to Initial Main Project File](app.mjs) 

## Annotations / References Used

1. [Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
2. [tutorial on Headless Chrome](https://developer.chrome.com/blog/headless-karma-mocha-chai/)
3. [Semantic UI](http://semantic-ui.com)
