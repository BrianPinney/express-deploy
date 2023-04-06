import { db } from "./dbConnect.js"
//Imported to get time stamp(1/2)
import { FieldValue } from "firebase-admin/firestore"

const coll = db.collection("employees")

//CRUD: ADD
export async function addEmployee(req, res){
    const newEmplyee = req.body
    //Insert Timestamp(2/2)
    newEmplyee.createdAt = FieldValue.serverTimestamp()

    await coll.add(newEmplyee)
    res.status(201).send({ messege: "Employee successfully added." })
}

//CRUD: GET
export async function getAllEmployees(req, res){
    const collection = await coll.get()
    const employees = collection.docs.map(doc => ( {...doc.data(), id: doc.id } ))

    res.send(employees)
}

//CRUD: DELETE
export async function deleteEmployee(req, res){
    const { id } = req.params

    await coll.doc(id).delete()
    res.status(202).send("Employee has been deleted")
}

//CRUD: UPDATE
export async function updateEmployee(req, res){
    const { id } = req.params
    const updateInfo = req.body

    await coll.doc(id).update(updateInfo)
    res.status(202).send("Employee has been updated")
}