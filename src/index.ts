import express from "express"
import sequelize from "./config/database"
import UsuarioRoutes from "./routes/UsuarioRoutes"
import ViagemRoutes from "./routes/ViagemRoutes"

const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use(UsuarioRoutes);
app.use(ViagemRoutes);

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Database foi sincronizado com sucesso")
    })
    .catch((error) => {
        console.log("Erro", error)
    })

app.listen(port, () => {
    console.log("Server is running on port", port)
})