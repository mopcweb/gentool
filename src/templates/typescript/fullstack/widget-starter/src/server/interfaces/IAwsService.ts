/* ################################################################### */
/*
/*  Interface for AwsService
/*
/* ################################################################### */

export interface IAwsService {
  // =====> Get AWS token
  getToken(
    clientId: string, clientSecret: string, instance: string
  ): Promise<any>;
}
