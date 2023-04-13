const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = 8000
const _cal = require("./calculate");
const expressHbs = require('express-handlebars');
const url = require("url");
app.engine('.hbs', expressHbs.engine({
  extname: "hbs",
  defaultLayout: 'main',
  layoutsDir: "views/layouts/",
}));

//app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home', { layout: 'page2' });
});

app.get('/a', (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === "/") {
    fs.readFile("index.html", function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (parsedUrl.pathname === "/a") {
    const query = parsedUrl.query;
    const num1 = parseFloat(query.num1);
    const num2 = parseFloat(query.num2);
    const operator = query.operator;
    let result = 0;

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
        result = "Invalid operator";
        break;
    }

    res.render('home', { viewkq: result });


    res.writeHead(200, { "Content-Type": "text/html" });

    res.write(
      `<p style="text-align: center; font-size: 25px;">Result: ${result.toFixed(
        2)}</p>`
    );
    return res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("404 Not Found");
    return res.end();
  }
  res.render("./layouts/page2");
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
