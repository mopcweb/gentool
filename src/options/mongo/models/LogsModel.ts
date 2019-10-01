/* ################################################################### */
/*
/*  Model for Logs MongoDB model
/*
/* ################################################################### */

import { Schema, model } from 'mongoose';

/* ------------------------------------------------------------------- */
/*                            Config
/* ------------------------------------------------------------------- */

// =====> Config
import { MONGO } from '../utils/config';

// =====> Interface
import { ILogs } from '../interfaces';

/* ------------------------------------------------------------------- */
/*                             Schema
/* ------------------------------------------------------------------- */

export const LogsSchema = new Schema(
  {
    level: { type: String, required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

/* ------------------------------------------------------------------- */
/*                             Model
/* ------------------------------------------------------------------- */

export const LogsModel = model<ILogs>(MONGO.COLLECTIONS.LOGS, LogsSchema);