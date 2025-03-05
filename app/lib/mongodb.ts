import { MongoClient } from "mongodb";

// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database';
const options = { appName: "devrel.template.nextjs" };

let client: MongoClient;
console.log("Connecting to MongoDB with URI: " + uri);
if (process.env.NODE_ENV != "development") {
    console.log("Development mode, using a global variable");
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  // In production mode, it's best to not use a global variable.
  console.log("Creating a new MongoClient instance");
  client = new MongoClient(uri, options);
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.

export default client;