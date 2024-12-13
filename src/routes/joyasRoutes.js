const express = require("express");
const { getJoyas, getFiltros } = require("../controllers/joyasController"); // Importa getFiltros aquí
const router = express.Router();

router.get("/joyas", getJoyas);
router.get("/joyas/filtros", getFiltros); // Usa getFiltros aquí

module.exports = router;
