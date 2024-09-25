import mqtt from 'mqtt';

const mqttClient = mqtt.connect('mqtt://test.mosquitto.org');

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('/add', (err) => {
        if (err) {
            console.error('Failed to subscribe to /add topic:', err);
        } else {
            console.log('Subscribed to /add topic');
        }
    });
});

export default mqttClient;
