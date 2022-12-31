# Calorie Tracker

## Overview

Calories Tracker is a web app that will allow users to keep track of their intake of calories. Users can register and login. Once they're logged in, they can record how much food they ate, and then the users can view the calculated calories. Users can also search information about food(ingredients) and see the information about calories and nutrients. Auth0 is used for login and registration.

## Data Model

The application will store Diets, and Food. There is also a database which stores the information of food.

* users can have multiple diets everyday.
* each Diet consists of different kinds of food(by embedding).
* The user will not be able to enter texts when selecting food. They will have a list of food to choose. 

An Example Diet with Embedded Items:

```javascript
{
  dietName: "breakfast",
  food: // an array of id of food
  id: // unique id for diets with the same name
  userEmail: "1234@bar.edu",
  totalCalorie: 25000
}
```
An Example Food:

```javascript
{
  foodName: "beef",
  quantity: 100
}
```
An Example FoodInfo:

```javascript
{
    name: 'beef',
    calorie: 250.5,   // kcal/100g
    unit: 'g'
}
```

## [Link to Commented First Draft Schema](db.mjs) 


## Wireframes

/ - page for showing today's activities

![front page](documentation/front_page.png)

/new_diet - page for adding a new diet

![new diet](documentation/new_diet.png)

/diets - page for showing all of the diets

![diets](documentation/diets.png)

/{diet}_{id} - page for showing

![new diet](documentation/detail.png)

/info - page for showing the information of user.

![info](documentation/info.png)

/search - page for searching the information of food(ingredients).

![search](documentation/search.png)
## Site map

![site map](documentation/site_map.png)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new diet
4. as a user, I can view all of the diets I've created
5. as a user, I can view all of the food I've added to an existing diet
6. as a user, I can view the total calorie intake from all of the diets.
7. as a user, I can search the information of the an ingredient.
8. as a user, I can filter the diets to check diets with calorie intake higher than the number you entered.