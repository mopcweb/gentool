/* ################################################################### */
/*
/*  Controller for Logs Collection in MongoDB
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Interfaces
import { ILogsController } from '../interfaces';

// =====> Models
import { CrudController } from '../models';

/* ------------------------------------------------------------------- */
/*                             Controller
/* ------------------------------------------------------------------- */

export class LogsController extends CrudController implements ILogsController {

  /* ------------------------------------------------------------------- */
  /**
   *  Reads logs or log by id
   *
   *  @param [options] - Query options
   *  @param [id] - Id or query to get by
   */
  /* ------------------------------------------------------------------- */

  public async read(
    options?: { [x: string]: any },
    id?: number | string | { [x: string]: any }
  ): Promise<any> {
    // Use extended method
    return this.Read('LogsModel', options, id);
  }

  /* ------------------------------------------------------------------- */
  /**
   *  Deletes log from by id or query to find by
   *
   *  @param id - Id or query to delete by
   */
  /* ------------------------------------------------------------------- */

  public async delete(
    id: number | string | { [x: string]: any }
  ): Promise<any> {
    return this.Delete('LogsModel', id);
  }
}
