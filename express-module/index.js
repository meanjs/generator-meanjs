var s = require('underscore.string'),
    generators = require('yeoman-generator'),
    mkdirp = require('mkdirp');

module.exports = generators.NamedBase.extend({

    init: function() {
        this.moduleName = s(this.name).slugify().value();
        this.capitalizedModuleName = s(this.name).capitalize().value();
    },

    createFolders: function() {
        mkdirp("modules/" + this.moduleName);
        mkdirp("modules/" + this.moduleName + "/server");
        mkdirp("modules/" + this.moduleName + "/server/controllers");
        mkdirp("modules/" + this.moduleName + "/server/models");
        mkdirp("modules/" + this.moduleName + "/server/policies");
        mkdirp("modules/" + this.moduleName + "/server/routes");
        mkdirp("modules/" + this.moduleName + "/tests");
    },

    createFiles: function() {
        this.fs.copyTpl(
            this.templatePath("module.server.controller.js"),
            this.destinationPath("modules/" + this.moduleName  + "/server/controllers/" + this.moduleName + ".server.controller.js"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("module.server.model.js"),
            this.destinationPath("modules/" + this.moduleName  + "/server/models/" + this.moduleName + ".server.model.js"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("module.server.policy.js"),
            this.destinationPath("modules/" + this.moduleName  + "/server/policies/" + this.moduleName + ".server.policy.js"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("module.server.routes.js"),
            this.destinationPath("modules/" + this.moduleName  + "/server/routes/" + this.moduleName + ".server.routes.js"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });
    }
});
