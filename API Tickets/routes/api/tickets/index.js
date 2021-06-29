var express = require("express");
var router = express.Router();

var  { getAllCanciones,
  getById,
  getStruct,
  addToList,
  update,
  deleteCancion} = require("./cancionesmem");


router.get(
    "/version",
    (req, res)=>{
        res.json({"terea": "canciones"});
    }


);

router.get(
    "/",
    (req, res)=>{
      res.status(200).json(getAllCanciones());
    }
  ); // get /
  
  router.get(
    "/byid/:cancionid",
    (req, res)=>{
      console.log(req.params);
      var { cancionid } = req.params;
      res.status(200).json(getById(cancionid));
    }
  );

  router.post(
    "/new",
    (req, res)=>{
      const { nombre, artista, album, año, genero} = req.body;

      let newCancion = Object.assign(
                                      {},
                                      getStruct(),
                                      { nombre,
                                        artista,
                                        album,
                                        año,
                                        genero}
                                    );
      let index = addToList(newCancion);
      res.status(200).json({inserted:1, inserted_id:index});
    }
  ); // post new

  
  router.put(
    "/upd/:cancionid",
    (req, res)=>{
      const {  nombre, artista, album, año, genero } = req.body;
      const { cancionid } = req.params;
      var updatedCancion = update(
          cancionid,
          nombre,
          artista,
          album,
          año,
          genero
      ); 
      res.status(200).json(updatedCancion);
    }
  ); // put upd
  
  router.delete(
    "/del/:cancionid",
    (req, res)=>{
      let {cancionid} = req.params;
      deleteCancion(cancionid);
      res.status(200).json({"return":true});
    }
  );


module.exports = router;