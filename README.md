# DAM_Project_Ionic_NodeJs_Sequelize

A FullStack implementation of a Database using MYSQL, Sequelize as ORM, REST, and Ionic for a Mobile Client Web App. 

### Prerequisites

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
    
Models and Migrations are already created but if you need to change or we want to create another DB with different models with Sequelize you can check this reference: https://tomasmalio.medium.com/node-js-express-y-mysql-con-sequelize-ec0a7c0ae292

Once created the DB named db_astican, we migrate all the models using this command:

    $ sequelize db:migrate

After we migrate all models to the DB, wen can start using POSTMAN to check and create Ships, Employees, Maintenances and Users.

Now that we own the Backend & Frontend folders, we can check the Prototype in frontend\Prototype\MobPrototype_Astican.vp 

I recommend using JustInMind to visualize it properly, but here are some example:

![allviews](https://user-images.githubusercontent.com/91074603/141653462-8a9684d4-ce77-48d7-92e2-05fc70a846e6.PNG)



