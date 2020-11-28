const ProductCenter = require('../models/ProductCenter');
const Contact = require('../models/Contact');

exports.createProductCenter = (req, res, next) => {
  let data = {...req.body};

  Contact.findOne({ name: req.body.contact })
    .then(record => {
      data.contact = record._id;

      const location = new ProductCenter(data);

      location.save()
        .then(() => {
          res.status(200).send(location);
        })
        .catch(err => {
          res.status(500).send(`Error creating new product center: ${err}`);
        });
    })
    .catch(err => {
      res.status(404).send(`Contact not found: ${err}`);
    });
};
