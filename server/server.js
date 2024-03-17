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
app.put("/api/v1/restaurants/:id", async(req, res)=>{

    try {
        const results =await db.query("UPDATE restraunts SET name =$1 , location =$2 , price_range =$3 where id =$4 returning *" ,[req.body.name ,req.body.location ,req.body.price_range ,req.params.id]);
        res.status(200).json({
            status : "success",
            data:{
                restraunt: results.rows[0],
            }
        });
        
    } catch (error) {
        console.log(error);
    }
    console.log(req.params.id);
    console.log(req.body);
});

app.delete("/api/v1/restaurants/:id", async (req,res) =>{
    try {
        const results =await db.query("DELETE FROM restraunts WHERE id= $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(port , () =>{
    console.log(`listening on port ${port}`);
});