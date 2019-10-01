/* ################################################################### */
/*
/*  MongoDB General Crud Controller Model
/*
/* ################################################################### */

import { Model } from 'mongoose';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Config
import { MONGO } from '../utils/config';

// =====> StatusCodes
import { NOT_FOUND, BAD_REQUEST, CONFLICT } from 'http-status';

// =====> Controllers
import { MongoDB } from '../controllers';

// =====> Services
import { msg, logger } from '../services';

/* ------------------------------------------------------------------- */
/**
 *  Controller for general CRUD operations with MongoDB Model
 */
/* ------------------------------------------------------------------- */

export abstract class CrudController {

  /* ------------------------------------------------------------------- */
  /**
   *  Creates a new record in MongoDB Model
   *
   *  @param modelName - MongoDB Model title
   *  @param body - Info to save into record
   */
  /* ------------------------------------------------------------------- */

  protected async Create(modelName: string, body: { [x: string]: any }) {
    // Connect to MongoDB & get Model
    const Models = await MongoDB.Models;
    if (Models.status >= 400)
      return Models;

    const model: Model<any> = Models.data[modelName];
    if (!model)
      return msg(BAD_REQUEST, 'Incorrect model');

    // Delete _id if it is
    if (body._id)
      delete body._id;

    // Request
    const response = await model
      .create(body)
      .catch((err: any) =>
        err && err.errmsg.indexOf('duplicate key error') !== -1
          ? msg(CONFLICT, err)
          : msg(BAD_REQUEST, err));

    // Close connection
    MongoDB.close();

    // Return
    return response;
  }

  /* ------------------------------------------------------------------- */
  /**
   *  Reads records or record by id from MongoDB Model
   *
   *  @param modelName - MongoDB Model title
   *  @param [options] - Query options
   *  @param [id] - Id or query to get by
   */
  /* ------------------------------------------------------------------- */

  protected async Read(
    modelName: string, options?: { [x: string]: any },
    id?: number | string | { [x: string]: any },
  ): Promise<any> {
    // Connect to MongoDB & get Model
    const Models = await MongoDB.Models;
    if (Models.status >= 400)
      return Models;

    const model: Model<any> = Models.data[modelName];
    if (!model)
      return msg(BAD_REQUEST, 'Incorrect model');

    // Get necessary options
    const { limit, skip, getBy = MONGO.DEFAULT.GET_BY, sort, select } = options;

    // Vars for value and amount
    let value: any;
    let amount: number;

    // Define select
    const selected = select ? select.split(',').join(' ') : '';

    // If id provided
    if (id) {
      // Define query var
      const query = id && (typeof id === 'string' || typeof id === 'number')
        ? { [getBy]: id }
        : id;

      value = await model
        .findOne(query)
        .select(selected)
        .then(profiles => profiles
          ? profiles
          : typeof id === 'string' || typeof id === 'number'
            ? msg(NOT_FOUND, 'Item not found')
            : msg(NOT_FOUND, 'Item not found under provided conditions'))
        .catch(err =>
          err && err.name === 'CastError' && err.kind === 'ObjectId'
            ? msg(BAD_REQUEST, 'Incorrect id provided')
            : msg(BAD_REQUEST, err));

      // Close connection
      MongoDB.close();

      return value;
    }

    // Query var
    const query: { [x: string]: any } = { };

    // Specify query
    if (sort)
      query.sort = sort.split(',').join(' ');
    if (typeof +limit === 'number' && limit !== 'none')
      query.limit = +limit || MONGO.DEFAULT.LIMIT;
    if (typeof +skip === 'number')
      query.skip = +skip || MONGO.DEFAULT.SKIP;

    // Find all items
    await model
      .find({ }, null, query)
      .then(profiles => profiles && profiles.length
        ? value = profiles
        : value = msg(NOT_FOUND, 'Items not found'))
      .catch(err => value = msg(BAD_REQUEST, err));

    // If error -> close connection & return error
    if (value && value.status && value.status >= 400) {
      MongoDB.close();
      return value;
    }

    // Find amount of items -> to define if there is nextSkip
    await model
      .find({ })
      .countDocuments((err, count) => {
        // If error
        if (err)
          logger.error(err, ['ERROR IN CRUD_CONTROLLER: GET AMOUNT']);

        // Update amount var
        if (count)
          amount = count;

        // Close connection
        MongoDB.close();
      });

    return query.limit && (amount > query.skip + query.limit)
      ? { nextSkip: query.skip + query.limit, value }
      : { value };
  }

  /* ------------------------------------------------------------------- */
  /**
   *  Updates record from MongoDB Model by id or query to find by
   *
   *  @param modelName - MongoDB Model title
   *  @param id - Id or query to update by
   *  @param body - Info to save into record
   */
  /* ------------------------------------------------------------------- */

  protected async Update(
    modelName: string, id: number | string | { [x: string]: any },
    body: { [x: string]: any }
  ) {
    // Connect to MongoDB & get Model
    const Models = await MongoDB.Models;
    if (Models.status >= 400)
      return Models;

    const model: Model<any> = Models.data[modelName];
    if (!model)
      return msg(BAD_REQUEST, 'Incorrect model');

    // If id is object -> update many, else -> by id
    const response: any = id && typeof id === 'object'
      ? await model
          .updateMany(id, { $set: body }, { new: true, runValidators: true })
          .then(res => {
            console.log('res in update .>>>', res);
            return res.n !== 0
              ? `Successfully updated: ${res.n} items`
              : id && (typeof id === 'string' || typeof id === 'number')
                ? msg(BAD_REQUEST, 'Incorrect id provided')
                : msg(BAD_REQUEST, 'Incorrect conditions provided');
          })
          .catch((err: any) => msg(BAD_REQUEST, err))
      : await model
          .findOneAndUpdate(
            { _id: id },
            { $set: body },
            { new: true, runValidators: true }
          )
          .then(res => res ? res : msg(BAD_REQUEST, 'Incorrect id provided'))
          .catch((err: any) =>
            err && err.name === 'CastError' && err.kind === 'ObjectId'
              ? msg(BAD_REQUEST, 'Incorrect id provided')
              : msg(BAD_REQUEST, err));

    // Return
    return response;
  }

  /* ------------------------------------------------------------------- */
  /**
   *  Deletes record from MongoDB Model by id or query to find by
   *
   *  @param modelName - MongoDB Model title
   *  @param id - Id or query to delete by
   */
  /* ------------------------------------------------------------------- */

  protected async Delete(
    modelName: string, id: number | string | { [x: string]: any }
  ) {
    // Connect to MongoDB & get Model
    const Models = await MongoDB.Models;
    if (Models.status >= 400)
      return Models;

    const model: Model<any> = Models.data[modelName];
    if (!model)
      return msg(BAD_REQUEST, 'Incorrect model');

    // Filter
    let where: any;

    // Define where conditions
    if (id && typeof id === 'object')
      where = id;
    else if (id && id === 'all')
      where = { };
    else if (id && (typeof id === 'string' || typeof id === 'number'))
      where = { _id: id };

    // Response
    const response: any = await model
      .deleteMany(where)
      .then(res => res.n !== 0
        ? `Successfully deleted: ${res.n} items`
        : id && (typeof id === 'string' || typeof id === 'number')
          ? msg(BAD_REQUEST, 'Incorrect id provided')
          : msg(BAD_REQUEST, 'Incorrect conditions provided'))
      .catch((err: any) => msg(BAD_REQUEST, err));

    // Return
    return response;
  }

}
