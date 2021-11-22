import * as QueryString from 'qs';

export interface ReqQuery {
  [key: string]:
    | string
    | QueryString.ParsedQs
    | string[]
    | QueryString.ParsedQs[]
    | undefined;
}
