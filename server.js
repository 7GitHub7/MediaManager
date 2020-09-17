
const express = require("express");
const app = express();
const port = 5000;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const AWS = require('aws-sdk')

AWS.config.update({accessKeyId: 'ASIAWI3G2UXHFPYMZAEA', secretAccessKey: 'dZUtm3Vmswn2B+phKiuLL5tcSwKoiECV/Szsesr2', sessionToken:"FwoGZXIvYXdzEBQaDEt3kzBrVKJHN8gKNyLDAcpLGQfi5d9ZQRScakprkHn+Y4+ltPe7ck0SGf+8gTdJ20GQly8oUMjx6FE7UxSDSGOQT4rNI85Qs4cvtapnhKtsnJgnwIUw1HVvqzr7RI7iJfWMR5ZuzQCuZbHXR16dSXtUYyNAi/8MM5ZQLQxsyqyECKM4h9A3nToto8xhdwV1c5AqWlW4XAIhsbD5HDM1eq3Ma34XBA2UsYoEGzpFGFDOhbDSw7FjazgLKQBY51O3IunSyrIaL+rZwAqt/fq8+d/rFyj73I77BTItqO6lze3UfCbcSlIqYsI3+EOqIVwoV0zcmwoddX2tohMkLSPgaOkPatQuqbz7"})
AWS.config.update({region: 'us-east-1'})

const myBucket = 'testowybucket'
const myKey = 'test.jpg'
const signedUrlExpireSeconds = 60*4
var s3 = new AWS.S3({
  signatureVersion: 'v4'
});


app.get('/test', (req, res) => {
  const url = s3.getSignedUrl('putObject', {
    Bucket: myBucket,
    Key: myKey,
    Expires: signedUrlExpireSeconds

})


res.send(url)
console.log(url)
})



app.get('/list', (req, res) => {

  // const listAllKeys = (params, out = []) => new Promise((resolve, reject) => {
  //   s3.listObjectsV2(params).promise()
  //     .then(({Contents, IsTruncated, NextContinuationToken}) => {
  //       out.push(...Contents);
  //       !IsTruncated ? resolve(out) : resolve(listAllKeys(Object.assign(params, {ContinuationToken: NextContinuationToken}), out));
  //     })
  //     .catch(reject);
  // });
  
  // listAllKeys({Bucket: 'testowybucket'})
  //   .then(console.log)
  //   .catch(console.log);

  var params = {
    Bucket: "testowybucket", 
    MaxKeys: 2
   };
  s3.listObjects(params, function(err, data) {
    if (err) {console.log(err, err.stack);} // an error occurred
    else  {
      // keys = data.Key;
      // console.log(data['Contents'][1]['Key']);
      var list=[]
      var obj = {}
      for (i = 0; i < data.Contents.length; i++) 
      {
        
        list.push(data['Contents'][i]['Key']);
      }  
      obj["list"] = list;
      res.send(obj)
      // console.log(keys.next());
    }             // successful response


  
})})




app.get('/sqs', (req, res) => {
  console.log("sqs")
    // Set the region 
    AWS.config.update({region: 'us-east-1'});
    
    // Create an SQS service object
    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    
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
    sqs.sendMessage(params, function(err, data) {
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

