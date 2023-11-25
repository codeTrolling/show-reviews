# show-reviews
## Created with React.js

How to run: in order to run this app you need to have a few things installed:
MongoDb and Node.js
After you have installed them you need to go to the projects ```frontend``` folder, open a therminal there and type ```npm i```. This will install frontend related dependancies.
You need to do the same with the ```backend``` folder.
After that you need to run MongoDB by going to the folder where you have it installed and type ```mongod```. If you run into a problem regarding database location try specifiying the database path by using --dbpath: ```mongod --dbpath C:\YourPath```

After starting your MongoDB server you can run the backend with ```npm run devStart```
Then start the fronend with ```npm start```

## NOTICE
Please note that this is a full-stack application and you WILL need to populate the database before you can truly check out this app.
You can populate it via the admin panel after you have created an admin account. This is done locally so you need not worry about passwords or anything. A simple username: admin, password: admin will work just fine.

HOWEVER, creating an admin account will need you to edit the way registration works as every account made is a user and not an admin by default.
Alternatively you can create an admin record in your database directly.