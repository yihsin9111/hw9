import { Router } from "express";
import ScoreCard from "../models/ScoreCard.js";
const router = Router();
router.delete("/cards",async(_,res) => {
    try {
        await ScoreCard.deleteMany({});
        res.send({ message:'Database cleared'});
    }
    catch (e) { throw new Error("Database deletion failed"); }
});
router.post("/card",async(req,res) => {
    const existing = await ScoreCard.findOne({name:req.body.name,subject:req.body.subject});
    if (existing)
    {
        await ScoreCard.updateOne({name:req.body.name,subject:req.body.subject},{$set:{score:req.body.score}});
        res.send({message:'Updating ('+req.body.name+', '+req.body.subject+', '+req.body.score+')',card:true});
    }
    else
    {
        try {
            res.send({message:'Adding ('+req.body.name+', '+req.body.subject+', '+req.body.score+')',card:true});
            const newScoreCard = new ScoreCard({name:req.body.name,subject:req.body.subject,score:req.body.score});
            return newScoreCard.save();
        }
        catch (e) {
            throw new Error("error: " + e); }
    }
    
});
router.get("/cards",async(req,res) => {
    try{
        if(req.query.type==='name')
        {
            let messages=[];
            const message=await ScoreCard.find({name:req.query.queryString});
            if(message.length===0)
                res.send({message1:'Name ('+req.query.queryString+') not found!'});
            else
            {
                for(let i=0;i<=message.length-1;i++)
                    messages.push({name:message[i].name,subject:message[i].subject,score:message[i].score});
                res.send({messages:messages});
            } 
        }
        else if(req.query.type==='subject')
        {
            let messages=[];
            const message=await ScoreCard.find({subject:req.query.queryString});
            if(message.length===0)
                res.send({message1:'Subject ('+req.query.queryString+') not found!'});
            else
            {
                for(let i=0;i<=message.length-1;i++)
                    messages.push({name:message[i].name,subject:message[i].subject,score:message[i].score});
                res.send({messages:messages});
            }
        }
    }
    catch (e) {
        throw new Error("error: " + e); }
});
export default router;