require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const config = require("./config.json")
let vCardsJS = require('vcards-js');
const Event = require("./models/Event");

const app = express();

const { URI } = process.env;

app.set("port", process.env.PORT)

console.log(`database connecting to ${URI}`)
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log(`database connected on ${URI}`))
    .catch(err => console.error("error",err));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

//Routes
app.get("/vcard/:id", async (req, res) => {
    const {id} = req.params
    const attendee = await User.findById(id)
    let vCard = vCardsJS();
    const event = await Event.findOne()
    event.customFieldsForVCard.forEach(({fieldVCard, valueAttendee}) => {
            vCard[fieldVCard] = attendee[valueAttendee]
    })
    console.log(vCard)
    // vCard.saveToFile(id + ".vcf")
    res.set('Content-Type', 'text/vcard; name="enesser.vcf"');
    res.set(`Content-Disposition', 'inline; filename=${id}.vcf`);
    res.send(vCard.getFormattedString());
});

app.listen(app.get("port"), (_) =>
	console.log(`server on port ${app.get("port")}`)
);