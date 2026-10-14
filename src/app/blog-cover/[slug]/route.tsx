import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';
import { getPostBySlug } from '@/lib/blog';

const GRADIENTS = [
  ['#2C4A3E', '#1A2C26'],
  ['#6B2730', '#3F171D'],
  ['#3D6A58', '#233B32'],
];

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.meta.title ?? siteConfig.name;
  const gradientIndex = slug.length % GRADIENTS.length;
  const [from, to] = GRADIENTS[gradientIndex];

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 64,
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
        fontFamily: 'sans-serif',
      }}
    >
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none" style={{ marginBottom: 24 }}>
        <path
          d="M18 34h6.5l3.5-9 6 18 4-13.5 2.5 4.5H46"
          stroke="#FAF9F7"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div
        style={{
          display: 'flex',
          fontSize: 42,
          fontWeight: 700,
          color: '#FFFFFF',
          lineHeight: 1.2,
          maxWidth: 900,
        }}
      >
        {title}
      </div>
    </div>,
    { width: 1200, height: 750 },
  );
}
