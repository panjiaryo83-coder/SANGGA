import { useState } from 'react';
import { useApp, UserRole } from '../store';

const demoUsers = [
  {
    id: 'maya' as UserRole,
    name: 'Maya Putri',
    role: 'Pemilik Jaringan',
    desc: 'Kelola dan pantau kesiapan darurat',
    avatar: 'MP',
    color: '#2E7D32',
    bg: '#EAF4E7',
  },
  {
    id: 'raka' as UserRole,
    name: 'Raka Pratama',
    role: 'Otoritas Aktivasi',
    desc: 'Tinjau kebutuhan dan otorisasi aktivasi',
    avatar: 'RP',
    color: '#FF7043',
    bg: '#FFF0EB',
  },
  {
    id: 'andi' as UserRole,
    name: 'Andi Saputra',
    role: 'Penyedia Kapasitas',
    desc: 'Kelola kapasitas dan penuhi permintaan',
    avatar: 'AS',
    color: '#8B6914',
    bg: '#FFF7E5',
  },
];

export default function LoginPage() {
  const { dispatch } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);

  const login = (user: UserRole) => dispatch({ type: 'LOGIN', user });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDemo(true);
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#FAFAF8' }}>
      {/* Left panel — hero */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{ background: '#174D2A' }}
      >
        {/* Background texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1559523164-6a6a71ce5b22?w=800&h=1000&fit=crop&auto=format")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #174D2A 0%, #2E7D32 60%, #174D2A 100%)',
            opacity: 0.92,
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <img src="/src/assets/logo-new.png" alt="SANGGA" className="h-10 w-auto" />
          </div>
          <p className="text-white/60 text-sm font-body">Siap Sebelum Darurat</p>
        </div>

        {/* Hero copy */}
        <div className="relative z-10">
          <h1
            className="font-display text-white text-5xl font-700 leading-tight"
            style={{ lineHeight: 1.15 }}
          >
            Platform <span className="font-800">Kesiapsiagaan<br />Logistik</span> untuk<br />Respons Darurat
          </h1>
        </div>

      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <img src="/src/assets/logo-new.png" alt="SANGGA" className="h-8 w-auto" />
          </div>

          <div className="mb-8">
            <h2 className="font-display text-3xl font-700 mb-2" style={{ color: '#17211B' }}>Selamat datang</h2>
            <p style={{ color: '#66736B' }} className="text-sm">Masuk untuk melanjutkan ke SANGGA.</p>
          </div>

          {!showDemo ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-500 mb-1.5" style={{ color: '#17211B' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="nama@organisasi.id"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: '1.5px solid #DDE4DE',
                    background: '#fff',
                    color: '#17211B',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#2E7D32')}
                  onBlur={e => (e.target.style.borderColor = '#DDE4DE')}
                />
              </div>
              <div>
                <label className="block text-sm font-500 mb-1.5" style={{ color: '#17211B' }}>Kata sandi</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: '1.5px solid #DDE4DE',
                    background: '#fff',
                    color: '#17211B',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#2E7D32')}
                  onBlur={e => (e.target.style.borderColor = '#DDE4DE')}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-display font-600 text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-98"
                style={{ background: '#2E7D32' }}
              >
                Masuk →
              </button>

              <div className="relative flex items-center gap-3 my-2">
                <div className="flex-1 h-px" style={{ background: '#DDE4DE' }} />
                <span className="text-xs" style={{ color: '#66736B' }}>atau</span>
                <div className="flex-1 h-px" style={{ background: '#DDE4DE' }} />
              </div>

              <button
                type="button"
                onClick={() => setShowDemo(true)}
                className="w-full py-3 rounded-xl font-body font-500 text-sm transition-all hover:bg-green-light"
                style={{
                  border: '1.5px solid #DDE4DE',
                  color: '#2E7D32',
                  background: '#EAF4E7',
                }}
              >
                Masuk sebagai pengguna demo
              </button>
            </form>
          ) : (
            <div>
              <p className="text-sm mb-4" style={{ color: '#66736B' }}>Pilih akun demo untuk melanjutkan:</p>
              <div className="space-y-3">
                {demoUsers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => login(user.id)}
                    onMouseEnter={() => setHoveredUser(user.id)}
                    onMouseLeave={() => setHoveredUser(null)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                    style={{
                      border: `1.5px solid ${hoveredUser === user.id ? user.color : '#DDE4DE'}`,
                      background: hoveredUser === user.id ? user.bg : '#fff',
                      transform: hoveredUser === user.id ? 'translateY(-1px)' : 'none',
                      boxShadow: hoveredUser === user.id ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-700 font-display flex-shrink-0"
                      style={{ background: user.bg, color: user.color }}
                    >
                      {user.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-600 font-display text-sm" style={{ color: '#17211B' }}>{user.name}</div>
                      <div className="text-xs font-mono mt-0.5" style={{ color: user.color }}>{user.role}</div>
                      <div className="text-xs mt-0.5 truncate" style={{ color: '#66736B' }}>{user.desc}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: user.color, opacity: hoveredUser === user.id ? 1 : 0.3 }}>
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowDemo(false)}
                className="mt-4 text-xs text-center w-full transition-opacity hover:opacity-70"
                style={{ color: '#66736B' }}
              >
                ← Kembali ke login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
