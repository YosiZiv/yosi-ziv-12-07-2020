import mongoose from "mongoose";
import { Password } from "../utils/password";

// An interface that describes the properties
// that are requried to create a new Task
interface TaskAttrs {
  userId: string;
  userName: string;
  phone: string;
  email: string;
}

// An interface that describes the properties
// that a Task Model has
interface TaskModel extends mongoose.Model<TaskDoc> {
  build(attrs: TaskAttrs): TaskDoc;
}

// An interface that describes the properties
// that a Task Document has
interface TaskDoc extends mongoose.Document {
  userId: string;
  userName: string;
  phone: string;
  email: string;
  createAt: string;
}

const taskSchema = new mongoose.Schema(
  {
    userId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
      min: 2,
      maxlength: 256,
      required: true,
    },
    phone: {
      type: String,
      minlength: 6,
      maxlength: 15,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

taskSchema.statics.build = (attrs: TaskAttrs) => {
  return new Task(attrs);
};

const Task = mongoose.model<TaskDoc, TaskModel>("Task", taskSchema);

export { Task };
