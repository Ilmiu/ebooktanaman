// Memeriksa apakah gambar dan suara tiap kata bisa dimuat, lalu mengisi tabel
let gambarOk = 0, suaraOk = 0, selesai = 0;

// Dipanggil setiap satu pemeriksaan selesai; setelah semuanya selesai, tampilkan ringkasan
function ringkas() {
  selesai++;
  if (selesai === DATA.length * 2) {
    $('#ringkasan').textContent =
      `Gambar ditemukan: ${gambarOk}/${DATA.length} | Suara ditemukan: ${suaraOk}/${DATA.length}`;
  }
}

function cekGambar(d, tdFile, tdThumb, n = 0) {
  const f = `img/${d.k}.${EKS[n]}`, img = new Image();
  img.onload = () => {
    tdFile.textContent = '✅ ' + f;
    tdThumb.innerHTML = `<img src="${f}" alt="${d.k}">`;
    gambarOk++; ringkas();
  };
  img.onerror = () => {
    if (n + 1 < EKS.length) return cekGambar(d, tdFile, tdThumb, n + 1);  // coba ekstensi lain
    tdFile.textContent = '❌ img/' + d.k + '.png tidak ditemukan';
    tdThumb.textContent = d.e;
    ringkas();
  };
  img.src = f;
}

function cekSuara(d, td) {
  const f = `audio/${d.k}.mp3`, a = new Audio();
  a.onloadedmetadata = () => { td.textContent = '✅ ' + f; suaraOk++; ringkas(); };
  a.onerror = () => { td.textContent = '❌ ' + f + ' tidak ditemukan'; ringkas(); };
  a.src = f; a.load();
}

DATA.forEach((d, n) => {
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${n + 1}</td><td>${d.k}</td><td></td><td>memeriksa...</td><td>memeriksa...</td>`;
  $('#hasil').append(tr);
  cekGambar(d, tr.children[3], tr.children[2]);   // kolom 3 = pratinjau, kolom 4 = nama file
  cekSuara(d, tr.children[4]);
});