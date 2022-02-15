const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyparser = require("body-parser")
const engine = require("express-handlebars")
const path = require("path")
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'hbs')

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/Cart");
const orderRoute = require("./routes/order");


dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/login', (req, res) => {
    res.sendFile("login.html", { root: "/users/ABC/desktop/project2/public" })
})
app.get('/admin', (req, res) => {
    res.sendFile('dash.html', { root: '/users/ABC/desktop/project2/public' })
})
app.get('/addproduct', (req, res) => {
    res.sendFile('admin.html', { root: '/users/ABC/desktop/project2/public' })
})
app.get('/update', (req, res) => {
    res.sendFile('updatepro.html', { root: '/users/ABC/desktop/project2/public' })
})
app.get('/delete', (req, res) => {
    res.sendFile('delete.html', { root: '/users/ABC/desktop/project2/public' })
})
app.get('/updateorder', (req, res) => {
    res.sendFile('updateorder.html', { root: '/users/ABC/desktop/project2/public' })
})
app.get('/deleteorder', (req, res) => {
    res.sendFile('deleteorder.html', { root: '/users/ABC/desktop/project2/public' })
})

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 8080, () => {
    console.log("Backend server is running!");
});