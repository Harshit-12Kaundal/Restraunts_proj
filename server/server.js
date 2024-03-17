require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db=require("./db");


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// get our restrunats
app.get('/api/v1/restaurants', async (req, res) =>{

    try {
        const results = await db.query("select * from restraunts ")
        console.log(results);
        res.status(200).json({
            status: "success",
            results:results.rows.length,
            data:{
                restraunt: results.rows,
            }
        });
        
    } catch (error) {
        console.log(error);
    }
});


// get a restraunt

app.get('/api/v1/restaurants/:id', async(req, res)=>{
    try {
        const results = await db.query("select  from restraunts where id= $1" ,[req.params.id]);
        console.log(results.rows[0]);
        res.status(200).json({
            status : "success",
            data:{
                restraunt: results.rows[0],
            }
        });
    } catch (error) {
        console.log(error);
    }
});

//  createa a restaurant 

app.post('/api/v1/restaurants' ,async(req, res)=>{
    console.log(req.body);
    try {
        const results = await db.query("INSERT INTO restraunts (name , location ,price_range) values ($1, $2, $3) returning *" ,[req.body.name , req.body.location , req.body.price_range] );
        console.log(results);
        res.status(201).json({
            status : "success",
            data:{
                restraunt: results.rows[0],
            }
        });
    } catch (error) {
        console.log(error);
    }
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