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
 
var domainName = {
  properties: {
    domainName: {
      message: 'Domain namae , ie "zgdev.com' ,
      required: true
    }
  }
};

var conform 


prompt.start();
prompt.get([name ,domainName], function (err, result) {

  var proyectsFolder = "/Users/juanobrach/"
  // var proyectsFolder = "/home/gm2dev/documents"
  var proyectName = result.name
  var domain = "."+result.domainName;
  var fullDomain = proyectName+domain

  var proyectPath = proyectsFolder + proyectName + "/"

  //Creo la carpeta del proyecto
  if (!test('-d', proyectPath)) {
    cd(proyectsFolder)
    mkdir(proyectPath)
    cd(proyectPath)
    echo(pwd())
  }else{
    // recorro el directorio
    echo("el proyecto existe")
    cd(proyectPath)
  }

  // GIT init del proyecto
  if(!test("-f",".git")){
    exec("git init")
  }
  //creo un virtual host
  if(test('-f',fullDomain)){
    echo("virtual host ya existe")
  }else{
    echo("creando VirtualHost")
    var VH = "<VirtualHost *:80>"+"\n"
                +" ServerName "+fullDomain +"\n"
                +" DocumentRoot"+ proyectPath +"\n"

                +" <Directory "+ proyectPath +" >"+"\n"
                +"         Options FollowSymLinks MultiViews Includes"+"\n"
                +"         AllowOverride All"+"\n"
                +"         Order allow,deny"+"\n"
                +"         allow from all"+"\n"
                +" </Directory>"+"\n"

                +"ErrorLog ${APACHE_LOG_DIR}/"+ proyectName+".local.error.log"+"\n"

                +"# Possible values include: debug, info, notice, warn, error, crit alert, emerg."+"\n"
                +"LogLevel warn"+"\n"

                +"CustomLog ${APACHE_LOG_DIR}/"+proyectName+".local.access.log combined"+"\n"
             +"</VirtualHost>"+"\n"
    VH.to(fullDomain)

    echo("virtual host creado")
    // Ejecutar sudo a2ensite + nombredel proyecto
    echo("ejecuto a2ensite")
    exec("a2ensite "+fullDomain)
    exec("sudo service apache2 restart")
    echo("el proyecto esta creado")
    echo("El dominio es :" + fullDomain)
  }

});