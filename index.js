const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3000;

// connect to Mongo daemon
mongoose
  .connect(
    'mongodb://mongo:27017/expressmongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// DB schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

Item = mongoose.model('item', ItemSchema);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => res.render('index'));

app.post('/item/add', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.redirect('/'));
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
