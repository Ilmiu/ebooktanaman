const DATA=[
{h:'A',k:'apel',s:'a-pel',e:'🍎'},{h:'B',k:'bunga',s:'bu-nga',e:'🌸'},{h:'C',k:'cabai',s:'ca-bai',e:'🌶️'},
{h:'D',k:'daun',s:'da-un',e:'🍃'},{h:'E',k:'edamame',s:'e-da-ma-me',e:'💧'},{h:'F',k:'frambos',s:'fram-bos',e:'💧'},{h:'G',k:'gandum',s:'gan-dum',e:'🌾'},
{h:'H',k:'hazelnut',s:'ha-zel-nut',e:'🍍'},{h:'I',k:'iris',s:'i-ris',e:'🍍'},{h:'J',k:'jagung',s:'ja-gung',e:'🌽'},{h:'K',k:'kelapa',s:'ke-la-pa',e:'🥥'},{h:'L',k:'lemon',s:'le-mon',e:'🍋'},
{h:'M',k:'mangga',s:'mang-ga',e:'🥭'},{h:'N',k:'nanas',s:'na-nas',e:'🍍'},{h:'O',k:'okra',s:'o-kra',e:'🍍'},{h:'P',k:'pohon',s:'po-hon',e:'🌳'},
{h:'R',k:'rumput',s:'rum-put',e:'🌿'},{h:'S',k:'semangka',s:'se-mang-ka',e:'🍉'},{h:'T',k:'tomat',s:'to-mat',e:'🍅'},
{h:'U',k:'ubi',s:'u-bi',e:'🍠'},{h:'V',k:'vanila',s:'va-ni-la',e:'🍍'},{h:'W',k:'wortel',s:'wor-tel',e:'🥕'}];

const $=s=>document.querySelector(s);
const acak=a=>[...a].sort(()=>Math.random()-.5);

const EKS=['png','jpg','jpeg','webp','PNG','JPG','JPEG']; //tampilan gambar, jika ada, jika tidak, diganti dengan emoji
const gbr=d=>`<img src="${d.g||'img/'+d.k+'.png'}" alt="${d.k}" data-e="${d.e}" data-n="${d.g?99:0}" onerror="gantiGbr(this)">`;
function gantiGbr(img){
  const n=+img.dataset.n+1;
  if(n<EKS.length){img.dataset.n=n;img.src=`img/${img.alt}.${EKS[n]}`}
  else img.outerHTML=img.dataset.e;
}

//suara, jika ada pakai mp3 audio. jika tidak pakai suara google bawaaan
function bicara(t){
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='id-ID';u.rate=.7;speechSynthesis.speak(u)}catch(e){}
}
// putar rekaman suara asli; jika file tidak ada/gagal, pakai suara komputer
let _audio=null;
function putar(file,teks){
  try{speechSynthesis.cancel()}catch(e){}
  if(_audio)_audio.pause();
  _audio=new Audio(file);
  _audio.onerror=()=>bicara(teks);
  _audio.play().catch(()=>{});
}
const suaraKata =d=>putar(d.a ||`audio/${d.k}.mp3`,d.k);
const suaraHuruf=d=>putar(d.ah||`audio/huruf-${d.h.toLowerCase()}.mp3`,'Huruf '+d.h+'. '+d.k);
const suaraEja  =d=>putar(d.ae||`audio/${d.k}-eja.mp3`,d.s.split('-').join(', '));

document.addEventListener('click', e => {
  if (!e.target.closest('.kembali')) return;

  const sekarang = location.href;
  if (history.length > 1) {
    history.back();
    // Jika setelah 0,4 detik masih di halaman yang sama, pindah ke beranda
    setTimeout(() => {
      if (location.href === sekarang) location.href = 'index.html';
    }, 400);
  } else {
    location.href = 'index.html';
  }
});
