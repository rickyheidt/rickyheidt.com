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
  // One shared photo list for a whole gallery (instead of repeating it on every tile)
  document.querySelectorAll('[data-gallery-group]').forEach(function(g){
    var list=g.getAttribute('data-gallery-group').split('|');
    g.querySelectorAll('[data-gallery-index]').forEach(function(m){
      m.addEventListener('click',function(){ open(list, parseInt(m.getAttribute('data-gallery-index'),10)||0); });
    });
  });
  lb.querySelector('.lb-close').onclick=close;
  lb.querySelector('.lb-prev').onclick=function(){ i=(i-1+list.length)%list.length; show(); };
  lb.querySelector('.lb-next').onclick=function(){ i=(i+1)%list.length; show(); };
  lb.addEventListener('click',function(e){ if(e.target===lb) close(); });
  document.addEventListener('keydown',function(e){ if(lb.hidden) return; if(e.key==='Escape') close(); if(e.key==='ArrowRight') lb.querySelector('.lb-next').click(); if(e.key==='ArrowLeft') lb.querySelector('.lb-prev').click(); });
})();

// Forms in the pinned sidebar scroll inside their own box on shorter screens. When a
// field is tabbed or clicked into, scroll that box just enough to show the whole field,
// so it is never left half hidden at the bottom edge. Does nothing where the box is not
// scrollable (phones, tablets, very tall screens).
(function(){
  document.addEventListener('focusin',function(e){
    var t=e.target, box=t&&t.closest?t.closest('.sticky'):null;
    if(!box||box.scrollHeight<=box.clientHeight+1) return;
    if(t.scrollIntoView) t.scrollIntoView({block:'nearest',inline:'nearest'});
  });
})();

// "See all photos" style toggles. A button with data-more-toggle shows or hides the block
// named in aria-controls. Photos inside it do not load until it is opened.
(function(){
  document.querySelectorAll('[data-more-toggle]').forEach(function(btn){
    var box=document.getElementById(btn.getAttribute('aria-controls')); if(!box) return;
    var lbl=btn.querySelector('.lbl'), more=btn.getAttribute('data-more-label'), less=btn.getAttribute('data-less-label');
    btn.addEventListener('click',function(){
      var open=btn.getAttribute('aria-expanded')==='true';
      box.hidden=open; btn.setAttribute('aria-expanded',open?'false':'true');
      if(lbl) lbl.textContent=open?more:less;
      // The page just changed length. Smooth scrolling still holds the old position and
      // length until it re-measures, which sent "Show fewer photos" to the wrong spot.
      if(window.__lenis) window.__lenis.resize();
      if(window.ScrollTrigger) window.ScrollTrigger.refresh();
      if(open){
        // collapsing from far down the page: bring the top of the gallery back into view
        var top=document.getElementById('gallery');
        if(top){ if(window.__lenis) window.__lenis.scrollTo(top,{offset:-90}); else top.scrollIntoView({behavior:'smooth',block:'start'}); }
      }
    });
  });
})();
