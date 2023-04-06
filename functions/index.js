import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { addEmployee, deleteEmployee, getAllEmployees, updateEmployee } from "./src/employees.js"

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("My cloud function API is working! 😀")
})

app.get("/test", (req, res) => {
    res.send("My cloud function API is working! 😀")
})

app.post("/employees", addEmployee)
app.get("/employees", getAllEmployees)
app.delete("/employees/:id", deleteEmployee)
app.patch("/employees/:id", updateEmployee)

export const api = functions.https.onRequest(app)
