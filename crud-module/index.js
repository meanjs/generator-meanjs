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
        mkdirp("modules/" + this.moduleName + "/client");
        mkdirp("modules/" + this.moduleName + "/client/config");
        mkdirp("modules/" + this.moduleName + "/client/controllers");
        mkdirp("modules/" + this.moduleName + "/client/services");
        mkdirp("modules/" + this.moduleName + "/client/views");
        mkdirp("modules/" + this.moduleName + "/server");
        mkdirp("modules/" + this.moduleName + "/server/config");
        mkdirp("modules/" + this.moduleName + "/server/controllers");
        mkdirp("modules/" + this.moduleName + "/server/models");
        mkdirp("modules/" + this.moduleName + "/server/policies");
        mkdirp("modules/" + this.moduleName + "/server/routes");
        mkdirp("modules/" + this.moduleName + "/tests");
        mkdirp("modules/" + this.moduleName + "/tests/client");
        mkdirp("modules/" + this.moduleName + "/tests/e2e");
        mkdirp("modules/" + this.moduleName + "/tests/server");
    },

    createFiles: function() {

        // Client templates
        this.fs.copyTpl(
            this.templatePath("module.client.config.js"),
            this.destinationPath("modules/" + this.moduleName  + "/client/config/" + this.moduleName + ".client.config.js"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("module.client.controller.js"),
            this.destinationPath("modules/" + this.moduleName  + "/client/controllers/" + this.moduleName + ".client.controller.js"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("module.client.routes.js"),
            this.destinationPath("modules/" + this.moduleName  + "/client/config/" + this.moduleName + ".client.routes.js"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("module.client.service.js"),
            this.destinationPath("modules/" + this.moduleName  + "/client/services/" + this.moduleName + ".client.service.js"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("views/create.client.view.html"),
            this.destinationPath("modules/" + this.moduleName  + "/client/views/create.client.view.html"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("views/edit.client.view.html"),
            this.destinationPath("modules/" + this.moduleName  + "/client/views/edit.client.view.html"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("views/list.client.view.html"),
            this.destinationPath("modules/" + this.moduleName  + "/client/views/list.client.view.html"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("views/view.client.view.html"),
            this.destinationPath("modules/" + this.moduleName  + "/client/views/view.client.view.html"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });
        this.fs.copyTpl(
            this.templatePath("module.client.module.js"),
            this.destinationPath("modules/" + this.moduleName  + "/client/" + this.moduleName + ".client.module.js"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });

        // Server templates
        this.fs.copyTpl(
            this.templatePath("module.client.config.js"),
            this.destinationPath("modules/" + this.moduleName  + "/server/config/" + this.moduleName + ".server.config.js"),
            {
                moduleName: this.name,
                capitalizedModuleName: this.capitalizedModuleName
            });
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
