const IMGS=["images/foto1.jpg", "images/foto2.jpg", "images/foto3.jpg", "images/foto4.jpg", "images/foto5.jpg", "images/foto6.jpg", "images/foto7.jpg", "images/foto8.jpg", "images/foto9.jpg", "images/foto10.jpg", "images/foto11.jpg", "images/foto12.jpg", "images/foto13.png", "images/foto14.png"];
// orden: 0 couple dark,1 beach,2 blaze,3 market,4 blanket,5 zebra,6 fridge,7 mirror,8 mate
const CAP=[[9,"Tu risa lo ilumina todo"],[10,"Radiante"],[11,"Tranquila bajo las luces"],[2,"Logrando metas"],[8,"Mate y buena onda"],[3,"Paseando por la feria"],[0,"Siempre sonriendo"],[1,"Atardecer en la costa"],[5,"Con mucho Flow"],[6,"Estrenando heladera"],[7,"Lista para salir"],[4,"Modo mantita"],[12,"Un recuerdo juntos"],[13,"Sin saber que algún día seríamos nosotros"]];
document.getElementById('hp').src=IMGS[8];
// título animado
const t=document.getElementById('t'),txt=t.textContent;t.textContent='';
txt.split(' ').forEach((w,i)=>{const s=document.createElement('span');s.textContent=w;s.style.animationDelay=(.2+i*.22)+'s';s.setAttribute('aria-hidden','true');t.append(s,' ')});
// galería
const rail=document.getElementById('rail'),lb=document.getElementById('lb'),lbi=document.getElementById('lbi');
CAP.forEach(([i,c])=>{const b=document.createElement('button');b.className='pol';b.innerHTML='<img alt="'+c+'"><b>'+c+'</b>';b.firstChild.src=IMGS[i];b.onclick=()=>{lbi.src=IMGS[i];lb.classList.add('on')};rail.append(b)});
lb.onclick=()=>lb.classList.remove('on');
// confeti
const cv=document.getElementById('fx'),cx=cv.getContext('2d');let P=[];
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener('resize',rs);
function burst(n=140,x=innerWidth/2,y=innerHeight/2){const C=['#ff4f87','#ffb703','#4cc9f0','#b388ff','#80ed99','#fff'];
for(let i=0;i<n;i++){const a=Math.random()*6.28,s=4+Math.random()*9;P.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-6,r:Math.random()*6,vr:Math.random()*.4-.2,w:6+Math.random()*7,c:C[i%6],l:1,h:Math.random()<.2})}
if(!tick.on){tick.on=1;requestAnimationFrame(tick)}}
function tick(){cx.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.l>0&&p.y<cv.height+20);
P.forEach(p=>{p.vy+=.28;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.l-=.005;cx.save();cx.globalAlpha=Math.min(1,p.l*2);cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;
if(p.h){cx.font=p.w*2+'px serif';cx.fillText('💖',-p.w,0)}else cx.fillRect(-p.w/2,-p.w/4,p.w,p.w/2);cx.restore()});
if(P.length)requestAnimationFrame(tick);else tick.on=0}
// corazones flotantes
const E=['💖','🎈','✨','💗','🎉','🧉'];
setInterval(()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;const e=document.createElement('div');e.className='float';e.textContent=E[Math.random()*E.length|0];e.style.left=Math.random()*95+'vw';e.style.fontSize=16+Math.random()*20+'px';e.style.animationDuration=7+Math.random()*6+'s';document.body.append(e);setTimeout(()=>e.remove(),14000)},900);
// interacciones
document.getElementById('go').onclick=e=>{playMusic();burst(180);document.querySelectorAll('section')[1].scrollIntoView({behavior:'smooth'})};
const cake=document.getElementById('cake');
const birthdayScene=document.getElementById('birthdayScene');
const snorlaxCaption=document.getElementById('snorlaxCaption');
function blow(){
  if(cake.classList.contains('out'))return;
  birthdayScene.classList.add('blowing');
  snorlaxCaption.textContent='¡Fuuuu! ¡A pedir un deseo!';
  // Primero Snorlax sopla y las llamas se apagan.
  setTimeout(()=>{
    cake.classList.add('out');
    birthdayScene.classList.remove('blowing');
    birthdayScene.classList.add('eating');
    snorlaxCaption.textContent='¡Ñam, ñam! Snorlax se está comiendo la torta.';
    burst(100,innerWidth/2,innerHeight/2);
  },1250);
 
  setTimeout(()=>{
    snorlaxCaption.textContent='Oh no !! Snorlax se comió toda la torta.';
   
    birthdayScene.classList.add('center-walk');
    burst(160,innerWidth/2,innerHeight/2);
  
    setTimeout(()=>{
      snorlaxCaption.textContent='No te preocupes. Abajo tienes otra 💖';
    },4500);
  },4300);
}
cake.onclick=blow;cake.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();blow()}};
const env=document.getElementById('env'),lt=document.getElementById('letter');
env.onclick=()=>{env.classList.add('open');setTimeout(()=>{lt.classList.add('on');burst(60,innerWidth/2,innerHeight*.6)},500)};
document.getElementById('fin').onclick=()=>{
  burst(120,innerWidth*.2,innerHeight*.8);
  burst(120,innerWidth*.8,innerHeight*.8);
  setTimeout(()=>burst(200),300);
};
setTimeout(()=>burst(80,innerWidth/2,innerHeight*.35),900);
// música
const bgm=document.getElementById('bgm'),mus=document.getElementById('mus');
function setUI(p){mus.textContent=p?'🎵':'🔇';mus.classList.toggle('play',p)}
function playMusic(){mus.classList.add('on');bgm.play().then(()=>setUI(true)).catch(()=>setUI(false))}
mus.onclick=()=>{if(bgm.paused){bgm.play().then(()=>setUI(true)).catch(()=>{})}else{bgm.pause();setUI(false)}};
