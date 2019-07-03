/* ################################################################### */
/*
/*  Controller for MongoDB
/*
/* ################################################################### */

import { connect, connection, Connection } from 'mongoose';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Config
import { mongoLogsUri, MongoOpts } from '../utils/config';

// =====> Services
import { logger, msg } from '../services';

/* ------------------------------------------------------------------- */
/*                             Controller
/* ------------------------------------------------------------------- */

export class DB {

  /* ------------------------------------------------------------------- */
  /*                   Static method - connect to DB
  /* ------------------------------------------------------------------- */

  public static async connect(): Promise<{ [x: string]: any }> {
    if (!DB.instance)
      DB.instance = new DB();

    // Var for error
    let error: any;

    // Connect to DB
    await connect(mongoLogsUri, MongoOpts)
      .catch(err => error = err);

    // Save connetion
    DB.instance.db = connection;

    // Close connection if not connected
    if (!DB.instance.db.readyState)
      return DB.instance.error(error);

    return msg(DB.instance.db.readyState);
  }

  /* ------------------------------------------------------------------- */
  /*               Static method - close connection to DB
  /* ------------------------------------------------------------------- */

  public static close(): boolean {
    // Stop using if no DB instantiated
    if (!DB.instance)
      return false;

    // Close connection
    DB.instance.db.close();

    return true;
  }

  /* ------------------------------------------------------------------- */
  /*                              Vars
  /* ------------------------------------------------------------------- */

  private static instance: DB;
  private db: Connection;

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  private constructor() { }

  /* ------------------------------------------------------------------- */
  /*                     Handle error connections
  /* ------------------------------------------------------------------- */

  private error = (error: any) => {

    logger.error(error, ['MONGODB CONNECTION ERROR. NO CONNECTION']);

    // Close
    DB.close();

    return msg(DB.instance.db.readyState, error);
  }
}
