const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())

// MONGODB SETUP HERE
const mongoose = require('mongoose');
mongoose.connection.on('connected', function() {
  console.log('Connected to MONGODB!');
})
mongoose.connect(process.env.MONGODB_URI);

const Contact = mongoose.model('Contact', {
  name: String,
  phone: String,
  birthday: Date,
});

//ROUTES
app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/contact', (req, res) => {
  Contact.find({}, (err, docs) => {
    if(err) res.status(500).end(err.message)
    else {
      console.log('these are my contacts', docs);
      res.json(docs);
    }
  })
});

app.get('/contact/:id', function (req, res) {
  Contact.findById(req.params.id, (err, doc) => {
    if(err) res.status(500).end(err.message)
    else res.json(doc)
  })
});

app.post('/contact/create', (req,res) => {
  console.log('hi', req.body);
  new Contact(req.body)
    .save()
    .then((doc) => {
      res.json({id: doc.id})
      console.log('SUCCESSFULLY SAVED NEW CONTACT');
    })
    .catch((err) => res.status(500).end(err.message))
});

app.post('/contact/update', (req,res) => {
  Contact.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    phone: req.body.phone,
    birthday: req.body.birthday,
  })
  .then(contact => {
    console.log('updated contact', contact);
    res.json({id: contact.id})
  })
  .catch((err) => res.status(500).end(err.message))
});

app.post('/contact/delete', (req,res) => {
  console.log('id is ', req.body.id);
  Contact.findByIdAndDelete(req.body.id)
  .then(data => {
    console.log('deleted', data);
    res.json({id: data.id})
  })
  .catch((err) => {
    console.log('houston, we have a problem', err);
    res.status(500).end(err.message)
  })
})

// DO NOT REMOVE THIS LINE :)
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);
