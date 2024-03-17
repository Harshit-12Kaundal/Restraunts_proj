require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db=require("./db");


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// get our restrunats
app.get('/api/v1/restaurants', async (req, res) =>{
    const results = await db.query("select * from restraunts ")
    console.log(results);
    res.status(200).json({
        status: "success",
        data:{
            restraunt :["mac", "starbucks", "dominos"]
        }
    });
});


// get a restraunt

app.get('/api/v1/restaurants/:id', (req, res)=>{
    console.log(req.body);
    res.status(200).json({
        status : "success",
        data:{
            restraunt: "Kfc"
        }
    });
});

//  createa a restaurant 

app.post('/api/v1/restaurants' ,(req, res)=>{
    console.log(req.body);
    res.status(201).json({
        status : "success",
        data:{
            restraunt: "Kfc"
        }
    });
});


//update a restaurant
app.put("/api/v1/restaurants/:id", (req, res)=>{
    console.log(req.params.id);
    console.log(req.body);
    res.status(200).json({
        status : "success",
        data:{
            restraunt: "Kfc"
        }
    });
});

app.delete("/api/v1/restaurants/:id", (req,res) =>{
    res.status(204).json({
        status: "success",
    });
});

app.listen(port , () =>{
    console.log(`listening on port ${port}`);
});