const mogoose = require('mongoose')

/**
 * The function `connectDB` connects to a MongoDB database using the Mongoose library in a Node.js
 * application.
 */
const connectDB = async () => {
    try {
        const conn = await mogoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;  //export the function to use it in other files