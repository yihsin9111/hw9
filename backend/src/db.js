import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import ScoreCard from './models/ScoreCard.js'
dotenv.config();
const deleteDB = async () => {
    try {
        await ScoreCard.deleteMany({});
        console.log("Database deleted");
    }
    catch (e) { throw new Error("Database deletion failed"); }
};
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
    await deleteDB();
});
export default {
    connect:()=>mongoose.connect(
        process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((res) => console.log("mongo db connection created"))
};