# Webify Generator

Webify Generator is a generator that allows you to instantly create projects based on various languages and technologies.

  - CoffeeScript
  - TypeScript (coming soon)
  - React (coming soon)

# New Features!

  - You can select npm modules to add to your new project


### How To Install

Webify Generator is very simple to install:

Only needs to install it globally
`npm i webify-generator -g`

### Get Started

Webify Generator requires [Node.js](https://nodejs.org/) v6+ to run.

Enter to directory when you want create a new project.

```sh
$ webify-generator
```

Next step is fill the options...

Note: the parameters like this `(new-webapp)` are the default parameter, if you do not enter anything and press enter, the default parameter will be setted.

```sh
# Select any name for your project (new-webapp): [Put an awesome name for your APP]
# What's your name (anonymus): [Put your or your organization name]
# What's your email: [Put your or your organization email]
# Insert a version of your app (1.0.0): [Put a version of your new APP]
# License: (MIT): [Check what license is accordin for your app]
# Write a short description of your application: [Describe your APP]
# What's language do you preffer to use (Use arrow keys): [Select Language]
#  Select if you want use any module: [Mark checkboxes with space and press enter for submit]
```

### Development

Enter to your new generated project folder and run it!

```sh
$ cd [Your project name]
$ gulp
```
Enjoy!

### Want to contribute? Great!

Webify Generator uses Gulp + Browserify for fast developing.

Clone the project in any folder, and modify the `bin/webify-generator.js` file.
Then, commit your changes in a new branch and make a `(PR) Pull Request`




License
----

MIT


**Free Software, Hell Yeah!**


