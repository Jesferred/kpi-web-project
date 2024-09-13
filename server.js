import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Мейн страничке (АРТЕМ СДЕЛАЙ ФРОНТ)")
})

app.get("/register", (req, res) => {
    res.render("register.ejs");
})

app.get("/login", (req, res) => {
    res.send("Страничка авторизации (АРТЕМ СДЕЛАЙ ФРОНТ)")
})

app.get("/panel", (req, res) => {
    res.send("Панель юзера (АРТЕМ СДЕЛАЙ ФРОНТ")
})

app.post("/register", (req, res) => {
    const login = req.body.login
    const email = req.body.email
    const password = req.body.password

    console.log(login, email, password)

    res.redirect("/panel")
})

app.post("/login", (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})