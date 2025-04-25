document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api';
    const collectionModal = document.getElementById('collectionModal');
    const collectionForm = document.getElementById('collectionForm');
    const addcollectionBtn = document.getElementById('addcollectionBtn');
    const modalTitlecollection = document.getElementById('modalTitlecollection');
    let editcollectionId = null;

    const loadCollections = async () => {
        const response = await fetch(`${apiUrl}/collections`);
        const collections = await response.json();
        const tableBody = document.querySelector('#collectionsTable tbody');
        tableBody.innerHTML = '';

        collections.forEach(collection => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${collection.name}</td>
                <td>${collection.quantity}</td>
                <td>${collection.description}</td>
                <td>${collection.responsible}</td>
                <td>
                    <button class="editcollectionBtn" data-id="${collection._id}">Editar</button>
                    <button class="deletecollectionBtn" data-id="${collection._id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.editcollectionBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditcollectionModal(e.target.dataset.id));
        });

        document.querySelectorAll('.deletecollectionBtn').forEach(button => {
            button.addEventListener('click', (e) => deletecollection(e.target.dataset.id));
        });
    };

    const addcollection = async (collection) => {
        await fetch(`${apiUrl}/collections`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collection)
        });
        loadCollections();
    };

    const updatecollection = async (id, collection) => {
        await fetch(`${apiUrl}/collections/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collection)
        });
        loadCollections();
    };

    const deletecollection = async (id) => {
        await fetch(`${apiUrl}/collections/${id}`, { method: 'DELETE' });
        loadCollections();
    };

    const openEditcollectionModal = async (id) => {
        editcollectionId = id;
        modalTitlecollection.innerText = 'Editar Coleção';

        const response = await fetch(`${apiUrl}/collections/${id}`);
        const collection = await response.json();

        document.getElementById('namecollection').value = collection.name;
        document.getElementById('description').value = collection.description;
        document.getElementById('quantity').value = collection.quantity;
        document.getElementById('responsible').value = collection.responsible;

        collectionModal.style.display = 'block';
    };

    const openAddcollectionModal = () => {
        editcollectionId = null;
        modalTitlecollection.innerText = 'Adicionar Coleção';
        collectionForm.reset();
        collectionModal.style.display = 'block';
    };

    document.querySelector('.close').addEventListener('click', () => {
        collectionModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === collectionModal) {
            collectionModal.style.display = 'none';
        }
    });

    collectionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const collectionData = {
            name: document.getElementById('namecollection').value,
            description: document.getElementById('description').value,
            quantity: parseInt(document.getElementById('quantity').value),
            responsible: document.getElementById('responsible').value
        };

        if (editcollectionId) {
            await updatecollection(editcollectionId, collectionData);
        } else {
            await addcollection(collectionData);
        }

        collectionModal.style.display = 'none';
        loadCollections();
    });

    addcollectionBtn.addEventListener('click', openAddcollectionModal);
    loadCollections();
});
