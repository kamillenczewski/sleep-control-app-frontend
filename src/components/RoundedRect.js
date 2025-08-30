import { Path } from 'react-native-svg';

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default function CustomRoundedRect({
  x, y, width, height,
  radiusTopLeft=0, 
  radiusTopRight=0,
  radiusBottomRight=0, 
  radiusBottomLeft=0,
  fill,
  stroke,
  strokeWidth
}) {
  const maxRadiusWidth = width / 2;
  const maxRadiusHeight = height / 2;

  const rtl = clamp(radiusTopLeft, 0, Math.min(maxRadiusWidth, maxRadiusHeight));
  const rtr = clamp(radiusTopRight, 0, Math.min(maxRadiusWidth, maxRadiusHeight));
  const rbr = clamp(radiusBottomRight, 0, Math.min(maxRadiusWidth, maxRadiusHeight));
  const rbl = clamp(radiusBottomLeft, 0, Math.min(maxRadiusWidth, maxRadiusHeight));

  const path = `
    M${x + rtl},${y}
    H${x + width - rtr}
    A${rtr},${rtr} 0 0 1 ${x + width},${y + rtr}
    V${y + height - rbr}
    A${rbr},${rbr} 0 0 1 ${x + width - rbr},${y + height}
    H${x + rbl}
    A${rbl},${rbl} 0 0 1 ${x},${y + height - rbl}
    V${y + rtl}
    A${rtl},${rtl} 0 0 1 ${x + rtl},${y}
    Z
  `;

  return (
    <Path
      d={path}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};