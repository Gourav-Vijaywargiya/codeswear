const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name : {type: String,required: true},
    email : {type: String,required: true},
    orderId : {type: String,required: true},
    paymentInfo : {type: String,default:''},
    products: {type:Object,required:true},
    address: {type: String,required: true},
    pincode: {type: String,required: true},
    state: {type: String,required: true},
    city: {type: String,required: true},
    phone: {type: String,required: true},
    transactionId: {type: String},
    status: {type: String,default:'Initiated',required: true},
    delieveryStatus: {type: String,default:'unshipped',required: true},
    amount: {type: Number,required: true}
},{timestamps: true})

// mongoose.models = {};
// export default mongoose.model('Order',orderSchema);

export default mongoose.models.Order || mongoose.model('Order',orderSchema);