import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMeet extends Document {
  title: string;
  description?: string;
  meetingLink: string;
  meetingDateTime: Date;
  createdBy: Types.ObjectId;
  createdAt: Date;
}

const MeetSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  meetingLink: { type: String, required: true },
  meetingDateTime: { type: Date, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Meet = mongoose.model<IMeet>('Meet', MeetSchema); 