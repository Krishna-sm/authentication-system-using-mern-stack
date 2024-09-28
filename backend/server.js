require("dotenv").config({
    path:'.env'
})
require("colors")
const app = require("./src/app");
const { ConnectDB } = require("./src/config/db.config");
ConnectDB()

const port = process.env.PORT || 4500


app.listen(port, console.log(`the app is listen at http://localhost:${port}`.red.underline))
