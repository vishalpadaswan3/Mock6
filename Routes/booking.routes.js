const express = require("express")
const {bookModel} = require("../Model/booking.model")
const { flightModel } = require("../Model/flight.model")
const { auth } = require("../Middleware/auth.middleware")

const bookRouter = express.Router()
bookRouter.use(auth)

bookRouter.post("/api/booking",async(req,res)=>{
    try {
        const {flight} = req.body
        const user = req.user.user_id
        
        const s = new bookModel({flight,user})
        await s.save()
        res.status(201).json({ message: "Flight Booked successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


bookRouter.get("/api/dashboard", async(req,res)=>{
    try {
        const BookingDetails = await bookModel.aggregate(
            [
                {
                    $lookup : {
                        from : "users",
                        localField:"user",
                        foreignField : "_id",
                        as : "users",
                    },
                },
                {
                    $lookup: {
                        from : "flights",
                        localField:"flight",
                        foreignField : "_id",
                        as : "flights",
                    },
                },
            ]
        )
        res.status(200).json({ message: "Your flight Details here" , BookingDetails});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = {bookRouter}