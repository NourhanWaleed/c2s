const app = require('./app')
const mongoose = require('mongoose')
const port = process.env.PORT 
console.log(port)
async function start() {
    try {
      //Database Connect
      await mongoose.connect(
        process.env.MONGODB_URL,
        {
        },
        () => {
          console.log("Database Connected");
        }
      );
  
      app.listen(port, () => {
        console.log("Server is running on port "+port);
      });
    } catch (error) {
      console.error(error);
    }
  }
  start()
