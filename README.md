# node-architecture
 My vision of good architecture

## Description
 > Easy start for node.js project
 
 > Understandable architecture
 
 > Simple CLI tool
 
 > Starter pack of popular and usefull modules
 
 > Docker
 
## List of some modules which are important
 - <a href="https://www.npmjs.com/package/moment">Moment</a> - for date parsing and formating
 - <a href="https://www.npmjs.com/package/mysql-migrations">mysql-migrations</a>
 - <a href="https://github.com/hapijs/joi">Joi</a> - best choise for a validation
 - <a href="https://www.npmjs.com/package/module-alias">module-alias</a> - easy `require`
## CLI Tutorial
 - It works with a `module-alias`.
 - Command `make`
 ```javascript
 node cli.js make:model users
```
 It will create a user.js file in `app/Models` folder. You can edit a file templates in cli.js
 **All available types for creation files trough CLI you can see at `package.json` in `_moduleAliases` field**
 
 - Also you can use all commands from <a href="https://www.npmjs.com/package/mysql-migrations">`mysql-migrations`</a>
 ```javascript
 node cli.js add create_table_users
```
It will create a migrtion file in `database/migrations`.
#### Important
In a `database/migration.js` you should to create a mysql connection from localhost to `db`  docker container.
You can configure it in `.env`


