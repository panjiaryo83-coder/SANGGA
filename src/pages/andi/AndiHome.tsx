import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; }

export default function AndiHome({ onNavigate }: Props) {
  const { state } = useApp();
  const hasRequest = state.andiRequest.status !== 'none';
  const requestStatus = state.andiRequest.status;
  const isActive = ['confirmed', 'dispatched', 'arrived', 'completed'].includes(requestStatus);

  const readinessLabel = state.andiPostMission === 'needs_update' ? 'PERLU DIPERBARUI' : 'SIAP';
  const readinessBg = state.andiPostMission === 'needs_update' ? '#FFF0EB' : '#EAF4E7';
  const readinessColor = state.andiPostMission === 'needs_update' ? '#D84315' : '#2E7D32';
  const readinessBorder = state.andiPostMission === 'needs_update' ? '#FFC4B4' : '#C8E6C9';

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 mb-1" style={{ color: '#17211B' }}>
          Selamat pagi, Andi 👋
        </h1>
        <p className="text-base" style={{ color: '#66736B' }}>Apakah sumber daya Anda siap digunakan?</p>
      </div>

      {/* Readiness status — hero */}
      <div
        className="rounded-2xl p-6 mb-6 transition-all"
        style={{ background: readinessBg, border: `2px solid ${readinessBorder}` }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ background: readinessColor }} />
              <span className="font-mono text-sm font-500" style={{ color: readinessColor }}>{readinessLabel}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-800" style={{ color: '#17211B', lineHeight: 1 }}>
                {state.andiPostMission === 'needs_update' ? '0' : '3'}
              </span>
              <span className="font-display text-lg font-600" style={{ color: '#17211B' }}>truk tersedia</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('capacity')}
            className="px-4 py-2 rounded-xl font-display font-600 text-sm transition-all hover:opacity-90"
            style={{ background: readinessColor, color: '#fff' }}
          >
            Perbarui kesiapan
          </button>
        </div>

        <div className="flex gap-4 flex-wrap">
          {[
            { label: '5 truk terkomitmen' },
            { label: 'Jabodetabek' },
            { label: 'Mobilisasi 3 jam' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ background: readinessColor, opacity: 0.5 }} />
              <span className="text-sm" style={{ color: '#66736B' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* New request */}
      {hasRequest && !isActive && (
        <section className="mb-6">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: '#66736B' }}>Permintaan Baru</p>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1.5px solid #FFC4B4' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid #FFF0EB', background: '#FFF0EB' }}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-600 text-base" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</h3>
                <span className="badge" style={{ background: '#FFF0EB', color: '#D84315', border: '1px solid #FFC4B4' }}>BARU</span>
              </div>
              <p className="text-sm" style={{ color: '#66736B' }}>
                {state.andiRequest.trucksRequested} truk dibutuhkan
              </p>
            </div>
            <div className="px-5 py-4">
              <div className="flex gap-4 text-sm mb-4" style={{ color: '#66736B' }}>
                <span>Mobilisasi maksimal 3 jam</span>
                <span>Hari ini · 14.00</span>
              </div>
              <button
                onClick={() => onNavigate('requests')}
                className="w-full py-3 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
                style={{ background: '#FF7043' }}
              >
                Lihat permintaan →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Active mission */}
      {isActive && (
        <section className="mb-6">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: '#66736B' }}>Aktivasi Berjalan</p>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid #F0F4F0' }}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-600 text-base" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</h3>
                <span className="badge" style={{
                  background: requestStatus === 'completed' ? '#EAF4E7' : '#FFF7E5',
                  color: requestStatus === 'completed' ? '#2E7D32' : '#8B6914',
                }}>
                  {requestStatus === 'completed' ? 'SELESAI' :
                   requestStatus === 'arrived' ? 'TIBA' :
                   requestStatus === 'dispatched' ? 'DIKIRIM' : 'DALAM PERSIAPAN'}
                </span>
              </div>
              <p className="text-sm" style={{ color: '#66736B' }}>
                {state.andiRequest.trucksConfirmed} truk dikonfirmasi
              </p>
            </div>
            <div className="px-5 py-3">
              <button
                onClick={() => onNavigate('tracking')}
                className="text-sm font-display font-600 transition-opacity hover:opacity-70"
                style={{ color: '#2E7D32' }}
              >
                Pantau aktivasi →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Post-mission CTA */}
      {state.andiPostMission === 'needs_update' && (
        <div className="p-4 rounded-2xl" style={{ background: '#FFF0EB', border: '1.5px solid #FFC4B4' }}>
          <p className="font-display font-600 text-sm mb-1" style={{ color: '#D84315' }}>Perbarui kesiapan sumber daya Anda</p>
          <p className="text-sm mb-3" style={{ color: '#66736B' }}>3 truk baru saja digunakan dalam misi. Konfirmasi kesiapan untuk misi berikutnya.</p>
          <button
            onClick={() => onNavigate('capacity')}
            className="px-4 py-2 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
            style={{ background: '#FF7043' }}
          >
            Perbarui sekarang
          </button>
        </div>
      )}
    </div>
  );
}
