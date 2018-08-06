#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var prompt = require('prompt');
var choices = require('prompt-choices');
var spawn = require('cross-spawn');
var colors = require('colors');
var inquirer = require('inquirer');
var editJsonFile = require("edit-json-file");
var ncp = require('ncp').ncp;
var appDir = path.dirname(require.main.filename);

prompt.start();

inquirer
  .prompt([
    {
        type: 'input',
        name: 'dir',
        message: 'Select any name for your project:',
        default: 'new-webapp'
    },
    {
        type: 'input',
        name: 'name',
        message: "What's your name:",
        default: "anonymus"
      },
      {
        type: 'input',
        name: 'email',
        message: "What's your email:"
      },
      {
        type: 'input',
        name: 'version',
        message: "Insert a version of your app:",
        default: "1.0.0"
      },
      {
        type: 'input',
        name: 'license',
        message: "License:",
        default: "MIT"
      },
      {
        type: 'input',
        name: 'description',
        message: "Write a short description of your application:"
      },
      {
        type: 'list',
        name: 'frontend',
        message: "What's language do you preffer to use",
        choices: ['coffee', 'typescript', 'react']
      },
    //   {
    //     type: 'list',
    //     name: 'backend',
    //     message: "What's language do you preffer to use",
    //     choices: ['NodeJS', 'PHP', 'None']
    //   },
    //   {
    //     type: 'confirm',
    //     name: 'names',
    //     message: "Do you preffer to use Landing/Landing.js instead of Landing/index.js"
    //   },
      {
        type: 'checkbox',
        message: 'Select if you want use any module',
        name: 'modules',
        choices: [
          {
            name: 'jquery'
          },
          {
            name: 'loadash'
          },
          {
            name: 'request'
          }
        ],
      }
  ])
  .then(answers => {
  
    const settings = {cwd: path.join(process.cwd(), answers.dir) , stdio: 'inherit' };
    
    switch(answers.frontend) {
        case 'coffee':
            runCoffee(answers, settings);
            break;
        case 'typescript':
            runTypescript(answers, settings);
            break;
        case 'react':
            runReact(answers, settings);
            break;
    }
    
  });


  function runCoffee(answers, settings) {
      ncp(path.join(appDir, `../templates/frontend/coffee/`), path.join(process.cwd(), answers.dir), function (err) {
        if (err) {
          return console.error(err);
        }
            done(answers, settings);
       });
  }

  function runReact(answers, settings) {
    ncp(path.join(appDir, `../templates/frontend/react/`), path.join(process.cwd(), answers.dir), function (err) {
      if (err) {
        return console.error(err);
      }
          done(answers, settings);
     });
}

function runTypescript(answers, settings) {
  ncp(path.join(appDir, `../templates/frontend/typescript/`), path.join(process.cwd(), answers.dir), function (err) {
    if (err) {
      return console.error(err);
    }
        done(answers, settings);
   });
}


  function done(answers, settings) { 

    let file = editJsonFile(path.join(process.cwd(), answers.dir, 'package.json'), {autosave: true});
    file.set("name", answers.dir);
    file.set("version", answers.version);
    file.set("description", answers.description);
    file.set("author", answers.name + ` <${answers.email}>`);
    file.set("license", answers.license);    


    if(answers.modules.length){
        let file = editJsonFile(path.join(process.cwd(), answers.dir, 'package.json'), {autosave: true});
        for (i = 0; i < answers.modules.length; i++) { 
            var module = answers.modules[i];
            file.set("dependencies", {
                 [module]: "^1.0.0"
            });
        }
    } 

    var npm = spawn('npm', ['install'], settings);
    npm.on('error',function() {
        console.log(arguments);
    });
    npm.on('close',function(code) {
        if (code!==0) console.log(new Error(code));
    });
  }