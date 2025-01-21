import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress extends Document {
    label: string;
    icon: string;
    address: string;
    phone: string;
    userId: mongoose.Schema.Types.ObjectId;
}

const AddressSchema: Schema = new Schema({
    label: { type: String, required: true },
    icon: { type: String, required: true },
    address: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount', required: true },
});

AddressSchema.index({ address: 1 });

export default mongoose.model<IAddress>('Address', AddressSchema);
