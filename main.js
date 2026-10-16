// Mobile menu and small helpers
(function(){
  var t=document.querySelector('.menu-toggle'),m=document.getElementById('menu');
  if(t&&m){t.addEventListener('click',function(){var o=m.classList.toggle('open');t.setAttribute('aria-expanded',o?'true':'false');});}
  document.querySelectorAll('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear();});
  document.querySelectorAll('.portrait img').forEach(function(i){i.addEventListener('error',function(){i.remove();});});
})();

// Calendly: loads only when someone clicks a booking button or scrolls to the calendar
(function(){
  var JS='https://assets.calendly.com/assets/external/widget.js', CSS='https://assets.calendly.com/assets/external/widget.css', p=null;
  function load(){
    if(p) return p;
    p=new Promise(function(res,rej){
      var l=document.createElement('link'); l.rel='stylesheet'; l.href=CSS; document.head.appendChild(l);
      var s=document.createElement('script'); s.src=JS; s.async=true; s.onload=res; s.onerror=rej; document.head.appendChild(s);
    });
    return p;
  }
  function url(u){ return u+(u.indexOf('?')<0?'?':'&')+'hide_gdpr_banner=1&primary_color=e2725b&utm_source=website'; }
  document.addEventListener('click',function(e){
    var a=e.target.closest('[data-calendly]'); if(!a) return;
    e.preventDefault();
    load().then(function(){
      window.Calendly.initPopupWidget({url:url(a.getAttribute('data-calendly'))});
      if(window.__lenis) window.__lenis.stop();
    }).catch(function(){ window.open(a.href,'_blank','noopener'); });
  });
  // resume smooth scroll when the popup closes
  new MutationObserver(function(){
    if(window.__lenis && !document.querySelector('.calendly-overlay')) window.__lenis.start();
  }).observe(document.body,{childList:true});
  var box=document.querySelector('[data-calendly-inline]');
  if(box){
    var go=function(){
      load().then(function(){
        box.innerHTML='';
        window.Calendly.initInlineWidget({url:url(box.getAttribute('data-calendly-inline')),parentElement:box});
      });
    };
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(en){ if(en[0].isIntersecting){ io.disconnect(); go(); } },{rootMargin:'600px'});
      io.observe(box);
    } else go();
  }
})();

// Recent sales: filter chips and photo lightbox
(function(){
  var chips=document.querySelectorAll('.chip[data-filter]');
  chips.forEach(function(c){ c.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.toggle('on',x===c);});
    var f=c.getAttribute('data-filter');
    document.querySelectorAll('.sales-grid .sale').forEach(function(s){
      s.hidden = !(f==='all' || s.getAttribute('data-area')===f || s.getAttribute('data-role')===f);
    });
    if(window.ScrollTrigger) window.ScrollTrigger.refresh();
  });});
  var lb=document.querySelector('.lightbox'); if(!lb) return;
  var img=lb.querySelector('img'), list=[], i=0;
  function show(){ img.src=list[i]; }
  function open(l,s){ list=l; i=s||0; show(); lb.hidden=false; if(window.__lenis) window.__lenis.stop(); }
  function close(){ lb.hidden=true; if(window.__lenis) window.__lenis.start(); }
  document.querySelectorAll('[data-gallery]').forEach(function(m){
    m.addEventListener('click',function(){ open(m.getAttribute('data-gallery').split('|'), parseInt(m.getAttribute('data-gallery-start')||'0',10)); });
  });
  lb.querySelector('.lb-close').onclick=close;
  lb.querySelector('.lb-prev').onclick=function(){ i=(i-1+list.length)%list.length; show(); };
  lb.querySelector('.lb-next').onclick=function(){ i=(i+1)%list.length; show(); };
  lb.addEventListener('click',function(e){ if(e.target===lb) close(); });
  document.addEventListener('keydown',function(e){ if(lb.hidden) return; if(e.key==='Escape') close(); if(e.key==='ArrowRight') lb.querySelector('.lb-next').click(); if(e.key==='ArrowLeft') lb.querySelector('.lb-prev').click(); });
})();
