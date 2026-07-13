import { Link } from "react-router-dom";

const features = [
  {
    number: "01",
    title: "Absensi Wajah",
    description:
      "Mendeteksi dan mengenali wajah secara otomatis melalui kamera perangkat.",
  },
  {
    number: "02",
    title: "Portal Pekerja",
    description:
      "Pekerja dapat melihat profil, status kehadiran, dan riwayat absensi.",
  },
  {
    number: "03",
    title: "Dashboard HRD",
    description:
      "HRD dapat mengelola pekerja, memeriksa kehadiran, dan membuat laporan.",
  },
  {
    number: "04",
    title: "Multi-Site Ready",
    description:
      "Arsitektur disiapkan untuk melayani beberapa gedung dan lokasi perusahaan.",
  },
];

const projectStats = [
  {
    value: "1.000+",
    label: "Target pekerja",
  },
  {
    value: "2",
    label: "Gedung awal",
  },
  {
    value: "24/7",
    label: "Akses portal",
  },
];

export default function LandingPage() {
  return (
    <main className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">
            Sistem Absensi Modern
          </p>

          <h1 className="hero-title">
            Absensi pekerja menjadi lebih
            <span> cepat dan terintegrasi.</span>
          </h1>

          <p className="hero-description">
            FaceAttend adalah prototype sistem absensi berbasis pengenalan
            wajah yang dilengkapi portal pekerja dan dashboard HRD.
          </p>

          <div className="hero-actions">
            <Link to="/attendance" className="button button-primary">
              Coba Demo Absensi
            </Link>

            <Link to="/register" className="button button-secondary">
              Daftar Pekerja
            </Link>
          </div>

          <p className="hero-note">
            Prototype portofolio — bukan sistem absensi produksi.
          </p>
        </div>

        <div className="hero-preview">
          <div className="preview-window">
            <div className="preview-header">
              <div className="preview-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <span className="preview-label">
                Live Attendance
              </span>
            </div>

            <div className="preview-camera">
              <div className="face-frame">
                <div className="face-icon" aria-hidden="true">
                  <div className="face-head" />
                  <div className="face-body" />
                </div>

                <span className="scanner-line" />
              </div>

              <div className="camera-status">
                <span className="status-dot" />
                Kamera siap mendeteksi wajah
              </div>
            </div>

            <div className="recognition-result">
              <div className="recognition-avatar">
                AM
              </div>

              <div className="recognition-text">
                <strong>Identitas ditemukan</strong>
                <span>Absensi berhasil dicatat</span>
              </div>

              <span className="recognition-badge">
                Berhasil
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section" aria-label="Target proyek">
        {projectStats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="features-section">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">
              Fitur Utama
            </p>

            <h2>
              Fondasi untuk sistem kehadiran perusahaan
            </h2>
          </div>

          <p>
            Dibangun secara bertahap dari prototype web hingga siap
            dikembangkan untuk jaringan lokal perusahaan.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <span className="feature-number">
                {feature.number}
              </span>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="section-eyebrow">
            Mulai Eksplorasi
          </p>

          <h2>
            Lihat alur aplikasi FaceAttend.
          </h2>

          <p>
            Coba halaman absensi atau masuk ke halaman portal yang sedang
            dikembangkan.
          </p>
        </div>

        <div className="cta-actions">
          <Link to="/attendance" className="button button-primary">
            Buka Absensi
          </Link>

          <Link to="/login" className="button button-secondary">
            Login Portal
          </Link>
        </div>
      </section>
    </main>
  );
}