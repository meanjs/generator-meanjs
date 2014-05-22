'use strict';
var util = require('util'),
    yeoman = require('yeoman-generator');


var RouteGenerator = yeoman.generators.NamedBase.extend({
    createRouteFile: function() {
        this.slugifiedName = this._.slugify(this._.humanize(this.name));

        this.template('_.server.routes.js', 'app/routes/' + this.slugifiedName + '.server.routes.js')
    }
});

module.exports = RouteGenerator;
