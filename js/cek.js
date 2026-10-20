// Memeriksa apakah gambar dan suara tiap kata bisa dimuat
function cekGambar(d,td,n=0){
  const f=`img/${d.k}.${EKS[n]}`,img=new Image();
  img.onload=()=>td.textContent='✅ '+f;
  img.onerror=()=>n+1<EKS.length?cekGambar(d,td,n+1):td.textContent='❌ img/'+d.k+'.png tidak ditemukan';
  img.src=f;
}
function cekSuara(d,td){
  const f=`audio/${d.k}.mp3`,a=new Audio();
  a.onloadedmetadata=()=>td.textContent='✅ '+f;
  a.onerror=()=>td.textContent='❌ '+f+' tidak ditemukan';
  a.src=f;a.load();
}
DATA.forEach(d=>{
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${d.e} ${d.k}</td><td>memeriksa...</td><td>memeriksa...</td>`;
  $('#hasil').append(tr);
  cekGambar(d,tr.children[1]);
  cekSuara(d,tr.children[2]);
});
