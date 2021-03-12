const amqp = require('amqplib/callback_api');
require('dotenv').config();
const xsmb = require('../puppeteer/xsmb-puppeteer');
const sendMail = require('../utils/send-mail');

const config = {
    protocol: process.env.RABBITMQ_PROTOCOL  ? process.env.RABBITMQ_PROTOCOL : "amqp",
    hostname: process.env.RABBITMQ_HOST ? process.env.RABBITMQ_HOST : "localhost",
    port: process.env.RABBITMQ_PORT ? parseInt(process.env.RABBITMQ_PORT, 10) : 5672,
    username: process.env.RABBITMQ_USERNAME ? process.env.RABBITMQ_USERNAME : "guest",
    password: process.env.RABBITMQ_PASSWORD ? process.env.RABBITMQ_PASSWORD : "guest",
    heartbeat: process.env.RABBITMQ_HEART ? parseInt(process.env.RABBITMQ_HEART, 10) : 300,
    vhost: process.env.RABBITMQ_VHOST ? process.env.RABBITMQ_VHOST : ""
};
amqp.connect(config, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(async function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'demo-crawler';

    channel.assertQueue(queue, {
      durable: false
    });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue,async function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            const body = JSON.parse(msg.content);
            await xsmb.initialize(body);
            let data = await xsmb.get_data();
            await sendMail.initialize(body, data);
        }, {
            noAck: true
        });
  });
});