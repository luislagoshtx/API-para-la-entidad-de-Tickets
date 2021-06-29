// serializar
const fs = require('fs');

const filename = "cancion.json";

let fileFirstRead = false;

const writeToFile = (handler)=>{
  fs.writeFile(
    filename, // archivo
    JSON.stringify(cancionesList), //informacion JSON
    handler //la funcion que se disapara un vez guardado el archivo
  );
}

const readFile = (handler)=>{
  fs.readFile(
    filename,
    'utf8',
    handler
  );
}

var cancionesList = [];

if(!fileFirstRead){
  readFile(
    (err,object)=>{
      if(err){
        console.log(err);
      }else{
        cancionesList = JSON.parse(object);
      }
    }
  );
}

let cancionStruct = {
  nombre:"",
  artista:"",
  album:"",
  año:"",
  genero:""
}

module.exports.getAllCanciones = ()=>{
  return cancionesList;
}

module.exports.getById = (id)=>{
  try {
    return cancionesList[id];
  }catch(ex){
    return {};
  }
}


/*
var fun = function(a){
  return a
}
var fun = (a) => {return a};
 */
module.exports.getStruct = ()=>{
  // ES6 esto se conoce como destructor de objetos
  return { ...cancionStruct }; //clone
}

module.exports.addToList = ( cancion ) =>{
  cancionesList.push(cancion);
  writeToFile(
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File Succesfully Saved!!!");
      }
    }
  );
  return cancionesList.length -1;
}

module.exports.update = (id, nombre, artista, album, año, genero) => {
  if (id >= cancionesList.length);
  cancionesList[id] = {
    ...cancionesList[id], // old values
    ...{ nombre, artista, album, año, genero } // new values
  };
  writeToFile(
    (err)=>{
      if(err){
        console.log(err);
      }else {
        console.log("File Succesfully Saved!!!");
      }
    }
  );
  return cancionesList[id];
  /*
  personasList[id] = Object.assign(
    {},
    personasList[id],
    {nombre, telefono, correo, bio}
  );
  */
}

module.exports.deleteCancion = (id)=>{
  let newCancionesList = cancionesList.filter(
    (cancion, index)=>{ 
      return index != id;
    }
  );
  cancionesList = newCancionesList;
  writeToFile(
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File Succesfully Saved!!!");
      }
    }
  );
  return true;
}