const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email : {type: String,required: true},
    orderId : {type: String,required: true},
    paymentInfo : {type: String,default:''},
    products: {type:Object,required:true},
    address: {type: String,required: true},
    status: {type: String,default:'Initiated',required: true},
    amount: {type: Number,required: true}
},{timestamps: true})

// mongoose.models = {};
// export default mongoose.model('Order',orderSchema);

export default mongoose.models.Order || mongoose.model('Order',orderSchema);