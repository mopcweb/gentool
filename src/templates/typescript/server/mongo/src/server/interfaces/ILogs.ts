/* ################################################################### */
/*
/*  Interface for Logs MongoDB Model
/*
/* ################################################################### */

import { Document } from 'mongoose';

/* ------------------------------------------------------------------- */
/*                            Interface
/* ------------------------------------------------------------------- */

export interface ILogs extends Document {
  level: string;
  message: string;
}
