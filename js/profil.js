/* =====================================================
   DATA PROFIL
   Ubah isi di bawah ini, halaman profil.html ikut berubah.
   Foto pengembang : timpa img/pengembang.png
   Logo universitas: timpa img/logo-universitas.png
   ===================================================== */
const PROFIL = {
  // ----- Keterangan di kotak kanan -----
  nama:  'Miftakhul Ilmiyah',
  peran: 'Mahasiswa',
  judul: 'Pengembangan Media E-Book Tema Tanaman untuk Meningkatkan Kemampuan Membaca Permulaan Anak Usia 5–6 Tahun di TK PKK Sobontoro Kecamatan Balen',
  produk: [
    ['Nama Produk', 'E-Book Tema Tanaman'],
    ['Sasaran',     'Anak usia 5–6 tahun (Kelompok B TK) dan guru TK'],
    ['Lokasi',      'TK PKK Sobontoro, Kecamatan Balen'],
    ['Tujuan',      'Meningkatkan kemampuan membaca permulaan anak melalui media e-book yang menarik dan interaktif']
  ],

  // ----- Biodata pengembang (muncul saat FOTO diklik) -----
  foto: 'img/pengembang.jpeg',
  biodata: [
    ['Nama Lengkap',        'Miftakhul Ilmiyah'],
    ['Tempat, Tgl. Lahir',  'Bojonegoro, 28 Mei 2003'],
    ['NIM',                 '211101149'],
    ['Program Studi',       'Teknik Informatika'],
    ['Fakultas',            'Sains dan Teknologi'],
    ['Dosen Pembimbing',    'Mula Agung Barata, S. ST, M. Kom'],
    ['Tahun Pengembangan',  '2026'],
    ['Email',               'miftakhulilmiyah28@gmail.com']
  ],

  // ----- Biodata universitas (muncul saat LOGO diklik) -----
  univ: {
    nama: 'Universitas Nahdlatul Ulama Sunan Giri',
    logo: 'img/logo.png',
    data: [
      ['Nama Universitas', 'UNiversitas Nahdlatul Ulama Sunan Giri'],
      ['Singkatan',        'Unugiri'],
      ['Kota / Provinsi',  'Bojonegoro, Jawa Timur'],
      ['Akreditasi',       'A'],
      ['Website',          'https://unugiri.ac.id/']
    ]
  }
};

/* ---------- Fungsi bantu ---------- */
// Tampilkan gambar dalam wadah; jika file tidak ada, tampil ikon cadangan
function pasangGambar(wadah, src, alt, ikon) {
  wadah.textContent = '';
  const img = document.createElement('img');
  img.src = src; img.alt = alt;
  img.onerror = () => { wadah.textContent = ikon; };
  wadah.append(img);
}

// Isi daftar label : isi
function isiDaftar(dl, baris) {
  dl.textContent = '';
  baris.forEach(([label, isi]) => {
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'); dd.textContent = isi;
    dl.append(dt, dd);
  });
}

/* ---------- Isi halaman ---------- */
$('#nama').textContent  = PROFIL.nama;
$('#peran').textContent = PROFIL.peran;
$('#judul').textContent = PROFIL.judul;
isiDaftar($('#produk'), PROFIL.produk);
pasangGambar($('#foto'), PROFIL.foto, 'Foto pengembang', '👤');
pasangGambar($('#logo'), PROFIL.univ.logo, 'Logo universitas', '🎓');

/* ---------- Jendela biodata ---------- */
const modal = $('#modal');
function bukaModal(judul, src, ikon, baris) {
  $('#mJudul').textContent = judul;
  pasangGambar($('#mGambar'), src, judul, ikon);
  isiDaftar($('#mData'), baris);
  modal.showModal();
}

$('#btnFoto').onclick = () => bukaModal('Biodata Pengembang', PROFIL.foto, '👤', PROFIL.biodata);
$('#btnLogo').onclick = () => bukaModal('Biodata Universitas', PROFIL.univ.logo, '🎓', PROFIL.univ.data);
$('#tutup').onclick = () => modal.close();

modal.addEventListener('click', e => { if (e.target === modal) modal.close(); }); // klik di luar kotak = tutup