/* ################################################################### */
/*
/*  Interface for LogsController
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                             Interface
/* ------------------------------------------------------------------- */

export interface ILogsController {
  // =====> Get
  get(
    start?: string, end?: string, skip?: number, limit?: number, sort?: string
  ): Promise<any>;

  // =====> Delete
  delete(id: string): Promise<any>;
}
