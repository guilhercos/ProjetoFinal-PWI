const express = require('express');
const app = express();
const db = require('./db/db');
const cookieParser = require('cookie-parser')


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(__dirname));
app.use(cookieParser())
app.use(
    session({
        store: MongoStore.create({ mongoDBurl: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.${DB_CODE}.mongodb.net/?retryWrites=true&w=majority`}),
        secret: process.env.SECRET,
        name: 'sessionId',
        resave: false,
        saveUninitialized: true,
        cookie: {  maxAge : 7  *  24  *  60  *  60  *  1000  } 
    })
)

db.Connect();

const routes = require('./routes/routes')
app.use(routes);


app.listen(3000, () => {
    console.log("App running on port 3000");
});