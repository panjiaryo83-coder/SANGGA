export default function MayaAnalitik() {
  const metrics = [
    { label: 'Kapasitas Siap Aktivasi', value: '87', unit: 'unit', change: '+4 minggu ini', positive: true },
    { label: 'Gap Kebutuhan', value: '13%', unit: 'rata-rata', change: '-2% dari bulan lalu', positive: true },
    { label: 'Tingkat Pemenuhan SLA', value: '94%', unit: 'misi', change: '+1% dari bulan lalu', positive: true },
    { label: 'Kesiapan Mitra', value: '8/12', unit: 'mitra aktif', change: '2 perlu perhatian', positive: false },
  ];

  const partnerReadiness = [
    { name: 'PT Nusantara Logistics', pct: 92, status: 'Sangat Baik' },
    { name: 'PT Amanah Transport', pct: 75, status: 'Baik' },
    { name: 'ColdChain Solutions', pct: 61, status: 'Perlu Perhatian' },
    { name: 'Logistik Cepat', pct: 20, status: 'Kritis' },
  ];

  const getReadinessColor = (pct: number) => {
    if (pct >= 80) return '#2E7D32';
    if (pct >= 60) return '#FFCC80';
    if (pct >= 40) return '#FF7043';
    return '#D84315';
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 mb-1" style={{ color: '#17211B' }}>Analitik</h1>
        <p className="text-sm" style={{ color: '#66736B' }}>Kinerja jaringan kesiapan Anda.</p>
      </div>

      {/* Period selector */}
      <div className="flex gap-2 mb-8">
        {['7 Hari', '30 Hari', '3 Bulan'].map((p, i) => (
          <button
            key={p}
            className="px-4 py-2 rounded-full text-sm transition-all"
            style={{
              background: i === 1 ? '#EAF4E7' : '#fff',
              color: i === 1 ? '#2E7D32' : '#66736B',
              border: `1px solid ${i === 1 ? '#2E7D32' : '#DDE4DE'}`,
              fontFamily: i === 1 ? "'Plus Jakarta Sans'" : "'Inter'",
              fontWeight: i === 1 ? 600 : 400,
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {metrics.map(m => (
          <div key={m.label} className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
            <p className="text-xs mb-2 leading-tight" style={{ color: '#66736B' }}>{m.label}</p>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-700 text-2xl" style={{ color: '#17211B' }}>{m.value}</span>
              <span className="text-xs" style={{ color: '#66736B' }}>{m.unit}</span>
            </div>
            <p className="text-xs mt-1" style={{ color: m.positive ? '#2E7D32' : '#D84315' }}>{m.change}</p>
          </div>
        ))}
      </div>

      {/* Readiness trend chart (simplified visual) */}
      <div className="mb-8 p-5 rounded-2xl" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
        <p className="font-display font-600 text-base mb-4" style={{ color: '#17211B' }}>Tren Kesiapan (30 Hari)</p>
        <div className="flex items-end gap-1.5 h-24">
          {[78, 82, 80, 85, 84, 88, 86, 91, 89, 93, 92, 95, 94, 98, 96, 99, 97, 103, 101, 103].map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-t transition-all"
              style={{
                height: `${(v / 110) * 100}%`,
                background: i === 19 ? '#2E7D32' : '#C8E6C9',
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs" style={{ color: '#66736B' }}>17 Ags</span>
          <span className="text-xs" style={{ color: '#66736B' }}>16 Sep</span>
        </div>
      </div>

      {/* Partner readiness */}
      <div>
        <p className="font-display font-600 text-base mb-4" style={{ color: '#17211B' }}>Kesiapan Mitra</p>
        <div className="space-y-4">
          {partnerReadiness.map(p => (
            <div key={p.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm" style={{ color: '#17211B' }}>{p.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: '#66736B' }}>{p.status}</span>
                  <span className="font-mono text-sm font-500" style={{ color: getReadinessColor(p.pct) }}>{p.pct}%</span>
                </div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: '#EAF4E7' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${p.pct}%`, background: getReadinessColor(p.pct) }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
