'use client';

import Link from 'next/link';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

export default function CheckEmailPage() {
  const { language } = useMarketingLocale();
  const isTurkish = language === 'tr';
  return (
    <div className="stack stack-6" style={{ textAlign: 'center' }}>
      <div className="stack stack-3">
        <span className="badge badge-success" style={{ alignSelf: 'center' }}>{isTurkish ? 'E-posta gönderildi' : 'Email sent'}</span>
        <h1 style={{ fontSize: 'var(--text-3xl)' }}>{isTurkish ? 'E-postanızı kontrol edin' : 'Check your email'}</h1>
        <p className="muted">{isTurkish ? 'Bu adres bir hesaba bağlıysa güvenli giriş bağlantısını e-postanıza gönderdik. Devam etmek için bağlantıyı açın.' : "If this address is linked to an account, we've sent a secure sign-in link. Open the link in your email to continue."}</p>
      </div>
      <div className="card stack stack-3" style={{ textAlign: 'left', background: 'var(--color-accent-soft)', border: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: 'var(--text-xl)' }}>{isTurkish ? 'E-posta gelmedi mi?' : 'Nothing arrived?'}</h2>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li>{isTurkish ? 'İstenmeyen e-posta klasörünüzü kontrol edin.' : 'Check your spam or junk folder.'}</li>
          <li>{isTurkish ? 'Doğru e-posta adresini girdiğinizden emin olun.' : 'Make sure you entered the correct email address.'}</li>
          <li>{isTurkish ? 'Giriş bağlantısının süresi 10 dakika sonra dolar.' : 'The sign-in link expires after 10 minutes.'}</li>
        </ul>
      </div>
      <Link href="/login" className="btn btn-secondary">{isTurkish ? 'Giriş ekranına dön' : 'Back to sign in'}</Link>
    </div>
  );
}
