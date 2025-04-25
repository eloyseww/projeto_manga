const express = require('express');
const router = express.Router();
const {
    createCollection,
    getCollections,
    getCollectionById,
    updateCollection,
    deleteCollection
} = require('../controllers/collectionController');

router.post('/', createCollection);
router.get('/', getCollections);
router.get('/:id', getCollectionById);
router.put('/:id', updateCollection);
router.delete('/:id', deleteCollection);

module.exports = router;