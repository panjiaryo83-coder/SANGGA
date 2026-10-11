import { useState } from 'react';

export default function MayaSimulasi() {
  const [showResult, setShowResult] = useState(false);
  const [running, setRunning] = useState(false);

  const run = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setShowResult(true);
    }, 1800);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      {/* Simulation label */}
      <div className="flex items-center gap-2 mb-6">
        <span className="badge-sim badge">SIMULASI</span>
        <span className="text-xs" style={{ color: '#8B6914' }}>Tidak menyebabkan mobilisasi nyata</span>
      </div>

      <div className="mb-8">
        <h1 className="font-display text-2xl font-700 mb-2" style={{ color: '#17211B' }}>Temukan gap sebelum bencana.</h1>
        <p className="text-sm" style={{ color: '#66736B' }}>Jalankan simulasi untuk memahami kesiapan jaringan Anda sebelum darurat terjadi.</p>
      </div>

      {!showResult ? (
        <>
          {/* Existing simulation */}
          <div className="mb-6 rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid #DDE4DE' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-600 text-base mb-1" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</h3>
                  <p className="text-sm" style={{ color: '#66736B' }}>10 unit dibutuhkan</p>
                </div>
                <span className="badge-sim badge">SIMULASI</span>
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#FFF7E5' }}>
                  <div className="h-full rounded-full" style={{ width: '50%', background: '#FFCC80' }} />
                </div>
                <span className="text-sm font-mono" style={{ color: '#8B6914' }}>5/10</span>
              </div>
              <button
                onClick={run}
                disabled={running}
                className="text-sm font-display font-600 transition-opacity hover:opacity-70 disabled:opacity-50"
                style={{ color: running ? '#66736B' : '#FF7043' }}
              >
                {running ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#FF7043" strokeWidth="2" strokeDasharray="8 8"/></svg>
                    Menjalankan simulasi...
                  </span>
                ) : 'Lihat hasil simulasi →'}
              </button>
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
            style={{ background: '#2E7D32' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            Buat Simulasi
          </button>
        </>
      ) : (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl" style={{ background: '#FFF0EB', border: '1px solid #FFC4B4' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-sim badge">SIMULASI</span>
              <span className="font-display font-600 text-sm" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</span>
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-display font-800 text-5xl" style={{ color: '#D84315', lineHeight: 1 }}>5</span>
              <div>
                <div className="font-display font-600 text-lg" style={{ color: '#17211B' }}>unit</div>
                <div className="text-sm" style={{ color: '#66736B' }}>masih belum terpenuhi</div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#FFC4B4' }}>
                <div className="h-full rounded-full" style={{ width: '50%', background: '#FF7043' }} />
              </div>
              <span className="font-mono text-xs" style={{ color: '#D84315' }}>5/10 terpenuhi</span>
            </div>
          </div>

          {/* Gap analysis */}
          <div>
            <p className="font-display font-600 text-base mb-3" style={{ color: '#17211B' }}>Kenapa ada gap?</p>
            <div className="space-y-2">
              {[
                { text: '3 provider belum siap', color: '#D84315', bg: '#FFF0EB' },
                { text: '2 provider tidak sesuai kebutuhan', color: '#8B6914', bg: '#FFF7E5' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: item.bg }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-sm" style={{ color: item.color }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action plan */}
          <div>
            <p className="font-display font-600 text-base mb-3" style={{ color: '#17211B' }}>Rencana Aksi</p>
            <div className="space-y-2">
              {[
                'Tingkatkan komitmen kapasitas',
                'Perbarui verifikasi provider',
                'Cari provider tambahan',
              ].map((action, i) => (
                <button
                  key={action}
                  className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:shadow-sm"
                  style={{ background: '#fff', border: '1px solid #DDE4DE' }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-700 font-display flex-shrink-0" style={{ background: '#EAF4E7', color: '#2E7D32' }}>
                    {i + 1}
                  </div>
                  <span className="text-sm flex-1" style={{ color: '#17211B' }}>{action}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#DDE4DE' }}>
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl text-center" style={{ background: '#FFF7E5', border: '1px solid #FFCC80' }}>
            <p className="text-xs" style={{ color: '#8B6914' }}>
              ⚠️ <strong>Simulasi ini tidak menyebabkan mobilisasi nyata.</strong> Data digunakan untuk perencanaan saja.
            </p>
          </div>

          <button
            onClick={() => setShowResult(false)}
            className="w-full py-3 rounded-xl font-display font-600 text-sm transition-all"
            style={{ border: '1.5px solid #DDE4DE', color: '#66736B' }}
          >
            Kembali ke daftar simulasi
          </button>
        </div>
      )}
    </div>
  );
}
