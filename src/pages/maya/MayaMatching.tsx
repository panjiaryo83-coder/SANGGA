import { useState } from 'react';
import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; }

const recommendations = [
  {
    name: 'PT Nusantara Logistics',
    match: true,
    trucks: 3,
    mobilization: '3 jam',
    region: 'Jabodetabek',
    reasons: [
      { text: 'Kapasitas sesuai', ok: true },
      { text: 'Wilayah sesuai', ok: true },
      { text: 'Status kesiapan masih valid', ok: true },
      { text: 'Waktu mobilisasi sesuai', ok: true },
    ],
  },
  {
    name: 'PT Amanah Transport',
    match: true,
    trucks: 2,
    mobilization: '4 jam',
    region: 'Jawa Barat',
    reasons: [
      { text: 'Kapasitas sesuai', ok: true },
      { text: 'Wilayah sesuai', ok: true },
      { text: 'Status kesiapan masih valid', ok: true },
      { text: 'Waktu mobilisasi sedikit melebihi target', ok: false },
    ],
  },
  {
    name: 'Logistik Cepat',
    match: false,
    trucks: 2,
    mobilization: '8 jam',
    region: 'Jakarta',
    reasons: [
      { text: 'Kapasitas sesuai', ok: true },
      { text: 'Wilayah kurang sesuai', ok: false },
      { text: 'Waktu mobilisasi terlalu lama', ok: false },
      { text: 'Kesiapan perlu diperbarui', ok: false },
    ],
  },
];

export default function MayaMatching({ onNavigate }: Props) {
  const { state, dispatch } = useApp();
  const [openReason, setOpenReason] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(state.mission.status === 'pending_auth' || state.mission.status === 'authorized' || state.mission.status === 'in_progress' || state.mission.status === 'completed');

  const submitForAuth = () => {
    dispatch({ type: 'SUBMIT_FOR_AUTH' });
    setSubmitted(true);
  };

  const totalMatched = recommendations.filter(r => r.match).reduce((acc, r) => acc + r.trucks, 0);
  const missionTotal = state.mission.needed;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => onNavigate('needs')} className="p-2 rounded-lg hover:bg-gray-50 transition-all" style={{ color: '#66736B' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 16l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        <div>
          <h1 className="font-display text-xl font-700" style={{ color: '#17211B' }}>Rekomendasi Kapasitas</h1>
          <p className="text-sm" style={{ color: '#66736B' }}>Respons Banjir · Bekasi</p>
        </div>
      </div>

      {/* Context note */}
      <div className="flex items-start gap-3 p-4 rounded-xl mb-6" style={{ background: '#FFF7E5', border: '1px solid #FFCC80' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
          <circle cx="8" cy="8" r="6.5" stroke="#8B6914" strokeWidth="1.5"/>
          <path d="M8 5v4M8 10.5v1" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p className="text-xs" style={{ color: '#8B6914' }}>
          <strong>Pencocokan adalah rekomendasi.</strong> Aktivasi memerlukan otorisasi dari Otoritas Aktivasi.
        </p>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between p-4 rounded-xl mb-6" style={{ background: '#EAF4E7' }}>
        <div>
          <p className="font-display font-600 text-sm" style={{ color: '#17211B' }}>{totalMatched} unit dapat dipenuhi</p>
          <p className="text-xs mt-0.5" style={{ color: '#66736B' }}>dari {missionTotal} unit yang dibutuhkan</p>
        </div>
        <div className="font-display font-700 text-2xl" style={{ color: '#2E7D32' }}>{totalMatched}/{missionTotal}</div>
      </div>

      {/* Recommendation list */}
      <div className="space-y-4 mb-8">
        {recommendations.map(rec => (
          <div
            key={rec.name}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#fff', border: `1px solid ${rec.match ? '#DDE4DE' : '#EFCFC9'}` }}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-700 font-display flex-shrink-0"
                    style={{ background: rec.match ? '#EAF4E7' : '#F0F4F0', color: rec.match ? '#2E7D32' : '#66736B' }}
                  >
                    {rec.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-display font-600 text-sm" style={{ color: '#17211B' }}>{rec.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {rec.match ? (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2E7D32' }} />
                          <span className="text-xs" style={{ color: '#2E7D32' }}>Memenuhi kebutuhan</span>
                        </>
                      ) : (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#66736B' }} />
                          <span className="text-xs" style={{ color: '#66736B' }}>Tidak memenuhi</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <span className="font-display font-700 text-lg" style={{ color: rec.match ? '#2E7D32' : '#66736B' }}>
                  {rec.trucks} truk
                </span>
              </div>
              <div className="flex gap-4 text-xs mb-3" style={{ color: '#66736B' }}>
                <span>Mobilisasi {rec.mobilization}</span>
                <span>{rec.region}</span>
              </div>
              <button
                onClick={() => setOpenReason(openReason === rec.name ? null : rec.name)}
                className="text-xs font-display font-600 transition-opacity hover:opacity-70"
                style={{ color: '#2E7D32' }}
              >
                {openReason === rec.name ? 'Sembunyikan alasan ↑' : 'Lihat alasan →'}
              </button>

              {openReason === rec.name && (
                <div className="mt-4 p-3 rounded-xl" style={{ background: '#FAFAF8' }}>
                  <p className="text-xs font-600 font-display mb-2" style={{ color: '#17211B' }}>Mengapa {rec.match ? 'cocok' : 'tidak cocok'}?</p>
                  <div className="space-y-1.5">
                    {rec.reasons.map(r => (
                      <div key={r.text} className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: r.ok ? '#2E7D32' : '#D84315' }}>
                          {r.ok ? '✓' : '✗'}
                        </span>
                        <span className="text-xs" style={{ color: r.ok ? '#17211B' : '#66736B' }}>{r.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit for auth */}
      {!submitted ? (
        <div className="sticky bottom-4">
          <button
            onClick={submitForAuth}
            className="w-full py-4 rounded-2xl font-display font-700 text-white text-base transition-all hover:opacity-90 hover:shadow-lg"
            style={{ background: '#2E7D32' }}
          >
            Ajukan untuk otorisasi →
          </button>
          <p className="text-center text-xs mt-3" style={{ color: '#66736B' }}>
            Rekomendasi akan dikirim ke Otoritas Aktivasi untuk disetujui.
          </p>
        </div>
      ) : (
        <div className="p-4 rounded-2xl text-center" style={{ background: '#EAF4E7', border: '1px solid #C8E6C9' }}>
          <p className="font-display font-600 text-sm" style={{ color: '#2E7D32' }}>✓ Diajukan ke otoritas</p>
          <p className="text-xs mt-1" style={{ color: '#66736B' }}>Menunggu persetujuan dari Raka Pratama</p>
        </div>
      )}
    </div>
  );
}
