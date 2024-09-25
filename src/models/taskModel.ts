import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    tasks: string[];
}

const taskSchema: Schema = new mongoose.Schema({
    tasks: { type: [String], required: true }
});

const TaskModel = mongoose.model<ITask>('assignment_mujjassims', taskSchema);

export default TaskModel;
