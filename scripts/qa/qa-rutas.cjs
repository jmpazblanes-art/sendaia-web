const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const U = process.argv[2];
const RUTAS = ['/', '/agentes', '/automatizaciones', '/demos', '/demos/facturas', '/casos-reales', '/sendaia', '/soluciones', '/calculadora',
  '/sectores/clinicas', '/sectores/asesorias', '/sectores/inmobiliarias', '/sectores/ecommerce', '/sectores/restaurantes', '/sectores/pymes', '/aviso-legal', '/privacidad', '/cookies'];
(async () => { const b = await chromium.launch(); const c = await b.newContext({ viewport: { width: 1440, height: 900 } }); const ogs = new Map(); let fallos = 0;
  for (const r of RUTAS) { const p = await c.newPage(); const err = []; p.on('pageerror', e => err.push(e.message.slice(0,90)));
    const resp = await p.goto(U + r, { waitUntil: 'domcontentloaded', timeout: 60000 }); await p.waitForTimeout(900);
    const t = await p.title(); const og = await p.locator('meta[property="og:image"]').first().getAttribute('content').catch(() => null);
    const bc = await p.locator('script[type="application/ld+json"]').evaluateAll(a => a.some(x => x.textContent.includes('BreadcrumbList')));
    const dup = /SendaIA.*SendaIA.*SendaIA/.test(t) || (t.match(/SendaIA/g)||[]).length > 2;
    const ogUrl = og ? og.replace(/https:\/\/[^/]+/, '') : 'SIN';
    ogs.set(r, ogUrl); const ok = resp.status() === 200 && og && !err.length && !dup; if (!ok) fallos++;
    console.log((ok ? 'OK  ' : 'FALLO ') + String(resp.status()) + ' ' + r.padEnd(26) + '| ' + t.slice(0,72).padEnd(72) + '| migas:' + (bc ? 'sí' : (r==='/'||r.startsWith('/aviso')||r==='/privacidad'||r==='/cookies' ? '—' : 'NO')) + ' | og:' + ogUrl.slice(0,40) + (err.length ? ' | err ' + JSON.stringify(err) : ''));
    await p.close(); }
  const unicos = new Set([...ogs.values()]); console.log('imágenes sociales distintas:', unicos.size, 'de', RUTAS.length - 3, 'páginas con imagen propia (+legales/home que heredan la del sitio)');
  // las imágenes se generan de verdad
  for (const r of ['/agentes', '/sectores/clinicas', '/sectores/pymes', '/casos-reales']) { const x = await c.request.get(U + r + '/opengraph-image'); const k = (await x.body()).length; console.log('  tarjeta', r.padEnd(20), x.status(), x.headers()['content-type'], k + ' bytes'); if (r==='/sectores/clinicas'||r==='/agentes') require('fs').writeFileSync(process.env.HOME + '/.claude/capturas/sendaia-web/36' + (r==='/agentes'?'0':'1') + '-tarjeta' + r.replace(/\//g,'-') + '.png', await x.body()); }
  console.log('fallos:', fallos); await b.close(); })();
