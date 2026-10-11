import { useState } from 'react';
import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; }

function ReadinessRiver({ onClick }: { onClick: () => void }) {
  const stages = [
    { label: 'Nominal', value: 152, pct: 1.0, color: '#C8E6C9', textColor: '#388E3C' },
    { label: 'Terkomitmen', value: 128, pct: 0.84, color: '#81C784', textColor: '#2E7D32' },
    { label: 'Siap Saat Ini', value: 103, pct: 0.68, color: '#4CAF50', textColor: '#fff' },
    { label: 'Siap Aktivasi', value: 87, pct: 0.57, color: '#2E7D32', textColor: '#fff' },
  ];

  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl overflow-hidden transition-all hover:shadow-lg"
      style={{ background: '#fff', border: '1px solid #DDE4DE' }}
      onMouseEnter={() => {}}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: '#66736B' }}>Jalur Kesiapan</p>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-800" style={{ color: '#2E7D32', lineHeight: 1 }}>103</span>
              <div>
                <span className="font-display text-lg font-600" style={{ color: '#17211B' }}>kapasitas</span>
                <p className="text-xs mt-0.5" style={{ color: '#66736B' }}>siap aktivasi</p>
              </div>
            </div>
            <p className="text-sm mt-1" style={{ color: '#66736B' }}>dari 128 kapasitas terkomitmen</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="px-2.5 py-1 rounded-full font-mono text-xs font-500" style={{ background: '#EAF4E7', color: '#2E7D32' }}>
              80.5% terkomitmen
            </div>
            <p className="text-xs" style={{ color: '#66736B' }}>Klik untuk detail →</p>
          </div>
        </div>

        {/* River visualization */}
        <div className="flex items-end gap-3">
          {stages.map((stage, i) => (
            <div
              key={stage.label}
              className="flex-1 flex flex-col items-center gap-2 cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="font-display font-700 text-sm" style={{ color: stage.textColor === '#fff' ? stage.color : stage.textColor }}>
                {stage.value}
              </div>
              <div
                className="w-full rounded-t-lg transition-all"
                style={{
                  height: `${stage.pct * 80}px`,
                  background: stage.color,
                  opacity: hovered === null || hovered === i ? 1 : 0.5,
                  transform: hovered === i ? 'scaleY(1.05)' : 'scaleY(1)',
                  transformOrigin: 'bottom',
                }}
              />
              <p className="text-center font-body" style={{ color: '#66736B', fontSize: 10, lineHeight: 1.3 }}>{stage.label}</p>
            </div>
          ))}
        </div>

        {/* Arrow path */}
        <div className="flex items-center justify-between mt-3 px-2">
          {[0, 1, 2].map(i => (
            <svg key={i} width="24" height="12" viewBox="0 0 24 12" fill="none" className="flex-shrink-0">
              <path d="M2 6h16M14 2l6 4-6 4" stroke="#DDE4DE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ))}
        </div>
      </div>
    </button>
  );
}

function ReadinessDetail({ onClose }: { onClose: () => void }) {
  const items = [
    { label: 'Kapasitas Nominal', value: 152, note: 'Total kapasitas terdaftar', color: '#C8E6C9' },
    { label: 'Kapasitas Terkomitmen', value: 128, note: '84.2% dari nominal', color: '#81C784' },
    { label: 'Siap Saat Ini', value: 103, note: '80.5% dari terkomitmen', color: '#4CAF50' },
    { label: 'Siap Aktivasi', value: 87, note: 'Terverifikasi & tersedia', color: '#2E7D32' },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ background: '#fff' }}>
        <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid #DDE4DE' }}>
          <h3 className="font-display font-700 text-lg" style={{ color: '#17211B' }}>Rincian Kesiapan</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-50 transition-all" style={{ color: '#66736B' }}>✕</button>
        </div>
        <div className="p-5 space-y-3">
          {items.map((item, i) => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ background: item.color }} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-500" style={{ color: '#17211B' }}>{item.label}</span>
                  <span className="font-display font-700 text-lg" style={{ color: '#17211B' }}>{item.value}</span>
                </div>
                <div className="w-full h-1.5 rounded-full mt-1.5 overflow-hidden" style={{ background: '#EAF4E7' }}>
                  <div className="h-full rounded-full" style={{ width: `${(item.value / 152) * 100}%`, background: item.color }} />
                </div>
                <p className="text-xs mt-1" style={{ color: '#66736B' }}>{item.note}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 pb-5">
          <button onClick={onClose} className="w-full py-3 rounded-xl font-display font-600 text-sm transition-all" style={{ background: '#EAF4E7', color: '#2E7D32' }}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MayaHome({ onNavigate }: Props) {
  const { state } = useApp();
  const [showDetail, setShowDetail] = useState(false);
  const [showVerifHistory, setShowVerifHistory] = useState(false);

  const missionCreated = state.mission.status !== 'none';
  const confirmedTrucks = state.mission.confirmedByAndi;
  const missionStatus = state.mission.status;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      {showDetail && <ReadinessDetail onClose={() => setShowDetail(false)} />}

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 mb-1" style={{ color: '#17211B' }}>
          Selamat pagi, Maya 👋
        </h1>
        <p className="text-xl font-display font-600" style={{ color: '#2E7D32' }}>Jaringan Anda siap.</p>
        <p className="text-sm mt-1" style={{ color: '#66736B' }}>Tidak ada gangguan yang perlu ditindak segera.</p>
      </div>

      {/* Primary CTA */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => onNavigate('create-need')}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90 hover:shadow-lg"
          style={{ background: '#2E7D32' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          Buat Kebutuhan
        </button>
        <button
          onClick={() => onNavigate('network')}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-display font-600 text-sm transition-all hover:bg-green-light"
          style={{ border: '1.5px solid #DDE4DE', color: '#2E7D32', background: '#fff' }}
        >
          Perbarui Kesiapan
        </button>
      </div>

      {/* Readiness River */}
      <div className="mb-6">
        <ReadinessRiver onClick={() => setShowDetail(true)} />
      </div>

      {/* Quick stats */}
      <div className="flex gap-3 mb-8">
        {[
          { value: '103', label: 'siap', color: '#2E7D32', bg: '#EAF4E7' },
          { value: missionCreated ? '1' : '3', label: 'kebutuhan aktif', color: '#8B6914', bg: '#FFF7E5' },
          { value: '2', label: 'perlu perhatian', color: '#D84315', bg: '#FFF0EB' },
        ].map(stat => (
          <div key={stat.label} className="flex-1 px-4 py-3 rounded-xl" style={{ background: stat.bg }}>
            <div className="font-display font-700 text-2xl" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs mt-0.5 font-body" style={{ color: stat.color, opacity: 0.8 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mission status — shown after mission created */}
      {missionCreated && (
        <div className="mb-6 rounded-2xl overflow-hidden" style={{ border: '1px solid #DDE4DE', background: '#fff' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #DDE4DE' }}>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display font-600 text-base" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</h3>
              <span className="badge" style={{
                background: missionStatus === 'completed' ? '#EAF4E7' : missionStatus === 'in_progress' ? '#FFF7E5' : '#FFF0EB',
                color: missionStatus === 'completed' ? '#2E7D32' : missionStatus === 'in_progress' ? '#8B6914' : '#D84315',
              }}>
                {missionStatus === 'completed' ? 'SELESAI' : missionStatus === 'in_progress' ? 'DALAM PEMENUHAN' : 'PERLU DIPENUHI'}
              </span>
            </div>
            <p className="text-sm" style={{ color: '#66736B' }}>10 unit dibutuhkan</p>
          </div>
          <div className="px-5 py-4">
            {missionStatus === 'completed' ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#EAF4E7' }}>
                    <div className="h-full rounded-full" style={{ width: `${(confirmedTrucks / 10) * 100}%`, background: '#2E7D32' }} />
                  </div>
                  <span className="text-sm font-display font-600" style={{ color: '#2E7D32' }}>{confirmedTrucks}/10 terpenuhi</span>
                </div>
                <p className="text-sm mb-3" style={{ color: '#D84315' }}>{10 - confirmedTrucks} unit masih belum terpenuhi</p>
                <button
                  onClick={() => onNavigate('matching')}
                  className="text-sm font-display font-600 transition-opacity hover:opacity-70"
                  style={{ color: '#FF7043' }}
                >
                  Cari kapasitas tambahan →
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#EAF4E7' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${(confirmedTrucks / 10) * 100}%`, background: '#2E7D32' }} />
                  </div>
                  <span className="text-sm font-display font-600" style={{ color: '#17211B' }}>{confirmedTrucks}/10</span>
                </div>
                <button
                  onClick={() => onNavigate('needs')}
                  className="text-sm font-display font-600 transition-opacity hover:opacity-70"
                  style={{ color: '#2E7D32' }}
                >
                  Lihat kebutuhan →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Perlu Perhatian */}
      {!missionCreated && (
        <section className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: '#66736B' }}>Perlu Perhatian</p>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #FFC4B4', background: '#FFF0EB' }}>
            <div className="px-5 py-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#FF7043' }} />
                    <h3 className="font-display font-600 text-sm" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</h3>
                  </div>
                  <div className="flex gap-4 text-sm" style={{ color: '#66736B' }}>
                    <span>5 unit dibutuhkan</span>
                    <span>3 unit tersedia</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#FFC4B4' }}>
                  <div className="h-full rounded-full" style={{ width: '60%', background: '#FF7043' }} />
                </div>
                <span className="text-sm font-mono" style={{ color: '#D84315' }}>2 perlu dipenuhi</span>
              </div>
              <button
                onClick={() => onNavigate('needs')}
                className="text-sm font-display font-600 transition-opacity hover:opacity-70"
                style={{ color: '#FF7043' }}
              >
                Lihat kebutuhan →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Aktivitas Terbaru */}
      <section className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#66736B' }}>Aktivitas Terbaru</p>
        <div className="space-y-0">
          {[
            ...(state.mission.timelineEvents.length > 0
              ? state.mission.timelineEvents.slice(-2).reverse().map((ev, i) => ({
                  text: ev,
                  sub: 'Respons Banjir · Bekasi',
                  time: i === 0 ? 'Baru saja' : '10 menit lalu',
                  dot: '#2E7D32',
                }))
              : []),
            { text: '3 truk dikonfirmasi', sub: 'PT Nusantara Logistics', time: '10 menit lalu', dot: '#2E7D32' },
            { text: 'Kesiapan diperbarui', sub: 'PT Amanah Transport', time: '1 jam lalu', dot: '#4CAF50' },
          ].slice(0, 4).map((item, i) => (
            <div key={i} className="flex gap-4 py-3" style={{ borderBottom: i < 3 ? '1px solid #F0F4F0' : 'none' }}>
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.dot }} />
                {i < 3 && <div className="w-px flex-1 mt-1" style={{ background: '#DDE4DE', minHeight: 20 }} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: '#17211B' }}>{item.text}</p>
                <p className="text-xs mt-0.5" style={{ color: '#66736B' }}>{item.sub} · {item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rekomendasi Penyedia */}
      <section className="mb-4">
        <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#66736B' }}>Rekomendasi Penyedia</p>
        <div className="space-y-3">
          {[
            { name: 'PT Nusantara Logistics', capacity: '3 truk tersedia', region: 'Jabodetabek', time: '3 jam', status: 'SIAP', statusColor: '#2E7D32', statusBg: '#EAF4E7' },
            { name: 'PT Amanah Transport', capacity: '2 truk tersedia', region: 'Jawa Barat', time: '4 jam', status: 'SIAP', statusColor: '#2E7D32', statusBg: '#EAF4E7' },
            { name: 'ColdChain Solutions', capacity: '6 kendaraan', region: 'Jabodetabek', time: '5 jam', status: 'TERBATAS', statusColor: '#8B6914', statusBg: '#FFF7E5' },
          ].map(provider => (
            <button
              key={provider.name}
              onClick={() => onNavigate('network')}
              className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all hover:shadow-md"
              style={{ background: '#fff', border: '1px solid #DDE4DE' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-700 font-display flex-shrink-0" style={{ background: '#EAF4E7', color: '#2E7D32' }}>
                {provider.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-display font-600 text-sm truncate" style={{ color: '#17211B' }}>{provider.name}</span>
                  <span className="badge flex-shrink-0" style={{ background: provider.statusBg, color: provider.statusColor }}>{provider.status}</span>
                </div>
                <p className="text-xs" style={{ color: '#66736B' }}>{provider.capacity} · {provider.region} · {provider.time}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#DDE4DE', flexShrink: 0 }}>
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
