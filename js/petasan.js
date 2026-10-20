// Efek petasan / konfeti saat jawaban benar
function konfeti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const c = document.createElement('canvas');
  c.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:999';
  c.width = innerWidth;
  c.height = innerHeight;
  document.body.append(c);
  const g = c.getContext('2d');

  const warna = ['#ef5350', '#ffd54f', '#66bb6a', '#42a5f5', '#ab47bc', '#ff9800'];
  const bit = [];
  for (let i = 0; i < 140; i++) {
    const kiri = i % 2 === 0;                                   // separuh dari kiri, separuh dari kanan
    const sudut = (kiri ? -60 : -120) * Math.PI / 180 + (Math.random() - 0.5);
    const laju = 12 + Math.random() * 10;
    bit.push({
      x: kiri ? 0 : c.width, y: c.height,
      vx: Math.cos(sudut) * laju, vy: Math.sin(sudut) * laju,
      lebar: 6 + Math.random() * 6, tinggi: 10 + Math.random() * 8,
      putar: Math.random() * 6, kecPutar: (Math.random() - 0.5) * 0.4,
      warna: warna[Math.floor(Math.random() * warna.length)]
    });
  }

  const mulai = performance.now();
  (function gerak(t) {
    g.clearRect(0, 0, c.width, c.height);
    bit.forEach(b => {
      b.vy += 0.35;            // gravitasi
      b.vx *= 0.99;            // hambatan udara
      b.x += b.vx; b.y += b.vy; b.putar += b.kecPutar;
      g.save();
      g.translate(b.x, b.y);
      g.rotate(b.putar);
      g.fillStyle = b.warna;
      g.fillRect(-b.lebar / 2, -b.tinggi / 2, b.lebar, b.tinggi);
      g.restore();
    });
    if (t - mulai < 3500) requestAnimationFrame(gerak);
    else c.remove();
  })(mulai);
}

// Layar berkedip merah (2 kali, lembut) saat jawaban salah
function kedipMerah() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;  // hormati pengaturan "kurangi gerakan"
  const d = document.createElement('div');
  d.className = 'kedip-merah';
  document.body.append(d);
  d.addEventListener('animationend', () => d.remove());                // hapus sendiri setelah selesai
}