const AWS = require('aws-sdk'),
    constants = require("../config/constants"),
    fs = require('fs');


module.exports = {

    newImageCaseUpload: function (file, path, cb) {
        //console.log(file);
        AWS.config.update(constants.BUCKET.CONFIG);
        fs.readFile('public/images/' + file, function (err, data) {
            if (err) {
                throw err;
            }

            var base64data = new Buffer(data, 'binary');

            var s3 = new AWS.S3();
            s3.putObject({
                Bucket: 'com.mepharmacy/' + path,

                Key: file,
                Metadata: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'inline'
                },
                'ContentEncoding': 'base64',
                Body: base64data,
                'ACL': 'public-read-write'
            }, function (resp) {
                console.log(arguments);
                console.log(resp);
            });

        });

        cb();
    }
}