import mongoose from "mongoose"
import ENV from './config'
const { DB_URL } = ENV

const dbConnect = ()=> {
    mongoose.connect(DB_URL)
    const db = mongoose.connection
    db.on('error',console.error.bind(console,'connection error'))
    db.once('open',()=> {
        console.log('DB connected...')
    })
}

module.exports = dbConnect