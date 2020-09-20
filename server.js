const express = require("express");
const app = express();
const port = 5000;


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  sessionToken: ""
})
AWS.config.update({ region: 'us-east-1' })

const myBucket = 'testowybucket'
const myKey = 'test.jpg'
const signedUrlExpireSeconds = 60 * 4
var s3 = new AWS.S3({
  signatureVersion: 'v4'
});


app.get('/test', (req, res) => {
  console.log(req.query.filename)
  const url = s3.getSignedUrl('putObject', {
    Bucket: myBucket,
    Key: req.query.filename,
    Expires: signedUrlExpireSeconds

  })


  res.send(url)
  console.log(url)
})



app.get('/list', (req, res) => {

  var params = {
    Bucket: "testowybucket",

  };

  s3.listObjects(params, function (err, data) {
    if (err) { console.log(err, err.stack); } // an error occurred
    else {

      var list = []
      var obj = {}
      for (i = 0; i < data.Contents.length; i++) {

        list.push(data['Contents'][i]['Key']);
      }

      obj["list"] = list;
      console.log(obj["list"])
      res.send(obj)

    }



  })
})




app.get('/sqs', (req, res) => {
  console.log("sqs")
  // Set the region 
  AWS.config.update({ region: 'us-east-1' });

  // Create an SQS service object
  var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

  var params = {
    // Remove DelaySeconds parameter and value for FIFO queues
    //   DelaySeconds: 10,
    MessageAttributes: {
      "Title": {
        DataType: "String",
        StringValue: "The Whistler"
      },
      "Author": {
        DataType: "String",
        StringValue: "John Grisham"
      },
      "WeeksOn": {
        DataType: "Number",
        StringValue: "6"
      }
    },
    MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
    MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
    MessageGroupId: "Group1",  // Required for FIFO queues
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/431322998222/test.fifo"
  };
  var buff;
  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log("Error", err);
      buff = "Error"
    } else {
      console.log("Success", data.MessageId);
      buff = "success"
    }
  });


})






app.listen(port, () => console.log(`Server listening on port ${port}!`));

