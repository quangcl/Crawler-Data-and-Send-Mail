require('dotenv').config();
const amqp = require('amqplib/callback_api');

const config = {
  protocol: process.env.RABBITMQ_PROTOCOL  ? process.env.RABBITMQ_PROTOCOL : "amqp",
  hostname: process.env.RABBITMQ_HOST ? process.env.RABBITMQ_HOST : "localhost",
  port: process.env.RABBITMQ_PORT ? parseInt(process.env.RABBITMQ_PORT, 10) : 5672,
  username: process.env.RABBITMQ_USERNAME ? process.env.RABBITMQ_USERNAME : "guest",
  password: process.env.RABBITMQ_PASSWORD ? process.env.RABBITMQ_PASSWORD : "guest",
  heartbeat: process.env.RABBITMQ_HEART ? parseInt(process.env.RABBITMQ_HEART, 10) : 300,
  vhost: process.env.RABBITMQ_VHOST ? process.env.RABBITMQ_VHOST : ""
};

async function publish(message) {
  await amqp.connect(config, function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      const queue = 'demo-crawler';
  
      channel.assertQueue(queue, {
        durable: false
      });
  
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(" [x] Sent %s", message);
    });
    setTimeout(function() {
            connection.close();
    }, 1000);
  });
}

module.exports = publish;