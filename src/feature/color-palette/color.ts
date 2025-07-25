export function rgbaToHex(color: string): string {
  const rgbaMatch = color.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,?[\s+]?([\d.]+)?[\s+]?\)$/i
  );

  if (!rgbaMatch) {
    return "#FFFFFFFF";
  }

  const [, rStr, gStr, bStr, aStr] = rgbaMatch;
  const r = parseInt(rStr, 10);
  const g = parseInt(gStr, 10);
  const b = parseInt(bStr, 10);

  const toHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hexR = toHex(r);
  const hexG = toHex(g);
  const hexB = toHex(b);

  let hexA = "";
  if (aStr !== undefined) {
    const a = parseFloat(aStr);
    if (a >= 0 && a <= 1) {
      const alphaHexValue = Math.round(a * 255);
      hexA = toHex(alphaHexValue);
    }
  }

  return `#${hexR}${hexG}${hexB}${hexA}`.toUpperCase();
}
