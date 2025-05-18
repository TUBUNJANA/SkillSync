const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../grpc/match.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const matchProto = grpc.loadPackageDefinition(packageDefinition).match;

const client = new matchProto.Match(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

function getMatchResult(resume, job) {
  return new Promise((resolve, reject) => {
    client.Match({ resume, job }, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
}

module.exports = { getMatchResult };
