import Order from "../../Models/Order";
import Product from "../../Models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    const body = JSON.parse(req.body);
    // const body = req.body;
    let order;
    
    if(body.STATUS == 'TXN-success'){
        order = await Order.findOneAndUpdate({order:body.orderId},{status:'Paid',paymentInfo:JSON.stringify(body)});
        let products = order.products;
        for(let slug in products){
            await Product.findOneAndUpdate({slug:slug},{$inc:{"availableQty" : -products[slug][qty]}})
        }
    }
    else if(body.STATUS == 'PENDING'){
        order = await Order.findOneAndUpdate({order:body.orderId},{status:'Pending',paymentInfo:JSON.stringify(body)});
    }
    res.redirect('/order?id=' + order._id,200);
};

export default connectDb(handler);
