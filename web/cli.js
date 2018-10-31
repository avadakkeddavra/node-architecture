const fs = require('fs');
const namespaces = require('./package.json')._moduleAliases;
const argumets = process.argv;

function controllerTemplate(name) {
return `
const Controller = require('@controller/Controller');

class ${name} {
    
    constructor() {

    }

}

module.exports = new ${name}();
`;
}

function ucFirst(str) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
}

function modelTemplate(name) {

    if(name.indexOf('Model') !== -1) {
        name = name.split('Model')[0];
    }

    let ucName = ucFirst(name);
    return `
module.exports = function (sequelize,Sequelize) {
    
    let ${ucName}Schema = {
        
    };
    
    let ModelOptions = {
        
    };
    
    return sequelize.define('${name.toLowerCase()}', ${ucName}Schema, ModelOptions);
};

`;
}

function middlewareTemplate(name) {
    return `
    class ${name} {
        
        constructor() {
    
        }
    
    }
    
    module.exports = new ${name}();
    `;
}

function routeTemlate() {

}

function getTemplate(type, name) {
    let template = '';
    switch(type) {
        case '@controller':
            template = controllerTemplate(name);
            break;
        case '@model':
            template = modelTemplate(name);
            break;
        case '@middleware' :
            template = middlewareTemplate(name);
            break;
        case '@service':
            template = controllerTemplate(name);
            break;
        case 'route':
            break;
        default:

            break;
    }

    if(template !== '') {
        return template;
    } else {
        throw new Error('Template was not founded')
    }

}

const path = require('path');

function searchFile(startPath,filter){



    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    let files=fs.readdirSync(startPath);

    for(let i=0;i<files.length;i++){

        let filename=path.join(startPath,files[i]);

        let stat = fs.lstatSync(filename);

        if(files[i].indexOf(filter) !== -1) {
            console.log(files[i]);
            return true
        }

        if (stat.isDirectory()) {
            searchFile(filename, filter); //recurse
        }
    }

    return false;
}


for(let i = 0; i < argumets.length; i++ ) {
    let command = argumets[i];

    if(command.indexOf('make:') !== -1) {
        let instance = '@'+command.split(':')[1];
        if(Object.keys(namespaces).indexOf(instance) !== -1) {

            if(searchFile(namespaces[instance], argumets[i+1])) {
                throw new Error('File already created');
            }

            let name = process.argv[i+1];

            fs.writeFile(namespaces[instance]+'/'+argumets[i+1]+".js", getTemplate(instance, name), function(error){

                if(error) throw error;
                console.log(`${process.argv[i+1]} created in `+instance);

            });
        } else {
            throw new Error('Wrong namespace');
        }
    } else if(command.indexOf('add') !== -1 || 
              command.indexOf('run') !== -1 || 
              command.indexOf('up') !== -1 || 
              command.indexOf('down') !== -1 || 
              command.indexOf('refresh') !== -1)
    {

        require('./database/migration');
    }
}

