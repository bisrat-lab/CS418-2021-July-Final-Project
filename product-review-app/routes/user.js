
var express = require('express');
var router = express.Router();
const usercontroller = require('../controller/usercontroller');
const admin = require('../controller/auth')

router.get('/', usercontroller.getAllUsers);
router.post('/', usercontroller.postUser);
router.delete('/rig/:id',admin.authorizeAdmin, usercontroller.deleteById);
router.put('/:id', usercontroller.editUser);



module.exports = router;

