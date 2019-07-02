const express = require('express');
const { json } = require('body-parser');
const { Product } = require('./models/product.model');
const  cors = require('cors');

const app = express();
app.use(json());
app.use(cors());

// app.use((req, res, next)=>{
//     req.headers.accept('Access-Control-Allow-Origin','*')
//     next();
// })

app.get('/', (req, res) => res.send({ 
    success: true, 
    message: 'Server is running' 
}));

app.get('/product', async (req, res) => {
    const products = await Product.find({});
    res.send({ success: true, products });
});

app.post('/add-product', (req, res) => {
    const { name, price } = req.body;
    const product = new Product({name, price});
    product.save()
    .then(() => res.send({ success: true, product }))
    .catch(() => res.send({ success: false, message: 'CANNOT_INSERT_PRODUCT' }));
});

app.delete('/product/:_id', (req, res) => {
    Product.findByIdAndDelete({_id: req.params._id})
    .then(product => {
        if (!product) throw new Error('CANNOT_FIND_PRODUCT');
        res.send({ success: true, product });
    })
    .catch(() => res.send({ success: false, message: 'CANNOT_FIND_PRODUCT' }));
});

app.put('/product/:_id', (req, res) => {
    Product.findOneAndUpdate({_id: req.params._id}, { wishlist: req.body.wishlist }, { new: true })
    .then(product => {
        if (!product) throw new Error('CANNOT_FIND_PRODUCT');
        res.send({ success: true, product });
    })
    .catch(() => res.send({ success: false, message: 'CANNOT_FIND_PRODUCT' }));
});

app.listen(3000, () => console.log('Server started!'));
