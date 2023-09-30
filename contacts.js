const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');
const contactsPath = path.resolve('db/contacts.json');

const updateContacts = async (data) => {
    fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
};

// Get all contacts.
async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
};

//Get one contact by id.
async function getContactById(contactId) {
    const data = await listContacts();
    const searchId = data.find((item) => item.id === contactId);
    if (!searchId) { return null; }
    return searchId;
};

// Remove a contact from the list.
async function removeContact(contactId) {
    const data = await listContacts();
    const indexDeleteContact = data.findIndex((item) => item.id === contactId);
    if (indexDeleteContact === -1) {
        return null
    };
    const [deletedContact] = data.splice(indexDeleteContact, 1);
    await updateContacts(data);
    return deletedContact;
};

// Adding a new contact.
async function addContact({ name, email, phone }) {
    const data = await listContacts();
    const newContact = {
        id: nanoid(),
        name, email, phone
    };
    data.push(newContact);
    await updateContacts(data);
    return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact }