import { isNil } from "ramda";

export var isNotNil = <T extends unknown>(val: T): val is T => !isNil(val)