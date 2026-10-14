import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#2C4A3E',
        borderRadius: 40,
      }}
    >
      <svg width="96" height="96" viewBox="0 0 64 64" fill="none">
        <path
          d="M18 34h6.5l3.5-9 6 18 4-13.5 2.5 4.5H46"
          stroke="#FAF9F7"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>,
    { ...size },
  );
}
