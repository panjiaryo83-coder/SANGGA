import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; }

export default function RakaHome({ onNavigate }: Props) {
  const { state } = useApp();
  const pendingCount = state.mission.status === 'pending_auth' ? 1 : 0;
  const authorizedCount = state.mission.status === 'authorized' || state.mission.status === 'in_progress' || state.mission.status === 'completed' ? 1 : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 mb-1" style={{ color: '#17211B' }}>
          Selamat pagi, Raka 👋
        </h1>
        {pendingCount > 0 ? (
          <p className="text-xl font-display font-600" style={{ color: '#FF7043' }}>
            {pendingCount} kebutuhan menunggu tindakan.
          </p>
        ) : (
          <p className="text-xl font-display font-600" style={{ color: '#2E7D32' }}>
            Semua kebutuhan telah ditindaklanjuti.
          </p>
        )}
        <p className="text-sm mt-1" style={{ color: '#66736B' }}>
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Action summary */}
      <div className="flex gap-3 mb-8">
        {[
          { value: pendingCount.toString(), label: 'perlu tindakan', color: '#D84315', bg: '#FFF0EB' },
          { value: authorizedCount.toString(), label: 'disetujui', color: '#2E7D32', bg: '#EAF4E7' },
          { value: '2', label: 'berjalan', color: '#8B6914', bg: '#FFF7E5' },
        ].map(stat => (
          <div key={stat.label} className="flex-1 px-4 py-3 rounded-xl" style={{ background: stat.bg }}>
            <div className="font-display font-700 text-2xl" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs mt-0.5 font-body" style={{ color: stat.color, opacity: 0.8 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Perlu Tindakan */}
      {pendingCount > 0 && (
        <section className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#66736B' }}>Perlu Tindakan</p>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1.5px solid #FFC4B4' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid #FFF0EB' }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#FF7043' }} />
                    <h3 className="font-display font-600 text-base" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</h3>
                  </div>
                  <div className="flex gap-4 text-sm" style={{ color: '#66736B' }}>
                    <span>10 unit dibutuhkan</span>
                    <span>5 unit tersedia</span>
                  </div>
                </div>
                <span className="badge" style={{ background: '#FFF0EB', color: '#D84315' }}>MENUNGGU</span>
              </div>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <p className="text-sm" style={{ color: '#66736B' }}>Rekomendasi kapasitas tersedia</p>
              <button
                onClick={() => onNavigate('approval')}
                className="px-4 py-2 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
                style={{ background: '#FF7043' }}
              >
                Tinjau rekomendasi →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Menunggu Persetujuan */}
      <section className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#66736B' }}>
          {pendingCount > 0 ? 'Kebutuhan Lain' : 'Perlu Tindakan'}
        </p>
        <div className="space-y-3">
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid #F0F4F0' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-600 text-base mb-1" style={{ color: '#17211B' }}>Respons Longsor · Bogor</h3>
                  <div className="flex gap-4 text-sm" style={{ color: '#66736B' }}>
                    <span>8 unit dibutuhkan</span>
                    <span>6 unit tersedia</span>
                  </div>
                </div>
                <span className="badge" style={{ background: '#FFF7E5', color: '#8B6914' }}>DALAM PEMENUHAN</span>
              </div>
            </div>
            <div className="px-5 py-3">
              <button onClick={() => onNavigate('incoming')} className="text-sm font-display font-600 transition-opacity hover:opacity-70" style={{ color: '#FF7043' }}>
                Tinjau rekomendasi →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Aktivasi Berjalan */}
      {authorizedCount > 0 && (
        <section className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#66736B' }}>Aktivasi Berjalan</p>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid #F0F4F0' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-600 text-base mb-1" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</h3>
                  <p className="text-sm" style={{ color: '#66736B' }}>
                    {state.mission.confirmedByAndi > 0
                      ? `${state.mission.confirmedByAndi} truk dikonfirmasi`
                      : 'Menunggu konfirmasi provider'}
                  </p>
                </div>
                <span className="badge" style={{ background: '#EAF4E7', color: '#2E7D32' }}>
                  {state.mission.status === 'completed' ? 'SELESAI' : 'BERJALAN'}
                </span>
              </div>
            </div>
            <div className="px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#EAF4E7' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(state.mission.confirmedByAndi / 10) * 100}%`, background: '#2E7D32' }}
                  />
                </div>
                <span className="font-mono text-xs" style={{ color: '#66736B' }}>{state.mission.confirmedByAndi}/10</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick actions */}
      <div className="flex gap-3">
        <button
          onClick={() => onNavigate('incoming')}
          className="flex-1 py-3 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
          style={{ background: '#FF7043' }}
        >
          Kebutuhan Masuk
        </button>
        <button
          onClick={() => onNavigate('history')}
          className="flex-1 py-3 rounded-xl font-display font-600 text-sm transition-all"
          style={{ border: '1.5px solid #DDE4DE', color: '#66736B', background: '#fff' }}
        >
          Riwayat Aktivasi
        </button>
      </div>
    </div>
  );
}
