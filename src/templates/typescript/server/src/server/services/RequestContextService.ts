/* ################################################################### */
/*
/*  Current user request auth info (session or authorization)
/*
/* ################################################################### */

/* ------------------------------------------------------------------- */
/*                             Config
/* ------------------------------------------------------------------- */

// =====> Intefaces
import { IRequestContext } from '../interfaces';

/* ------------------------------------------------------------------- */
/**
 *  Service to manage current request context over app
 */
/* ------------------------------------------------------------------- */

export class RequestContextService {

  /* ------------------------------------------------------------------- */
  /**
   *  Gets current request context
   */
  /* ------------------------------------------------------------------- */

  public static get Context(): Promise<IRequestContext> {
    if (!RequestContextService.instance)
      return RequestContextService.update();

    return Promise.resolve(RequestContextService.instance.context);
  }

  /* ------------------------------------------------------------------- */
  /**
   *  Resets current request context
   */
  /* ------------------------------------------------------------------- */

  public static reset(): Promise<IRequestContext> {
    if (!RequestContextService.instance)
      return undefined;

    return RequestContextService.instance =
      RequestContextService.instance.context =
      undefined;
  }

  /* ------------------------------------------------------------------- */
  /**
   *  Updates current request context
   *
   *  @param [context] - Context object. Props specified in IRequestContext
   */
  /* ------------------------------------------------------------------- */

  public static async update(
    context?: IRequestContext
  ): Promise<IRequestContext> {
    if (!RequestContextService.instance)
      RequestContextService.instance = new RequestContextService();

    // Update context
    if (context)
      for (const prop of Object.keys(context))
        // If there is a prop and it has value -> update
        if ((context as any).hasOwnProperty(prop) && (context as any)[prop])
          RequestContextService.instance.context = {
            ...RequestContextService.instance.context,
            [prop]: (context as any)[prop]
          };
        // Else -> delete
        else if ((context as any).hasOwnProperty(prop))
          delete (RequestContextService.instance.context as any)[prop];

    // Return
    return RequestContextService.instance.context;
  }

  /* ------------------------------------------------------------------- */
  /*                              Vars
  /* ------------------------------------------------------------------- */

  private static instance: RequestContextService;
  private context: IRequestContext = { };

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  private constructor() { }

}
