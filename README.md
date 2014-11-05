[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://meanjs.org/)

[![Build Status](https://travis-ci.org/meanjs/generator-meanjs.svg?branch=master)](https://travis-ci.org/meanjs/generator-meanjs)
[![Dependencies Status](https://david-dm.org/meanjs/generator-meanjs.svg)](https://david-dm.org/meanjs/generator-meanjs)

MEAN.JS is a full-stack JavaScript open-source solution, which provides a solid starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications. The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components.
## Overview

One of the most frequently asked features from MEAN users is a way to scaffold their applications. As we looked for a way to help the community build and deploy production level MEAN applications, we decided to go with a [Yeoman](http://yeoman.io/index.html) generator. Yeoman generators provides a powerful, easy to maintain, and open solution for scaffolding applications.



So, we set out to work on the features we thought every developer needs, and we are proud to present the official MEAN.JS Yeoman generator. It includes a set of simple tools you can use to make your MEAN application development easier and way more fun.



## Getting Started

Before you begin make sure you have the [yo scaffolding tool](http://yeoman.io/generators.html) installed(As it is part of the Yeoman tool set you might have installed it before). To globally install *yo* you will need to use npm:


```
$ npm install -g yo
```


**Note:** Your user might not have the permissions to install package globally, so use a super user or **sudo**.



Once you have *yo* installed, you will need to install the MEAN.JS generator as well:


```
$ npm install -g generator-meanjs
```

You are now ready to get started with the MEAN.JS generator. The generator will help you create a MEAN.JS application, a CRUD module, Angular Module, and other AngularJS/Express entities.

## Generators

Available generators:

* [meanjs](#application-generator)
* [meanjs:crud-module](#crud-module-sub-generator)
* [meanjs:angular-module](#angularjs-module-sub-generator)
* [meanjs:angular-route](#angularjs-route-sub-generator)
* [meanjs:angular-controller](#angularjs-controller-sub-generator)
* [meanjs:angular-view](#angularjs-view-sub-generator)
* [meanjs:angular-service](#angularjs-service-sub-generator)
* [meanjs:angular-directive](#angularjs-directive-sub-generator)
* [meanjs:angular-filter](#angularjs-filter-sub-generator)
* [meanjs:angular-config](#angularjs-config-sub-generator)
* [meanjs:angular-test](#angularjs-test-sub-generator)
* [meanjs:express-model](#express-model-sub-generator)
* [meanjs:express-controller](#express-controller-sub-generator)
* [meanjs:express-route](#express-routes-sub-generator)
* [meanjs:express-test](#express-test-sub-generator)

**Note: Generators are to be run from the root directory of your app.**


## Application Generator

The application generator will help you create a fresh copy of a MEAN.JS application in your working folder. To create your MEAN application, navigate to a new project folder, and then use *yo* to generate your application:


```
$ yo meanjs
```

The generator will ask you a few questions about your new application and will generate it for you. When the installation process is over, you will be able to use grunt to run your new MEAN application:


```
$ grunt
```

Now, the application generator does a great job scaffolding a whole application, but daily work requires us to repeat a lot of structured code. For this purpose we provided you with some sub-generators to help you speed up your development.



## CRUD Module Sub-Generator

The CRUD module sub-generator will help you create a new CRUD module, similar to the article sample provided with the project. To create a new CRUD module you will need to use *yo* again:


```
$ yo meanjs:crud-module <module-name>
```

This will create both AngularJS and Express files supporting full CRUD functionality, and add the Karma and Mocha tests.


**Note:** Don’t forget to use your module name as an argument when calling the CRUD module sub-generator.



## AngularJS Module Sub-Generator

Another redundant task is creating a new AngularJS module structure. For this purpose you can use the Angular module sub-generator. It will create the proper folder structure for you and the module initialization file. Creating a new AngularJS module is simple:


```
$ yo meanjs:angular-module <module-name>
```

The sub-generator will ask for more information about your folder structure, and will create the empty new AngularJS module. Now, to fill that new module with your business logic, we provided you with several AngularJS entities sub-generators.



## AngularJS Route Sub-Generator

To construct your module you will often need to create a new route. The AngularJS route sub-generator will help you create a view, controller and a proper route in your module **routes.js** file. If it can’t find the module routes file the sub-generator will create one for you. Creating a new AngularJS route will involve executing this command:



```
$ yo meanjs:angular-route <route-name>
```

The sub-generator will ask for more information about your controller, view and routing URL, and will generate the appropriate files for you.



## AngularJS Controller Sub-Generator

The AngularJS Controller sub-generator will create a new AngularJS controller in the specified module's **controllers** folder. To create a new AngularJS controller run *yo* again by using this command:


```
$ yo meanjs:angular-controller <controller-name>
```

The sub-generator will ask you for the module name under which you would like to create your new controller, and will create a new AngularJS controller file in that module **controllers** folder and a test file in the **tests** folder.


**Don’t forget!** This time you pass the controller name as an argument.



## AngularJS View Sub-Generator

Once you have your controller file ready, you may want to add a view that makes use of this controller. The AngularJS view sub-generator will create a new AngularJS view in the specified module's **views** folder, and will allow you to add a route definition for it. To create a new AngularJS view you will need to execute this command:


```
$ yo meanjs:angular-view <view-name>
```

The sub-generator will ask you for the module name under which you would like to create your new view, and some additional routing information. It will then create a new view file in that module's **views** folder and add a routing state to the module **routes.js** file. If it can’t find the module routes file it will create one for you.



## AngularJS Service Sub-Generator

The AngularJS service sub-generator will create a new AngularJS service in the specified module's **services** folder. To create a new AngularJS service you will need to execute this command:


```
$ yo meanjs:angular-service <service-name>
```

The sub-generator will ask you for the module name under which you would like to create your new service, and will create a new AngularJS service file in that module's **services** folder.



## AngularJS Directive Sub-Generator

The AngularJS directive sub-generator will create a new AngularJS directive in the specified module's **directives** folder. Creating a new AngularJS directive should already look familiar:


```
$ yo meanjs:angular-directive <directive-name>
```

The sub-generator will ask you for the module name under which you would like to create your new directive, and will create a new AngularJS directive file in that module's **directives** folder.



## AngularJS Filter Sub-Generator

The AngularJS filter sub-generator will create a new AngularJS filter in a specified module's **filters** folder. To create a new AngularJS filter you need to call yo again:


```
$ yo meanjs:angular-filter <filter-name>
```

The sub-generator will ask you for the module name under which you would like to create your new filter, and will create a new AngularJS filter file in that module **filters** folder.



## AngularJS Config Sub-Generator

The AngularJS config sub-generator will create a new AngularJS config section in a specified module's **config** folder. To create a new AngularJS config file just call yo:


```
$ yo meanjs:angular-config <config-name>
```

The sub-generator will ask you for the module name under which you would like to create your new config, and will create a new AngularJS config file in that module's **config** folder.



## AngularJS Test Sub-Generator

Your MEAN application comes pre-bundled with the Karma test runner and Jasmine testing framework. To test your AngularJS controllers you’ll need to create a test file, which Karma will later use to run the tests. For this purpose we provided you with the AngularJS test sub-generator. Creating a new AngularJS test is effortless, just execute this command:


```
$ yo meanjs:angular-test <controller-name>
```

This will create a test file for your controller, and if the sub-generator doesn’t find the specified controller file, it will create one for you.


**Don’t forget!** You're suppose to pass the controller name as an argument.



## Express Model Sub-Generator

Often you will find the need to just create a single Express model. The Express model sub-generator will help you with creating an Express model in the **app/models** folder. To create a new model just use *yo*:


```
$ yo meanjs:express-model <model-name>
```

This will create a new empty model in the **app/models** folder and a test file in the **app/tests** folder.


**Note:** It is recommended you avoid naming your model in plural form and use a singular form instead. i.e article and not articles



## Express Controller Sub-Generator

Another recurring task is creating an empty Express controller. The Express controller sub-generator will help you with creating an Express controller in the **app/controllers** folder. To create a new controller just use *yo*:


```
$ yo meanjs:express-controller <controller-name>
```

This will create a new empty controller in the **app/controllers** folder.



## Express Routes Sub-Generator

To make HTTP requests to your controller methods you will need to use a routing file in the **app/routes** folder. The Express routes sub-generator will help you to add a new empty routes file. To create a new routes file execute this *yo* command:


```
$ yo meanjs:express-route <route-name>
```

This will create a new empty route file in the **app/routes** folder.


## Express Test Sub-Generator

Your MEAN application comes pre-bundled with the Mocha testing framework. To test your Express models you’ll need to create a new test file, which Mocha will use while running tests. For this purpose we provided you with the Express test sub-generator. Creating a new Express test is easy, just execute this command:


```
$ yo meanjs:express-test <model-name>
```

This will create a test file for your Express model, and if the sub-generator doesn’t find the specified model, it will create one for you.


**Don’t forget!** You're supposed to pass the model name as an argument.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)

