const { Command } = require('commander');
const { listContacts, removeContact, getContactById, addContact } = require("./contacts");

const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');
program.parse();

const argv = program.opts();

const invokeActions = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContacts = await listContacts();
            console.table(allContacts);
            break;
        case "get":
            const contactById = await getContactById(id);
            console.log('get: ', contactById);
            break;
        case "remove":
            const deletedContact = await removeContact(id);
            console.log('remove: ', deletedContact);
            break;
        case "add":
            const addContactFromList = await addContact({ name, email, phone });
            console.log('add: ', addContactFromList);

            break;
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeActions(argv);
