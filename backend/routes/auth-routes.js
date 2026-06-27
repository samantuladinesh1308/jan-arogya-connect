const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');

router.get("/admins", authControllers.getAllAdmins)

router.post("/admin-login", authControllers.adminLogin)

router.post("/admin-register", authControllers.adminRegister)

router.post("/reception-login", authControllers.receptionLogin)

router.post("/reception-register", authControllers.receptionRegister)

router.post("/inventory-login", authControllers.inventoryLogin)

router.post("/inventory-register", authControllers.inventoryRegister)





module.exports = router;