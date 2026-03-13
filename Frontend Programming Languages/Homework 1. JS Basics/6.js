function quadraticEquation(a, b, c) {
  if (a === 0) {
    if (b === 0) {
      return [];
    }

    return [-c / b];
  }

  const equ = b * b - 4 * a * c;

  if (equ < 0) {
    return [];
  }

  if (equ === 0) {
    return [-b / (2 * a)];
  }

  const sqrtequ = Math.sqrt(equ);

  return [
    (-b + sqrtequ) / (2 * a),
    (-b - sqrtequ) / (2 * a),
  ];
}
