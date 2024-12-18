import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

const CampaignSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Campaign = mongoose.model<ICampaign>('Campaign', CampaignSchema);

export default Campaign;
