import { Schema, model, models, modelNames } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      trim: true,
      maxlength: [40, "Title must be les than 40"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [200, "Description must be less than 200 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Task ||  model("Task", taskSchema);

//model.Task || 
