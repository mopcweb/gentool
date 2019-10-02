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
import { MONGO, MONGO_DB_URI } from '../utils/config';

// =====> Models
import { LogsModel } from '../models';

// =====> Services
import { logger, msg } from '../services';

/* ------------------------------------------------------------------- */
/**
 *  MongoDB Connection Controller
 */
/* ------------------------------------------------------------------- */

export class MongoDB {

  /* ------------------------------------------------------------------- */
  /*               Static method - close connection to MongoDB
  /* ------------------------------------------------------------------- */

  public static close(): boolean {
    // Stop using if no MongoDB instantiated
    if (!MongoDB.instance)
      return false;

    // Close connection
    MongoDB.instance.db.close();

    // Destroy instance
    MongoDB.instance = undefined;

    return true;
  }

  /* ------------------------------------------------------------------- */
  /**
   *  DB connection instance
   */
  /* ------------------------------------------------------------------- */

  private static instance: MongoDB;

  /* ------------------------------------------------------------------- */
  /**
   *  Getter for DB Models
   */
  /* ------------------------------------------------------------------- */

  public static get Models() {
    if (!MongoDB.instance || !MongoDB.instance.db)
      return MongoDB.init();

    return Promise.resolve(msg.ok(MongoDB.instance.models));
  }

  /* ------------------------------------------------------------------- */
  /**
   *  DB connection initializer (to handle unique connection over app)
   */
  /* ------------------------------------------------------------------- */

  private static async init() {
    if (!MongoDB.instance)
      MongoDB.instance = new MongoDB();

    // Var for error
    let error: any;

    // Connect to MongoDB
    await connect(MONGO_DB_URI, MONGO.OPTIONS)
    // await createConnection(mongoLogsUri, MongoOpts)
      // .then(connection => DB.instance.db = connection)
      .catch(err => error = err);

    // Save connetion
    MongoDB.instance.db = connection;

    // Close connection if not connected
    if (!MongoDB.instance.db.readyState)
      return MongoDB.instance.error(error);

    return msg.ok(MongoDB.instance.models);
  }

  /* ------------------------------------------------------------------- */
  /*                              Vars
  /* ------------------------------------------------------------------- */

  private db: Connection;
  private models = { LogsModel };

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  private constructor() { }

  /* ------------------------------------------------------------------- */
  /*                     Handle error connections
  /* ------------------------------------------------------------------- */

  private error = (error: any) => {
    logger.error(error, ['MONGODB CONNECTION ERROR. NO CONNECTION']);

    MongoDB.close();

    return msg.gatewayTimeout(error);
  }
}
