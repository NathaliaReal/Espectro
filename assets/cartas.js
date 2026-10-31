(function(){
  var fit=document.querySelector('[data-fit]'); if(!fit) return;
  var btn=fit.querySelector('.flip-btn'), tilt=fit.querySelector('.tilt');
  function size(){
    var s=Math.min((window.innerWidth-32)/560,(window.innerHeight-170)/980,0.82);
    fit.style.setProperty('--s',Math.max(s,0.3).toFixed(4));
  }
  size(); window.addEventListener('resize',size);
  btn.addEventListener('click',function(){
    var on=btn.getAttribute('aria-pressed')!=='true';
    btn.setAttribute('aria-pressed',on);
    fit.querySelector('.cara-frente').setAttribute('aria-hidden',on);
    fit.querySelector('.cara-reverso').setAttribute('aria-hidden',!on);
  });
  function mover(x,y){
    var r=btn.getBoundingClientRect();
    var px=(x-r.left)/r.width, py=(y-r.top)/r.height;
    px=Math.min(Math.max(px,0),1); py=Math.min(Math.max(py,0),1);
    tilt.style.setProperty('--ry',((px-.5)*16).toFixed(2)+'deg');
    tilt.style.setProperty('--rx',((.5-py)*16).toFixed(2)+'deg');
    fit.querySelectorAll('.holo').forEach(function(h){h.style.animation='none';h.style.setProperty('--mx',(px*100).toFixed(1)+'%');h.style.setProperty('--my',(py*100).toFixed(1)+'%');});
    btn.classList.add('activo');
  }
  function soltar(){
    tilt.style.setProperty('--ry','0deg');tilt.style.setProperty('--rx','0deg');
    fit.querySelectorAll('.holo').forEach(function(h){h.style.animation='';});
    btn.classList.remove('activo');
  }
  btn.addEventListener('pointermove',function(e){mover(e.clientX,e.clientY);});
  btn.addEventListener('pointerleave',soltar);
  btn.addEventListener('pointerup',function(e){if(e.pointerType!=='mouse')setTimeout(soltar,400);});
})();
