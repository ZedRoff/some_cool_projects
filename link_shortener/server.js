const express = require("express")
const app = express()
const mongoose = require("mongoose")
const model = require("./model_shorten")

let default_port = 5500;
let mongo_uri = "mongourl"

app.use(express.static('./'))

mongoose
  .connect(mongo_uri, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("DB is setupped ");
  })
  .catch((err) => {
    console.log(Error, err.message);
  });

app.get("/", (req, res) =>  {
   res.sendFile(__dirname + "/index.html")
  
})

app.get("/s/:name/:url", (req, res) => {
    let name = req.params.name;
    let url = req.params.url;
    model.findOne({name}, (err, doc) => {
        if(!doc) {
            const proc = new model({
               name,
               url
            })
            proc.save()
            res.json({name})
        }else {
            res.send("This shorten already exists.")
        }
    })
})

app.get("/links/:name", (req, res) => {
    model.findOne({name: req.params.name}, (err, doc) => {
        if(!doc) {
            res.send("This link doesn't exists. Comeback <a href='/'>Home</a>")
        }else {
            res.redirect("https://"+doc.url)
        }
    })
})

app.get("/l/:name", (req, res) => {
    let name = req.params.name;

    model.findOne({name}, (err, doc) => {
        if(!doc) {
           res.send("This URL doesn't exists.")
        }else {
            res.json({url: doc.url})
        }
    })
})


app.listen(default_port, () => {
    console.log(`URL Shortener project is listening on the following port : ${default_port}`)
})