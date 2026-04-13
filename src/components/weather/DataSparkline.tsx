import styles from './DataSparkline.module.css';

interface DataSparklineProps {
  data: number[];
  color?: 'primary' | 'secondary';
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: boolean;
  className?: string;
}

function normalize(values: number[], minH: number, maxH: number): number[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) return values.map(() => maxH / 2);
  return values.map((v) => maxH - ((v - min) / (max - min)) * (maxH - minH));
}

function buildPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return '';
  const [first, ...rest] = points;
  const parts: string[] = [`M ${first.x},${first.y}`];
  for (let i = 0; i < rest.length; i++) {
    const prev = i === 0 ? first : rest[i - 1];
    const cur = rest[i];
    const cpX = (prev.x + cur.x) / 2;
    parts.push(`C ${cpX},${prev.y} ${cpX},${cur.y} ${cur.x},${cur.y}`);
  }
  return parts.join(' ');
}

export function DataSparkline({
  data,
  color = 'primary',
  width = 120,
  height = 36,
  strokeWidth = 1.5,
  fill = true,
  className = '',
}: DataSparklineProps) {
  if (!data || data.length < 2) return null;

  const padding = 2;
  const ys = normalize(data, padding, height - padding);
  const step = (width - padding * 2) / (data.length - 1);

  const points = data.map((_, i) => ({
    x: padding + i * step,
    y: ys[i],
  }));

  const linePath = buildPath(points);

  const fillPath = fill
    ? `${linePath} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`
    : '';

  const strokeColor =
    color === 'primary' ? 'var(--primary)' : 'var(--secondary)';
  const fillId = `sparkline-fill-${color}-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`${styles.sparkline} ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {fill && (
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.18" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {fill && fillPath && (
        <path d={fillPath} fill={`url(#${fillId})`} stroke="none" />
      )}
      <path
        d={linePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
