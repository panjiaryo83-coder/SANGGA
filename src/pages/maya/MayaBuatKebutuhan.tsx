import { useState } from 'react';
import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; }

const steps = [
  { id: 1, label: 'Lokasi' },
  { id: 2, label: 'Jenis' },
  { id: 3, label: 'Jumlah' },
  { id: 4, label: 'Waktu' },
  { id: 5, label: 'Kemampuan' },
  { id: 6, label: 'Tinjau' },
  { id: 7, label: 'Kirim' },
];

const typeOptions = [
  { id: 'transportasi', label: 'Transportasi', icon: '🚛', desc: 'Truk, kendaraan, angkutan' },
  { id: 'gudang', label: 'Gudang', icon: '🏭', desc: 'Penyimpanan, fasilitas' },
  { id: 'makanan', label: 'Makanan', icon: '🍱', desc: 'Pangan, konsumsi' },
  { id: 'air', label: 'Air Bersih', icon: '💧', desc: 'Air minum, sanitasi' },
  { id: 'kesehatan', label: 'Kesehatan', icon: '🏥', desc: 'Medis, P3K' },
  { id: 'lainnya', label: 'Lainnya', icon: '📦', desc: 'Kebutuhan lain' },
];

const capabilityOptions = [
  'Kapasitas angkut ≥ 10 ton',
  'Pendingin bersuhu rendah',
  'Supir berpengalaman di medan banjir',
  'GPS tracking aktif',
  'Dokumentasi muatan',
  'Asuransi kargo aktif',
];

