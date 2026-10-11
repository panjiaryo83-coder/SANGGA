import { useState } from 'react';

interface Props { onNavigate: (p: string) => void; }

const providers = [
  {
    name: 'PT Nusantara Logistics',
    status: 'SIAP',
    statusColor: '#2E7D32',
    statusBg: '#EAF4E7',
    capacity: '3 truk tersedia',
    committed: 5,
    ready: 3,
    region: 'Jabodetabek',
    mobilization: '3 jam',
    verified: '15 September 2026',
    type: 'Transportasi',
    sla: '< 4 jam',
    history: [
      { date: '15 Sep', event: 'Verifikasi kapasitas' },
      { date: '08 Sep', event: 'Pemeriksaan dokumen' },
      { date: '01 Sep', event: 'Simulasi kesiapan' },
    ],
  },
  {
    name: 'PT Amanah Transport',
    status: 'SIAP',
    statusColor: '#2E7D32',
    statusBg: '#EAF4E7',
    capacity: '2 truk tersedia',
    committed: 4,
    ready: 2,
    region: 'Jawa Barat',
    mobilization: '4 jam',
    verified: '13 September 2026',
    type: 'Transportasi',
    sla: '< 5 jam',
    history: [
      { date: '13 Sep', event: 'Verifikasi kapasitas' },
      { date: '06 Sep', event: 'Pemeriksaan dokumen' },
    ],
  },
  {
    name: 'ColdChain Solutions',
    status: 'TERBATAS',
    statusColor: '#8B6914',
    statusBg: '#FFF7E5',
    capacity: '6 kendaraan tersedia',
    committed: 8,
    ready: 6,
    region: 'Jabodetabek',
    mobilization: '5 jam',
    verified: '10 September 2026',
    type: 'Gudang & Transportasi',
    sla: '< 6 jam',
    history: [
      { date: '10 Sep', event: 'Verifikasi kapasitas' },
      { date: '03 Sep', event: 'Pemeriksaan dokumen' },
    ],
  },
  {
    name: 'Logistik Cepat',
    status: 'TIDAK AKTIF',
    statusColor: '#66736B',
    statusBg: '#F0F4F0',
    capacity: '0 kendaraan tersedia',
    committed: 4,
    ready: 0,
    region: 'Jakarta',
    mobilization: '8 jam',
    verified: '01 September 2026',
    type: 'Transportasi',
    sla: '< 8 jam',
    history: [
      { date: '01 Sep', event: 'Verifikasi kadaluarsa' },
    ],
  },
];

