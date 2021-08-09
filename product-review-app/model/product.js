const getDB = require('../db/database').getDB;
const ObjectId = require('mongodb').ObjectId;

class Product {
    constructor(id, title, price,reviews=[]) {
        this._id = id;
        this.title = title;
        this.price = price;
        this.reviews = reviews;

    }
    static findAll() {
        const db = getDB();
        return db.collection('products')
            .find()
            .toArray();
    }
    save() {
        const db = getDB();
        return db.collection('products')
            .insertOne(this);
    }
    
    static findById(id){
        const db = getDB();
        return db.collection('products')
            .findOne({ _id: new ObjectId(id) });
    }


    static deleteById(prodId) {
        const db = getDB();
        return db.collection('products')
            .remove({ _id: new ObjectId(prodId) });
    }

    updateProduct() {
        const db = getDB();
        return db.collection('products')
            .updateOne({ _id: new ObjectId(this._id) }, {
                $set: {
                    title:this.title,
                    price:this.price
                }
            });
    }
  
    addNewReview() {
        const db = getDB();
        return db.collection('products')
            .updateOne({ _id: new ObjectId(this._id) }, {
                $push: {
                   reviews:this.reviews
                }
            });
    }
    
}

module.exports = Product;