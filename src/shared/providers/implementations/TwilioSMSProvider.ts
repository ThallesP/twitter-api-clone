import { ISMSProvider } from '../ISMSProvider';
import twilio, { Twilio } from 'twilio';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwilioSMSProvider implements ISMSProvider {
  private client: Twilio;
  private FROM_NUMBER: string;

  constructor(private configService: ConfigService) {
    this.client = twilio(
      configService.get('TWILIO_ACCOUNT_SID'),
      configService.get('TWILIO_AUTH_TOKEN'),
    );
    this.FROM_NUMBER = configService.get('TWILIO_FROM_NUMBER');
  }

  async send(to: string, text: string): Promise<void> {
    await this.client.messages.create({
      to,
      body: text,
      from: this.FROM_NUMBER,
    });
  }
}
