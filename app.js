const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const emailid = req.body.mailid;

  const data = {
    members: [
      {
        email_address: emailid,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        },
      },
    ],
  };

  const jsondata = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/616b2f01ca";

  const options = {
    method: "POST",
    auth: "jerin10:5c30deb4b9f591f21c0d6f7a24dd6a03-us10",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/sucess.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsondata);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started at 3000");
});

// 6809e9b4ee6c822c1190e69444efaa55 - us10

// 616b2f01ca
