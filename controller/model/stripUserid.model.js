const mongoose = require('mongoose')

const StripUserObjectIdSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    stripId: {
        type: 'String'
    }

})

module.exports = mongoose.model("StripUserId", StripUserObjectIdSchema)