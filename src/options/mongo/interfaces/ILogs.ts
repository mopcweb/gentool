/* ################################################################### */
/*
/*  Interface for Logs MongoDB Model
/*
/* ################################################################### */

import { Document } from 'mongoose';

/* ------------------------------------------------------------------- */
/**
 *  Interface for MongoDB LogsModel
 */
/* ------------------------------------------------------------------- */

export interface ILogs extends Document {
  level: string;
  message: string;
}
