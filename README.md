# Batsoft : Technical Test

This is my task requested by batsoft : creating a login interface communicating with a database

## Installation

First, install the table **batsoft.sql** in a locally stored database (I used **phpmyadmin**), or if you want to store it online there is some code to change in the definition of the database l:12 in **Main.js** .

Then, get in the /back folder and add all the modules! You can now start the app and go to localhost:3000 to see it for yourself. 

(if you wish to change the port, just alter the **port** const at l:36 in **Main.js** .
 

```console
>cd back

>yarn add all
```

## Usage
You can now start the app and go to **localhost:3000** to see it for yourself. 

*(if you wish to change the port, just alter the **port** const at l:36 in **Main.js**)*
*if you alter the front part, remember to yarn build and import the new build file in the back*

```console
>yarn start
```

## Additional info

* try logging in with *un/pw* of *root/root* or *daniil/rosso* or create a new user yourself!
* due to technical problems the requests are on the same localhost as the site so for now please refrain from using the url except to get to '/' 
* samely, only one user can be logged in at a time for now

### Daniil ROSSO, Efrei Paris ### 