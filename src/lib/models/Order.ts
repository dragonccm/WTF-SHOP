import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    logo: string;
    name: string;
    transactionId: string;
    totalAmount: string;
    time: string;
    userId: mongoose.Schema.Types.ObjectId;
}

const OrderSchema: Schema = new Schema({
    logo: { type: String, required: true },
    name: { type: String, required: true },
    transactionId: { type: String, required: true, index: true },
    totalAmount: { type: String, required: true },
    time: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount', required: true },
});

OrderSchema.index({ transactionId: 1 });

export default mongoose.model<IOrder>('Order', OrderSchema);
