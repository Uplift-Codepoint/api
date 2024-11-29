import axios from "axios"

const graphUrl = 'https://graph.facebook.com/v21.0/478269368696269/messages/'

const welcomeMsg = asyncHandler(async (req, res) => {
    const text = JSON.parse(req.body)

    if (text === 'Hi') {
        request.post(
            {
              url: graphUrl,
              headers: {
                Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
                "content-type": "application/json",
              },
              body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: to,
                type: type,
                template: {
                    name: ""
                },
              }),
            },
            function (err, res, body) {
              if (err) {
                console.log("Error!");
              } else {
                res.json(JSON.parse(body));
              }
            }
          );        
    }
    else {
        return res.status(400).json({
            error: "Required Fields: to, type, template and id",
          });
    }
  });


  const applyJob = asyncHandler(async (req, res) => {

    axios
  .post(
    `https://graph.facebook.com/${apiVersion}/${myNumberId}/messages`,
    messageObject,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
export { welcomeMsg }