import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import mqttClient from './config/mqttConfig';
import './config/mongoConfig';
import taskController from './controllers/taskController';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', taskRoutes);

mqttClient.on('message', (topic: string, message: Buffer) => {
    if (topic === '/add') {
        taskController.handleMqttMessage(message.toString());
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
