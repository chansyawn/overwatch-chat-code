export const rgbaToHex = (color: string): string => {
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
};

// 检查是否是渐变颜色
export const isGradient = (color: string): boolean => {
  return color.includes("linear-gradient");
};

// 颜色停止点接口
interface ColorStop {
  r: number;
  g: number;
  b: number;
  a: number;
  position: number; // 0-100 百分比
}

// 解析 rgba 颜色字符串
const parseRgbaColor = (colorStr: string): { r: number; g: number; b: number; a: number } => {
  const rgbaMatch = colorStr.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/i
  );
  
  if (!rgbaMatch) {
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  const [, rStr, gStr, bStr, aStr] = rgbaMatch;
  return {
    r: parseInt(rStr, 10),
    g: parseInt(gStr, 10),
    b: parseInt(bStr, 10),
    a: aStr ? parseFloat(aStr) : 1
  };
};

// 线性插值函数
const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

// 在两个颜色之间进行插值
const interpolateColor = (color1: ColorStop, color2: ColorStop, factor: number): ColorStop => {
  return {
    r: Math.round(lerp(color1.r, color2.r, factor)),
    g: Math.round(lerp(color1.g, color2.g, factor)),
    b: Math.round(lerp(color1.b, color2.b, factor)),
    a: lerp(color1.a, color2.a, factor),
    position: lerp(color1.position, color2.position, factor)
  };
};

// 将颜色停止点转换为 rgba 字符串
const colorStopToRgba = (colorStop: ColorStop): string => {
  return `rgba(${colorStop.r}, ${colorStop.g}, ${colorStop.b}, ${colorStop.a})`;
};

/**
 * 解析渐变字符串并生成模拟渐变效果的颜色数组
 * @param gradientStr 渐变字符串，如 "linear-gradient(90deg, rgba(0,0,0,1) 11%, rgba(0,0,0,1) 50%, rgba(255,255,255,1) 92%)"
 * @param n 要生成的颜色数量
 * @returns 长度为 n 的 rgba 颜色字符串数组
 */
export const generateGradientColors = (gradientStr: string, n: number): string[] => {
  if (n <= 0) return [];
  if (n === 1) return ['rgba(0, 0, 0, 1)'];

  // 解析渐变字符串，提取颜色停止点
  const colorStopRegex = /rgba?\([^)]+\)\s*(\d+(?:\.\d+)?%)?/gi;
  const matches = gradientStr.match(colorStopRegex) || [];
  
  if (matches.length === 0) {
    // 如果解析失败，返回默认颜色
    return Array(n).fill('rgba(0, 0, 0, 1)');
  }

  const colorStops: ColorStop[] = [];
  
  matches.forEach((match, index) => {
    const colorMatch = match.match(/rgba?\([^)]+\)/i);
    const positionMatch = match.match(/(\d+(?:\.\d+)?)%/);
    
    if (colorMatch) {
      const color = parseRgbaColor(colorMatch[0]);
      let position: number;
      
      if (positionMatch) {
        position = parseFloat(positionMatch[1]);
      } else {
        // 如果没有明确的位置，按等分计算
        if (matches.length === 1) {
          position = 50; // 单色情况
        } else {
          position = (index / (matches.length - 1)) * 100;
        }
      }
      
      colorStops.push({
        ...color,
        position
      });
    }
  });

  // 按位置排序
  colorStops.sort((a, b) => a.position - b.position);
  
  if (colorStops.length === 0) {
    return Array(n).fill('rgba(0, 0, 0, 1)');
  }

  if (colorStops.length === 1) {
    // 只有一个颜色，返回相同颜色的数组
    return Array(n).fill(colorStopToRgba(colorStops[0]));
  }

  const result: string[] = [];
  
  // 生成 n 个等间距的位置点
  for (let i = 0; i < n; i++) {
    const position = (i / (n - 1)) * 100; // 0% 到 100%
    
    // 找到当前位置在哪两个颜色停止点之间
    let leftStop = colorStops[0];
    let rightStop = colorStops[colorStops.length - 1];
    
    for (let j = 0; j < colorStops.length - 1; j++) {
      if (position >= colorStops[j].position && position <= colorStops[j + 1].position) {
        leftStop = colorStops[j];
        rightStop = colorStops[j + 1];
        break;
      }
    }
    
    // 处理边界情况
    if (position <= colorStops[0].position) {
      result.push(colorStopToRgba(colorStops[0]));
      continue;
    }
    
    if (position >= colorStops[colorStops.length - 1].position) {
      result.push(colorStopToRgba(colorStops[colorStops.length - 1]));
      continue;
    }
    
    // 计算插值因子
    const factor = (position - leftStop.position) / (rightStop.position - leftStop.position);
    
    // 进行颜色插值
    const interpolatedColor = interpolateColor(leftStop, rightStop, factor);
    result.push(colorStopToRgba(interpolatedColor));
  }
  
  return result;
};
