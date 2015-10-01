var s = require('underscore.string'),
    generators = require('yeoman-generator'),
    mkdirp = require('mkdirp');

module.exports = generators.NamedBase.extend({

    init: function() {
        this.moduleName = s(this.name).slugify().value();
        this.capitalizedModuleName = s(this.name).capitalize().value();
    },

    createFolders: function() {
        mkdirp("modules/" + this.name);
        mkdirp("modules/" + this.name + "/server");
        mkdirp("modules/" + this.name + "/server/controllers");
        mkdirp("modules/" + this.name + "/server/models");
        mkdirp("modules/" + this.name + "/server/policies");
        mkdirp("modules/" + this.name + "/server/routes");
        mkdirp("modules/" + this.name + "/tests");
    },

    createFiles: function() {
        this.fs.copyTpl(
            this.templatePath("module.server.controller.js"),
            this.destinationPath("modules/" + this.name  + "/server/controllers/" + this.name + ".server.controller.js"),
            {
                moduleName: this.moduleName,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("module.server.model.js"),
            this.destinationPath("modules/" + this.name  + "/server/models/" + this.name + ".server.model.js"),
            {
                moduleName: this.moduleName,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("module.server.policy.js"),
            this.destinationPath("modules/" + this.name  + "/server/policies/" + this.name + ".server.policy.js"),
            {
                moduleName: this.moduleName,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("module.server.routes.js"),
            this.destinationPath("modules/" + this.name  + "/server/routes/" + this.name + ".server.routes.js"),
            {
                moduleName: this.moduleName,
                capitalizedModuleName: this.capitalizedModuleName
            });
    }
});
