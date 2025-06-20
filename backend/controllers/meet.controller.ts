import { Request, Response } from 'express';
import { MeetService } from '../services';
import { isValidGoogleMeetLink, sanitizeGoogleMeetLink } from '../utils/meetLink.util';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export class MeetController {
  static async create(req: AuthenticatedRequest, res: Response) {
    try {
      let { meetingLink } = req.body;
      meetingLink = sanitizeGoogleMeetLink(meetingLink);
      if (!isValidGoogleMeetLink(meetingLink)) {
        return res.status(400).json({ error: 'Invalid Google Meet link.' });
      }
      const meetData = { ...req.body, meetingLink, createdBy: req.user?.id };
      const meet = await MeetService.create(meetData);
      res.status(201).json({ message: 'Meet created successfully', meet });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const meet = await MeetService.getById(id);
      if (!meet) return res.status(404).json({ error: 'Meet not found' });
      res.json(meet);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      let { meetingLink } = req.body;
      if (meetingLink) {
        meetingLink = sanitizeGoogleMeetLink(meetingLink);
        if (!isValidGoogleMeetLink(meetingLink)) {
          return res.status(400).json({ error: 'Invalid Google Meet link.' });
        }
        req.body.meetingLink = meetingLink;
      }
      const { id } = req.params;
      const meet = await MeetService.update(id, req.body);
      if (!meet) return res.status(404).json({ error: 'Meet not found' });
      res.json({ message: 'Meet updated successfully', meet });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const meet = await MeetService.delete(id);
      if (!meet) return res.status(404).json({ error: 'Meet not found' });
      res.json({ message: 'Meet deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const meets = await MeetService.list();
      res.json(meets);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
