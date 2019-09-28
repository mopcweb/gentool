/* ################################################################### */
/**
 *  Interface for winston logger
 */
/* ################################################################### */

export interface ILogger {
  info: (data: any, options?: string[] | string) => string | undefined | void;
  error: (data: any, options?: string[] | string) => string | undefined | void;
  warn: (data: any, options?: string[] | string) => string | undefined | void;
  debug: (data: any, options?: string[] | string) => string | undefined | void;
  verbose:
    (data: any, options?: string[] | string) => string | undefined | void;
  [x: string]: any;
}
