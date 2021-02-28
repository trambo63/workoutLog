require('dotenv').config();
const Express = require('express');
const dbConnection = require('./db');
const middleware = require('./middleware');
const app = Express();

app.use(middleware.CORS)
app.use(Express.json());

const controllers = require('./controllers');

app.use('/user', controllers.usercontroller);
app.use('/log', controllers.logcontroller);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[SERVER]: App is listening on ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(`[Server]: Server Crashed`);
        console.log(err);
    });