function ProviderDetail({ provider, onClose }: { provider: typeof providers[0]; onClose: () => void }) {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ background: '#fff', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="p-5" style={{ borderBottom: '1px solid #DDE4DE' }}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-700 text-lg" style={{ color: '#17211B' }}>{provider.name}</h3>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-50 transition-all text-xl leading-none" style={{ color: '#66736B' }}>✕</button>
          </div>
          <span className="badge" style={{ background: provider.statusBg, color: provider.statusColor }}>{provider.status}</span>
          <p className="text-sm mt-2" style={{ color: '#66736B' }}>{provider.capacity} untuk aktivasi</p>
        </div>
        <div className="p-5 space-y-4">
          {[
            { label: 'Komitmen', value: `${provider.committed} truk` },
            { label: 'Siap Saat Ini', value: `${provider.ready} truk` },
            { label: 'Wilayah', value: provider.region },
            { label: 'Waktu Mobilisasi', value: provider.mobilization },
            { label: 'Jenis', value: provider.type },
            { label: 'SLA', value: provider.sla },
            { label: 'Terakhir Diverifikasi', value: provider.verified },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #F0F4F0' }}>
              <span className="text-sm" style={{ color: '#66736B' }}>{row.label}</span>
              <span className="text-sm font-500" style={{ color: '#17211B' }}>{row.value}</span>
            </div>
          ))}
        </div>

        {!showHistory ? (
          <div className="px-5 pb-5 flex gap-3">
            <button
              className="flex-1 py-3 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
              style={{ background: '#2E7D32' }}
            >
              Perbarui kesiapan
            </button>
            <button
              onClick={() => setShowHistory(true)}
              className="flex-1 py-3 rounded-xl font-display font-600 text-sm transition-all"
              style={{ border: '1.5px solid #DDE4DE', color: '#2E7D32', background: '#EAF4E7' }}
            >
              Riwayat verifikasi
            </button>
          </div>
        ) : (
          <div className="px-5 pb-5">
            <p className="font-display font-600 text-sm mb-3" style={{ color: '#17211B' }}>Riwayat Verifikasi</p>
            <div className="space-y-0">
              {provider.history.map((item, i) => (
                <div key={i} className="flex gap-3 py-2.5" style={{ borderBottom: i < provider.history.length - 1 ? '1px solid #F0F4F0' : 'none' }}>
                  <span className="font-mono text-xs w-14 flex-shrink-0 mt-0.5" style={{ color: '#66736B' }}>{item.date}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#4CAF50' }} />
                    <span className="text-sm" style={{ color: '#17211B' }}>{item.event}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowHistory(false)}
              className="w-full mt-4 py-3 rounded-xl font-display font-600 text-sm transition-all"
              style={{ background: '#EAF4E7', color: '#2E7D32' }}
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MayaJaringan({ onNavigate }: Props) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [selectedProvider, setSelectedProvider] = useState<typeof providers[0] | null>(null);

  const filtered = providers.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'Semua Status' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      {selectedProvider && <ProviderDetail provider={selectedProvider} onClose={() => setSelectedProvider(null)} />}

      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 mb-1" style={{ color: '#17211B' }}>Jaringan Kesiapan</h1>
        <p className="text-sm" style={{ color: '#66736B' }}>Temukan kapasitas yang siap digunakan.</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#66736B' }}>
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari penyedia, kapasitas, atau lokasi..."
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
          style={{ border: '1.5px solid #DDE4DE', background: '#fff', fontFamily: 'Inter, sans-serif', color: '#17211B' }}
          onFocus={e => (e.target.style.borderColor = '#2E7D32')}
          onBlur={e => (e.target.style.borderColor = '#DDE4DE')}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['Semua Status', 'SIAP', 'TERBATAS', 'TIDAK AKTIF'].map(f => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-500 transition-all"
            style={{
              background: statusFilter === f ? '#EAF4E7' : '#fff',
              color: statusFilter === f ? '#2E7D32' : '#66736B',
              border: `1px solid ${statusFilter === f ? '#2E7D32' : '#DDE4DE'}`,
              fontFamily: statusFilter === f ? "'Plus Jakarta Sans'" : "'Inter'",
              fontWeight: statusFilter === f ? 600 : 400,
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Provider list */}
      <div className="space-y-3">
        {filtered.map(provider => (
          <button
            key={provider.name}
            onClick={() => setSelectedProvider(provider)}
            className="w-full rounded-2xl overflow-hidden text-left transition-all hover:shadow-md"
            style={{ background: '#fff', border: '1px solid #DDE4DE' }}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-700 font-display flex-shrink-0"
                    style={{ background: provider.statusBg, color: provider.statusColor }}
                  >
                    {provider.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-display font-600 text-base" style={{ color: '#17211B' }}>{provider.name}</div>
                    <span className="badge mt-1" style={{ background: provider.statusBg, color: provider.statusColor }}>{provider.status}</span>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#DDE4DE', marginTop: 4 }}>
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: provider.statusColor }} />
                  <span className="text-sm" style={{ color: '#17211B' }}>{provider.capacity}</span>
                </div>
                <span className="text-sm" style={{ color: '#66736B' }}>{provider.region}</span>
                <span className="text-sm" style={{ color: '#66736B' }}>Mobilisasi {provider.mobilization}</span>
              </div>
              <p className="text-xs mt-2" style={{ color: '#66736B' }}>Terakhir diverifikasi {provider.verified}</p>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm" style={{ color: '#66736B' }}>Tidak ada penyedia yang sesuai.</p>
        </div>
      )}
    </div>
  );
}
