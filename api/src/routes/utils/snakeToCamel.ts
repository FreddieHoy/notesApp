import { camelCase } from "lodash";
// @ts-expect-error import-issues
import mapKeysDeep from "map-keys-deep-lodash";

export default (obj: object) =>
  mapKeysDeep(obj, (_: string, key: string) => camelCase(key)) as object;
