const getUserSystemIdentifier = async (req, res) => {

    // app.get('/user-agent-string', async (req, res) => {
    try {
        // try and get ip from remoteAddress in node
        // const ip = req.socket.remoteAddress;
        // console.log(`IP: ${ip.split("::ffff:")[1]}`)

        var forwardedIpsStr = req.header('x-forwarded-for');
        var ip = '';

        if (forwardedIpsStr) {
            ip = forwardedIps = forwardedIpsStr.split(',')[0];
        }
        console.log({ ip });
        console.log("hello there")


        const user_agent = req.headers['user-agent'];
        console.log(user_agent)
        return res.status(200).json({
            UAString: user_agent, ip: `${ip.split("::ffff:")[1]}`
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.error })
    }

    // })
}


module.exports =
{
    getUserSystemIdentifier
}
