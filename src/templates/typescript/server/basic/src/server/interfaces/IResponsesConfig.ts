/* ################################################################### */
/**
 *  Interfaces for Swagger Docs common response object
 */
/* ################################################################### */

export interface IResponsesConfig {
  url: string;
  title?: string;
  method?: string;
  ok?: any;
  created?: any;
  badRequest?: any;
  unAuthorized?: any;
  forbidden?: any;
  notFound?: any;
  conflict?: any;

  200?: any;
  201?: any;
  400?: any;
  401?: any;
  403?: any;
  404?: any;
  409?: any;
}
