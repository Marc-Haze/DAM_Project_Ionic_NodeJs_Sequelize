# DAM_Project_Ionic_NodeJs_Sequelize

A FullStack implementation of a Database using MYSQL, Sequelize as ORM, REST, and Ionic for a Mobile Client Web App. 

## Introduction

App made for a shipyard specialized in maintenances for international and national clients with large dimension ships. The company has many problems trying to get real time information from their employees, ships and maintenaces, and they need a fast conection between the organization and their workers to increase the agility in both sides. 

This App is made to resolve this problem, giving an administrator the capacity to create, erase and update the registries from a DB wich contains Employees, Ships, Users and Maintenances. Meanwhile, the Worker can also check this App to create and modify the notes in his respectives manintenances, creating a chanel where the administrator can review and gather aditional information from the worker.

Aditionally, this App can be used by free users on internet as it has information about Astican´s bussiness, services, contact form and more.

## DB Model & Diagrams

The App is used in two sides: 

· People off from the company that can see the bussiness information or contact Astican.

· Employees from Astican who can be an administrators or workers.

    - Administrators have full control over the ap
    - Workers can only check their respective maintenances and create/update notes inside to contact the Administrators or have a log for his own job

![UseCaseDiagram](https://user-images.githubusercontent.com/91074603/146038237-f663bbe3-52da-47a5-b1b1-3b2c785f5976.png)

The Database will use 4 tables: Employees, Users, Ships and Maintenances.

· Employees have a Many to Many relationship with Ships, so we need the Maintenances record with the Employee who will do a service to the Ship and some other information

· Employees also have a One to One relationship with Users given that the Employees can have a respective User or not.

![ERDiagram](https://user-images.githubusercontent.com/91074603/146038644-a4a485ac-9199-456e-b628-3a8f5d676337.png)


## User Requisites

The company will need a view to distinguish the views used by the free users and their own employees. Those views used by the free users will need to show the main information of the company and a method of contact. On the other side, Employees should have a way to easily navigate around the administration pages. Both of them would need a navigation main menu for every case.

R1. Platform
    R.1.1 The App will be done for Mobile platforms
    
R.2. The users will acces a home view

    R.2.1. Employees will be able to acces from a log in to the database information
    R.2.2. Free Users can review the information pages and contact the company through email or the form
    R.2.3. After they acces a path, they will have a main menú dragged from left
    R.2.4. This dragged menú will be different for Employees or Free Users, so Employees can navigate properly around their own views
    
R.3. There will be 4 views for the free users

    R.3.1. The main information view will be a page with the main concepts of the company
    R.3.2. From the about us view, the user will have a button to check the services list
    R.3.3. The services list view would redirect the user around all the possible services given by the company
    R.3.4. A static employee view could be seen by free users
    R.3.5. The app will have a form to give the users the posibilty to contact the company
    R.5.6. The contact form will have an alert even for a sucessfull message or a error
    R.3.6. There will be a footer with the email and telephone to contact the company
    
R.4. Administration Views

    R.4.1. The administrator will have a main menú page to access Employees, Ships, Maintenances or Users
    R.4.2. Every administration page will have a deploy for every registry
    R.4.3. The administration page will have a searchbar to filter the registries
    R.4.4. The administrator will be asked before erase a registry
    R.4.5. Adding or updating the regiestry will have another view
    R.4.6. If a employee or a ship is realizing a maintenance, it won´t be removable
    R.4.7. An Employee can be created apart from the user in case he doesn´t have one
    R.4.8. Every Employee will have a personal image
    R.4.9. The User will inherit the image from his Employee
    R.4.10. In case there´s an error while administrating the registries, the user will be adviced with an alert 

## Instaling Prerequisites

·[NodeJs]: https://nodejs.org/es/download/

·[Xampp]: https://www.apachefriends.org/es/download.html (What i used to deploy a MySQL server but any other similar tool can be used)

·[MySQL Workbench]: https://dev.mysql.com/downloads/workbench/ (To manage and check de Database, you can also use the phpadmin with Xampp)

·[Ionic]: The Frontend is an Ionic server, a powerfull framework for Angular to develop mobile sites 

·[Visual Studio Code]: https://code.visualstudio.com/download IDE used to configure and manage all the code

·[JustInMind] (Optional): https://www.justinmind.com/ Can be used to create and visualize protoypes for our frontend APP

·[Postman] (Optional): https://www.postman.com/downloads/ Since our CRUD uses request and response to manage the data, it´s a usefull tool to GET, POST, DELETE and PUT in our Database


## Installing

First we can clone the repository directly into our local workspace.

    $ git clone https://github.com/Marc-Haze/DAM_Project_Ionic_NodeJs_Sequelize.git
    

After cloning this repository we need to install al the dependencies required for this proyect in both frontend / backend folders:

    frontend/ $ npm install
    backend/ $ npm install

Its necesary a MYSQL service running, i used Xampp to deploy this service. 

![XamppExample](https://user-images.githubusercontent.com/91074603/146048046-0a960e23-a257-4f1f-b3dc-543813d3e5e9.png)

And so we need a DB called "db_astican" that can be get from "backend/database/db_astican.sql" or easily create using sequelize commands. Configuration, Models and Migrations are already done so its only needed to use this commando inside backend folder to create the DB:

    backend/ $ sequelize db:migrate

It will create the DB without data. To log in and start using the administration routes we will need an administrator user that can be created manually into the DB or using Postman. My collection, wich i used to check the database conection and routes, can be seen in my publish:

    https://documenter.getpostman.com/view/17625230/UVR7L8iQ

I recommend using the demo data in "backend/database/db_astican.sql".

## Starting the App

A simple task. Just start the backend server and then frontend server using these comands:

    backend/ $ npm start
    frontend/ $ ionic serve --lab

Check http://localhost:8200 to enter the mobile app.

## Using the App (Usability)

Now that we own the Backend & Frontend folders and are already started, we can check the Prototype in frontend\Prototype\MobPrototype_Astican.vp 

I recommend using JustInMind to visualize it properly, but here are some example:

![allviews](https://user-images.githubusercontent.com/91074603/141653462-8a9684d4-ce77-48d7-92e2-05fc70a846e6.PNG)


Once we get into the App, we will start at the home page, a simple but a usefull view that already opens two paths for common users and employee users.

![image](https://user-images.githubusercontent.com/91074603/146051993-9a0dbbf8-c8c6-4db4-8ca8-d9149eeb097a.png)

# Info Views

Here we can choose to log in or just navigate around the information views. The dark colors in the background of every page makes easier to read, borthering less the user while scrolling, and making a good constrar with the grey-white.

![InfoViews](https://user-images.githubusercontent.com/91074603/146052651-7feb9b92-dac3-496d-99bd-5d8b8560198e.png)

Whenever if the user does a mistake using the contact form or doing it succesfully, he will reacieve an alert with a message, making sure what did he failed or that his mesagges has been sent.

![ContactFormAlerts](https://user-images.githubusercontent.com/91074603/146055563-52ee4ecc-9b04-4db2-b77e-967242197697.png)


As we can see, the App uses just the necesary elements in all their pages, making it clearly for the user wich moves can do. And even if he want to move freely, he can drag the main menu that leads to all pages at once and specifies wich page is the user already, marking with another color the respective submenu so the user will never be able to get lost. Even so, the user can always tap on the logo and jump to the home page again.

![MainMenu](https://user-images.githubusercontent.com/91074603/146052935-94134b4e-f0e9-47d9-8415-1ffec53bf43d.png)






