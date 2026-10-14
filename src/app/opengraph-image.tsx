import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';
import { features } from '@/config/features';
import { landingMeta } from '@/lib/data/landing';

const ogText = features.onePage
  ? {
      name: landingMeta.name,
      title: landingMeta.ogSubtitle,
      subtitle: 'Por David y Jorge, fisioterapeutas',
    }
  : {
      name: siteConfig.name,
      title: 'Fisioterapia y Rehabilitación en Arganzuela, Madrid',
      subtitle: 'Tratamientos personalizados con un equipo especializado',
    };

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: 'linear-gradient(135deg, #2C4A3E 0%, #1A2C26 100%)',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
            <path
              d="M18 34h6.5l3.5-9 6 18 4-13.5 2.5 4.5H46"
              stroke="#FAF9F7"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        <span style={{ fontSize: 32, color: '#FAF9F7', fontWeight: 600 }}>{ogText.name}</span>
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 56,
          fontWeight: 700,
          color: '#FFFFFF',
          lineHeight: 1.15,
          maxWidth: 980,
        }}
      >
        {ogText.title}
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 28,
          fontSize: 28,
          color: 'rgba(255,255,255,0.75)',
        }}
      >
        {ogText.subtitle}
      </div>
    </div>,
    { ...size },
  );
}
