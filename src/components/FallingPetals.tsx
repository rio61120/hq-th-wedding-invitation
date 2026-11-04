import React from 'react';

const petals = [
  ['5%', '-2s', '19s', '12px', '18vw'],
  ['17%', '-9s', '23s', '16px', '-20vw'],
  ['29%', '-5s', '17s', '11px', '24vw'],
  ['42%', '-14s', '22s', '14px', '-16vw'],
  ['56%', '-7s', '18s', '17px', '20vw'],
  ['68%', '-17s', '24s', '12px', '-24vw'],
  ['81%', '-11s', '20s', '15px', '16vw'],
  ['94%', '-20s', '25s', '13px', '-18vw'],
];

export function FallingPetals() {
  return (
    <div className="falling-petals" aria-hidden="true">
      {petals.map(([left, delay, duration, size, drift], index) => (
        <span
          key={index}
          className="falling-petal"
          style={{
            left,
            animationDelay: delay,
            animationDuration: duration,
            '--petal-size': size,
            '--petal-drift': drift,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
