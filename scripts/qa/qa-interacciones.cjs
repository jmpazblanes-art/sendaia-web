const { chromium, devices } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const D = (process.env.CAPTURAS || process.env.HOME + '/.claude/capturas/sendaia-web') + '/'; require('fs').mkdirSync(D, { recursive: true }); const U = process.argv[2]; const pre = process.argv[3];
const ok = (c, t) => console.log((c ? 'OK  ' : 'FALLO ') + t);
(async () => { const b = await chromium.launch({ args: ['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream'] });
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, permissions: ['microphone'] });
  const errs = []; const nueva = async () => { const p = await c.newPage(); p.on('pageerror', e => errs.push(e.message.slice(0,100))); return p; };

  // 1 · /agentes: voz, Aria, WhatsApp
  let p = await nueva(); await p.goto(U + '/agentes', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(2500);
  let voz = p.locator('#voz button.btn-cobre').first(); await voz.scrollIntoViewIfNeeded(); await voz.click();
  for (let i=0;i<24;i++){ await p.waitForTimeout(500); if (/Colgar|Reintentar/.test(await voz.innerText())) break; }
  const est = (await voz.innerText()).trim(); ok(/Colgar/.test(est), 'voz en /agentes → ' + est); await p.waitForTimeout(2500); await p.screenshot({ path: D + pre + '0-voz-agentes.png' });
  if (/Colgar/.test(est)) await voz.click(); await p.waitForTimeout(800);
  await p.locator('#aria').scrollIntoViewIfNeeded(); await p.getByRole('button', { name: /Hablar con ARIA/ }).click(); await p.waitForTimeout(700);
  const inp = p.getByPlaceholder('Escribe a Aria…'); ok(await inp.isVisible(), 'Aria abre desde /agentes');
  await inp.fill('Prueba interna del equipo de SendaIA tras publicar las páginas nuevas. ¿Me lees?'); await inp.press('Enter');
  const r = await p.waitForResponse(x => x.url().includes('chat-web'), { timeout: 45000 }).catch(() => null); ok(r && r.status()===200, 'Aria responde (' + (r ? r.status() : 'sin respuesta') + ')');
  await p.waitForTimeout(1200); await p.screenshot({ path: D + pre + '1-aria-agentes.png' });
  ok((await p.getByRole('link', { name: /Abrir WhatsApp/ }).getAttribute('href')).includes('wa.me/34627256996'), 'WhatsApp apunta al número del agente');
  await p.close();

  // 2 · calculadora cambia al mover
  p = await nueva(); await p.goto(U + '/calculadora', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1500);
  const antes = await p.locator('[aria-live=polite]').first().innerText();
  await p.locator('#Horas\\ por\\ semana\\ en\\ tareas\\ repetitivas').fill('30'); await p.waitForTimeout(300);
  const despues = await p.locator('[aria-live=polite]').first().innerText(); ok(antes !== despues, `calculadora: ${antes.replace(/\n/g,' ')} → ${despues.replace(/\n/g,' ')}`);
  await p.locator('a[data-cta=calculadora_roi]').scrollIntoViewIfNeeded(); await p.screenshot({ path: D + pre + '2-calculadora.png' }); await p.close();

  // 3 · vídeo mp4 bajo demanda y YouTube
  p = await nueva(); const mp4 = []; p.on('response', x => { if (x.url().includes('.mp4')) mp4.push(x.status()); });
  await p.goto(U + '/automatizaciones', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1500);
  ok(mp4.length === 0, 'antes de pulsar no se descarga ningún mp4');
  await p.getByRole('button', { name: /Ver vídeo/ }).first().click(); await p.waitForTimeout(3500);
  ok(await p.locator('video').count() === 1 && mp4.some(s => s < 400), 'el vídeo se carga al pulsar (' + JSON.stringify(mp4) + ')'); await p.close();

  // 4 · opiniones: el modal abre (sin enviar)
  p = await nueva(); await p.goto(U + '/sendaia', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1500);
  await p.getByRole('button', { name: /Escribir opinión/ }).scrollIntoViewIfNeeded(); await p.getByRole('button', { name: /Escribir opinión/ }).click(); await p.waitForTimeout(500);
  ok(await p.getByText('Déjanos tu opinión').isVisible(), 'modal de opiniones abre'); await p.screenshot({ path: D + pre + '3-opinion-modal.png' }); await p.close();

  // 5 · enlaces: cabecera, CTA de diagnóstico, menú, pie
  p = await nueva(); await p.goto(U + '/casos-reales', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1200);
  ok((await p.locator('header a[data-cta=diagnostico_cabecera]').getAttribute('href')) === '#contacto', 'CTA de cabecera en subpágina lleva a #contacto de la misma página');
  const hrefs = await p.locator('footer a[href^="/"]').evaluateAll(a => [...new Set(a.map(x => x.getAttribute('href')))]);
  const malos = []; for (const h of hrefs) { const x = await c.request.get(U + h.split('#')[0]); if (x.status() >= 400) malos.push(h + ' ' + x.status()); }
  ok(malos.length === 0, 'enlaces del pie (' + hrefs.length + ') sin rotos ' + JSON.stringify(malos)); await p.close();

  // 6 · sitemap y tarjeta social
  const sm = await (await c.request.get(U + '/sitemap.xml')).text(); const urls = (sm.match(/<loc>[^<]+/g)||[]).map(x=>x.replace('<loc>',''));
  ok(['agentes','automatizaciones','demos','casos-reales','sendaia','calculadora','soluciones'].every(k => urls.some(u => u.endsWith('/'+k))), 'sitemap incluye las páginas nuevas (' + urls.length + ' urls)');
  const og = await c.request.get(U + '/opengraph-image'); ok(og.status()===200 && (og.headers()['content-type']||'').includes('png'), 'tarjeta social: ' + og.status() + ' ' + og.headers()['content-type']);
  require('fs').writeFileSync(D + pre + '4-tarjeta-social.png', await og.body());
  await c.close();

  // 7 · móvil: todas las páginas, sin desborde horizontal; menú y formulario
  const m = await b.newContext({ ...devices['iPhone 13'] });
  for (const [i, r] of ['/', '/agentes', '/automatizaciones', '/demos', '/demos/facturas', '/casos-reales', '/sendaia', '/soluciones', '/calculadora', '/sectores/clinicas'].entries()) {
    const q = await m.newPage(); q.on('pageerror', e => errs.push('movil ' + r + ' ' + e.message.slice(0,100)));
    await q.goto(U + r, { waitUntil: 'domcontentloaded' }); await q.waitForTimeout(1800);
    const w = await q.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
    ok(w.sw <= w.iw + 1, `móvil ${r}: sin desborde (${w.sw}/${w.iw})`);
    if (['/agentes','/casos-reales','/demos'].includes(r)) await q.screenshot({ path: D + pre + '5-movil' + r.replace(/\//g,'-') + '.png' });
    if (r === '/agentes') { await q.getByRole('button', { name: 'Abrir el menú' }).click(); await q.waitForTimeout(500); await q.screenshot({ path: D + pre + '6-movil-menu.png' });
      await q.getByRole('dialog').getByRole('link', { name: 'Demos' }).click(); await q.waitForURL('**/demos', { timeout: 15000 }).catch(()=>{}); ok(q.url().endsWith('/demos'), 'menú móvil navega a /demos'); }
    await q.close();
  }
  console.log('errores JS:', JSON.stringify(errs)); await b.close(); })();
