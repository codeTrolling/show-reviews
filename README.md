# show-reviews

# How to run:

In order to run this app you need to have a few things installed:
MongoDb and Node.js
After you have installed them you need to go to the projects ```frontend``` folder, open a therminal there and type ```npm i```. This will install frontend related dependancies.
You need to do the same with the ```backend``` folder.
After that you need to run MongoDB by going to the folder where you have it installed and type ```mongod```. If you run into a problem regarding database location try specifiying the database path by using --dbpath: ```mongod --dbpath C:\YourPath```

After starting your MongoDB server you can run the backend with ```npm run devStart```
Then start the frontend with ```npm start```

# Populate the database
You can populate the database with some data by running a script. This allows you to check out some of this app's features without the need to manually populate the database.
In order to do so, go to ```Backend -> populateDatabase```. Open up a therminal window and run the script by typing ```node populateDB.js```. This should create some data.
Please note that you need to have MongoDB running before running the script. Also, this script should only be run once as it does not check for pre-existing data which can result in duplicate data.
Running the script should also give you more information in the therminal about some accounts that have been made so do not instantly close it if you want to know the credentials.


## Database connection string
If the backend server cannot connect to the database, try checking the connection string.
You can find it at ```Backend -> server.js```. Its located somewhere at the top of the file.
