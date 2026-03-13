function isDeepEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (typeof a !== "object" || typeof b !== "object") return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];

    if (!(key in b)) return false;

    if (!isDeepEqual(a[key], b[key])) return false;
  }

  return true;
}
const a = { a: 1, b: { c: 2 } };
const b = { a: 1, b: { c: 2 } };

console.log(isDeepEqual(a, b)); 