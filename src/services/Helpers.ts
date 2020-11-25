import { isNil } from "ramda";

export var notNil = <T extends unknown>(val: T): val is T => !!val