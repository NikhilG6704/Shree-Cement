const express = require("express");

const router = express.Router();

const {
  getAllAssets,
  createAssets,
  deleteAsset,
} = require("../controllers/assetsController");

router.get("/", getAllAssets);

router.post("/", createAssets);

router.delete("/:id", deleteAsset);

module.exports = router;
