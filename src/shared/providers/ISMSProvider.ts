export interface ISMSProvider {
  send(to: string, text: string): Promise<void>;
}

export const ISMSProvider = Symbol('ISMSProvider');
