require("shelljs/global")
var prompt = require('prompt');

var name = {
  properties: {
   name: {
      message: 'Project name',
      required: true
    }
  }
};
var folder = {
  properties:{
    folder:{
      message: 'example folder: /Users/juanobrach/proyects/'
    }
  }
}

var user = {
  properties:{
    user:{
      message: 'Your github user name. ie: linus_torvalds'
    }
  }
}

prompt.start();
prompt.get([name, folder, user], function (err, result) {
  /*Guardo el usuario de github en una variable*/
  var user = result.user;
  /*carpeta raiz donde quiero generar el proyecto*/
  var proyectsFolder = result.folder;
  /*guardo el resultado del prompt para name*/
  var proyectName = result.name;

  var proyectPath = proyectsFolder + proyectName + "/";

  //Creo la carpeta del proyecto
  if (!test('-d', proyectPath)) {
    cd(proyectsFolder);
    mkdir(proyectName);
    cd(proyectPath);
    echo(pwd());
  }else{
    // recorro el directorio
    echo("el proyecto existe");
    cd(proyectPath);
  }

  // GIT init del proyecto
  if( !test("-f",".git") ){
    echo("iniciando git");
    exec("git init");
    exec("git status");
    exec('curl -i -u "'+user+'"  -d \'{"name": "'+proyectName+'", "auto_init": true}\' https://api.github.com/user/repos');
    exec('git remote add origin https://github.com/juanobrach/"'+proyectName+'".git');
  }
  echo("el proyecto esta creado");
  echo('Tu repositorio remoto es:https://github.com/juanobrach/'+proyectName+'.git');
});
