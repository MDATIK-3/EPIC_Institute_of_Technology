function isPalindrom(str) {
  const text = String(str);
  let l = 0;
  let r = text.length - 1;

  while (l < r) {
    if (text[l] !== text[r]) {
      return false;
    }
    l++;
    r--;
  }

  return true;
}

console.log(isPalindrom("abcdcba")); 
console.log(isPalindrom("Atik"));