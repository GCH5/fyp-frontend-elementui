import{ag as M,aH as L}from"./index.789e35e4.js";class y{constructor(t=[],n=I){if(this.data=t,this.length=this.data.length,this.compare=n,this.length>0)for(let i=(this.length>>1)-1;i>=0;i--)this._down(i)}push(t){this.data.push(t),this.length++,this._up(this.length-1)}pop(){if(this.length===0)return;const t=this.data[0],n=this.data.pop();return this.length--,this.length>0&&(this.data[0]=n,this._down(0)),t}peek(){return this.data[0]}_up(t){const{data:n,compare:i}=this,l=n[t];for(;t>0;){const c=t-1>>1,r=n[c];if(i(l,r)>=0)break;n[t]=r,t=c}n[t]=l}_down(t){const{data:n,compare:i}=this,l=this.length>>1,c=n[t];for(;t<l;){let r=(t<<1)+1,h=n[r];const p=r+1;if(p<this.length&&i(n[p],h)<0&&(r=p,h=n[p]),i(h,c)>=0)break;n[t]=h,t=r}n[t]=c}}function I(e,t){return e<t?-1:e>t?1:0}function g(e,t){return e.p.x>t.p.x?1:e.p.x<t.p.x?-1:e.p.y!==t.p.y?e.p.y>t.p.y?1:-1:1}function P(e,t){return e.rightSweepEvent.p.x>t.rightSweepEvent.p.x?1:e.rightSweepEvent.p.x<t.rightSweepEvent.p.x?-1:e.rightSweepEvent.p.y!==t.rightSweepEvent.p.y?e.rightSweepEvent.p.y<t.rightSweepEvent.p.y?1:-1:1}class S{constructor(t,n,i,l){this.p={x:t[0],y:t[1]},this.featureId=n,this.ringId=i,this.eventId=l,this.otherEvent=null,this.isLeftEndpoint=null}isSamePoint(t){return this.p.x===t.p.x&&this.p.y===t.p.y}}function F(e,t){if(e.type==="FeatureCollection"){const n=e.features;for(let i=0;i<n.length;i++)m(n[i],t)}else m(e,t)}let a=0,u=0,d=0;function m(e,t){const n=e.type==="Feature"?e.geometry:e;let i=n.coordinates;(n.type==="Polygon"||n.type==="MultiLineString")&&(i=[i]),n.type==="LineString"&&(i=[[i]]);for(let l=0;l<i.length;l++)for(let c=0;c<i[l].length;c++){let r=i[l][c][0],h=null;u=u+1;for(let p=0;p<i[l][c].length-1;p++){h=i[l][c][p+1];const o=new S(r,a,u,d),s=new S(h,a,u,d+1);o.otherEvent=s,s.otherEvent=o,g(o,s)>0?(s.isLeftEndpoint=!0,o.isLeftEndpoint=!1):(o.isLeftEndpoint=!0,s.isLeftEndpoint=!1),t.push(o),t.push(s),r=h,d=d+1}}a=a+1}class k{constructor(t){this.leftSweepEvent=t,this.rightSweepEvent=t.otherEvent}}function _(e,t){if(e===null||t===null||e.leftSweepEvent.ringId===t.leftSweepEvent.ringId&&(e.rightSweepEvent.isSamePoint(t.leftSweepEvent)||e.rightSweepEvent.isSamePoint(t.leftSweepEvent)||e.rightSweepEvent.isSamePoint(t.rightSweepEvent)||e.leftSweepEvent.isSamePoint(t.leftSweepEvent)||e.leftSweepEvent.isSamePoint(t.rightSweepEvent)))return!1;const n=e.leftSweepEvent.p.x,i=e.leftSweepEvent.p.y,l=e.rightSweepEvent.p.x,c=e.rightSweepEvent.p.y,r=t.leftSweepEvent.p.x,h=t.leftSweepEvent.p.y,p=t.rightSweepEvent.p.x,o=t.rightSweepEvent.p.y,s=(o-h)*(l-n)-(p-r)*(c-i),E=(p-r)*(i-h)-(o-h)*(n-r),w=(l-n)*(i-h)-(c-i)*(n-r);if(s===0)return E===0&&w===0,!1;const f=E/s,v=w/s;if(f>=0&&f<=1&&v>=0&&v<=1){const x=n+f*(l-n),z=i+f*(c-i);return[x,z]}return!1}function b(e,t){t=t||!1;const n=[],i=new y([],P);for(;e.length;){const l=e.pop();if(l.isLeftEndpoint){const c=new k(l);for(let r=0;r<i.data.length;r++){const h=i.data[r];if(t&&h.leftSweepEvent.featureId===l.featureId)continue;const p=_(c,h);p!==!1&&n.push(p)}i.push(c)}else l.isLeftEndpoint===!1&&i.pop()}return n}function A(e,t){const n=new y([],g);return F(e,n),b(n,t)}const B={viewbox:"0, 0, 300, 468",content:`<g transform="translate(0.000000,468.000000) scale(0.100000,-0.100000)"
fill="#409EFF" stroke="none">
<path d="M1357 4654 c-239 -51 -441 -244 -502 -479 -18 -67 -31 -268 -21 -309
l6 -26 669 0 669 0 7 66 c15 137 -19 307 -85 421 -65 114 -216 244 -336 292
-126 49 -279 62 -407 35z m321 -35 c301 -81 489 -337 480 -655 l-3 -99 -643
-1 c-417 0 -645 3 -649 9 -12 20 -4 204 12 277 41 183 158 334 325 418 114 57
165 69 293 71 80 1 127 -4 185 -20z"/>
<path d="M850 3780 c0 -5 5 -21 12 -35 l11 -25 635 2 636 3 13 33 13 32 -660
0 c-412 0 -660 -4 -660 -10z m1277 -24 c-3 -8 -195 -12 -620 -14 -529 -2 -617
0 -617 12 0 12 89 14 620 13 434 0 619 -4 617 -11z"/>
<path d="M919 3638 l20 -33 557 -3 c518 -2 559 -1 577 15 10 10 23 26 28 35 9
17 -21 18 -597 18 l-606 0 21 -32z m1041 -1 c58 -1 -146 -4 -452 -5 -307 -1
-558 1 -558 6 0 6 757 6 1010 -1z"/>
<path d="M1010 3525 l23 -25 468 0 468 0 28 25 28 24 -519 1 -519 0 23 -25z"/>
<path d="M1121 3428 c19 -16 53 -18 376 -18 298 0 359 2 383 15 17 9 30 17 30
18 0 1 -182 2 -405 2 -388 0 -405 -1 -384 -17z"/>
<path d="M1261 3340 c65 -38 282 -52 406 -26 144 31 127 35 -152 35 -176 0
-264 -3 -254 -9z"/>
<path d="M110 3080 c-55 -82 -100 -152 -100 -155 0 -3 213 -5 473 -5 527 0
535 -1 635 -67 29 -20 67 -56 84 -82 18 -25 36 -49 42 -53 6 -4 121 -8 255 -8
l245 0 28 27 c15 15 28 32 28 39 0 20 80 85 139 113 l56 26 498 3 c273 1 497
5 497 8 0 2 -45 72 -100 155 l-101 150 -542 -3 -542 -3 -57 -28 c-57 -28 -138
-107 -138 -133 0 -24 -15 -15 -34 20 -29 53 -96 113 -149 130 -41 14 -120 16
-582 16 l-535 0 -100 -150z m1235 103 c22 -12 50 -35 63 -50 13 -15 38 -45 56
-67 l32 -38 27 24 c15 14 27 31 27 37 0 7 5 9 10 6 6 -3 10 1 10 9 0 8 10 21
22 27 12 6 31 20 42 30 43 41 73 43 596 47 564 3 540 6 593 -68 15 -21 27 -43
27 -49 0 -6 4 -11 9 -11 5 0 12 -9 16 -19 3 -11 19 -36 35 -56 17 -21 30 -41
30 -46 0 -4 -213 -9 -472 -11 -424 -3 -476 -5 -504 -20 -17 -10 -34 -14 -38
-11 -3 4 -6 1 -6 -5 0 -7 -5 -12 -11 -12 -15 0 -102 -68 -114 -89 -5 -10 -20
-30 -31 -44 l-22 -27 -241 0 -240 0 -48 59 c-26 33 -54 60 -60 60 -7 1 -13 6
-13 11 0 6 -7 10 -15 10 -8 0 -15 4 -15 8 0 8 -40 25 -105 46 -30 9 -155 12
-492 10 -249 -2 -453 1 -453 5 0 4 15 27 32 51 18 25 31 45 28 46 -3 2 4 13
16 26 11 14 29 40 40 59 10 19 30 44 43 57 l23 23 532 -3 c526 -3 531 -3 571
-25z"/>
<path d="M500 2017 c0 -903 -4 -856 88 -1030 71 -136 166 -240 287 -317 l30
-19 67 104 66 104 -39 27 c-55 38 -144 136 -179 197 -17 29 -39 81 -50 116
-19 61 -20 92 -20 837 l0 774 -125 0 -125 0 0 -793z m225 752 c-4 -5 -6 -57
-5 -117 1 -59 1 -114 1 -122 -2 -210 0 -665 4 -935 4 -322 6 -356 26 -415 38
-115 69 -161 183 -273 65 -63 64 -55 18 -134 -50 -85 -49 -85 -83 -67 -47 24
-165 140 -201 198 -18 28 -35 53 -38 56 -4 3 -19 32 -35 65 -15 33 -31 67 -36
76 -26 55 -30 118 -29 536 1 241 1 476 1 523 0 47 -1 205 -3 352 l-3 266 103
0 c61 1 100 -3 97 -9z"/>
<path d="M2260 2036 l0 -775 -25 -80 c-31 -98 -82 -176 -175 -265 -39 -38 -69
-72 -68 -75 2 -4 30 -50 63 -103 l59 -96 57 49 c189 164 267 279 314 464 l25
96 2 780 3 779 -127 0 -128 0 0 -774z m230 -4 c0 -491 -3 -767 -11 -805 -19
-106 -59 -211 -106 -281 -52 -77 -117 -148 -127 -139 -3 4 -6 0 -6 -9 0 -20
-114 -118 -124 -107 -9 11 -60 95 -61 100 0 3 -8 13 -17 23 -21 20 -15 39 18
56 13 7 24 16 24 20 0 4 15 22 34 41 65 66 124 172 151 271 l25 93 0 743 1
742 99 0 100 0 0 -748z"/>
<path d="M2645 2002 l0 -807 -28 -88 c-64 -205 -196 -400 -357 -528 -36 -28
-67 -53 -69 -55 -5 -4 112 -204 121 -204 11 0 121 86 192 151 207 190 334 430
381 724 12 73 15 231 15 853 l0 762 -127 0 -128 0 0 -808z m217 779 c4 0 7
-345 7 -765 0 -598 -2 -781 -13 -848 -18 -112 -78 -287 -127 -371 -21 -38 -39
-71 -39 -74 0 -7 -129 -159 -167 -198 -108 -107 -188 -169 -209 -161 -8 3 -17
14 -21 23 -4 10 -21 41 -39 68 -28 45 -30 53 -18 70 8 10 14 15 14 11 0 -4 11
5 25 20 14 15 25 25 25 22 0 -3 25 19 55 49 30 30 55 57 55 61 0 4 20 29 45
57 25 27 45 55 45 62 0 7 5 13 10 13 6 0 10 4 10 10 0 5 11 25 25 45 31 47 81
176 106 276 18 73 19 121 19 852 1 560 4 777 12 779 10 4 162 3 180 -1z"/>
<path d="M110 2006 c0 -868 -1 -844 60 -1027 62 -187 160 -340 307 -480 75
-71 209 -179 222 -179 3 1 34 46 67 102 l62 102 -47 29 c-25 16 -87 70 -137
121 -101 102 -178 218 -224 338 -61 157 -60 146 -60 1004 l0 784 -125 0 -125
0 0 -794z m215 760 c13 -12 15 -60 15 -295 -1 -214 -4 -281 -13 -282 -9 0 -9
-2 0 -5 9 -4 12 -127 12 -491 1 -503 3 -534 46 -658 21 -63 84 -192 100 -205
8 -7 15 -18 15 -25 0 -8 3 -15 8 -17 12 -5 72 -86 72 -97 0 -6 4 -11 10 -11 5
0 40 -29 77 -65 38 -36 76 -68 86 -71 9 -3 15 -10 12 -15 -4 -5 1 -9 9 -9 9 0
16 -2 16 -4 0 -10 -71 -126 -86 -140 -17 -17 -44 -9 -75 23 -8 9 -35 32 -59
51 -71 57 -175 166 -216 228 -22 31 -42 59 -46 60 -5 2 -8 8 -8 12 0 5 -11 26
-25 46 -14 20 -22 40 -19 45 3 5 1 9 -4 9 -16 0 -90 212 -96 276 -1 11 -7 27
-12 35 -5 8 -10 341 -12 814 l-2 800 90 3 c70 3 94 0 105 -12z"/>
<path d="M321 1454 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z"/>
<path d="M1238 1798 l-3 -843 -274 -455 c-151 -250 -280 -464 -287 -475 -13
-20 -11 -20 827 -20 555 0 838 3 835 10 -2 6 -126 216 -275 469 -149 252 -275
475 -281 495 -6 23 -10 335 -10 849 l0 812 -100 0 -100 0 2 -873 3 -872 178
-291 c97 -161 177 -293 177 -295 0 -2 -193 -4 -430 -4 -236 0 -429 2 -427 5 1
3 78 131 170 284 93 154 173 290 178 303 5 14 9 386 9 884 l0 859 -95 0 -95 0
-2 -842z m119 813 l52 -1 -2 -847 c-3 -964 9 -840 -96 -1013 -55 -91 -57 -95
-96 -153 -14 -21 -25 -40 -25 -42 0 -2 -25 -46 -57 -97 -86 -142 -85 -139 -66
-160 15 -17 45 -18 439 -18 417 0 423 0 434 21 10 17 0 38 -66 147 -42 70
-119 197 -171 282 -51 85 -98 170 -103 190 -5 20 -9 382 -9 863 l0 827 77 0
78 0 1 -804 c0 -611 4 -813 13 -842 7 -22 47 -97 90 -169 234 -391 450 -761
450 -770 0 -3 -360 -5 -800 -5 l-800 0 19 33 c48 84 57 97 64 97 4 0 7 5 7 11
0 6 32 63 71 127 39 64 82 135 94 157 13 22 60 101 105 175 89 144 109 179
167 279 l36 64 0 821 c0 451 1 824 3 828 2 3 12 5 22 3 9 -2 40 -4 69 -4z"/>
</g>`};function C(e,t,n){M(()=>e.addEventListener(t,n)),L(()=>e.removeEventListener(t,n))}export{B as U,A as s,C as u};
