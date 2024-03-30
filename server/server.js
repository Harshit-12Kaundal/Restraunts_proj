require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db=require("./db");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// get our restrunats
app.get('/api/v1/restaurants', async (req, res) =>{

    try {
        const results = await db.query("select * from restraunts ");
        const restarantRatingData = await db.query("select * from restraunts left join (select restaurant_id, COUNT(*) ,TRUNC(AVG(rating),1) as average_rating from review group by restaurant_id) review on restraunts.id = review.restaurant_id ;"
        );
        res.status(200).json({
            status: "success",
            results:restarantRatingData.rows.length,
            data:{
                restraunt: restarantRatingData.rows,
            }
        });
        
    } catch (error) {
        console.log(error);
    }
});


// get a restraunt

app.get('/api/v1/restaurants/:id', async(req, res)=>{
    try {
        const restaurants = await db.query("select * from restraunts left join (select restaurant_id, COUNT(*) ,TRUNC(AVG(rating),1) as average_rating from review group by restaurant_id) review on restraunts.id = review.restaurant_id where id=$1" ,[req.params.id]);
        const reviews = await db.query("SELECT * FROM review WHERE restaurant_id= $1" ,[req.params.id]);
        res.status(200).json({
            status : "success",
            data:{
                restraunt: restaurants.rows[0],
                reviews: reviews.rows
            }
        });
        console.log(results.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

//  createa a restaurant 

app.post('/api/v1/restaurants' ,async(req, res)=>{
    // console.log(req.body);
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

app.post("/api/v1/restaurants/:id/addReview", async (req,res) =>{
    try {
        const newReview = await db.query("INSERT INTO review (restaurant_id, name, review ,rating) values ($1 ,$2 ,$3 ,$4) returning *;",[req.params.id, req.body.name, req.body.review ,req.body.rating]);

        res.status(200).json({
            status: "success",
            data:{
                review:newReview.rows[0],
            } 
                
        });
    } catch (error) {
        console.log(error);
    }
});


app.listen(port , () =>{
    console.log(`listening on port ${port}`);
});