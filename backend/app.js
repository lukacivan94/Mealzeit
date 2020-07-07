const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');
const cookroomRoutes = require('./api/routes/cookrooms');
const courseRoutes = require('./api/routes/courses');
const recipeRoutes = require('./api/routes/recipes');
const notificationRoutes = require('./api/routes/notifications');

mongoose.connect(
    "mongodb+srv://mealAdmin:mealAdmin@cluster0-zhcek.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

// This function is used for inheritance
// Cookroom and Course models inherit from the Event model using extendSchema
function extendSchema(Schema, definition, options) {
    return new mongoose.Schema(
        Object.assign({}, Schema.obj, definition),
        options
    );
}
module.exports = extendSchema;

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/users', userRoutes);
app.use('/cookrooms', cookroomRoutes);
app.use('/courses', courseRoutes);
app.use('/recipes', recipeRoutes);
app.use('/notifications', notificationRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;