const express = require("express");

const router = express.Router();

const {
  getAllAssets,
  createAssets,
  updateAsset,
  deleteAsset,
} = require("../controllers/assetsController");

router.get("/", getAllAssets);

router.post("/", createAssets);

router.put("/:id", updateAsset);

router.delete("/:id", deleteAsset);

module.exports = router;
