import * as dotenv from 'dotenv';

/**
 * It fetches all the variables from .env file amd loads them environment file.
 */
export class ConfigService {
  constructor() {
    const nodeEnv = this.nodeEnv;
    dotenv.config({
      path: `.${nodeEnv}.env`,
    });

    // Replace \\n with \n to support multiline strings in AWS
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
  }

  /**
   * user to fetch env variable.
   * @param key key name
   * @returns the variable value
   */
  public get(key: string): string {
    return process.env[key];
  }

  /**
   * user to fetch env variable as a Number.
   * @param key key name
   * @returns the variable value as a Number
   */
  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }
}
