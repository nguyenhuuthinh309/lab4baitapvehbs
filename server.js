const express = require('express')
const bodyParser = require("body-parser");
const expressHbs = require('express-handlebars');
const _cal = require("./calculate");

const app = express()
const port = 3000
app.engine('.hbs', expressHbs.engine({
    extname: "hbs",
    defaultLayout: 'main',
    layoutsDir: "views/layouts/",
}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', '.hbs');
app.set('views', './views');
let result = 0;
app.get('/', (req, res) => {
    res.render('home', { rs: result });
});
app.post('/', (req, res) => {
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
    console.log(num1, num2);
    const operator = req.body.operator;
    switch (operator) {
        case "sum":
            result = _cal.isSum(num1, num2);
            break;
        case "subtract":
            result = _cal.isSub(num1, num2);
            break;
        case "multiply":
            result = _cal.isMul(num1, num2);
            break;
        case "divide":
            result = _cal.isDiv(num1, num2);
            break;
        default:
            result = "";
            break;
    }
    console.log(result);
    res.render('home', { rs: result, num1: num1, num2: num2 });
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))