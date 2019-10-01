/* ################################################################### */
/**
 *  Interface for LogsController
 */
/* ################################################################### */

export interface ILogsController {
  /* ------------------------------------------------------------------- */
  /**
   *  Reads logs or log by id
   *
   *  @param [options] - Query options
   *  @param [id] - Id or query to get by
   */
  /* ------------------------------------------------------------------- */
  read(
    options?: { [x: string]: any },
    id?: number | string | { [x: string]: any }
  ): Promise<any>;

  /* ------------------------------------------------------------------- */
  /**
   *  Deletes log from by id or query to find by
   *
   *  @param id - Id or query to delete by
   */
  /* ------------------------------------------------------------------- */
  delete(id: number | string | { [x: string]: any }): Promise<any>;
}
