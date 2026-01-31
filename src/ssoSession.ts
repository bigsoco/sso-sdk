import axios, { AxiosInstance } from 'axios';

export interface SSOClientOptions {
  baseUrl: string;
  appId: string;
}

export interface SessionValidationResult {
  valid: boolean;
  user?: any;
  tenant?: any;
  appId?: string;
  expiresAt?: string;
}

export class SSOSessionClient {
  private http: AxiosInstance;
  private appId: string;

  constructor(options: SSOClientOptions) {
    this.appId = options.appId;
    this.http = axios.create({ baseURL: options.baseUrl });
  }

  /**
   * Valida un session token con el backend SSO
   */
  async validateSessionToken(sessionToken: string): Promise<SessionValidationResult> {
    const res = await this.http.post('/api/v1/auth/verify-session', {
      sessionToken,
      appId: this.appId,
    });
    return res.data;
  }

  /**
   * Intercambia un authorization code por un session token
   */
  async exchangeAuthCode(code: string): Promise<any> {
    const res = await this.http.post('/api/v1/auth/token', {
      authCode: code,
      appId: this.appId,
    });
    return res.data;
  }
}
