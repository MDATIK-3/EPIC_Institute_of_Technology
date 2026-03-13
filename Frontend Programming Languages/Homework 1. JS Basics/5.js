function spiral(m) {
  let r = [];

  if (!m.length || !m[0].length) {
    return r;
  }

  let t = 0;
  let b = m.length - 1;
  let l = 0;
  let x = m[0].length - 1;

  while (t <= b && l <= x) {
    for (let i = l; i <= x; i++) {
      r.push(m[t][i]);
    }
    t++;

    for (let i = t; i <= b; i++) {
      r.push(m[i][x]);
    }
    x--;

    if (t <= b) {
      for (let i = x; i >= l; i--) {
        r.push(m[b][i]);
      }
      b--;
    }

    if (l <= x) {
      for (let i = b; i >= t; i--) {
        r.push(m[i][l]);
      }
      l++;
    }
  }

  return r;
}

console.log(spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));