// -*- coding: utf-8 -*-
// http://code.tutsplus.com/tutorials/build-your-own-yeoman-generator--cms-20040

var _s = require('underscore.string');
var JaySchema = require('jayschema');
var scipmChildSchemaJson = require('scipm/schema/scipmchild.0.1.0.schema.json');
var jaySchema = new JaySchema();
var SCHEMADRAFT4 = 'http://json-schema.org/draft-04/schema#';
var resultSchemaValidate;
var path = require('path');


var generators = require('yeoman-generator');
module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        // Next, add your custom code
        // this.option('coffee'); // This method adds support for a `--coffee` flag
        // this.scriptSuffix = (this.options.coffee ? ".coffee": ".js");

        // This makes `scipmname` a required argument.
        // this.argument('scipmname', { type: String, required: true });
        // this.scipmDotName = this._.camelize(this.scipmDotName); // And you can then access it later on this way; e.g. CamelCased

        // name (extract dir name)
        this.scipmDotName = path.basename(arguments['1'].env.cwd);

        // package
        this._package = {};
        this._package.main = "index.js";
        this.scipmchild = {};
        this.actions = {};

    },

    //~ prompting: function () {
        //~ var done = this.async();
        //~ this.prompt({
            //~ type    : 'input',
            //~ name    : 'name',
            //~ message : 'scipm package name',
            //~ default : this.appname
        //~ }, function (answers) {
            //~ this.scipmDotName = answers.name; // this.log(this.scipmDotName);
            //~ done();
        //~ }.bind(this));
    //~ },

    // @TODO
    // installingLodash: function() {
    //     this.npmInstall(['scipm'], { 'saveDev': true }); // This is equivalent to call: ``npm install scipm --save-dev``
    //     this.npmInstall(['scipm'], { 'save': true }); // This is equivalent to call: ``npm install scipm --save``
    // },

    validateName: function () {

        // validate scipmname
        // start with scipm. ?
        if (! _s.startsWith(this.scipmDotName, 'scipm.')) {
            this.log.conflict('directory is not like scipm.XXXXX');
            process.exit(1)
        }

        // split
        var tmpSplit = this.scipmDotName.split('.');

        // extract scipm name
        this.scipmName = tmpSplit[1]; // if

        // test this.scipmName
        if (this.scipmName === 'data') {
            this.log.conflict('package scipm.data not allow');
            process.exit(1)
        }
        if (this.scipmName === 'core') {
            this.log.conflict('package scipm.core not allow');
            process.exit(1)
        }

    },
    actions: function () {

        var actionName, actionConfig, done;

        // prompt name ...
        this._package.name = this.scipmDotName;

    },
    promptVersion: function () {

        // prompt version
        done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'result',
            message : 'package version',
            default : '0.1.0'
        }, function (answers) {
            this._package.version = answers.result;
            done();
        }.bind(this));

    },
    promptDescription: function () {

        // prompt description
        done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'result',
            message : 'package description',
            default : this.scipmDotName + " description ..."
        }, function (answers) {
            this._package.description = answers.result;
            done();
        }.bind(this));

    },
    promptLicence: function () {

        // prompt licence
        done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'result',
            message : 'package licence',
            default : "GPL-3.0"
        }, function (answers) {
            this._package.license = answers.result;
            done();
        }.bind(this));

    },
    promptGitHubAccount: function () {

        // prompt github account
        done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'result',
            message : 'github account',
            default : "ACCOUNT"
        }, function (answers) {

            if (answers.result === 'ACCOUNT') {
                this.log.conflict('ACCOUNT is not a valid github account');
                process.exit(1)
            }
            this._package.repository = {
                "type": "git",
                "url": "git://github.com/" + answers.result + "/" + this.scipmDotName + ".git"
            };
            this._package.bugs = {
                "type": "git",
                "url": "git://github.com/" + answers.result + "/" + this.scipmDotName + "/issues"
            };

            done();
        }.bind(this));

    },
    next115: function () {

        // prompts keywords
        this._package.keywords = ["scipm"];

        // prompts dependencies
        this._package.dependencies = {
            "scipm": "^1.0.0"
        };

    },
    initScipmchild: function () {

        // scipm child
        this.scipmchild.version = "1";
        this.scipmchild.scipmDependencies = {};

    },
    promptDependencieScipmVardump: function () {

        done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'result',
            message : 'add dependencie scipm.vardump ? YNyn',
            default : 'n'
        }, function (answers) {
            if (answers.result === 'Y' || answers.result === 'y') {
                this.scipmchild.scipmDependencies["scipm.vardump"] = null;
            }
            done();
        }.bind(this));

    },
    promptDependencieScipmExec: function () {

        done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'result',
            message : 'add dependencie scipm.exec ? YNyn',
            default : 'n'
        }, function (answers) {
            if (answers.result === 'Y' || answers.result === 'y') {
                this.scipmchild.scipmDependencies["scipm.exec"] = null;
            }
            done();
        }.bind(this));

    },
    promptDependencieScipmExtman: function () {

        done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'result',
            message : 'add dependencie scipm.extman ? YNyn',
            default : 'n'
        }, function (answers) {
            if (answers.result === 'Y' || answers.result === 'y') {
                this.scipmchild.scipmDependencies["scipm.extman"] = null;
            }
            done();
        }.bind(this));

    },
    next239: function () {

        // prompt luaRequire
        this.scipmchild.luaRequire = [];

        // prompt SciTEStartup ...
        this.scipmchild.SciTEStartup = {
            "_use": "dofile",
            "raw": null,
            "filePath": null, // "scite/SciTEStartup.part.lua",  (if _use == filePath)
            "dofile" : ["scite", "main.lua"],
            // "luaReportExtend": this.scipmDotName + ".reportExtend();"
            // "luaReportExtend": 'dofile (table.concat({scipm.data.path.scipmchild, \"' + this.scipmDotName + '\", \"scite\", \"startupInfo.lua\"}, scipm.data.path.sep));',
            "luaReportExtend": 'scipm.core.printInfoPackage(\"' + this.scipmDotName + '\");',
            "infoLuaFunctions": [
                {"name": this.scipmDotName + ".start(arg)"},
                {"name": this.scipmDotName + ".doubleClick()"}
            ],
            "infoFiles": [
                {"path": ["README.md"]},
                {"path": ["package.json"]},
                {"path": ["scite", "main.lua"]},
            ],
            "infoProps": [
                {"name": this.scipmDotName + ".config.key1", "value": "\"[0|1]\"", "default": "\"1\"", "description": "example only ...."}
            ]
        };
    },
    actionAction: function () {

        // prompt action ...
        done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'addAction',
            message : 'add an action ? YNyn',
            default : 'n'
        }, function (answers) {
            if (answers.addAction === 'Y' || answers.addAction === 'y') {
                this.addAction = true;
            } else {
                this.addAction = false;
            }
            done();

        }.bind(this));

    },
    actionName: function() {

        if ( this.addAction === true) {

            done = this.async();
            this.prompt({
                type    : 'input',
                name    : 'actionName',
                message : 'action name',
                default : "actionX"
            }, function (answers) {
                this.actionName = answers.actionName;
                actionName = answers.actionName;

                actionConfig = {
                    "title":  this.scipmDotName + " > " + actionName,
                    "description": this.scipmDotName + " > " + actionName  + " > description ...",
                    "pattern": ["*"],
                    "addToolsMenu": {
                        "allow": true,
                        "addContextMenu" : false,
                        "command": {
                            "shortcuts": null,
                            "subsystem": "luadirector",
                            "cmd": "dostring " + this.scipmDotName + ".start()",
                            "isFilter": null, // The optional command.is.filter property states that the command modifies the current file so it may need to be read in after performing the command if load.on.activate is set.
                            "saveBefore": "2", //  is set to 1, SciTE automatically saves the file before execution, If it is set to 2, SciTE will not save the file, otherwise SciTE asks you. On Windows
                            "input": null, // On Windows, the optional command.input property specifies text that will be piped to the command. This may reference other properties; for example, command.input.0.*.cc=$(CurrentSelection) would pipe the current selection to the command processes. The command.input property is only supported for subsystem 0 (command line programs).
                            "replaceSelection": null, // The optional command.replace.selection can be used to specify that the command output should replace the current selection (or be inserted at the cursor location, if there is no selection)
                            "quiet": null, // A final command property that is currently supported only on windows is command.quiet. A value of 1 indicates that the command I/O should not be echoed to the output pane. This may be useful in combination with command.input and command.replace.selection.
                            "mode": null // The command.mode property is a comma-separated list of flags / settings. Each mode setting can have an argument, separated from the setting name by a colon. For most of these, the argument portion is optional; if the setting name appears without an argument, this works the same as \"setting:yes\". If a setting is included in the command.mode but also appears as a separate command property, the mode property will be overridden. Similarly, if a single setting appears more than once with different arguments, the last valid argument takes priority. The supported command.mode settings are: filter - accepts keyword arguments yes and no, quiet - accepts keyword arguments yes and no, replaceselection - accepts yes, no, and auto, savebefore - accepts yes, no, and prompt, subsystem - console, windows, shellexec, lua, director, winhelp, htmlhelp, immediate, groupundo - yes or no, Currently, all of these except groupundo are based on individual properties with similar names, and so are not described separately here. The groupundo setting works with subsystem 3 (lua / director), and indicates that SciTE should treat any changes made by the command as a single undo action. A command that uses the groupundo setting should not change which buffer is active in the editor.
                        },
                    }
                };

                this.actions[actionName] = actionConfig;
                done();

            }.bind(this));

            // add actions

        }

        this.scipmchild.actions = this.actions;

    },
    validateSchema: function () {

        // validate schema json scipmchild
        resultSchemaValidate = jaySchema.validate(this.scipmchild, scipmChildSchemaJson);
        if (resultSchemaValidate.length !== 0) {
            console.log("is not a valid scipm package:\n" + JSON.stringify(resultSchemaValidate, null, 4));
            console.log(JSON.stringify(this.scipmchild, null, 4));
            process.exit(1);
        }

        //
        this._package.scipmchild = this.scipmchild;

    },
    writing: function () {
        this.mkdir("scite");
        this.template("index.js", "index.js", { scipmDotName: this.scipmDotName });
        this.template("README.md", "README.md", { scipmDotName: this.scipmDotName });
        this.template("_package.json", "package.json", { _package: this._package });
        this.template("_gitignore", ".gitignore", {});
        this.template("scite/main.lua", "scite/main.lua", { scipmDotName: this.scipmDotName });
        // this.template("scite/SciTEStartup.part.lua", "scite/SciTEStartup.part.lua", { scipmDotName: this.scipmDotName }); <=== if _use = filePath
        // this.template("scite/config.lua", "scite/config.lua", { scipmDotName: this.scipmDotName });
    },

    last: function () {
        this.log('update package.json manually now');
    },

});