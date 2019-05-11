const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/productserver', { 
    useCreateIndex: true,
    useNewUrlParser: true 
})
.catch(error => console.log('Cannot connect database', error));

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    price: { type: Number },
    wishlist: { type: Boolean, required: true, default: false },
});

const Product = mongoose.model('product', productSchema);

module.exports = { Product };