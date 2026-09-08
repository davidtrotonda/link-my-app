const admin = require("firebase-admin");
const serviceAccount = require("./skeilink-firebase-adminsdk-fbsvc-baf1940d99.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://skeilink-default-rtdb.europe-west1.firebasedatabase.app"
  });
}

async function run() {
  const usersRef = admin.database().ref("users");
  const snapshot = await usersRef.once("value");
  const users = snapshot.val();
  console.log("Users:", JSON.stringify(users, null, 2));
  process.exit(0);
}
run().catch(console.error);
