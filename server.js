require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// routes
const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/Admin/adminRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const productRoute = require('./routes/productRoutes')
const cartRoute = require('./routes/cartRoutes');
const initialData = require('./routes/Admin/initialData');
const createPage = require('./routes/Admin/pageRoute');
const addressRoute = require('./routes/addressRoute');
const orderRoute = require('./routes/orderRoutes');
const adminOrderRoute = require('./routes/Admin/orderRoute');


// mongodb connection
const url = process.env.MONGO_URI
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connected");
}).catch(err => {
    console.log("Connection failed");
})

// middlewares
app.use(express.json());
app.use(cors());

// handle routes
app.use('/public', express.static(path.join(__dirname, '/uploads')));
app.use('/api', userRoute);
app.use('/api', adminRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', cartRoute);
app.use('/api', initialData);
app.use('/api', createPage);
app.use('/api', addressRoute);
app.use('/api', orderRoute);
app.use('/api', adminOrderRoute);

// heroku
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

// listening port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));