require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ItemRoute = require('./Routes/ItemsRoutes')
const MovingItemRoute = require('./Routes/MovingItemsRoutes')
const ResolvingRoute = require('./Routes/ResolvingRoutes')
const UserRoute = require('./Routes/UserRoutes')
const path = require('path');

const server = express();
server.use(cors());
server.use(express.json());
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// to increse the express.js req body size
const bodyParser = require('body-parser');
server.use(bodyParser.json({ limit: '100mb' }));
server.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
//End ->  to increse the express.js req body size

server.use('/products', ItemRoute)
server.use('/movingitem', MovingItemRoute)
server.use('/resolving', ResolvingRoute)
server.use('/user', UserRoute);

main().catch(err => console.log(err));

async function main() {

    await mongoose.connect(process.env.DATABASE_URL)
    console.log("DataBase Connect");
}

server.listen(process.env.PORT, () => {
    console.log("server is started");
});
