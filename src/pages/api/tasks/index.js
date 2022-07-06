/* import { dbConnect } from "../../../utils/mongoose";
import Task from "../../../models/Task"; */
import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

dbConnect();

export default async function handler(req, res) {
    const {
        method,
        body,
        query: { id },
      } = req;
  switch (method) {
    case "GET":
      try {
        const task = await Task.find();
        console.log(task);
        return res.status(200).json(task);
      } catch (error) {
        return res.status(500).json(error);
      }

    case "POST":
      try {
        const newTask = new Task(body);
      const saveTask = await newTask.save();
      return res.status(201).json(saveTask);
      } catch (error) {
        return res.status(500).json(error);
      }

    default:
      return res.status(400).json({ msj: "This method is not supported" });
  }
}
