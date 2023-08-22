let express=require("express");
let app=express();
let bodyparser=require("body-parser");
app.use(bodyparser.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
});
var port=process.env.PORT||2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));
let {data}=require("./dataFile.js");
app.get("/customers",function(req,res){
    let city=req.query.city;
    let gender=req.query.gender;
    let payment=req.query.payment;
    let sortBy=req.query.sortBy;
    
let arr=data;
    if(city){
        arr=arr.filter((n)=>n.city===city);
    }
    if(gender){
        arr=arr.filter((n)=>n.gender===gender);
    }
    if(payment){
        arr=arr.filter((n)=>n.payment===payment);
    }
    if(sortBy==="name"){
        arr.sort((a,b)=>a.name.localeCompare(b.name));
    }
    if(sortBy==="id"){
        arr.sort((a,b)=>a.id.localeCompare(b.id));
    }
    if(sortBy==="payment"){
        arr.sort((a,b)=>a.payment.localeCompare(b.payment));
    }
    
    if(sortBy==="city"){
        arr.sort((a,b)=>a.city.localeCompare(b.city));
    }
    if(sortBy==="gender"){
        arr.sort((a,b)=>a.gender.localeCompare(b.gender));
    }
    if(sortBy==="age"){
        arr.sort((a,b)=>a.age-b.age);
    }
    res.send(arr);
    });
    
     app.post("/customers",function(req,res){
                    let body=req.body;
                    console.log(body);
                    let newCustomer={...body};
                                data.push(newCustomer);
                                res.send(newCustomer);
                                
                });
                app.get("/customers/:id",function(req,res){
    let id=req.params.id;
    let customer=data.find((n)=>n.id===id);
                    res.send(customer);
                    });
                                

                app.put("/customers/:id",function(req,res){
                    let id=req.params.id;
                    let customer=req.body;
                    console.log(id);
                    let index=data.findIndex((n)=>n.id===id);
                    console.log(index);
                    if(index>=0){
                        let updated={id:id,...customer};
                        data[index]=updated;
                        console.log(updated);
                        res.send(updated);
                    }
                    else res.status(404).send("Not found");
                })

                app.delete("/customers/:id",function(req,res){
                    let id=req.params.id;
                    let index=data.findIndex((n)=>n.id===id);
                    let customer=data.splice(index,1);
                    res.send(customer);
                })