import { useState } from 'react';
import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; }

export default function RakaPersetujuan({ onNavigate }: Props) {
  const { state, dispatch } = useApp();
  const [step, setStep] = useState<'review' | 'confirm' | 'approved'>(
    ['authorized', 'in_progress', 'completed'].includes(state.mission.status) ? 'approved' : 'review'
  );

  const approve = () => {
    dispatch({ type: 'APPROVE_ACTIVATION' });
    setStep('approved');
  };

  if (step === 'approved') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-700 mb-1" style={{ color: '#17211B' }}>Persetujuan</h1>
          <p className="text-sm" style={{ color: '#66736B' }}>Status persetujuan aktivasi.</p>
        </div>

        <div className="rounded-2xl overflow-hidden mb-6" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
          <div className="p-5" style={{ borderBottom: '1px solid #F0F4F0', background: '#EAF4E7' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#2E7D32' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <p className="font-display font-600 text-base" style={{ color: '#17211B' }}>Permintaan aktivasi telah disetujui.</p>
                <p className="text-xs" style={{ color: '#66736B' }}>Disetujui oleh Raka Pratama · Baru saja</p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="mb-4">
              <h3 className="font-display font-600 text-sm mb-3" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</h3>
              <div className="space-y-2">
                {[
                  { name: 'PT Nusantara Logistics', trucks: 3, color: '#2E7D32' },
                  { name: 'PT Amanah Transport', trucks: 2, color: '#2E7D32' },
                ].map(p => (
                  <div key={p.name} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #F0F4F0' }}>
                    <span className="text-sm" style={{ color: '#17211B' }}>{p.name}</span>
                    <span className="font-mono text-sm font-500" style={{ color: p.color }}>{p.trucks} truk</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm" style={{ color: '#66736B' }}>
              {state.mission.confirmedByAndi > 0
                ? `${state.mission.confirmedByAndi} truk telah dikonfirmasi oleh provider.`
                : 'Provider sedang dinotifikasi dan menunggu konfirmasi.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="w-full py-3 rounded-xl font-display font-600 text-sm transition-all"
          style={{ border: '1.5px solid #DDE4DE', color: '#66736B' }}
        >
          ← Kembali ke beranda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex items-center gap-3 mb-6">
        {step === 'confirm' && (
          <button onClick={() => setStep('review')} className="p-2 rounded-lg hover:bg-gray-50 transition-all" style={{ color: '#66736B' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 16l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        )}
        <div>
          <h1 className="font-display text-2xl font-700" style={{ color: '#17211B' }}>
            {step === 'review' ? 'Tinjau Rekomendasi' : 'Persetujuan Aktivasi'}
          </h1>
          <p className="text-sm" style={{ color: '#66736B' }}>Respons Banjir · Bekasi</p>
        </div>
      </div>

      {step === 'review' && (
        <>
          {/* Context */}
          <div className="p-4 rounded-xl mb-6" style={{ background: '#FFF7E5', border: '1px solid #FFCC80' }}>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Dibutuhkan', value: '10 truk' },
                { label: 'Tersedia', value: '5 truk' },
                { label: 'Gap', value: '5 truk' },
              ].map(item => (
                <div key={item.label}>
                  <div className="font-display font-700 text-lg" style={{ color: '#17211B' }}>{item.value}</div>
                  <div className="text-xs" style={{ color: '#66736B' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Provider recommendations */}
          <div className="mb-6">
            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: '#66736B' }}>Kapasitas Direkomendasikan</p>
            <div className="space-y-3">
              {[
                { name: 'PT Nusantara Logistics', trucks: 3, time: '3 jam', region: 'Jabodetabek' },
                { name: 'PT Amanah Transport', trucks: 2, time: '4 jam', region: 'Jawa Barat' },
              ].map(p => (
                <div key={p.name} className="p-4 rounded-xl" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-600 text-sm" style={{ color: '#17211B' }}>{p.name}</span>
                    <span className="font-display font-700 text-base" style={{ color: '#2E7D32' }}>{p.trucks} truk</span>
                  </div>
                  <div className="flex gap-3 text-xs" style={{ color: '#66736B' }}>
                    <span>Mobilisasi {p.time}</span>
                    <span>{p.region}</span>
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2E7D32' }} />
                      SIAP
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 p-4 rounded-xl flex items-center justify-between" style={{ background: '#EAF4E7' }}>
              <span className="font-display font-600 text-sm" style={{ color: '#2E7D32' }}>5 unit dapat dipenuhi</span>
              <span className="text-sm" style={{ color: '#66736B' }}>dari 10 yang dibutuhkan</span>
            </div>
          </div>

          <button
            onClick={() => setStep('confirm')}
            className="w-full py-4 rounded-2xl font-display font-700 text-white transition-all hover:opacity-90"
            style={{ background: '#FF7043' }}
          >
            Ajukan untuk otorisasi →
          </button>
        </>
      )}

      {step === 'confirm' && (
        <>
          <div className="p-4 rounded-xl mb-6" style={{ background: '#FFF0EB', border: '1px solid #FFC4B4' }}>
            <p className="text-xs mb-1" style={{ color: '#D84315' }}>⚠️ Tindakan ini akan mengaktifkan kapasitas.</p>
            <p className="text-xs" style={{ color: '#66736B' }}>Setelah disetujui, provider akan menerima notifikasi dan diminta mengkonfirmasi kapasitas mereka.</p>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid #F0F4F0' }}>
              <h3 className="font-display font-600 text-base" style={{ color: '#17211B' }}>Ringkasan Persetujuan</h3>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                { label: 'Misi', value: 'Respons Banjir · Bekasi' },
                { label: 'Diajukan oleh', value: 'Maya Putri' },
                { label: 'Provider 1', value: 'PT Nusantara Logistics — 3 truk' },
                { label: 'Provider 2', value: 'PT Amanah Transport — 2 truk' },
                { label: 'Total kapasitas', value: '5 truk' },
                { label: 'Target waktu', value: 'Hari ini 14.00' },
              ].map(row => (
                <div key={row.label} className="flex items-start justify-between">
                  <span className="text-sm" style={{ color: '#66736B' }}>{row.label}</span>
                  <span className="text-sm font-500 text-right max-w-44" style={{ color: '#17211B' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={approve}
            className="w-full py-4 rounded-2xl font-display font-700 text-white transition-all hover:opacity-90 hover:shadow-lg"
            style={{ background: '#2E7D32' }}
          >
            ✓ Setujui Aktivasi
          </button>
          <p className="text-center text-xs mt-3" style={{ color: '#66736B' }}>
            Tindakan ini akan dicatat dan dikirim ke semua pihak terkait.
          </p>
        </>
      )}
    </div>
  );
}
