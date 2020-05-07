const express = require('express');
const router = express.Router();

const PhotoController = require('../controllers/photoController');


//List all photos
router.get('/', async (request, response) => {
  const photos = await PhotoController.listAll();

  return response.json(photos);
});


router.post('/', async(request, response) => {
  const {likes, comments, product_id, preferredComunicationMethod} = request.body;

  const photoData = {
    likes,
    comments,
    product_id,
    preferredComunicationMethod
  }


    const contact = await PhotoController.store(photoData)

    if(!contact){
      return response.status(400).json({ error: 'Fail to create Photo' });
    }

    return response.send(contact);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await PhotoController.delete(id);

  if(!status){
      return response.status(400).json({ error: `The photo with the id ${id} doesn't exist` });
  }

  return response.send({msg: "photo deleted successfully"});
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {likes, comments, product_id, preferredComunicationMethod} = request.body;

  const photoData = {
    likes,
    comments,
    product_id,
    preferredComunicationMethod,
  }

  const photo  = await PhotoController.update(id, photoData);

  if(!photo){
      return response.status(400).json({ error: `Fail to update or nothing changed on photo with the id ${id}` });
  }

  return response.send({msg: "photo updated successfully"});
});





module.exports = router;