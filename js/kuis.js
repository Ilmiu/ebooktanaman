const SOAL=5;let n=0,skor=0,jawab,terjawab=false;
function mulai(){
  const l=$('#lanjut');
  if(n>=SOAL){
    $('#skor').textContent='';$('#soal').textContent='Selesai! ⭐ '+skor+' / '+SOAL;$('#pilihan').innerHTML='';
    $('#pesan').textContent=skor>=4?'Kamu pintar sekali!':'Ayo coba lagi!';$('#dengar').hidden=true;
    l.hidden=false;l.textContent='🔄 Main lagi';
    l.onclick=()=>{n=0;skor=0;$('#dengar').hidden=false;l.textContent='Lanjut ➡️';l.onclick=mulai;mulai()};
    return}
  terjawab=false;
  const opsi=acak(DATA).slice(0,3);jawab=opsi[Math.floor(Math.random()*3)];
  $('#skor').textContent='Soal '+(n+1)+' dari '+SOAL;$('#soal').textContent=jawab.k;
  $('#pesan').textContent='Pilih gambar yang sesuai';l.hidden=true;
  const p=$('#pilihan');p.innerHTML='';
  opsi.forEach(o=>{
    const b=document.createElement('button');b.innerHTML=gbr(o);
    b.onclick=()=>{
      if(terjawab)return;terjawab=true;
      if(o===jawab){b.classList.add('benar');skor++;$('#pesan').textContent='🎉 Benar!';putar('audio/benar.mp3','Benar!')}
      else{
        b.classList.add('salah');
        $('#pesan').textContent='Jawabannya: '+jawab.k;putar('audio/salah.mp3','Belum tepat')
      }
      n++;l.hidden=false};
    p.append(b)});
  suaraKata(jawab);
}
$('#dengar').onclick=()=>suaraKata(jawab);
$('#lanjut').onclick=mulai;
mulai();
