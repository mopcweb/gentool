/* ################################################################### */
/*
/*  Interface for OiService
/*
/* ################################################################### */

export interface IOiService {
  // =====> Get data from o365 middleware ews_proxy API
  get(
  token: string, client: string, app: string, instance: string, query?: any,
  endPoint?: string
  ): Promise<any>;
}
