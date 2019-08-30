/* SystemJS module definition */
declare var module: NodeModule;
declare var require: any;
interface NodeModule {
  id: string;
}

/* Starter Typings */

interface IErrorApi {
  errorMsg?: string;
  headers?: object;
  message?: string;
  ok?: boolean;
  status?: number;
  _body?: string;
  statusText?: string;
  type?: number;
  url?: string;
}

interface ILogin {
  username: string;
  password: string;
}

interface IRest {
  Get?: any;
  Post?: any;
  Put?: any;
  Delete?: any;
}
