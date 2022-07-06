import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

dbConnect();

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ msj: "Task not found" });
        return res.status(200).json(task);
      } catch (error) {
        res.status(500).json(error);
      }

    case "PUT":
      try {
        const task = await Task.findByIdAndUpdate(id, body, {
            new: true,
        });
        if (!task) return res.status(404).json({ msj: "Task not found" });
        return res.status(400).json(task);
      } catch (error) {
        res.status(500).json(error);
      }
    case "DELETE":
      try {
        const deleteTask = await Task.findByIdAndDelete(id);
        if (!deleteTask) return res.status(404).json({ msg: "task not found" });
        return res.status(204).json({ msg: "Task deleted sucesfull" });
      } catch (error) {
        res.status(500).json(error);
      }

    default:
      return res.status(400).json({ msj: "this methos is not supported" });
  }
};
