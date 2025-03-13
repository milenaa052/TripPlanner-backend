import express from "express"
import sequelize from "./config/database"
import UsuarioRoutes from "./routes/UsuarioRoutes"
import ViagemRoutes from "./routes/ViagemRoutes"
import DespesaRoutes from "./routes/DespesaRoutes"
import HospedagemRoutes from "./routes/HospedagemRoutes"
import TransporteRoutes from "./routes/TransporteRoutes"
import PasseioRoutes from "./routes/PasseioRoutes"

const app = express()
const port = 3000

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use(UsuarioRoutes);
app.use(ViagemRoutes);
app.use(DespesaRoutes);
app.use(HospedagemRoutes);
app.use(TransporteRoutes);
app.use(PasseioRoutes);

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