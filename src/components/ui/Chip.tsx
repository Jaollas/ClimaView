import React from 'react';
import styles from './Chip.module.css';

type ChipVariant = 'live' | 'alert' | 'station' | 'neutral' | 'primary';

interface ChipProps {
  label: string;
  variant?: ChipVariant;
  pulse?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function Chip({
  label,
  variant = 'neutral',
  pulse = false,
  icon,
  className = '',
}: ChipProps) {
  return (
    <span className={`${styles.chip} ${styles[variant]} ${className}`}>
      {pulse && <span className={styles.pulseDot} aria-hidden="true" />}
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
    </span>
  );
}
