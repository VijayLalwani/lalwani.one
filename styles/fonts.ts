import localFont from 'next/font/local';

export const departureMono = localFont({
  src: [
    {
      path: '../public/fonts/DepartureMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/DepartureMono-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/DepartureMono-Regular.otf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-departure-mono',
  display: 'swap',
}); 