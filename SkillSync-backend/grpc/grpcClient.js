const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'match.proto');

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

const request = {
  resume: 'Experienced in Python and Data Analysis.',
  job: 'Looking for a Machine Learning engineer with Python and ML skills.'
};

client.Match(request, (err, response) => {
  if (err) {
    console.error('gRPC Error:', err);
  } else {
    console.log('Similarity Score:', response.similarity.toFixed(2));
    console.log('Missing Skills:', response.missing_skills);
    console.log('Course Recommendations:', response.course_recommendations);
  }
});
