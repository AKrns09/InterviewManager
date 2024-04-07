BSHCSD4
Name: Aaron Kearns
Student Number: x20513033
Module: Secure Application Programming
Project Title: Interview Manager Application


# Project Dependencies
1. Node.js (v16.13.0 used for creating this application)
2. Node Package Manager (npm)
3. MySQL Workbench CE (v8.0.27 used for creating this application)


# How to Install Application Dependencies
1. Open a command line terminal window on your PC.
2. Type `cd` and drag and drop the interview-manager folder into the window.
3. Type and run `npm install` to install the node_modules folder into the application.


# How to Run the Application
1. Open MySQL Workbench and connect to your local MySQL instance. 
2. Open the SQL script file `database.sql`, and run all of the code in the script while using the 'interview_manager' schema.
3. On line 15, column 47 of the `www` file in the `bin` folder of the application, change the server port number to your own number. The server used while creating the application was accessed in a web browser using: http://localhost:3000
4. On line 2, column 17 of `connection_details.js` in the `modules` folder of the application, change the password to your own for connecting to your local instance of MySQL.
5. Open a command line terminal window.
6. Type `cd` and drag and drop the interview-manager folder into the window. 
7. Type `npm start` to start the production server.
8. To disconnect from your server, press `Ctrl` and `c` simultaneously and then `y`.
