import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { Notification } from '../../domain/entities/notification.entity';
import { User } from 'src/modules/users/domain/entity/user.entity';

@Injectable()
export class EmailNotificationService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  }

  async send(notification: Notification, user: User) {
    const msg = {
      to: user.getEmail(),
      from: process.env.SENDGRID_EMAIL || '',
      subject: notification.getSubject(),
      html: notification.getMessage(),
    };

    try {
      await sgMail.send(msg);
      console.log(`Email sent to ${msg.to}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
