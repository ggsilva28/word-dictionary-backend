import { serverHttp } from "./app"

const port = process.env.PORT || 3003

serverHttp.listen(port, () => {
    console.log("Server online on port:", port)
})