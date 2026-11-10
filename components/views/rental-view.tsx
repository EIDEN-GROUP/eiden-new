"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Coffee,
  Gem,
  Headphones,
  Mail,
  MapPin,
  Plus,
  Phone,
  ShieldCheck,
  Star,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { SelectField } from "@/components/ui/select";
import { DateTimeField, type DateTimeValue } from "@/components/ui/date-time-field";
import { setScrollLock } from "@/components/providers/smooth-scroll";
import { siteConfig } from "@/lib/data/site";
import { getRentalCopy } from "@/lib/data/rental";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const css = `
.rental-page{--g:#0E3B33;--g-deep:#0A2E28;--g2:#16493F;--gold:#B88A55;--gold-lt:#D2A877;--sand:#EAD7BD;--cream:#F7F2EA;--card:#FCF9F4;--ink:#122620;--muted:#55635F;--line:#E6DCCD;--wrap:1180px;background:var(--cream);color:var(--ink);-webkit-font-smoothing:antialiased;overflow:hidden}
.rental-page *,.rental-page *::before,.rental-page *::after{box-sizing:border-box}
.rental-page img{max-width:100%;display:block}
.rental-page a{color:inherit;text-decoration:none}
.rental-page .wrap{max-width:var(--wrap);margin:0 auto;padding:0 24px;width:100%}
.rental-page .ico{width:1em;height:1em;flex:none;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.rental-page .serif{font-family:var(--font-editorial);font-weight:400;letter-spacing:-.01em}
.rental-page em.gold{font-style:italic;color:var(--gold)}
.rental-page .btn{position:relative;display:inline-flex;align-items:center;gap:10px;border-radius:999px;font-weight:600;font-size:15px;padding:15px 26px;line-height:1;transition:transform .2s ease,box-shadow .2s ease,background .2s ease;cursor:pointer;border:0;white-space:nowrap;overflow:hidden}
.rental-page .btn:hover{transform:translateY(-2px)}
.rental-page .btn .ico{font-size:18px}
.rental-page .btn::after{content:"";position:absolute;top:0;bottom:0;left:-60%;width:40%;transform:skewX(-20deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);pointer-events:none;opacity:0}
.rental-page .btn:hover::after{opacity:1;animation:rental-shine .8s ease}
.rental-page .btn svg:last-child{transition:transform .25s ease}
.rental-page .btn:hover svg:last-child{transform:translateX(4px)}
.rental-page .btn-sand{background:var(--sand);color:var(--g)}.rental-page .btn-sand:hover{box-shadow:0 12px 26px rgba(0,0,0,.18)}
.rental-page .btn-dark{background:var(--g);color:#fff;border:1px solid rgba(184,138,85,.5)}.rental-page .btn-dark:hover{box-shadow:0 12px 26px rgba(14,59,51,.28)}
@keyframes rental-shine{from{left:-60%}to{left:130%}}
@keyframes rental-fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
@keyframes rental-heroZoom{from{scale:1.12}to{scale:1}}
@keyframes rental-lineGrow{from{width:0}to{width:34px}}
@keyframes rental-ring{0%{box-shadow:0 0 0 0 rgba(234,215,189,.55)}70%{box-shadow:0 0 0 16px rgba(234,215,189,0)}100%{box-shadow:0 0 0 0 rgba(234,215,189,0)}}
@keyframes rental-floatY{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,-4px)}}
@keyframes rental-rise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
.rental-page .hero{position:relative;overflow:hidden;color:#fff;background:var(--g-deep);padding-bottom:170px}
.rental-page .hero-photo{position:absolute;top:0;right:0;bottom:0;width:64%;background:url(/rental-screen-1.webp) 60% center/cover no-repeat;-webkit-mask-image:linear-gradient(to right,transparent 0%,#000 30%);mask-image:linear-gradient(to right,transparent 0%,#000 30%);animation:rental-heroZoom 2.2s cubic-bezier(.2,.7,.2,1) both;will-change:transform,scale}
.rental-page .hero::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,var(--g-deep) 0%,rgba(10,46,40,.96) 36%,rgba(10,46,40,.7) 48%,rgba(10,46,40,.2) 64%,rgba(10,46,40,0) 80%)}
.rental-page .hero::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:150px;z-index:2;pointer-events:none;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 150' preserveAspectRatio='none'%3E%3Cpath d='M0 40 C 180 120 420 150 720 120 C 1000 92 1240 70 1440 96 L1440 150 L0 150Z' fill='%23F7F2EA'/%3E%3Cpath d='M0 28 C 200 108 430 138 720 108 C 1000 80 1240 58 1440 84' fill='none' stroke='%23B88A55' stroke-width='1.6' opacity='.8'/%3E%3C/svg%3E") bottom/100% 100% no-repeat}
.rental-page .hero>.wrap{position:relative;z-index:3;padding-top:108px}
.rental-page .hero-content{max-width:660px;padding:46px 0 40px}
.rental-page .hero-content>*{animation:rental-fadeUp .9s cubic-bezier(.2,.7,.2,1) both}
.rental-page .hero-content>:nth-child(1){animation-delay:.35s}
.rental-page .hero-content>:nth-child(2){animation-delay:.5s}
.rental-page .hero-content>:nth-child(3){animation-delay:.7s}
.rental-page .hero-content>:nth-child(4){animation-delay:.85s}
.rental-page .hero-content>:nth-child(5){animation-delay:.95s}
.rental-page .hero-content>:nth-child(6){animation-delay:1s}
.rental-page .eyebrow{display:flex;align-items:center;gap:14px;color:var(--gold);font-size:12px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;margin:0 0 18px}
.rental-page .eyebrow::after{content:"";width:34px;height:1px;background:currentColor;animation:rental-lineGrow .8s 1.05s both}
.rental-page .hero h1{font-size:clamp(38px,5vw,62px);line-height:1.05;margin:0 0 20px}
.rental-page .hero h1 span{color:var(--gold-lt)}
.rental-page .hero p.lead{font-size:clamp(16px,1.4vw,18px);line-height:1.55;color:rgba(255,255,255,.88);margin:0 0 30px;max-width:460px}
.rental-page .hero-address{display:flex;align-items:center;gap:10px;font-size:13px;letter-spacing:.02em;color:rgba(255,255,255,.62);margin:0 0 30px}
.rental-page .hero-address .ico{color:var(--gold)}
.rental-page .hero-actions{display:flex;flex-wrap:wrap;align-items:center;gap:20px 32px}
.rental-page .hero-secondary{display:inline-flex;align-items:center;gap:10px;font-size:14px;font-weight:500;color:rgba(255,255,255,.86);transition:color .2s ease}
.rental-page .hero-secondary:hover{color:var(--sand)}
.rental-page .hero-secondary .ico{font-size:16px}
.rental-page .features{position:relative;z-index:5;margin-top:-118px}
.rental-page .features ul{list-style:none;margin:0;padding:24px 8px;display:grid;grid-template-columns:repeat(5,1fr);background:var(--card);border:1px solid var(--line);border-radius:22px;box-shadow:0 24px 60px rgba(14,59,51,.13)}
.rental-page .features li{display:flex;flex-direction:column;align-items:center;gap:9px;text-align:center;font-size:14px;line-height:1.35;padding:4px 12px;transition:transform .3s ease}
.rental-page .features li:hover{transform:translateY(-4px)}
.rental-page .features li+li{border-left:1px solid var(--line)}
.rental-page .features .ico{font-size:28px;color:var(--g);stroke-width:1.6}
.rental-page .features li:hover .ico,.rental-page .why-list li:hover .ico{transform:scale(1.16);color:var(--gold)}
.rental-page .features span{color:var(--muted);font-size:12.5px}
.rental-page .packs{padding:70px 0 20px}
.rental-page .packs .wrap{max-width:1340px}
.rental-page .kicker{display:flex;align-items:center;justify-content:center;gap:22px;color:var(--g);font-size:13px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;margin:0 0 12px}
.rental-page .kicker::before,.rental-page .kicker::after{content:"";width:min(160px,16vw);height:1px;background:#9BA8A4}
.rental-page .h2{font-size:clamp(30px,3.4vw,42px);line-height:1.15;color:var(--g);margin:0}
.rental-page .center{text-align:center}
.rental-page .cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:56px;align-items:stretch}
.rental-page .card{position:relative;display:flex;flex-direction:column;background:var(--card);border:1px solid var(--line);border-radius:22px;box-shadow:0 18px 44px rgba(14,59,51,.09);padding-bottom:32px;transition:transform .3s ease,box-shadow .3s ease}
.rental-page .card:hover{transform:translateY(-6px);box-shadow:0 28px 60px rgba(14,59,51,.16)}
.rental-page .card::after{content:"";position:absolute;right:0;bottom:0;width:150px;height:150px;border-bottom-right-radius:22px;pointer-events:none;background:radial-gradient(circle at 100% 100%,rgba(234,215,189,.85) 0 52%,transparent 53%),radial-gradient(circle at 100% 100%,transparent 0 62%,rgba(184,138,85,.45) 62.5%,transparent 63.5%)}
.rental-page .card>*{position:relative;z-index:1}
.rental-page .badge{position:absolute;top:-24px;left:50%;transform:translateX(-50%);z-index:4;display:inline-flex;align-items:center;gap:10px;white-space:nowrap;background:var(--g);color:#fff;border:3px solid var(--cream);border-radius:999px;padding:10px 24px;font-size:18px;font-weight:600;box-shadow:0 8px 20px rgba(14,59,51,.25)}
.rental-page .badge .ico{font-size:22px}
.rental-page .card:hover .badge{animation:rental-floatY 1.6s ease-in-out infinite}
.rental-page .tag{position:absolute;top:-6px;right:-1px;z-index:3;background:var(--sand);color:var(--g);font-size:13px;font-weight:600;line-height:1.25;text-align:center;padding:9px 15px;border-radius:6px 21px 6px 14px}
.rental-page .card-img{position:relative;height:200px;border-radius:21px 21px 0 0;overflow:hidden;background:var(--g2)}
.rental-page .card-img img{object-fit:cover;transition:transform .9s cubic-bezier(.2,.7,.2,1)}
.rental-page .card:hover .card-img img{transform:scale(1.07)}
.rental-page .card-img::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:44px;background:var(--card);-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 50' preserveAspectRatio='none'%3E%3Cpath d='M0 30 C 120 0 260 58 400 18 L400 50 L0 50Z'/%3E%3C/svg%3E") bottom/100% 100% no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 50' preserveAspectRatio='none'%3E%3Cpath d='M0 30 C 120 0 260 58 400 18 L400 50 L0 50Z'/%3E%3C/svg%3E") bottom/100% 100% no-repeat}
.rental-page .card-body{display:flex;flex-direction:column;gap:12px;flex:1;padding:18px 30px 0;text-align:center}
.rental-page .card h3{font-size:25px;margin:0;color:var(--g)}
.rental-page .price{font-family:var(--font-editorial);font-size:56px;line-height:1;color:var(--g);margin:0}
.rental-page .price small{font-size:.5em;margin-left:4px}
.rental-page .price--text{font-family:var(--font-sans);font-size:30px;font-weight:600;letter-spacing:-.02em}
.rental-page .card p.desc{margin:0;font-size:15px;line-height:1.5;color:var(--muted);text-wrap:balance}
.rental-page .checks{list-style:none;padding:0;margin:6px auto 0;text-align:left;width:fit-content}
.rental-page .checks li{display:flex;align-items:flex-start;gap:12px;padding:3px 0;font-size:14px;line-height:1.4;max-width:320px;transition:transform .25s ease}
.rental-page .card:hover .checks li{transform:translateX(3px)}
.rental-page .checks .ico{width:16px;height:16px;margin-top:2px;color:var(--g);stroke-width:2.6}
.rental-page .card .btn{margin:auto auto 0;margin-top:22px;align-self:center}
.rental-page .card.feat{background:linear-gradient(170deg,var(--g2),var(--g) 60%);border-color:var(--g);transform:translateY(-10px);box-shadow:0 30px 70px rgba(14,59,51,.3)}
.rental-page .card.feat:hover{transform:translateY(-16px)}
.rental-page .card.feat::after{background:radial-gradient(circle at 100% 100%,transparent 0 62%,rgba(184,138,85,.55) 62.5%,transparent 63.5%)}
.rental-page .card.feat .card-img::after{background:var(--g)}
.rental-page .card.feat h3,.rental-page .card.feat .price{color:#F3E6D3}
.rental-page .card.feat p.desc{color:rgba(255,255,255,.82)}
.rental-page .card.feat .checks li{color:#fff}
.rental-page .card.feat .checks .ico{color:#fff}
.rental-page .card.feat .btn-dark{background:var(--g-deep);border-color:rgba(234,215,189,.45)}
.rental-page .practice{padding:44px 0 60px}
.rental-page .practice-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:54px;align-items:start}
.rental-page .practice .kicker{justify-content:flex-start}
.rental-page .practice .kicker::after{display:none}
.rental-page .practice .kicker::before{width:60px}
.rental-page .practice-lead{margin:18px 0 0;font-size:15px;line-height:1.6;color:var(--muted);max-width:420px}
.rental-page .photos{display:grid;grid-template-columns:1.35fr 1fr;grid-template-rows:repeat(2,178px);gap:14px;margin-top:34px}
.rental-page .photos figure{position:relative;overflow:hidden;border-radius:18px;margin:0;background:var(--g2);min-height:0}
.rental-page .photos figure:first-child{grid-row:span 2}
.rental-page .photos img{width:100%;height:100%;object-fit:cover;transition:transform .9s cubic-bezier(.2,.7,.2,1)}
.rental-page .photos figure:hover img{transform:scale(1.05)}
.rental-page .photos figcaption{position:absolute;left:0;right:0;bottom:0;padding:34px 18px 14px;font-size:12.5px;line-height:1.4;color:#fff;background:linear-gradient(to top,rgba(10,46,40,.86),transparent)}
/* Side card lines up with the h2, not the kicker above it. Measured at 1440px:
   the kicker's outer height (22.75px line + 12px bottom margin) is what sits
   between the kicker top and the h2 top. Desktop only; the stacked single-column
   layout below 1025px needs no offset. */
@media (min-width:1025px){.rental-page .practice .side{margin-top:35px}}
.rental-page .side{display:flex;flex-direction:column}
.rental-page .side h3{margin:0;font-size:13px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--g)}
.rental-page .side-card{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:26px 28px 28px;box-shadow:0 18px 44px rgba(14,59,51,.09)}
.rental-page .side-card .btn{width:100%;justify-content:center;margin-top:24px}
.rental-page .kit{list-style:none;margin:18px 0 0;padding:0;display:grid;gap:0}
.rental-page .kit li{display:flex;align-items:baseline;justify-content:space-between;gap:18px;padding:13px 0;border-top:1px solid var(--line);font-size:14.5px;color:var(--ink)}
.rental-page .kit li:last-child{border-bottom:1px solid var(--line)}
.rental-page .kit span{color:var(--muted);font-size:12.5px;text-align:right}
.rental-page .crumbs{margin:0 0 14px;font-size:12px;letter-spacing:.03em;color:rgba(255,255,255,.55)}
.rental-page .crumbs ol{display:flex;flex-wrap:wrap;align-items:center;gap:10px;list-style:none;margin:0;padding:0}
.rental-page .crumbs li{display:flex;align-items:center;gap:10px}
.rental-page .crumbs li+li::before{content:"/";color:var(--gold-lt);opacity:.85}
.rental-page .crumbs a{color:rgba(255,255,255,.66);transition:color .2s ease}
.rental-page .crumbs a:hover{color:var(--sand)}
.rental-page .crumbs [aria-current="page"]{color:var(--sand)}
.rental-page .faq-answer a{color:var(--g);font-weight:600;border-bottom:1px solid var(--gold);transition:color .2s ease,border-color .2s ease}
.rental-page .faq-answer a:hover{color:var(--gold);border-color:var(--gold)}
.rental-page .faq{padding:6px 0 48px}
.rental-page .faq-list{margin:34px auto 0;max-width:880px;border-bottom:1px solid var(--line)}
.rental-page .faq-item{border-top:1px solid var(--line)}
.rental-page .faq-item summary{display:flex;align-items:baseline;justify-content:space-between;gap:20px;padding:17px 4px;cursor:pointer;list-style:none;font-size:15.5px;font-weight:600;line-height:1.4;color:var(--g);border-radius:8px}
.rental-page .faq-item summary::-webkit-details-marker{display:none}
.rental-page .faq-item summary:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
.rental-page .faq-plus{flex:none;font-size:21px;line-height:1;color:var(--gold);transition:transform .3s ease}
.rental-page .faq-item[open] .faq-plus{transform:rotate(45deg)}
.rental-page .faq-answer{padding:0 4px 17px}
.rental-page .faq-answer p{margin:0;font-size:14.5px;line-height:1.62;color:var(--muted);max-width:70ch}
.rental-page .why{position:relative;overflow:hidden;padding:26px 0 12px}
.rental-page .why .wrap{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);gap:40px;align-items:start}
.rental-page .why-kicker{font-size:12px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--g);margin:0 0 12px}
.rental-page .why-kicker span{color:var(--gold)}
.rental-page .why .h2{margin:0 0 14px}
.rental-page .why p{font-size:14.5px;line-height:1.55;margin:0 0 22px;max-width:400px;color:var(--muted)}
.rental-page .why .btn{padding:13px 24px;font-size:14.5px}
.rental-page .why-list{list-style:none;margin:0;padding:24px 0 0 26px;display:grid;grid-template-columns:repeat(2,1fr);gap:34px 26px;border-left:1px solid var(--line)}
.rental-page .why-list li{display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;font-size:13.5px;line-height:1.35;padding:0 10px;transition:transform .3s ease}
.rental-page .why-list li:hover{transform:translateY(-4px)}
.rental-page .why-list li:nth-child(even){border-left:1px solid var(--line)}
.rental-page .why-list .ico{font-size:30px;color:var(--g);stroke-width:1.6}
.rental-page .why-list b{font-weight:600;color:var(--ink);display:block}
.rental-page .why-list span{color:var(--muted)}
/* The ticket is tucked across a hard cream-to-ink split, exactly like a
   ticket tucked into a sleeve: the two halves of the section are symmetric
   around the card, so the seam always falls through its middle. Below it,
   the site's own footer curtain rises out of the same ink, and the end of
   the page never shows a seam. */
.rental-page .cta-wrap{position:relative;z-index:3;background:linear-gradient(to bottom,var(--cream) 50%,var(--ink) 50%);padding:64px 0}
.rental-page .cta-stage{position:relative}
.rental-page .cta-stage .wrap{position:relative;z-index:1;width:100%}
.rental-page .cta{position:relative;display:grid;grid-template-columns:170px minmax(0,1fr) auto;align-items:stretch;color:#fff;background:var(--g);border-radius:22px;box-shadow:0 30px 60px -24px rgba(6,30,26,.6);overflow:hidden}
.rental-page .cta::before{content:"";position:absolute;inset:9px;border:1px solid rgba(210,168,119,.32);border-radius:15px;pointer-events:none}
.rental-page .cta::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:.09;mix-blend-mode:overlay;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.rental-page .cta-stub{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px 12px;background:var(--g-deep)}
.rental-page .cta-stub-num{font-family:var(--font-editorial);font-size:72px;line-height:.85;color:var(--sand);transition:transform .4s cubic-bezier(.3,1.6,.5,1)}
.rental-page .cta:hover .cta-stub-num{transform:scale(1.06)}
.rental-page .cta-stub-lbl{margin-top:10px;font-size:10.5px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.6);text-align:center;line-height:1.6}
.rental-page .cta-perf{position:absolute;top:0;bottom:0;left:170px;width:0;border-left:2px dashed rgba(234,215,189,.3);margin:20px 0;z-index:1}
.rental-page .cta-notch{position:absolute;left:158px;width:24px;height:24px;border-radius:50%;z-index:2}
.rental-page .cta-notch.t{top:-12px;background:var(--cream)}
.rental-page .cta-notch.b{bottom:-12px;background:var(--ink)}
.rental-page .cta-stage>.wrap{padding-bottom:0}
.rental-page .cta-main{position:relative;z-index:1;padding:34px 44px;display:flex;flex-direction:column;justify-content:center;min-width:0}
.rental-page .cta-kicker{margin:0 0 10px;font-size:11.5px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--gold-lt)}
.rental-page .cta h2{margin:0;font-size:clamp(24px,2.5vw,33px);line-height:1.15;color:#fff;max-width:24ch}
.rental-page .cta h2 em{font-style:italic;color:var(--sand)}
.rental-page .cta-main p{margin:10px 0 0;font-size:14.5px;color:rgba(255,255,255,.72)}
.rental-page .cta-act{position:relative;z-index:1;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:12px;padding:30px 44px 30px 36px;border-left:1px solid rgba(255,255,255,.08)}
.rental-page .cta-lbl{font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.55)}
.rental-page .cta-phone{display:inline-flex;align-items:center;gap:12px;padding:14px 26px 14px 14px;border-radius:14px;background:var(--sand);color:var(--g);font-size:22px;font-weight:700;letter-spacing:.02em;white-space:nowrap;font-variant-numeric:tabular-nums;box-shadow:0 3px 0 #C9AF8C;transition:transform .15s ease,box-shadow .15s ease;animation:rental-ring 2.6s 1s infinite}
.rental-page .cta-phone:hover{transform:translateY(-2px);box-shadow:0 5px 0 #C9AF8C}
.rental-page .cta-phone:active{transform:translateY(1px);box-shadow:0 1px 0 #C9AF8C}
.rental-page .cta-phone span{display:grid;place-items:center;width:38px;height:38px;border-radius:10px;background:var(--g)}
.rental-page .cta-phone .ico{font-size:19px;fill:none;stroke:var(--sand);stroke-width:2.1;stroke-linecap:round;stroke-linejoin:round}
.rental-page .cta-wa{font-size:13.5px;font-weight:500;color:rgba(255,255,255,.82);border-bottom:1px solid rgba(234,215,189,.4);padding-bottom:2px;transition:color .2s,border-color .2s}
.rental-page .cta-wa:hover{color:var(--sand);border-color:var(--sand)}
.rental-page .cta-reply{font-size:12.5px;color:rgba(255,255,255,.55)}
/* Channel chooser, opened by every booking call-to-action */
.rental-page .chooser{position:relative;width:min(480px,100%);border-radius:22px;background:var(--cream);color:var(--ink);box-shadow:0 44px 120px rgba(0,0,0,.5),0 12px 34px rgba(7,28,25,.28);border:1px solid rgba(184,138,85,.4);padding:28px 26px 18px;animation:rental-fadeUp .45s cubic-bezier(.2,.7,.2,1) both}
.rental-page .chooser-close{position:absolute;top:13px;right:13px;border:0;background:transparent;color:var(--g);cursor:pointer;padding:6px;border-radius:10px;transition:opacity .2s,transform .2s}
.rental-page .chooser-close:hover{opacity:.6;transform:rotate(90deg)}
.rental-page .chooser-kicker{margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.rental-page .chooser-title{margin:0;font-family:var(--font-editorial);font-weight:400;font-size:29px;line-height:1.14;color:var(--g)}
.rental-page .chooser-sub{margin:8px 0 0;font-size:13.5px;line-height:1.55;color:var(--muted);max-width:40ch}
.rental-page .chooser-options{display:flex;flex-direction:column;gap:12px;margin:20px 0 12px}
.rental-page .chooser-option{display:flex;align-items:center;gap:16px;width:100%;text-align:left;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px 16px;cursor:pointer;color:var(--ink);text-decoration:none;transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease}
.rental-page .chooser-option:hover{transform:translateY(-2px);border-color:var(--gold);box-shadow:0 18px 36px rgba(14,59,51,.14)}
.rental-page .chooser-option:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
.rental-page .chooser-ico{display:grid;place-items:center;flex:0 0 auto;width:48px;height:48px;border-radius:12px}
.rental-page .chooser-ico--wa{background:#25D366;color:#0A2E28}
.rental-page .chooser-ico--wa svg{width:26px;height:26px;fill:#0A2E28}
.rental-page .chooser-ico--email{background:var(--g);color:var(--sand)}
.rental-page .chooser-option-text{display:flex;flex-direction:column;gap:3px;min-width:0}
.rental-page .chooser-option-text b{font-size:16.5px;font-weight:650;letter-spacing:-.01em;color:var(--g)}
.rental-page .chooser-option-text span{font-size:12.5px;color:var(--muted)}
.rental-page .chooser-arrow{margin-left:auto;color:var(--gold);font-size:20px;transition:transform .25s ease}
.rental-page .chooser-option:hover .chooser-arrow{transform:translateX(5px)}
.rental-page .chooser-foot{margin:0;font-size:12px;color:var(--muted);text-align:center;border-top:1px solid var(--line);padding-top:13px}
/* The portal carries no paint of its own and neither does the veil below:
   the page stays fully visible around the overlay, which separates itself
   with its shadow instead of dimming anything. */
.rental-portal{position:fixed;inset:0;z-index:120}
/* The portal wears the page class too, and that class paints the cream
   canvas. Without this, the whole viewport goes opaque behind the overlay. */
.rental-page.rental-portal{background:transparent}
/* Transparent backdrop, real frosted blur: the page stays visible, softened. */
.rental-page .modal-back{position:fixed;inset:0;z-index:90;background:transparent;backdrop-filter:blur(7px) saturate(1.08);-webkit-backdrop-filter:blur(7px) saturate(1.08);display:grid;place-items:center;padding:18px}
.rental-page .modal{--mp:30px;width:min(680px,100%);max-height:92svh;overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;border-radius:22px;background:var(--cream);color:var(--ink);box-shadow:0 44px 120px rgba(0,0,0,.5),0 12px 34px rgba(7,28,25,.28);border:1px solid rgba(184,138,85,.4)}
/* The package/date popovers float fixed against the backdrop, so the modal is free
   to scroll internally if the form outgrows the viewport. */
.rental-page .modal-head{display:flex;justify-content:space-between;align-items:flex-start;gap:24px;padding:22px 30px 0}
.rental-page .modal-head h2{font:400 28px/1.05 var(--font-editorial);color:var(--g);margin:0}
.rental-page .modal-kicker{margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.rental-page .modal-sub{margin:8px 0 0;font-size:14px;line-height:1.5;color:var(--muted);max-width:46ch}
.rental-page .modal-close{border:0;background:transparent;color:var(--g);cursor:pointer;padding:2px;transition:opacity .2s}
.rental-page .modal-close:hover{opacity:.6}
.rental-page .datetime-field-flex{display:flex;gap:10px;align-items:flex-start}
.rental-page .datetime-remove-static{flex:0 0 auto;display:grid;place-items:center;width:46px;height:48px;margin-top:2px;border:1px solid var(--line);border-radius:12px;background:var(--card);color:var(--muted);cursor:pointer;transition:color .2s,border-color .2s}
.rental-page .datetime-remove-static:hover{color:#b91c1c;border-color:#fca5a5}
.rental-page .datetime-add{display:inline-flex;align-items:center;gap:10px;width:100%;justify-content:center;border:1.5px dashed var(--line);background:transparent;border-radius:14px;padding:12px 16px;font-size:13px;font-weight:600;letter-spacing:.04em;color:var(--muted);cursor:pointer;transition:border-color .25s,color .25s,background .25s}
.rental-page .datetime-add:hover{border-color:var(--gold);color:var(--g);background:rgba(184,138,85,.08)}
.rental-page .form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 22px;padding:18px var(--mp) 24px}
.rental-page .form-field{display:flex;flex-direction:column;gap:6px}
.rental-page .form-field.full{grid-column:1/-1}
.rental-page .form-field label{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
.rental-page .form-field input{width:100%;border:0;border-bottom:1px solid var(--line);background:transparent;padding:10px 0;font:500 15px var(--font-sans);color:var(--ink);outline:none}
.rental-page .form-field input:focus{border-color:var(--gold)}
.rental-page .form-field input::placeholder{color:rgba(85,99,95,.6)}
.rental-page .form-message{min-height:1.4em;margin:0;font-size:13px}
.rental-page .form-actions{grid-column:1/-1;display:flex;flex-wrap:wrap;align-items:center;gap:16px;position:sticky;bottom:-24px;z-index:2;margin:0 calc(var(--mp)*-1);padding:10px var(--mp) 16px;border-top:1px solid var(--line);background:var(--cream)}
.rental-page input,.rental-page textarea,.rental-page button,.rental-page select{font-family:var(--font-sans)}
.rental-page .reveal{opacity:0;transform:translateY(28px)}
.rental-page .reveal.in{opacity:1;transform:none;transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
@media (prefers-reduced-motion:reduce){.rental-page *,.rental-page *::before,.rental-page *::after{animation:none!important;transition:none!important}.rental-page .reveal{opacity:1!important;transform:none!important}}
@media (max-width:1024px){.rental-page .features ul{grid-template-columns:repeat(3,1fr);row-gap:22px}.rental-page .features li:nth-child(4){border-left:0}.rental-page .cards{grid-template-columns:minmax(0,1fr);max-width:540px;margin-left:auto;margin-right:auto;gap:56px}.rental-page .card.feat{transform:none}.rental-page .card.feat:hover{transform:translateY(-6px)}.rental-page .why .wrap{grid-template-columns:1fr}.rental-page .why-list{border-left:0;padding-left:0}.rental-page .practice-grid{grid-template-columns:1fr;gap:40px}}
@media (max-width:820px){.rental-page .hero-photo{width:100%;opacity:.42}.rental-page .hero::before{background:linear-gradient(180deg,rgba(10,46,40,.7),rgba(10,46,40,.88))}.rental-page .hero-content{padding-top:158px}}
@media (max-width:900px){.rental-page .cta{grid-template-columns:120px minmax(0,1fr)}.rental-page .cta-perf{display:none}.rental-page .cta-notch{left:108px}.rental-page .cta-notch.b{display:none}.rental-page .cta-stub{border-radius:22px 0 0 0;border-right:2px dashed rgba(234,215,189,.3)}.rental-page .cta-stub-num{font-size:54px}.rental-page .cta-main{padding:28px 30px}.rental-page .cta-act{grid-column:1/-1;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:space-between;border-left:0;border-top:1px solid rgba(255,255,255,.08);padding:20px 30px 26px}.rental-page .cta-lbl{display:none}}
@media (max-width:640px){.rental-page .wrap{padding:0 18px}.rental-page .hero{padding-bottom:140px}.rental-page .hero-photo{opacity:.38}.rental-page .hero-content{padding-top:146px}.rental-page .features ul{grid-template-columns:repeat(2,1fr)}.rental-page .features li+li{border-left:0}.rental-page .features li:last-child{grid-column:1/-1}.rental-page .photos{grid-template-columns:1fr;grid-template-rows:none}.rental-page .photos figure:first-child{grid-row:auto;aspect-ratio:4/3}.rental-page .photos figure:not(:first-child){aspect-ratio:16/10}.rental-page .why-list{grid-template-columns:repeat(2,1fr);row-gap:26px}.rental-page .why-list li+li{border-left:0}.rental-page .why-list li:nth-child(even){border-left:0}.rental-page .why{padding-bottom:16px}.rental-page .cta{grid-template-columns:1fr}.rental-page .cta-stub{flex-direction:row;align-items:baseline;justify-content:flex-start;gap:12px;padding:18px 22px;border-right:0;border-bottom:1px solid rgba(234,215,189,.16)}.rental-page .cta-stub-num{font-size:40px}.rental-page .cta-stub-lbl{margin:0;text-align:left}.rental-page .cta-perf,.rental-page .cta-notch{display:none}.rental-page .cta-main{padding:26px 24px 8px;text-align:center;align-items:center}.rental-page .cta-act{grid-column:auto;padding:16px 24px 28px;align-items:center;flex-direction:column}.rental-page .cta-phone{width:100%;justify-content:center;font-size:20px}.rental-page .cta-wrap{padding:96px 0}.rental-page .datetime-field-flex{display:flex;gap:10px;align-items:flex-start}
.rental-page .datetime-remove-static{flex:0 0 auto;display:grid;place-items:center;width:46px;height:48px;margin-top:2px;border:1px solid var(--line);border-radius:12px;background:var(--card);color:var(--muted);cursor:pointer;transition:color .2s,border-color .2s}
.rental-page .datetime-remove-static:hover{color:#b91c1c;border-color:#fca5a5}
.rental-page .datetime-add{display:inline-flex;align-items:center;gap:10px;width:100%;justify-content:center;border:1.5px dashed var(--line);background:transparent;border-radius:14px;padding:12px 16px;font-size:13px;font-weight:600;letter-spacing:.04em;color:var(--muted);cursor:pointer;transition:border-color .25s,color .25s,background .25s}
.rental-page .datetime-add:hover{border-color:var(--gold);color:var(--g);background:rgba(184,138,85,.08)}
.rental-page .modal{--mp:22px}.rental-page .form-grid{grid-template-columns:1fr;padding:18px var(--mp) 24px}.rental-page .modal-head{padding:22px 22px 0}}
`;

