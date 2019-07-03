/* ################################################################### */
/*
/*  Interface for classic response
/*
/* ################################################################### */

export interface IMsg {
  status: number;
  statusText: string;
  requestFrom?: string;
  method?: string;
  endPoint?: string;
  params?: { [x: string]: any };
  data?: any;
}
