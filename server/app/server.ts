// app/server.ts
import app from "./app";
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`'Express test server listening on port ${port}!`);
})