const fieldClass =
  "border-0 border-b border-[#E6DCCD] bg-transparent px-0 py-2.5 font-medium text-[15px] text-[#12302A] outline-none transition-colors duration-300 placeholder:text-[#55635F]/60 focus:border-[#B88A55]";

type Errors = Partial<Record<"name" | "email" | "phone", string>>;

/* Brand glyph from the site's floating actions, same path and weight. */
function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

type ReservationFormProps = {
  initialPackage?: number;
  copy: ReturnType<typeof getRentalCopy>;
  locale: "fr" | "en";
};

/* Half-hour slots across the venue's opening window (8:00 to 22:00). */
function ReservationForm({
  initialPackage = 1,
  copy,
  locale,
}: ReservationFormProps) {
  const [packageIndex, setPackageIndex] = useState(initialPackage);
  const [sessions, setSessions] = useState<DateTimeValue[]>([
    { date: "", from: "", to: "" },
  ]);
  const [errors, setErrors] = useState<Errors>({});
  const [sessionErrors, setSessionErrors] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sending, setSending] = useState(false);
  const [formLoadedAt] = useState(() => Date.now());
  const [csrfToken] = useState(() =>
    typeof window !== "undefined"
      ? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
      : "",
  );

  useEffect(() => {
    setPackageIndex(initialPackage);
  }, [initialPackage]);

  const selectedPackage = copy.packages[packageIndex];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const sessionErrors = sessions.map((session) =>
      session.date && session.from && session.to ? "" : "✕",
    );
    const hasSessionError = sessionErrors.some(Boolean);
    const fmt = new Intl.DateTimeFormat(
      locale === "fr" ? "fr-FR" : "en-GB",
      { weekday: "long", day: "numeric", month: "long", year: "numeric" },
    );
    const sessionsPayload = sessions.map((session) => ({
      dateLabel: session.date
        ? fmt.format(new Date(`${session.date}T00:00:00`))
        : "",
      timeLabel:
        session.from && session.to ? `${session.from} → ${session.to}` : "",
    }));
    const participants = String(data.get("participants") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name || !/^[a-zA-ZÀ-ÿ\s'-]{2,120}$/.test(name)) nextErrors.name = "✕";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      nextErrors.email = "✕";
    if (!phone || !/^[\d\s()+.-]{7,30}$/.test(phone)) nextErrors.phone = "✕";

    setErrors(nextErrors);
    setSessionErrors(sessionErrors);
    if (Object.keys(nextErrors).length || sessionErrors.some(Boolean)) return;

    setSending(true);
    setFailed(false);

    try {
      const response = await fetch("/api/rental", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          packageName: selectedPackage,
          sessions: sessionsPayload,
          participants,
          message,
          locale,
          formLoadedAt,
          jsChallenge: String(formLoadedAt),
          csrfToken,
        }),
      });
      const json = (await response.json().catch(() => null)) as {
        ok?: boolean;
      } | null;
      if (!response.ok || !json?.ok) throw new Error("send_failed");
      form.reset();
      setPackageIndex(1);
      setSessions([{ date: "", from: "", to: "" }]);
      setSessionErrors([]);
      setSent(true);
      trackEvent("generate_lead", {
        method: "rental_form",
        package: selectedPackage,
        sessions: sessions.length,
      });
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="form-grid">
      <Field id="name" label={copy.form.name} error={errors.name} required>
        <input
          id="name"
          name="name"
          autoComplete="name"
          className={cn(fieldClass, errors.name && "border-red-400")}
          aria-invalid={Boolean(errors.name)}
        />
      </Field>
      <Field id="company" label={copy.form.company}>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          className={fieldClass}
        />
      </Field>
      <Field id="email" label={copy.form.email} error={errors.email} required>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={cn(fieldClass, errors.email && "border-red-400")}
          aria-invalid={Boolean(errors.email)}
        />
      </Field>
      <Field id="phone" label={copy.form.phone} error={errors.phone} required>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={cn(fieldClass, errors.phone && "border-red-400")}
          aria-invalid={Boolean(errors.phone)}
        />
      </Field>
      <div className="form-field full">
        <label id="package-label" htmlFor="rental-package">
          {copy.form.package}
        </label>
        <SelectField
          id="rental-package"
          labelledBy="package-label"
          options={copy.packages}
          value={packageIndex}
          onChange={setPackageIndex}
        />
      </div>
      {sessions.map((session, index) => (
        <Field
          key={index}
          id={`datetime-${index}`}
          label={
            sessions.length > 1
              ? `${copy.form.datetime} ${index + 1}`
              : copy.form.datetime
          }
          error={sessionErrors[index]}
          required
          full
        >
          <div className="datetime-field-flex">
            <DateTimeField
              id={`datetime-${index}`}
              labelledBy={`datetime-${index}-label`}
              locale={locale}
              value={session}
              className="min-w-0 flex-1"
              onChange={(next) => {
                setSessions((previous) =>
                  previous.map((row, rowIndex) =>
                    rowIndex === index ? next : row,
                  ),
                );
                setSessionErrors((previous) =>
                  previous.map((row, rowIndex) =>
                    rowIndex === index &&
                    next.date &&
                    next.from &&
                    next.to
                      ? ""
                      : row,
                  ),
                );
              }}
              placeholder={copy.form.datetimePlaceholder}
            />
            {index > 0 ? (
              <button
                type="button"
                className="datetime-remove-static"
                onClick={() => {
                  setSessions((previous) =>
                    previous.filter((_, row) => row !== index),
                  );
                  setSessionErrors((previous) =>
                    previous.filter((_, row) => row !== index),
                  );
                }}
                aria-label={copy.form.datetimeRemove}
              >
                <X width={18} height={18} strokeWidth={1.8} aria-hidden />
              </button>
            ) : null}
          </div>
        </Field>
      ))}
      <div className="form-field full">
        <button
          type="button"
          className="datetime-add"
          onClick={() =>
            setSessions((previous) => [
              ...previous,
              { date: "", from: "", to: "" },
            ])
          }
        >
          <Plus width={18} height={18} strokeWidth={1.8} aria-hidden />
          {copy.form.datetimeAdd}
        </button>
      </div>
      <Field id="participants" label={copy.form.participants}>
        <input
          id="participants"
          name="participants"
          inputMode="numeric"
          placeholder="12"
          className={fieldClass}
        />
      </Field>
      <Field id="message" label={copy.form.message}>
        <input
          id="message"
          name="message"
          placeholder={copy.form.messagePlaceholder}
          className={fieldClass}
        />
      </Field>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px]"
      />
      <input type="hidden" name="formLoadedAt" value={formLoadedAt} />
      <input type="hidden" name="jsChallenge" value={String(formLoadedAt)} />
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <div className="form-actions">
        <button className="btn btn-dark" type="submit" disabled={sending}>
          {sending ? copy.form.sending : copy.form.submit}
          <ArrowRight className="ico" aria-hidden />
        </button>
        <p aria-live="polite" className="form-message">
          {sent ? (
            <span className="font-semibold text-[#0e7a73]">
              {copy.form.success}
            </span>
          ) : failed ? (
            <span className="font-semibold text-red-600">{copy.form.error}</span>
          ) : null}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  full,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`form-field${full ? " full" : ""}`}>
      <label id={`${id}-label`} htmlFor={id}>
        {label}
        {required ? (
          <span aria-hidden className="text-[#B88A55]">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-[12.5px] font-semibold text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function RentalView() {
  const { locale } = useLanguage();
  const copy = getRentalCopy(locale);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationPackage, setReservationPackage] = useState(1);
  const [chooserIndex, setChooserIndex] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const chooserCloseButton = useRef<HTMLButtonElement>(null);
  const phone = siteConfig.phoneMa;
  const waDigits = `212${phone
    .replace(/\D/g, "")
    .replace(/^212/, "")
    .replace(/^0/, "")}`;
  /* The floating “Écrivez-nous sur WhatsApp” opens the chat with a generic,
     locale-aware message already typed in. */
  const waGeneric = `https://wa.me/${waDigits}?text=${encodeURIComponent(
    copy.chooser.whatsappGeneric,
  )}`;

  /* Every booking call-to-action opens the channel chooser first, so the
     visitor picks WhatsApp or email before anything happens. */
  const goToReservation = useCallback((packageIndex = 1) => {
    trackEvent("booking_chooser_open", {
      package: copy.packages[packageIndex],
      locale,
      page: "/rental",
    });
    setChooserIndex(packageIndex);
  }, [copy.packages, locale]);

  const closeChooser = useCallback(() => setChooserIndex(null), []);

  /* WhatsApp: the message is prewritten for the chosen pack and written in
     the language the visitor is reading the page in. */
  const chooserWhatsappHref =
    chooserIndex !== null
      ? `https://wa.me/${waDigits}?text=${encodeURIComponent(
          copy.chooser.whatsappMessages[chooserIndex] ??
            copy.chooser.whatsappGeneric,
        )}`
      : "#";

  const chooseEmail = useCallback(() => {
    if (chooserIndex === null) return;
    setReservationPackage(chooserIndex);
    setReservationOpen(true);
    setChooserIndex(null);
  }, [chooserIndex]);

  const closeReservation = useCallback(() => setReservationOpen(false), []);

  const overlayOpen = chooserIndex !== null || reservationOpen;

  /* The overlay owns the screen while it is open: the page behind it must
     not scroll under the visitor's hands, and Escape must always close it. */
  useEffect(() => {
    if (!overlayOpen) return;
    setScrollLock(true);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeChooser();
        closeReservation();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    chooserCloseButton.current?.focus();
    closeButton.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      setScrollLock(false);
    };
  }, [overlayOpen, closeReservation, closeChooser]);

  /* Scroll reveals. The observer plays the entrance for what the visitor is
     looking at; a safety timer releases anything it has not reached, so no
     block of copy can ever stay hidden behind a missed callback. */
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".rental-page .reveal"),
    );
    if (!nodes.length) return;

    const show = (node: HTMLElement) => {
      node.classList.add("in");
      window.setTimeout(() => node.classList.remove("reveal", "in"), 1000);
    };

    if (!("IntersectionObserver" in window)) {
      for (const node of nodes) show(node);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const node = entry.target as HTMLElement;
          show(node);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    for (const node of nodes) observer.observe(node);

    const safety = window.setTimeout(() => {
      for (const node of nodes) {
        if (!node.classList.contains("in")) show(node);
      }
      observer.disconnect();
    }, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, [locale]);

  const amenities = [
    { icon: Gem, ...copy.features[0] },
    { icon: Wifi, ...copy.features[1] },
    { icon: Coffee, ...copy.features[2] },
    { icon: Users, ...copy.features[3] },
    { icon: MapPin, ...copy.features[4] },
  ];

  const reasons = [
    { icon: Gem, ...copy.reasons.items[0] },
    { icon: ShieldCheck, ...copy.reasons.items[1] },
    { icon: Headphones, ...copy.reasons.items[2] },
    { icon: BarChart3, ...copy.reasons.items[3] },
  ];

  return (
    <div className="rental-page">
      <style>{css}</style>
      <noscript>
        <style>{`.rental-page .reveal{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      {/* Hero */}
      <section
        className="hero"
        id="salle"
        data-nav-tone="dark"
        aria-label={copy.hero.title}
      >
        <div
          className="hero-photo"
          role="img"
          aria-label="Salle de formation équipée EIDEN à Agadir Bay : grande table, chaises, tableau blanc et écran TV 55 pouces"
        />
        <div className="wrap">
          <div className="hero-content">
            <nav className="crumbs" aria-label={copy.crumbs.navLabel}>
              <ol>
                <li>
                  <a href="/">{copy.crumbs.home}</a>
                </li>
                <li aria-current="page">{copy.crumbs.current}</li>
              </ol>
            </nav>
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1 className="serif">{copy.hero.title}</h1>
            <p className="lead">{copy.hero.lead}</p>
            <p className="hero-address">
              <MapPin className="ico" aria-hidden />
              {copy.hero.address}
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-sand"
                onClick={() => goToReservation(1)}
              >
                <Calendar className="ico" aria-hidden />
                {copy.hero.primary}
                <ArrowRight className="ico" aria-hidden />
              </button>
              <a href="#packs" className="hero-secondary">
                {copy.hero.secondary}
                <ChevronDown className="ico" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section
        className="features wrap"
        aria-label={locale === "fr" ? "Équipements de la salle" : "Room amenities"}
      >
        <ul>
          {amenities.map(({ icon: Icon, title, detail }) => (
            <li key={title}>
              <Icon className="ico" aria-hidden />
              <b>{title}</b>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Packs */}
      <section className="packs" id="packs" aria-labelledby="packs-heading">
        <div className="wrap">
          <p className="kicker reveal">{copy.packs.kicker}</p>
          <h2 className="h2 serif center reveal" id="packs-heading">
            {copy.packs.title} <em className="gold">{copy.packs.titleAccent}</em>
          </h2>
          <p
            className="center reveal"
            style={{
              margin: "16px auto 0",
              maxWidth: "620px",
              fontSize: "15px",
              lineHeight: 1.6,
              color: "var(--muted)",
            }}
          >
            {copy.packs.lead}
          </p>
          <div className="cards">
            {copy.packs.items.map((pack, index) => (
              <article
                className={cn("card reveal", index === 1 && "feat")}
                key={pack.title}
              >
                <span className="badge">
                  {index === 1 ? (
                    <Star className="ico" aria-hidden />
                  ) : (
                    <Clock className="ico" aria-hidden />
                  )}
                  {pack.badge}
                </span>
                {index === 1 && <span className="tag">{copy.packs.popular}</span>}
                <div className="card-img">
                  <Image
                    src={pack.image}
                    alt={pack.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    quality={90}
                    className={cn(
                      "object-cover",
                      pack.image.endsWith("meeting-room.webp") &&
                        "object-[center_38%]",
                    )}
                  />
                </div>
                <div className="card-body">
                  <h3 className="serif">{pack.title}</h3>
                  {pack.price ? (
                    /^\d/.test(pack.price) ? (
                      <p className="price">
                        {pack.price}
                        <small>{pack.unit}</small>
                      </p>
                    ) : (
                      <p className="price price--text">{pack.price}</p>
                    )
                  ) : null}
                  <p className="desc">{pack.description}</p>
                  <ul className="checks">
                    {pack.points.map((point) => (
                      <li key={point}>
                        <Check className="ico" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => goToReservation(index)}
                  >
                    {pack.cta}
                    <ArrowRight className="ico" aria-hidden />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* In practice: what the room already has, filling the band below the packs */}
      <section
        className="practice"
        id="equipement"
        aria-labelledby="practice-heading"
      >
        <div className="wrap">
          <div className="practice-grid">
            <div>
              <p className="kicker reveal">{copy.practice.kicker}</p>
              <h2 className="h2 serif reveal" id="practice-heading">
                {copy.practice.title}
              </h2>
              <p className="practice-lead reveal">{copy.practice.lead}</p>
              <div className="photos">
                {copy.practice.photos.map((photo) => (
                  <figure key={photo.src} className="reveal">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      quality={88}
                      className="object-cover"
                    />
                    <figcaption>{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <aside className="side reveal">
              <div className="side-card">
                <h3>{copy.practice.kitTitle}</h3>
                <ul className="kit">
                  {copy.practice.kit.map((item) => (
                    <li key={item.title}>
                      <b>{item.title}</b>
                      <span>{item.detail}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="btn btn-sand"
                  onClick={() => goToReservation(1)}
                >
                  {copy.reasons.cta}
                  <ArrowRight className="ico" aria-hidden />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="why" id="pourquoi" data-nav-tone="light">
        <div className="wrap">
          <div className="reveal">
            <p className="why-kicker">
              <span>{copy.reasons.kicker}</span> {copy.reasons.kickerAccent}
            </p>
            <h2 className="h2 serif">{copy.reasons.title}</h2>
            <p>{copy.reasons.lead}</p>
          </div>
          <ul className="why-list reveal">
            {reasons.map(({ icon: Icon, title, detail }) => (
              <li key={title}>
                <Icon className="ico" aria-hidden />
                <b>{title}</b>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ: details/summary keeps the answers reachable without any JS */}
      <section className="faq" id="faq" aria-labelledby="faq-heading">
        <div className="wrap">
          <p className="kicker reveal">{copy.faq.kicker}</p>
          <h2 className="h2 serif center reveal" id="faq-heading">
            {copy.faq.title}
          </h2>
          <div className="faq-list">
            {copy.faq.items.map((item) => (
              <details className="faq-item reveal" key={item.q}>
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="faq-answer">
                  <p>
                    {item.a}{" "}
                    {item.link ? (
                      <a href={item.link.href}>{item.link.text}</a>
                    ) : null}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        className="cta-wrap"
        id="contact"
        data-nav-tone="dark"
        aria-labelledby="reservation-heading"
      >
        <div className="cta-stage">
          <div className="wrap">
            <div className="cta reveal">
              <div className="cta-stub" aria-hidden="true">
                <span className="cta-stub-num">15</span>
                <span className="cta-stub-lbl">{copy.cta.stub}</span>
              </div>
              <span className="cta-perf" aria-hidden="true" />
              <span className="cta-notch t" aria-hidden="true" />
              <span className="cta-notch b" aria-hidden="true" />
              <div className="cta-main">
                <p className="cta-kicker">{copy.cta.kicker}</p>
                <h2 className="serif" id="reservation-heading">
                  {copy.cta.title} <em>{copy.cta.titleAccent}</em>
                </h2>
                <p>{copy.cta.text}</p>
              </div>
              <div className="cta-act">
                <span className="cta-lbl">{copy.cta.callLabel}</span>
                <a
                  className="cta-phone"
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  onClick={() =>
                    trackEvent("contact_call_click", { page: "/rental" })
                  }
                >
                  <span>
                    <Phone className="ico" strokeWidth={2.1} aria-hidden />
                  </span>
                  {phone}
                </a>
                <a
                  className="cta-wa"
                  href={waGeneric}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() =>
                    trackEvent("contact_whatsapp_click", { page: "/rental" })
                  }
                >
                  {copy.cta.whatsapp}
                </a>
                <span className="cta-reply">{copy.cta.reply}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Channel chooser: every booking call-to-action opens this first,
          so the visitor picks WhatsApp or email before anything is sent. */}
      {chooserIndex !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="rental-page rental-portal">
            <div
              className="modal-back"
              role="presentation"
              onClick={closeChooser}
            >
              <div
                className="chooser"
                role="dialog"
                aria-modal="true"
                aria-label={copy.chooser.title}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  ref={chooserCloseButton}
                  type="button"
                  className="chooser-close"
                  onClick={closeChooser}
                  aria-label={copy.form.close}
                >
                  <X width={22} height={22} strokeWidth={1.8} aria-hidden />
                </button>
                <p className="chooser-kicker">{copy.cta.kicker}</p>
                <h2 className="chooser-title">{copy.chooser.title}</h2>
                <p className="chooser-sub">{copy.chooser.subtitle}</p>
                <div className="chooser-options">
                  <a
                    className="chooser-option"
                    href={chooserWhatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => {
                      trackEvent("generate_lead", {
                        method: "whatsapp_prefill",
                        package: copy.packages[chooserIndex],
                      });
                      closeChooser();
                    }}
                  >
                    <span className="chooser-ico chooser-ico--wa">
                      <WhatsAppGlyph />
                    </span>
                    <span className="chooser-option-text">
                      <b>{copy.chooser.whatsappTitle}</b>
                      <span>{copy.chooser.whatsappSub}</span>
                    </span>
                    <ArrowRight className="ico chooser-arrow" aria-hidden />
                  </a>
                  <button
                    type="button"
                    className="chooser-option"
                    onClick={chooseEmail}
                  >
                    <span className="chooser-ico chooser-ico--email">
                      <Mail
                        width={22}
                        height={22}
                        strokeWidth={1.8}
                        aria-hidden
                      />
                    </span>
                    <span className="chooser-option-text">
                      <b>{copy.chooser.emailTitle}</b>
                      <span>{copy.chooser.emailSub}</span>
                    </span>
                    <ArrowRight className="ico chooser-arrow" aria-hidden />
                  </button>
                </div>
                <p className="chooser-foot">{copy.cta.reply}</p>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* Reservation modal, rendered in a portal so it sits above the site
          header, which lives in its own stacking context. */}
      {reservationOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="rental-page rental-portal">
            <div
              className="modal-back"
              role="presentation"
              onClick={closeReservation}
            >
              <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-label={copy.form.title}
                data-lenis-prevent
                onClick={(event) => event.stopPropagation()}
              >
                <div className="modal-head">
                  <div>
                    <p className="modal-kicker">{copy.cta.kicker}</p>
                    <h2>{copy.form.title}</h2>
                    <p className="modal-sub">{copy.form.subtitle}</p>
                  </div>
                  <button
                    ref={closeButton}
                    type="button"
                    className="modal-close"
                    onClick={closeReservation}
                    aria-label={copy.form.close}
                  >
                    <X width={26} height={26} strokeWidth={1.8} aria-hidden />
                  </button>
                </div>
                <ReservationForm
                  initialPackage={reservationPackage}
                  copy={copy}
                  locale={locale}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

