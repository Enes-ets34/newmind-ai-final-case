import mongoose, { Schema, Document } from 'mongoose';

interface IAddress extends Document {
  userId: string;
  title: string;
  address: string;
  apartment: string;
  description: string;
  floor: string;
  number: string;
  lat: number;
  long: number;
}

const AddressSchema: Schema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  address: { type: String, required: true },
  apartment: { type: String, required: true },
  description: { type: String, required: true },
  floor: { type: String, required: true },
  number: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
});

const Address = mongoose.model('Address', AddressSchema);

export { Address, IAddress };
