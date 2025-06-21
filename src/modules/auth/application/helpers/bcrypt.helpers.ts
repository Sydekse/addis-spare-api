import * as bcrypt from 'bcrypt';

export class BcryptHelper {
  static async hash(text: string): Promise<string> {
    return bcrypt.hash(text, 12);
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static encodeb64(text: string): string {
    return Buffer.from(text).toString('base64');
  }

  static decodeb64(text: string): string {
    return Buffer.from(text, 'base64').toString('utf-8');
  }
}
