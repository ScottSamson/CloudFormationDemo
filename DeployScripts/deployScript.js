var program = require('commander');
var AWS = require('aws-sdk');
var fs = require("fs");
const path = require("path");

program
    .option('-a, --access_key <AKIAIOSFODNN7EXAMPLE>', 'Access key ID for the AWS account to run calls under.')
    .option('-s, --secret_key <wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY>', 'Secret access key for the AWS account to sign calls with.')
    .option('-r, --region <us-west-2>', 'AWS region to create infrastructure in.')
    .parse(process.argv);

if (!program.access_key || !program.secret_key || !program.region) {
    console.error("Missing arguments. See '--help' for usage.");
    process.exit(1);
}

AWS.config.update({
    "accessKeyId": program.access_key,
    "secretAccessKey": program.secret_key,
    "region": program.region
});
console.log("stack update begining");

var cf = new AWS.CloudFormation();

fetchFileFromDisk("../Templates/demoStack.json", function (error, data) {
  if (error) {
    console.log();
    console.log("error getting stack from disk");
    console.log();
    console.log(error.message);
    return;
  }

  var params = {
    StackName: "DemoApp",
    Capabilities: ['CAPABILITY_NAMED_IAM'],
    TemplateBody: data
  }

  cf.updateStack(params, callback)
});


function callback(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("stack update complete");
  }
};

function fetchFileFromDisk(filePath, returnFn) {
    console.log();
    console.log("fetchFileFromDisk called for " + filePath);
    fs.readFile(path.resolve(__dirname, filePath), "utf8", function (error, data) {
        if (error) {
            return returnFn(error);
        } else {
            return returnFn(null, data);
        }
    })
};