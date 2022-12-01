const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require('cors');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoute = require('./Controller/auth');
const passportSetup = require("./Controller/passport");

app.use(cookieSession({ name: "session", keys: ["edureka"], maxAge: 24 * 60 * 60 * 1000 }))
const routes = require('./Routes/index');
const paymentRoutes = require("./Controller/payment");


dotenv.config();

// const port = process.env.PORT || 8000;
// const hostname = 'localhost';
// const dbUrl = 'mongodb://127.0.0.1:27017/zomato_56';
// const atlasDbUrl = 'mongodb+srv://user_56:7ggxEKPWJ0b5iRvX@cluster0.ujnvih3.mongodb.net/zomato_db56?retryWrites=true&w=majority'
const port = process.env.PORT || 8000;
const hostname = 'localhost';
const dbUrl = 'mongodb://127.0.0.1:27017/zomato_56';
//const atlasDbUrl = 'mongodb+srv://Webuser-56:PWcZnqD8dqZvFFTj@cluster0.ujnvih3.mongodb.net/zomato_db56?retryWrites=true&w=majority'
const atlasDbUrl = 'mongodb+srv://Webuser-56:PWcZnqD8dqZvFFTj@cluster0.4layw0q.mongodb.net/zomato_db56?retryWrites=true&w=majority'

//user_56
//7ggxEKPWJ0b5iRvX

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use("/api/payment/", paymentRoutes);

app.use("/auth", authRoute);
mongoose.connect(atlasDbUrl, {
    useNewUrlParser: true, useUnifiedTopology: true
})

    .then(res => {
        app.listen(port, hostname, () => {
            console.log(`Server is running at ${hostname}:${port}`)
        });
    })
    .catch(err => console.log(err));