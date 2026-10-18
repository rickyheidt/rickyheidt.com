// Background scroll lock. Anything that covers the page (photo viewer, booking popup,
// mobile menu) holds a named lock while it is open; the page scrolls again once every
// lock is released. Locks are cleared when the page is restored from the back button.
(function(){
  var held={}, on=false, de=document.documentElement;
  function sync(){
    var want=Object.keys(held).length>0;
    if(want===on) return; on=want;
    if(on){ var sb=window.innerWidth-de.clientWidth; if(sb>0) de.style.setProperty('--sbw',sb+'px'); de.classList.add('scroll-locked'); if(window.__lenis) window.__lenis.stop(); }
    else { de.classList.remove('scroll-locked'); de.style.removeProperty('--sbw'); if(window.__lenis) window.__lenis.start(); }
  }
  window.__scrollLock={
    lock:function(id){ held[id]=1; sync(); },
    unlock:function(id){ delete held[id]; sync(); },
    clear:function(){ held={}; sync(); }
  };
  window.addEventListener('pageshow',function(e){ if(e.persisted) window.__scrollLock.clear(); });
})();

// Mobile menu and small helpers
(function(){
  var t=document.querySelector('.menu-toggle'),m=document.getElementById('menu');
  if(t&&m){
    var wide=window.matchMedia('(min-width: 861px)');
    var set=function(o){
      m.classList.toggle('open',o); t.setAttribute('aria-expanded',o?'true':'false');
      window.__scrollLock[o?'lock':'unlock']('menu');
    };
    t.addEventListener('click',function(){ set(!m.classList.contains('open')); });
    m.addEventListener('click',function(e){ if(e.target.closest('a')) set(false); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&m.classList.contains('open')){ set(false); t.focus(); } });
    var drop=function(){ if(wide.matches) set(false); };
    wide.addEventListener?wide.addEventListener('change',drop):wide.addListener(drop);
  }
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
    }).catch(function(){ window.open(a.href,'_blank','noopener'); });
  });
  // hold the page still while the popup is open, release it when it closes
  new MutationObserver(function(){
    window.__scrollLock[document.querySelector('.calendly-overlay')?'lock':'unlock']('calendly');
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
  function open(l,s){ list=l; i=s||0; show(); lb.hidden=false; window.__scrollLock.lock('lightbox'); }
  function close(){ lb.hidden=true; window.__scrollLock.unlock('lightbox'); }
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

// Forms in the pinned sidebar scroll inside their own box on shorter screens. The box
// keeps its scroll to itself (overscroll-behavior: contain), so reaching its top or
// bottom never carries on into the page behind it. Smooth scrolling is told to leave the
// box alone only while it actually overflows. When a field is tabbed or clicked into,
// the box scrolls just enough to show the whole field.
(function(){
  var boxes=document.querySelectorAll('.sticky');
  if(!boxes.length) return;
  function check(){
    boxes.forEach(function(b){
      var scrolls=b.scrollHeight>b.clientHeight+1 && getComputedStyle(b).overflowY!=='visible';
      if(scrolls) b.setAttribute('data-lenis-prevent',''); else b.removeAttribute('data-lenis-prevent');
    });
  }
  check();
  window.addEventListener('resize',check);
  window.addEventListener('load',check);
  if('ResizeObserver' in window){ var ro=new ResizeObserver(check); boxes.forEach(function(b){ ro.observe(b); }); }
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

(function(){
  var f=document.querySelector('[data-tour-src]');
  if(!f)return;
  var b=f.querySelector('[data-tour-start]');
  if(!b)return;
  b.addEventListener('click',function(){
    var i=document.createElement('iframe');
    i.src=f.getAttribute('data-tour-src');
    i.title='Interactive 3D tour of 16046 Summer Sage Road, Poway';
    i.allow='fullscreen; xr-spatial-tracking; gyroscope; accelerometer';
    i.setAttribute('allowfullscreen','');
    i.referrerPolicy='strict-origin-when-cross-origin';
    f.appendChild(i);
    f.removeChild(b);
    i.focus();
  });
})();

// Neighborhoods menu: on phones the list folds open from a button next to the link.
(function(){
  var li=document.querySelector('.has-sub'), b=li&&li.querySelector('.sub-toggle');
  if(!b) return;
  b.addEventListener('click',function(){
    var o=li.classList.toggle('open'); b.setAttribute('aria-expanded',o?'true':'false');
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&li.classList.contains('open')){ li.classList.remove('open'); b.setAttribute('aria-expanded','false'); } });
})();

// Neighborhood directory: filter the cards as someone types.
(function(){
  var inp=document.getElementById('dir-q'); if(!inp) return;
  var cards=[].slice.call(document.querySelectorAll('.nb')), groups=[].slice.call(document.querySelectorAll('.dir-group')),
      regions=[].slice.call(document.querySelectorAll('.dir-region')), none=document.querySelector('.dir-empty');
  inp.addEventListener('input',function(){
    var q=inp.value.trim().toLowerCase(), shown=0;
    cards.forEach(function(c){ var ok=!q||c.getAttribute('data-name').indexOf(q)>-1; c.hidden=!ok; if(ok) shown++; });
    groups.forEach(function(g){ g.hidden=!g.querySelector('.nb:not([hidden])'); });
    regions.forEach(function(r){ r.hidden=!r.querySelector('.nb:not([hidden])'); });
    if(none) none.style.display=shown?'none':'block';
    if(window.__lenis) window.__lenis.resize();
    if(window.ScrollTrigger) window.ScrollTrigger.refresh();
  });
})();
