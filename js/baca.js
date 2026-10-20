let i=0;
function tampil(){
    const d=DATA[i];
    $('#gambar').innerHTML=gbr(d);
    $('#kata').textContent=d.k;
    $('#suku').textContent=d.s.replaceAll('-',' · ')
}

$('#prev').onclick=()=>{i=(i-1+DATA.length)%DATA.length;tampil()};
$('#next').onclick=()=>{i=(i+1)%DATA.length;tampil()};
$('#eja').onclick=()=>suaraEja(DATA[i]);
$('#suara').onclick=()=>suaraKata(DATA[i]);
tampil();
