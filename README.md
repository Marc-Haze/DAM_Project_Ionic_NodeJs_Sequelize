# DAM_Project_Ionic_NodeJs_Sequelize

A FullStack implementation of a Database using MYSQL, Sequelize as ORM, REST, and Ionic for a Mobile Client Web App. 

## Introduction

App made for Astican, a shipyard specialized in maintenances for international and national clients with large dimension ships. Astican has many problems trying to get real time information from their employees, ships and maintenaces, and they need a fast conection between the organization and their workers to increase the agility in both sides. 

This App is made to resolve this problem, giving an administrator the capacity to create, erase and update the registries from a DB wich contains Employees, Ships, Users and Maintenances. Meanwhile, the Worker can also check this App to create and modify the notes in his respectives manintenances, creating a chanel where the administrator can review and gather aditional information from the worker.

Aditionally, this App can be used by free users on internet as it has information about Astican´s bussiness, services, contact form and more.

## DB Model & Diagrams

The App is used in two sides: 

· People off from the company that can see the bussiness information or contact Astican.
· Employees from Astican who can be an administrators or workers.
    - Administrators have full control over the app
    - Workers can only check their respective maintenances and create/update notes inside to contact the Administrators or have a log for his own job

![UseCaseDiagram](https://user-images.githubusercontent.com/91074603/146038237-f663bbe3-52da-47a5-b1b1-3b2c785f5976.png)

Administrators will create, upgrade and delete any registries from the DB and so deploy a worker on a maintenance for a ship, being the first and final part of the organization.

![ERDiagram](https://user-images.githubusercontent.com/91074603/146038301-941cf8f3-484d-4171-a0e9-58cc3e8785f7.png)


## User Requisites


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
    

After we migrate all models to the DB, we need to install al the dependencies required for this proyect:

    $ npm install

## Using the App



Now that we own the Backend & Frontend folders, we can check the Prototype in frontend\Prototype\MobPrototype_Astican.vp 

I recommend using JustInMind to visualize it properly, but here are some example:

![allviews](https://user-images.githubusercontent.com/91074603/141653462-8a9684d4-ce77-48d7-92e2-05fc70a846e6.PNG)



