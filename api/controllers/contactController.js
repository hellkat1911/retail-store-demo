const Contact = require('../models/Contact');

exports.createContact = (req, res, next) => {
  const contact = new Contact(req.body);

  contact.save()
    .then(() => {
      res.status(200).send(contact);
    })
    .catch(err => {
      res.status(500).send(`Error creating new contact: ${err}`);
    });
};
