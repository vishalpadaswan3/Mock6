const express = require("express")
const { flightModel } = require("../Model/flight.model")
const { auth } = require("../Middleware/auth.middleware")


const flightRouter = express.Router()
flightRouter.use(auth)


flightRouter.get("/flight", (req, res) => {
    res.send("hi")
})

flightRouter.get("/api/flights", async (req, res) => {
    try {
        const user = await flightModel.find()
        res.status(200).json({ message: "Flight data fetch successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

flightRouter.get("/api/flights/:id", async (req, res) => {
    try {
        const id = req.params.id
        const user = await flightModel.find({ _id: id })
        res.status(200).json({ message: "Flight data fetch successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


flightRouter.post("/api/flights", async (req, res) => {
    try {
        const { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price } = req.body

        const user = new flightModel({ airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price })
        await user.save()
        res.status(201).json({ message: "Flight Added successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


flightRouter.patch("/api/flights/:id", async (req, res) => {
    try {
        let s = req.body
        const id = req.params.id
        const user = await flightModel.findByIdAndUpdate({ _id: id }, s)
        res.status(204).json({ message: "Flight data updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


flightRouter.delete("/api/flights/:id", async (req, res) => {
    try {
        const id = req.params.id
        const s = await flightModel.findByIdAndDelete({ _id: id })
        res.status(202).json({ message: "Flight data Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})




module.exports = { flightRouter }