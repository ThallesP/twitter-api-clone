import { ISMSProvider } from '../ISMSProvider';
import twilio, { Twilio } from 'twilio';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TwilioSMSProvider implements ISMSProvider {
  private client: Twilio;

  constructor() {
    this.client = twilio();
  }

  send(to: string, text: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
