const Collection = require('../models/collection');

// Criar nova coleção
exports.createCollection = async (req, res) => {
    try {
        const { name, description, responsible, quantity } = req.body;
        const collection = new Collection({ name, description, responsible, quantity });
        await collection.save();
        res.status(201).json(collection);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todas as coleções
exports.getCollections = async (req, res) => {
    try {
        const collections = await Collection.find();
        res.status(200).json(collections);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCollectionById = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) return res.status(404).json({ message: 'Coleção não encontrada' });
        res.status(200).json(collection);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar coleção
exports.updateCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, responsible, quantity } = req.body;

        const updated = await Collection.findByIdAndUpdate(
            id,
            { name, description, responsible, quantity },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: 'Coleção não encontrada' });

        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Deletar coleção
exports.deleteCollection = async (req, res) => {
    try {
        const deleted = await Collection.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Coleção não encontrada' });

        res.status(200).json({ message: 'Coleção excluída com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};