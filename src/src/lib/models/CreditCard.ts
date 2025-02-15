import mongoose, { Schema, Document } from 'mongoose';

export interface ICreditCard extends Document {
    accountNumber: string;
    expiry: string;
    name: string;
    backgroundColor: string;
    userId: mongoose.Schema.Types.ObjectId;
}

const CreditCardSchema: Schema = new Schema({
    accountNumber: { type: String, required: true, index: true },
    expiry: { type: String, required: true },
    name: { type: String, required: true },
    backgroundColor: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount', required: true },
});

CreditCardSchema.index({ accountNumber: 1 });

export default mongoose.model<ICreditCard>('CreditCard', CreditCardSchema);
