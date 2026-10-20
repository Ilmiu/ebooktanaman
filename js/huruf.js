let i=0;
const daftar=$('#daftar');
DATA.forEach((d,n)=>{const b=document.createElement('button');b.textContent=d.h;b.onclick=()=>{i=n;tampil(true)};daftar.append(b)});
function tampil(bunyi){
  const d=DATA[i];
  $('#huruf').textContent=d.h+d.h.toLowerCase();
  $('#gambar').innerHTML=gbr(d);$('#kata').textContent=d.k;
  [...daftar.children].forEach((b,n)=>b.classList.toggle('on',n===i));
  if(bunyi)suaraHuruf(d);
}
$('#prev').onclick=()=>{i=(i-1+DATA.length)%DATA.length;tampil(true)};
$('#next').onclick=()=>{i=(i+1)%DATA.length;tampil(true)};
$('#suara').onclick=()=>tampil(true);
tampil(false);
