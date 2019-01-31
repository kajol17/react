const express= require('express');
const router= express.Router();
const fs=require("fs");
function Task(id,taskName,isDone)
{
    this.id = id;
    this.taskName=taskName;
    this.isDone=isDone;
}

router.get("/",(req,res)=>{
    //console.log('hi');
    fs.readFile("storage.json",(err,data)=>{
        tasks=JSON.parse(data);

        res.json(tasks);
    })
})

router.get("/view/task/:id",(req,res)=>{
    id=Number(req.params.id);
    data=fs.readFileSync("storage.json");
    //data=data.toString();

    tasks=JSON.parse(data);
    if(id>=0 && id<tasks.lenght)
    {
        res.json(tasks[id]);
    }
    else{
        res.json({
            error:"Task witth id:"+id.toString() +"not present"
        })
    }
});

router.post("/add/task",(req,res)=>{
    data=fs.readFileSync("storage.json");
    //data=data.toString();

    tasks=JSON.parse(data);
    id=Math.floor(Math.random()*1000000000)
    
    task=new Task(id,req.body.taskName,false);
    tasks.push(task);
    fs.writeFile("storage.json",JSON.stringify(tasks),(err,data)=>
    {
        if(err)
        {
            res.json({
                error:err
            })
        }
        else{
            res.json({
                response:"created",
                id : id
            });
        }
    })
});

router.delete("/delete/task/:id",(req,res)=>{
    id=Number(req.params.id);
    data=fs.readFileSync("storage.json");
    //data=data.toString();
    
    tasks=JSON.parse(data);
    aInd = tasks.findIndex(val => val.id == id)

    if(aInd >= 0)
    {
        tasks.splice(aInd,1);

        fs.writeFile("storage.json",JSON.stringify(tasks),(err,data)=>
        {
            if(err)
            {
                res.json({
                    error:err
                })
            }
            else{
                res.json({
                    response:"Deleted",
                    task_id:id
                });
            }

        })
    }
else{
    res.json({
        error:"Task witth id:"+id.toString() +"not present"
    })
}
})
router.put("/update/task/:id",(req,res)=>{
    id=Number(req.params.id);
    data=fs.readFileSync("storage.json");
    //data=data.toString();
    
    tasks=JSON.parse(data);
    aInd = tasks.findIndex(val => val.id == id)

    if(aInd >= 0)
    {
        //tasks[id].taskName=req.body.taskName;
        //tasks[id].isDone=req.body.isDone;
        tasks[aInd].isDone = !tasks[aInd].isDone
        fs.writeFile("storage.json",JSON.stringify(tasks),(err,data)=>
        {
            if(err)
            {
                res.json({
                    error:err
                })
            }
            else{
                res.json({
                    response:"updated",
                    task_id:id
                });
            }

        })
    }
else{
    res.json({
        error:"Task witth id:"+id.toString() +"not present"
    })
}
})
module.exports=router;