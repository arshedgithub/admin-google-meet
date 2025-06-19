import { Meet, IMeet } from '../models/Meet';

export class MeetService {
  static async create(data: Partial<IMeet>) {
    const meet = new Meet(data);
    return meet.save();
  }

  static async getById(id: string) {
    return Meet.findById(id).populate('createdBy');
  }

  static async update(id: string, data: Partial<IMeet>) {
    return Meet.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id: string) {
    return Meet.findByIdAndDelete(id);
  }

  static async list() {
    return Meet.find().populate('createdBy');
  }
} 