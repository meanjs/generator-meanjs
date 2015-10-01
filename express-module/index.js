var s = require('underscore.string'),
    generators = require('yeoman-generator'),
    mkdirp = require('mkdirp');

module.exports = generators.NamedBase.extend({

    init: function() {
        this.createFolders();
        this.createFiles();
    },

    createFolders: function() {
        mkdirp("modules/" + this.name);
        mkdirp("modules/" + this.name + "/server");
        mkdirp("modules/" + this.name + "/tests");
        mkdirp("modules/" + this.name + "/server/controllers");
        mkdirp("modules/" + this.name + "/server/models");
        mkdirp("modules/" + this.name + "/server/routes");
    },

    createFiles: function() {
        this.fs.copyTpl(
            this.templatePath("module.server.controller.js"),
            this.destinationPath("modules/" + this.name  + "/server/controllers/" + this.name + ".server.controller.js"),
            {
                moduleName: this.name,
                capitalizedModuleName: s(this.name).capitalize().value()
            });
        this.fs.copyTpl(
            this.templatePath("module.server.model.js"),
            this.destinationPath("modules/" + this.name  + "/server/models/" + this.name + ".server.model.js"),
            {
                moduleName: this.name,
                capitalizedModuleName: s(this.name).capitalize().value()
            });
        this.fs.copyTpl(
            this.templatePath("module.server.routes.js"),
            this.destinationPath("modules/" + this.name  + "/server/routes/" + this.name + ".server.routes.js"),
            {
                moduleName: this.name,
                capitalizedModuleName: s(this.name).capitalize().value()
            });
    },

});
