const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();
const view = path.join(__dirname, './view');

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', view);

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(__dirname + '/public/images'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));