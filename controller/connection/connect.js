const mongoose = require('mongoose')
async function main() {
    // const connection = await mongoose.connect('mongodb+srv://Provelio:675TQBO98rx7eBVo@provelio.331ajra.mongodb.net/Provelio?retryWrites=true&w=majority',

    const connection = await mongoose.connect(process.env.CONNECTION_STRING,
        {
            // useUnifiedTopology: true,
            // useNewUrlParser: true,
            // useCreateIndex: true, //make this true
            autoIndex: true, //make this also true
        }
    );
    console.log('Connected Sucesfully ');
    // console.log(connection.connection.host);

}

module.exports = main