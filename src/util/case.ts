export function toCamelCase(v: any): any {
  return toSomeCase(v, (s) => s.replace(/_[a-z]/g, (match) => match.charAt(1).toUpperCase()));
}

export function toSnakeCase(v: any): any {
  return toSomeCase(v, (s) => s.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase()));
}

function toSomeCase(v: any, fn: (s: string) => string, isValue?: boolean): any {
  if (typeof v === 'string') {
    return isValue ? v : fn(v);
  } else if (Array.isArray(v)) {
    return v.map(w => toSomeCase(w, fn, true));
  } else if (v === null || typeof v === 'undefined') {
    return v;
  } else if (typeof v === 'object') {
    const rv: { [key: string]: string } = {};
    for (const key of Object.keys(v)) {
      rv[fn(key)] = toSomeCase(v[key], fn, true);
    }
    return rv;
  } else {
    return v;
  }
}
