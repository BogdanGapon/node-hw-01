const path = require("path");
const contactsPath = path.join(__dirname, "contacts.js");
const books = require(contactsPath);
const { program } = require("commander");

program
  .option("-a, --action <type>", "chose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p --phone <type>", "user phone");
program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const getAllBooks = await books.listContacts();
      return console.log(getAllBooks);

    case "get":
      const bookById = await books.getContactById(id);
      return console.log(bookById);

    case "add":
      const newBooks = await books.addContact(name, email, phone);
      return console.log(newBooks);

    case "remove":
      const deletedContacts = await books.removeContact(id);
      return console.log(deletedContacts);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
