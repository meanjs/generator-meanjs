'use strict';
var util = require('util'),
    inflections = require('underscore.inflections'),
    yeoman = require('yeoman-generator');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
    createControllerFile: function() {
        this.slugifiedName = this._.slugify(this._.humanize(this.name));

        this.humanizedName = this._.humanize(this.slugifiedName);
        this.humanizedPluralName = inflections.pluralize(this._.humanize(this.slugifiedName));
        this.humanizedSingularName = inflections.singularize(this._.humanize(this.slugifiedName));

        this.template('_.server.controller.js', 'app/controllers/' + this.slugifiedName + '.server.controller.js')
    }
});

module.exports = ControllerGenerator;
