const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose')
//Model
const Message = require('./models/Message')
//Database Connection
mongoose.connect('mongodb://mongo/messages',{useNewUrlParser:true})
mongoose.connection.on('open',()=>{
  console.log('MongoDB : Connected.')
})
mongoose.connection.on('err',(err)=>{
  console.log('MongoDB : ERROR',err)
})
//RabbitMQ Connection
amqp.connect('amqp://rabbitmq', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    const queue = 'exaque';

    channel.assertQueue(queue, {
      durable: false
    });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
channel.consume(queue, function(msg) {
  console.log(" [x] Received %s", msg.content.toString())
  const message = new Message({
    content : msg.content.toString(),
    date:Date.now()
  })
  console.log(message);
  message.save().then(()=>{
    console.log('Mesaj geldi.')
  })
}, {
    noAck: true
  });
  });
});