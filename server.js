const express = require("express");
const app = express()
const bodyParser = require("body-parser");


const https = require("https")


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res) =>{
    res.sendFile(__dirname+"/index.html")
})


app.post("/", (req,res) => {
    var apikey ="84c63ad7195bb114e96b7b5e44fd90cb-us13"
    var listid = "4888770d1a"
    var dc = "us13"

    var fname = req.body.first_name
    var lname = req.body.last_name
    var email = req.body.email
    
    const url = "https://us13.api.mailchimp.com/3.0/lists/4888770d1a"
    const options = {
        method:"POST",
        auth:"sit313:84c63ad7195bb114e96b7b5e44fd90cb-us13"

    }

     const data = {
        members : [
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
     }

     var jsonData = JSON.stringify(data)





     const request = https.request(url,options,(response)=>{
        response.on("data", (data) =>(
            console.log(JSON.parse(data))
        ))

     })

     request.write(jsonData)
     request.end()
})
app.listen(8080, function() {
    console.log("Server is running an port 8080")
})











app.post('/', function(req, res){
    console.log(req,body);
    res.end('success!!!!!');
})

