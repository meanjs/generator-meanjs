[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://meanjs.org/)

[![Build Status](https://travis-ci.org/meanjs/generator-meanjs.svg?branch=master)](https://travis-ci.org/meanjs/generator-meanjs)
[![Dependencies Status](https://david-dm.org/meanjs/generator-meanjs.svg)](https://david-dm.org/meanjs/generator-meanjs)

MEAN.JS is a full-stack JavaScript open-source solution, which provides a solid starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications. The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components.

## Overview

One of the most frequently asked features from MEAN users is a way to scaffold their applications. As we looked for a way to help the community build and deploy production level MEAN applications, we decided to go with a [Yeoman](http://yeoman.io/index.html) generator. Yeoman generators provides a powerful, easy to maintain, and open solution for scaffolding applications.

So, we set out to work on the features we thought every developer needs, and we are proud to present the official MEAN.JS Yeoman generator. It includes a set of simple tools you can use to make your MEAN application development easier and way more fun.

## Getting Started

Before you begin make sure you have the [yo scaffolding tool](http://yeoman.io/learning/index.html) installed (As it is part of the Yeoman tool set you might have installed it before). To globally install *yo* you will need to use npm:

```
$ npm install -g yo
```

**Note:** Your user might not have the permissions to install package globally, so use a super user or **sudo**.

Once you have *yo* installed, you will need to install the MEAN.JS generator as well:

```
$ npm install -g generator-meanjs
```

You are now ready to get started with the MEAN.JS generator. The generator will help you create a MEAN.JS application.

## Generators

Available generators:

* [meanjs](#application-generator)

**Note: Sub-generators are to be run from the root directory of your app. The main generator will create your project folder for you.**

## Application Generator

The application generator will help you create a fresh copy of a MEAN.JS application in your working folder. To create your MEAN application, navigate to a new project folder, and then use *yo* to generate your application:

```
$ yo meanjs
```

The generator will ask you a few questions about your new application and will generate it for you. When the installation process is over, you will be able to use grunt to run your new MEAN application:

```
$ grunt
```

Currently there are no sub generators for the current version of the MEAN.js project, but they are under development and will be coming soon. Feel free to create one and submit a pull request!

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

