import * as QueryString from 'qs';

export interface Reqbodystring {
  [key: string]: string;
}

export interface ReqQuery {
  [key: string]:
    | string
    | QueryString.ParsedQs
    | string[]
    | QueryString.ParsedQs[]
    | undefined;
}
