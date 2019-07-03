/* ################################################################### */
/*
/*  Controller for Logs Collection in MongoDB
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> StatusCodes
import { NOT_FOUND, BAD_REQUEST } from 'http-status';

// =====> Interfaces
import { ILogsController } from '../interfaces';

// =====> Controllers
import { DB } from './';

// =====> Services
import { msg, logger } from '../services';

/* ------------------------------------------------------------------- */
/*                             Controller
/* ------------------------------------------------------------------- */

export class LogsController implements ILogsController {

  /* ------------------------------------------------------------------- */
  /*                               Read
  /* ------------------------------------------------------------------- */

  public async get(
    start?: string, end?: string, skip?: number, limit?: number, sort?: string
  ): Promise<any> {
    // Define filter var
    const filter: { [x: string]: any } = { };

    // Specify filters
    if (start)
      filter.timestamp = { $gte: new Date(start) };
    if (end)
      filter.timestamp = { $lte: new Date(end) };
    if (start && end)
      filter.timestamp = { $gte: new Date(start), $lte: new Date(end) };

    // Var for valu
    let value: any;
    let amount: number;

    // Sort diretion
    let direction: string;
    if (sort && sort.toLowerCase() === 'asc') direction = 'timestamp';
    if (sort && sort.toLowerCase() === 'desc') direction = '-timestamp';

    // Find all logs in MongoDB
    await DB.Models.Logs
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(direction)
      .then(logs => logs && logs.length
        ? value = logs
        : value = msg(NOT_FOUND, 'No logs found'))
      .catch(err => value = msg(BAD_REQUEST, err));

    // If error -> stop & return
    if (value.status && value.status >= BAD_REQUEST) {
      // Close connection
      DB.close();

      // Return error
      return value;
    }

    // Find amount of allLogs -> to define if there is nexPage
    await DB.Models.Logs
      .find({ })
      .countDocuments((err, count) => {
        // If error
        if (err)
          logger.error(err, ['ERROR IN LOGS_CONTROLLER: GET AMOUNT']);

        // Update amount var
        if (count)
          amount = count;

        // Close connection
        DB.close();
      });

    // Var for response
    const response = { nextSkip: skip + limit, value };

    // If there is nextPage -> add nextSkip prop
    if (amount <= skip + limit)
      delete response.nextSkip;

    return response;
  }

  /* ------------------------------------------------------------------- */
  /*                               Delete
  /* ------------------------------------------------------------------- */

  public async delete(id: string): Promise<any> {
    // Var for response
    let response: any;

    // Save new item
    await DB.Models.Logs
      .deleteMany(
        id === 'all'
          ? { }
          : { _id: id }
      )
      .then(res => response = res.n === 1 || id === 'all'
        ? 'Successfully deleted'
        : msg(BAD_REQUEST, 'Incorrect id provided'))
      .catch(err => {
        logger.error(err, ['ERROR IN LOGS_CONTROLLER: DELETING']);
        response = msg(BAD_REQUEST, err);
      });

    // Close connection
    DB.close();

    return response;
  }
}
