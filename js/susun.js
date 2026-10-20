// let i=0,isi=[],pool=[],selesai=false;
let isi=[],pool=[],selesai=false;

// mengacak huruf yang muncul
let urutan = acak(DATA.map((_, n) => n));   // contoh: [7, 2, 15, 0, ...]
let posisi = 0;
let i = urutan[posisi];

function mulai(){
  const d=DATA[i];
  isi=[];
  selesai=false;
  pool=acak(
    [...d.k].map((h,id)=>({h,id}))
  );
  $('#gambar').innerHTML=gbr(d);$('#pesan').textContent='';
  $('#lanjut').hidden=true;
  $('#ulang').hidden=true;
  gambar();suaraKata(d);
}

function gambar(){
  const k=DATA[i].k,s=$('#slots'),t=$('#tiles');
  s.innerHTML='';t.innerHTML='';
  [...k].forEach((_,n)=>{
    const e=document.createElement('div');
    e.className='slot';
    e.textContent=isi[n]?isi[n].h.toUpperCase():'';
    e.onclick=()=>{
      if(!isi[n]||selesai)return;
      isi.splice(n,1);
      $('#pesan').textContent='';gambar()};
      s.append(e)});
      pool.forEach(o=>{
        const b=document.createElement('button');
        b.className='tile';
        b.textContent=o.h.toUpperCase();
        b.disabled=isi.some(x=>x.id===o.id);
        b.onclick=()=>{isi.push(o);gambar();periksa()};
        t.append(b)});
      }
function periksa(){ 
  const k = DATA[i].k;
  if (isi.length < k.length) return;

  if (isi.map(x => x.h).join('') === k) {
    selesai = true;
    const p = $('#pesan');
    p.textContent = 'Hebat! ';
    p.classList.remove('muncul'); void p.offsetWidth; p.classList.add('muncul');  // ulang animasi
    putar('audio/hebat.mp3', 'Hebat! ' + k);
    $('#lanjut').hidden = false;
    $('#ulang').hidden = false;
    konfeti();                                                                     // petasan
  } else {
    $('#pesan').textContent = 'Coba lagi ya 😊';
    putar('audio/coba-lagi.mp3', 'Coba lagi ya');
    kedipMerah();                                
    $('#ulang').hidden = false;
  }
}
// function periksa(){
//   const k=DATA[i].k;
//   if(isi.length<k.length)return;
//   if(isi.map(x=>x.h).join('')===k){selesai=true;$('#pesan').textContent='🎉 Hebat! '+k;putar('audio/hebat.mp3','Hebat! '+k);$('#lanjut').hidden=false}
//   else{$('#pesan').textContent='Coba lagi ya 😊';putar('audio/coba-lagi.mp3','Coba lagi ya')}
// }
$('#ulang').onclick=()=>{isi=[];selesai=false;$('#pesan').textContent='';$('#lanjut').hidden=true;gambar()};
// $('#lanjut').onclick=()=>{i=(i+1)%DATA.length;mulai()};
$('#lanjut').onclick = () => {
  posisi++;
  if (posisi >= urutan.length) {            // semua kata sudah keluar, acak ulang
    const terakhir = urutan[urutan.length - 1];
    do { urutan = acak(DATA.map((_, n) => n)); }
    while (urutan[0] === terakhir);         // jangan mulai dengan kata yang sama
    posisi = 0;
  }
  i = urutan[posisi];
  mulai();
};
mulai();
