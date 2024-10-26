const express=require("express");
const router = express.Router();
const eventController=require("../../controllers/event.controller");
const middleware = require("../../config/middleware");

router.post('/',middleware.auth,eventController.addEvent);

router.get('/',middleware.auth,eventController.getUserEvent);

router.put('/:id',middleware.auth,eventController.editEvent);

router.delete('/:id',eventController.deleteEvent);



module.exports=router;