export default function MayaBuatKebutuhan({ onNavigate }: Props) {
  const { dispatch } = useApp();
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState(10);
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const next = () => setStep(s => Math.min(s + 1, 7));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const toggleCapability = (cap: string) => {
    setCapabilities(prev =>
      prev.includes(cap) ? prev.filter(c => c !== cap) : [...prev, cap]
    );
  };

  const submit = () => {
    dispatch({ type: 'CREATE_MISSION' });
    setSubmitted(true);
    setTimeout(() => {
      dispatch({ type: 'SUBMIT_FOR_AUTH' });
      onNavigate('matching');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#EAF4E7' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16l8 8 12-12" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="font-display text-2xl font-700 mb-2" style={{ color: '#17211B' }}>Kebutuhan berhasil dibuat.</h2>
        <p className="text-sm mb-6" style={{ color: '#66736B' }}>Sedang mencari rekomendasi kapasitas yang sesuai...</p>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2E7D32', animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => step === 1 ? onNavigate('needs') : prev()} className="p-2 rounded-lg hover:bg-gray-50 transition-all" style={{ color: '#66736B' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 16l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        <div>
          <h1 className="font-display text-xl font-700" style={{ color: '#17211B' }}>Buat Kebutuhan</h1>
          <p className="text-xs" style={{ color: '#66736B' }}>Langkah {step} dari 7</p>
        </div>
      </div>

      {/* Step progress */}
      <div className="flex gap-1.5 mb-8">
        {steps.map(s => (
          <div
            key={s.id}
            className="flex-1 h-1.5 rounded-full transition-all"
            style={{ background: s.id <= step ? '#2E7D32' : '#DDE4DE' }}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="page-enter">
        {step === 1 && (
          <div>
            <h2 className="font-display text-xl font-700 mb-2" style={{ color: '#17211B' }}>Di mana kebutuhan ini dibutuhkan?</h2>
            <p className="text-sm mb-6" style={{ color: '#66736B' }}>Masukkan lokasi atau cari pada peta.</p>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Cari lokasi atau ketik manual..."
              className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-4"
              style={{ border: '1.5px solid #DDE4DE', background: '#fff', fontFamily: 'Inter', color: '#17211B' }}
              onFocus={e => (e.target.style.borderColor = '#2E7D32')}
              onBlur={e => (e.target.style.borderColor = '#DDE4DE')}
            />
            {/* Map placeholder */}
            <div
              className="w-full h-48 rounded-2xl overflow-hidden flex items-center justify-center mb-4"
              style={{ background: '#EAF4E7', border: '1px solid #DDE4DE' }}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-sm" style={{ color: '#66736B' }}>Peta akan ditampilkan di sini</p>
              </div>
            </div>
            {/* Quick location */}
            <div className="flex gap-2 flex-wrap mb-6">
              {['Bekasi, Jawa Barat', 'Bogor, Jawa Barat', 'Jakarta Timur'].map(loc => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className="px-3 py-1.5 rounded-full text-xs transition-all"
                  style={{
                    border: `1px solid ${location === loc ? '#2E7D32' : '#DDE4DE'}`,
                    background: location === loc ? '#EAF4E7' : '#fff',
                    color: location === loc ? '#2E7D32' : '#66736B',
                  }}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-display text-xl font-700 mb-2" style={{ color: '#17211B' }}>Jenis kebutuhan apa yang diperlukan?</h2>
            <p className="text-sm mb-6" style={{ color: '#66736B' }}>Pilih kategori kapasitas yang dibutuhkan.</p>
            <div className="grid grid-cols-2 gap-3">
              {typeOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setType(opt.id)}
                  className="flex flex-col items-start p-4 rounded-xl text-left transition-all"
                  style={{
                    border: `1.5px solid ${type === opt.id ? '#2E7D32' : '#DDE4DE'}`,
                    background: type === opt.id ? '#EAF4E7' : '#fff',
                  }}
                >
                  <span className="text-2xl mb-2">{opt.icon}</span>
                  <span className="font-display font-600 text-sm mb-0.5" style={{ color: '#17211B' }}>{opt.label}</span>
                  <span className="text-xs" style={{ color: '#66736B' }}>{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-display text-xl font-700 mb-2" style={{ color: '#17211B' }}>Berapa jumlah yang dibutuhkan?</h2>
            <p className="text-sm mb-8" style={{ color: '#66736B' }}>Tentukan jumlah unit yang diperlukan.</p>
            <div className="flex items-center justify-center gap-8 mb-8">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-300 transition-all hover:bg-gray-50"
                style={{ border: '1.5px solid #DDE4DE', color: '#17211B' }}
              >
                −
              </button>
              <div className="text-center">
                <div className="font-display text-6xl font-700" style={{ color: '#2E7D32' }}>{quantity}</div>
                <div className="text-sm mt-2" style={{ color: '#66736B' }}>unit {type === 'transportasi' ? 'truk' : 'kapasitas'}</div>
              </div>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-300 transition-all hover:bg-gray-50"
                style={{ border: '1.5px solid #DDE4DE', color: '#17211B' }}
              >
                +
              </button>
            </div>
            <div className="flex gap-2 justify-center flex-wrap">
              {[5, 10, 15, 20].map(n => (
                <button
                  key={n}
                  onClick={() => setQuantity(n)}
                  className="px-4 py-2 rounded-full text-sm transition-all"
                  style={{
                    border: `1px solid ${quantity === n ? '#2E7D32' : '#DDE4DE'}`,
                    background: quantity === n ? '#EAF4E7' : '#fff',
                    color: quantity === n ? '#2E7D32' : '#66736B',
                  }}
                >
                  {n} unit
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="font-display text-xl font-700 mb-2" style={{ color: '#17211B' }}>Kapan dibutuhkan?</h2>
            <p className="text-sm mb-6" style={{ color: '#66736B' }}>Tentukan waktu kebutuhan kapasitas ini.</p>
            <div className="space-y-3">
              {[
                { label: 'Hari ini · 14.00', sub: 'Segera — dalam 2 jam' },
                { label: 'Hari ini · 18.00', sub: 'Sore ini — dalam 6 jam' },
                { label: 'Besok · 08.00', sub: 'Besok pagi' },
              ].map((opt, i) => (
                <button
                  key={opt.label}
                  className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                  style={{
                    border: `1.5px solid ${i === 0 ? '#2E7D32' : '#DDE4DE'}`,
                    background: i === 0 ? '#EAF4E7' : '#fff',
                  }}
                  onClick={() => {}}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                    style={{ borderColor: i === 0 ? '#2E7D32' : '#DDE4DE', background: i === 0 ? '#2E7D32' : 'transparent' }}
                  >
                    {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="font-display font-600 text-sm" style={{ color: '#17211B' }}>{opt.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#66736B' }}>{opt.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="font-display text-xl font-700 mb-2" style={{ color: '#17211B' }}>Apa kemampuan yang dibutuhkan?</h2>
            <p className="text-sm mb-6" style={{ color: '#66736B' }}>Pilih persyaratan kemampuan yang relevan. Opsional.</p>
            <div className="space-y-2">
              {capabilityOptions.map(cap => (
                <button
                  key={cap}
                  onClick={() => toggleCapability(cap)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all"
                  style={{
                    border: `1.5px solid ${capabilities.includes(cap) ? '#2E7D32' : '#DDE4DE'}`,
                    background: capabilities.includes(cap) ? '#EAF4E7' : '#fff',
                  }}
                >
                  <div
                    className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center"
                    style={{ background: capabilities.includes(cap) ? '#2E7D32' : '#fff', border: `1.5px solid ${capabilities.includes(cap) ? '#2E7D32' : '#DDE4DE'}` }}
                  >
                    {capabilities.includes(cap) && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    )}
                  </div>
                  <span className="text-sm" style={{ color: '#17211B' }}>{cap}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="font-display text-xl font-700 mb-2" style={{ color: '#17211B' }}>Tinjau kebutuhan</h2>
            <p className="text-sm mb-6" style={{ color: '#66736B' }}>Pastikan semua informasi sudah benar.</p>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #DDE4DE', background: '#fff' }}>
              {[
                { label: 'Lokasi', value: location || 'Bekasi, Jawa Barat' },
                { label: 'Jenis', value: type ? typeOptions.find(t => t.id === type)?.label || 'Transportasi' : 'Transportasi' },
                { label: 'Jumlah', value: `${quantity} unit truk` },
                { label: 'Waktu', value: 'Hari ini · 14.00' },
                { label: 'Kemampuan', value: capabilities.length > 0 ? capabilities.join(', ') : 'Tidak ada persyaratan khusus' },
              ].map((row, i) => (
                <div key={row.label} className="flex items-start justify-between px-5 py-3.5" style={{ borderBottom: i < 4 ? '1px solid #F0F4F0' : 'none' }}>
                  <span className="text-sm" style={{ color: '#66736B' }}>{row.label}</span>
                  <span className="text-sm font-500 text-right max-w-48" style={{ color: '#17211B' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#EAF4E7' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M6 16l8 8 12-12" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="font-display text-2xl font-700 mb-2" style={{ color: '#17211B' }}>Kebutuhan siap dikirim.</h2>
            <div className="p-4 rounded-xl mb-6 text-left" style={{ background: '#EAF4E7', border: '1px solid #C8E6C9' }}>
              <p className="text-sm font-500 mb-2" style={{ color: '#2E7D32' }}>Respons Banjir · {location || 'Bekasi'}</p>
              <p className="text-sm" style={{ color: '#66736B' }}>{quantity} unit truk · Hari ini 14.00</p>
            </div>
            <p className="text-sm mb-8" style={{ color: '#66736B' }}>
              Setelah dikirim, sistem akan menemukan rekomendasi kapasitas yang sesuai dan meminta otorisasi aktivasi.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 1 && step < 7 && (
          <button
            onClick={prev}
            className="flex-1 py-3 rounded-xl font-display font-600 text-sm transition-all"
            style={{ border: '1.5px solid #DDE4DE', color: '#66736B' }}
          >
            Kembali
          </button>
        )}
        {step < 6 && (
          <button
            onClick={next}
            className="flex-1 py-3 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
            style={{ background: '#2E7D32' }}
          >
            Lanjutkan →
          </button>
        )}
        {step === 6 && (
          <button
            onClick={next}
            className="flex-1 py-3 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
            style={{ background: '#2E7D32' }}
          >
            Konfirmasi kebutuhan →
          </button>
        )}
        {step === 7 && (
          <button
            onClick={submit}
            className="flex-1 py-3 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90 hover:shadow-lg"
            style={{ background: '#FF7043' }}
          >
            Kirim kebutuhan
          </button>
        )}
      </div>
    </div>
  );
}
