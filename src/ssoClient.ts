import axios, { AxiosInstance } from "axios";

export interface AppResource {
  resource: string;
  action: string;
  category?: string;
  description?: string;
}

export interface RegisterResourcesOptions {
  appId: string;
  resources: AppResource[];
  ssoBaseUrl: string;
  authToken: string;
}

export class SSOClient {
  private http: AxiosInstance;
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string, authToken: string) {
    this.baseUrl = baseUrl;
    this.token = authToken;
    this.http = axios.create({
      baseURL: baseUrl,
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  async registerResources(
    appId: string,
    resources: AppResource[],
  ): Promise<any> {
    const res = await this.http.post(`/api/v1/app-resources`, {
      appId,
      resources,
    });
    return res.data;
  }

  // Aquí se pueden agregar más métodos: gestión de permisos, usuarios, etc.
}
