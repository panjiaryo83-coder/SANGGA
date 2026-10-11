import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; }

export default function RakaTinjau({ onNavigate }: Props) {
  const { state } = useApp();
  const isPending = state.mission.status === 'pending_auth';
  const isAuthorized = ['authorized', 'in_progress', 'completed'].includes(state.mission.status);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 mb-1" style={{ color: '#17211B' }}>Kebutuhan Masuk</h1>
        <p className="text-sm" style={{ color: '#66736B' }}>Tinjau kebutuhan yang memerlukan tindakan.</p>
      </div>

      {/* Active mission requiring review */}
      {isPending && (
        <div className="mb-4 rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1.5px solid #FFC4B4' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #FFF0EB', background: '#FFF0EB' }}>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display font-600 text-base" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</h3>
              <span className="badge" style={{ background: '#FFF0EB', color: '#D84315', border: '1px solid #FFC4B4' }}>MENUNGGU REVIEW</span>
            </div>
            <p className="text-sm" style={{ color: '#66736B' }}>Dibuat oleh Maya Putri · Baru saja</p>
          </div>
          <div className="px-5 py-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'Dibutuhkan', value: '10 truk' },
                { label: 'Lokasi', value: 'Bekasi' },
                { label: 'Waktu', value: 'Hari ini 14.00' },
                { label: 'Jenis', value: 'Transportasi' },
              ].map(row => (
                <div key={row.label} className="p-3 rounded-xl" style={{ background: '#FAFAF8' }}>
                  <p className="text-xs mb-0.5" style={{ color: '#66736B' }}>{row.label}</p>
                  <p className="text-sm font-500" style={{ color: '#17211B' }}>{row.value}</p>
                </div>
              ))}
            </div>

            {/* Recommendations summary */}
            <div className="mb-4">
              <p className="text-xs font-600 font-display mb-2" style={{ color: '#17211B' }}>Kapasitas yang Direkomendasikan</p>
              <div className="space-y-2">
                {[
                  { name: 'PT Nusantara Logistics', trucks: 3, time: '3 jam' },
                  { name: 'PT Amanah Transport', trucks: 2, time: '4 jam' },
                ].map(p => (
                  <div key={p.name} className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#EAF4E7' }}>
                    <span className="text-sm" style={{ color: '#17211B' }}>{p.name}</span>
                    <div className="text-sm text-right">
                      <span className="font-600" style={{ color: '#2E7D32' }}>{p.trucks} truk</span>
                      <span className="ml-2" style={{ color: '#66736B' }}>· {p.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 rounded-xl flex items-center justify-between" style={{ background: '#EAF4E7' }}>
                <span className="text-sm font-600 font-display" style={{ color: '#2E7D32' }}>Total dapat dipenuhi</span>
                <span className="font-display font-700 text-lg" style={{ color: '#2E7D32' }}>5 unit</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('approval')}
              className="w-full py-3 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
              style={{ background: '#FF7043' }}
            >
              Ajukan untuk otorisasi →
            </button>
          </div>
        </div>
      )}

      {/* Authorized mission */}
      {isAuthorized && (
        <div className="mb-4 rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #F0F4F0' }}>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display font-600 text-base" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</h3>
              <span className="badge" style={{ background: '#EAF4E7', color: '#2E7D32' }}>DISETUJUI</span>
            </div>
            <p className="text-sm" style={{ color: '#66736B' }}>Disetujui oleh Raka Pratama</p>
          </div>
          <div className="px-5 py-3">
            <p className="text-sm" style={{ color: '#66736B' }}>
              {state.mission.confirmedByAndi > 0
                ? `${state.mission.confirmedByAndi} truk dikonfirmasi oleh provider`
                : 'Menunggu konfirmasi dari provider'}
            </p>
          </div>
        </div>
      )}

      {/* Static mission */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #F0F4F0' }}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-600 text-base" style={{ color: '#17211B' }}>Respons Longsor · Bogor</h3>
            <span className="badge" style={{ background: '#FFF7E5', color: '#8B6914' }}>DALAM PEMENUHAN</span>
          </div>
          <p className="text-sm" style={{ color: '#66736B' }}>8 unit dibutuhkan · 6 unit tersedia</p>
        </div>
        <div className="px-5 py-3">
          <button className="text-sm font-display font-600 transition-opacity hover:opacity-70" style={{ color: '#FF7043' }}>
            Tinjau rekomendasi →
          </button>
        </div>
      </div>

      {!isPending && !isAuthorized && (
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#EAF4E7' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-9" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <p className="text-sm" style={{ color: '#66736B' }}>Semua kebutuhan telah ditindaklanjuti.</p>
        </div>
      )}
    </div>
  );
}
