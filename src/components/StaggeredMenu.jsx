"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const StaggeredMenu = ({
  position = 'right',
  colors = ['#df1612', '#b7120e'], // Kept your theme colors
  items = [],
  socialItems = [{ label: "LinkedIn", link: "#" }],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/src/assets/logos/reactbits-gh-white.svg',
  logoText,
  menuButtonColor = '#0F172A',
  openMenuButtonColor = '#0F172A',
  changeMenuColorOnOpen = true,
  isFixed = false,
  accentColor = '#df1612',
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const openRef = useRef(false);

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);

  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);

  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

      gsap.set(textInner, { y: 0 }); // Changed from yPercent to y for pixel based calc

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { opacity: 0 }); // Fixed custom prop issue
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: 'power4.out' },
        i * 0.07
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6, ease: 'power2.out', opacity: 1, stagger: { each: 0.08, from: 'start' },
            onUpdate: function () {
              // Manually update custom prop for CSS usage if needed, or just rely on opacity
              const progress = this.progress();
              this.targets().forEach(t => t.style.setProperty('--sm-num-opacity', progress));
            }
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) tl.to(
        socialTitle,
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        socialsStart
      );
      if (socialLinks.length) {
        tl.to(socialLinks, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
          stagger: { each: 0.08, from: 'start' },
          onComplete: () => gsap.set(socialLinks, { clearProps: 'opacity' })
        }, socialsStart + 0.04);
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) gsap.set(numberEls, { opacity: 0, '--sm-num-opacity': 0 });

        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback(opening => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(opening => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    colorTweenRef.current?.kill();
    if (changeMenuColorOnOpen) {
      const targetColor = opening ? openMenuButtonColor : menuButtonColor;
      colorTweenRef.current = gsap.to(
        btn,
        { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' }
      );
    } else {
      gsap.set(btn, { color: menuButtonColor });
    }
  }, [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]);

  // Updated Animation Logic for Text - Using Y pixels instead of percent
  const animateText = useCallback(opening => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const targetY = opening ? -40 : 0; // Move exactly 40px up

    textCycleAnimRef.current = gsap.to(inner, {
      y: targetY,
      duration: 0.6,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = event => {
      const isToggleClick = toggleBtnRef.current && toggleBtnRef.current.contains(event.target);
      if (panelRef.current && !panelRef.current.contains(event.target) && !isToggleClick) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={`sm-scope z-40 top-0 left-0 w-full h-full pointer-events-none fixed overflow-visible`}>
      <div
        className={(className ? className + ' ' : '') + 'staggered-menu-wrapper relative w-full h-full overflow-visible'}
        style={accentColor ? { ['--sm-accent']: accentColor } : undefined}
        data-position={position}
        data-open={open || undefined}>
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"
          aria-hidden="true">
          {(() => {
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#df1612', '#b7120e'];
            return raw.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                style={{ background: c }} />
            ));
          })()}
        </div>

        <header
          className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between py-6 md:py-8 px-[5vw] md:px-12 lg:px-20 bg-transparent pointer-events-none z-20 overflow-visible"
          aria-label="Main navigation header">
          <div
            className="sm-logo flex items-center select-none pointer-events-auto"
            aria-label="Logo">
            {logoText ? (
              <span className="text-2xl font-bold font-heading text-[#0F172A]"
                style={{ fontFamily: 'FoundersGrotesk, sans-serif' }}>
                {logoText}
              </span>
            ) : (
              <img
                src={logoUrl || ''}
                alt="Logo"
                className="sm-logo-img block h-8 w-auto object-contain"
                draggable={false}
              />
            )}
          </div>

          <button
            ref={toggleBtnRef}
            className="sm-toggle relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer text-[#0F172A] font-medium leading-none overflow-visible pointer-events-auto"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={toggleMenu}
            type="button">

            {/* DESKTOP TEXT - Hidden on mobile */}
            <span
              ref={textWrapRef}
              className="sm-toggle-textWrap relative hidden md:inline-block h-[40px] overflow-hidden whitespace-nowrap min-w-[50px] mr-2"
              aria-hidden="true">
              <span
                ref={textInnerRef}
                className="sm-toggle-textInner flex flex-col justify-start">
                {/* EXPLICIT HEIGHT BLOCKS */}
                <span className="block h-[40px] flex items-center text-sm font-semibold tracking-widest uppercase">Menu</span>
                <span className="block h-[40px] flex items-center text-sm font-semibold tracking-widest uppercase">Close</span>
              </span>
            </span>

            {/* MOBILE HAMBURGER ICON - Visible only on mobile */}
            <span className="md:hidden relative w-[22px] h-[16px] block" aria-hidden="true">
              <span
                className="absolute left-0 w-full h-[2px] bg-current rounded-[2px] transition-all duration-300"
                style={{
                  top: open ? '7px' : '0px',
                  transform: open ? 'rotate(45deg)' : 'rotate(0deg)'
                }}
              />
              <span
                className="absolute left-0 top-[7px] w-full h-[2px] bg-current rounded-[2px] transition-opacity duration-300"
                style={{
                  opacity: open ? 0 : 1
                }}
              />
              <span
                className="absolute left-0 w-full h-[2px] bg-current rounded-[2px] transition-all duration-300"
                style={{
                  bottom: open ? '7px' : '0px',
                  transform: open ? 'rotate(-45deg)' : 'rotate(0deg)'
                }}
              />
            </span>

            {/* DESKTOP PLUS ICON - Hidden on mobile, only show on md+ */}
            <span
              ref={iconRef}
              className="sm-icon relative hidden md:inline-flex w-[14px] h-[14px] shrink-0 items-center justify-center"
              aria-hidden="true">
              <span
                ref={plusHRef}
                className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2" />
              <span
                ref={plusVRef}
                className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2" />
            </span>
          </button>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 right-0 h-full bg-white flex flex-col p-[6em_2em_2em_2em] overflow-y-auto z-10 backdrop-blur-[12px] pointer-events-auto shadow-2xl"
          aria-hidden={!open}>
          <div className="sm-panel-inner flex-1 flex flex-col gap-5 justify-center">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}>
              {items && items.length ? (
                items.map((it, idx) => {
                  const hasSubItems = it.subItems && it.subItems.length > 0;
                  const isExpanded = activeSubMenu === idx;

                  return (
                    <li
                      className="sm-panel-itemWrap relative leading-none mb-4"
                      key={it.label + idx}
                      onMouseEnter={() => hasSubItems && setActiveSubMenu(idx)}
                      onMouseLeave={() => hasSubItems && setActiveSubMenu(null)}
                    >
                      <div className="flex flex-col">
                        <a
                          className={`sm-panel-item font-heading relative text-black font-semibold text-[4rem] md:text-[5rem] cursor-pointer leading-[0.9] uppercase transition-[color] duration-150 ease-linear no-underline pr-[1.4em] group ${hasSubItems ? 'flex items-center gap-4 whitespace-nowrap' : 'inline-block'}`}
                          href={hasSubItems ? undefined : it.link}
                          aria-label={it.ariaLabel}
                          data-index={idx + 1}
                          onClick={(e) => {
                            if (hasSubItems) {
                              e.preventDefault();
                              setActiveSubMenu(isExpanded ? null : idx);
                            } else {
                              closeMenu();
                            }
                          }}>
                          <span
                            className="sm-panel-itemLabel inline-block will-change-transform group-hover:text-[#df1612] transition-colors"
                            style={{ fontFamily: 'FoundersGrotesk, sans-serif' }}>
                            {it.label}
                          </span>

                          {hasSubItems && (
                            <span className="text-[1.5rem] transition-transform duration-300">
                              ↓
                            </span>
                          )}
                        </a>

                        {/* Sub-items with staggered animation */}
                        {hasSubItems && (
                          <div
                            className={`sm-submenu overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] mt-4 pl-4 border-l-2 border-[#df1612]/20 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                          >
                            <ul className="flex flex-col gap-2 py-4">
                              {it.subItems.map((sub, sIdx) => (
                                <li key={sub.label + sIdx} className="overflow-hidden py-1">
                                  <a
                                    href={sub.link}
                                    className="sm-submenu-item block text-[1.4rem] md:text-[2rem] font-medium text-black hover:text-[#df1612] transition-all duration-300 ease-out uppercase"
                                    style={{
                                      fontFamily: 'FoundersGrotesk, sans-serif',
                                      opacity: isExpanded ? 1 : 0,
                                      transitionDelay: `${isExpanded ? 0.05 + (sIdx * 0.05) : 0}s`,
                                    }}
                                    onClick={closeMenu}
                                  >
                                    <span className="flex items-center gap-3">
                                      <span className="w-4 h-[1px] bg-[#df1612] transition-all duration-300 transform scale-x-0 origin-left group-hover:scale-x-100" />
                                      {sub.label}
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })
              ) : null}
            </ul>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div
                className="sm-socials mt-auto pt-8 flex flex-col gap-3"
                aria-label="Social links">
                <h3
                  className="sm-socials-title m-0 text-xs font-bold tracking-widest uppercase text-slate-400">Socials</h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-6 flex-wrap"
                  role="list">
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link text-sm font-medium text-slate-900 no-underline relative inline-block py-[2px] transition-colors hover:text-[#df1612]">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
      <style>{`
.sm-scope { overflow: visible !important; }
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; }
.sm-scope .staggered-menu-header { position: absolute; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 5vw; background: transparent; pointer-events: none; z-index: 20; }
@media (min-width: 768px) { .sm-scope .staggered-menu-header { padding: 2rem 3rem; } }
@media (min-width: 1024px) { .sm-scope .staggered-menu-header { padding: 2rem 5rem; } }
.sm-scope .staggered-menu-header > * { pointer-events: auto; }
.sm-scope .sm-logo { display: flex; align-items: center; user-select: none; }
.sm-scope .sm-logo-img { display: block; height: 32px; width: auto; object-fit: contain; }
.sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; gap: 0.3rem; background: transparent; border: none; cursor: pointer; color: #0F172A; font-weight: 500; line-height: 1; overflow: visible; }
.sm-scope .sm-icon { position: relative; width: 14px; height: 14px; flex: 0 0 14px; display: none; align-items: center; justify-content: center; will-change: transform; }
@media (min-width: 768px) { .sm-scope .sm-icon { display: inline-flex; } }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); will-change: transform; }
.sm-scope .sm-line { display: none !important; }
.sm-scope .staggered-menu-panel { 
  position: absolute; 
  top: 0; 
  right: 0; 
  width: clamp(260px, 38vw, 420px); 
  height: 100%; 
  background: white; 
  backdrop-filter: blur(12px); 
  -webkit-backdrop-filter: blur(12px); 
  display: flex; 
  flex-direction: column; 
  padding: 6em 2em 2em 2em; 
  overflow-y: auto; 
  z-index: 10; 
  box-shadow: -10px 0 30px rgba(0,0,0,0.05);
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
}
.sm-scope .staggered-menu-panel::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(260px, 38vw, 420px); pointer-events: none; z-index: 5; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; right: 3.2em; font-size: 18px; font-weight: 400; color: var(--sm-accent, #df1612); letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
.sm-scope[data-open] { pointer-events: auto; }
@media (max-width: 1024px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } }
@media (max-width: 640px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
