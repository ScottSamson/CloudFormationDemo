var program = require('commander');
var AWS = require('aws-sdk');
var async = require('async');

program
    .option('-a, --access_key')
    .option('-s, --secret_key')
    .option('-r, --region <us-east-1>')
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

async.waterfall([
  () => { }
]);