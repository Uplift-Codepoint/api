import asyncHandler from 'express-async-handler';
import axios from "axios";

const graphUrl = 'https://graph.facebook.com/v21.0/478269368696269/messages/'

const subscribe = asyncHandler( async(req, res) => {
    
    let token = process.env.ACCESS_TOKEN;

    const mode = req.query['hub.mode']
    const verifyToken = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode == 'subscribe' && verifyToken == token
      ) {
        res.send(challenge);
      } else {
        res.sendStatus(400);
      }
      
})


const webhooks = asyncHandler( async(req, res) => {

  const recipientNumber = req.body;
    
    let messageObject = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": `${recipientNumber}`,
        "type": "request_welcome",
        "interactive": {},
      };


    const body = JSON.parse(req.body)

    if(body.field !== 'messages'){
      // not from the messages webhook so dont process
      return res.sendStatus(400)
    }

      axios.post(
        graphUrl,
        messageObject,
        {
          headers: {
            Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
  })

 
export { subscribe, webhooks }