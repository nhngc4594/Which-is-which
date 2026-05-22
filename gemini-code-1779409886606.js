// ─── LEVEL DATA ───────────────────────────────────────────────────────────
const levels = {
    1: { name:"S vs SH", folder:"S_vs_SH", sounds:["S","SH"], targets:["🌸","🦆","👾"],
         words:[
            {sound:"S",position:"initial",word:"sea"},{sound:"S",position:"initial",word:"sail"},{sound:"S",position:"initial",word:"song"},
            {sound:"SH",position:"initial",word:"she"},{sound:"SH",position:"initial",word:"shake"},{sound:"SH",position:"initial",word:"show"},
            {sound:"S",position:"medial",word:"basin"},{sound:"S",position:"medial",word:"lesson"},{sound:"S",position:"medial",word:"basic"},
            {sound:"SH",position:"medial",word:"nation"},{sound:"SH",position:"medial",word:"fashion"},{sound:"SH",position:"medial",word:"fishing"},
            {sound:"S",position:"final",word:"bus"},{sound:"S",position:"final",word:"face"},{sound:"S",position:"final",word:"nice"},
            {sound:"SH",position:"final",word:"bush"},{sound:"SH",position:"final",word:"fish"},{sound:"SH",position:"final",word:"rush"}],
         stickers:[{emoji:"🌙",price:50},{emoji:"⭐",price:100},{emoji:"🌟",price:200},{emoji:"🌠",price:300},{emoji:"🌌",price:500}]},
    2: { name:"S vs TH", folder:"S_vs_TH_voiceless", sounds:["S","TH"], targets:["🦆","🪆","👾"],
         words:[
            {sound:"S",position:"initial",word:"sea"},{sound:"S",position:"initial",word:"sin"},{sound:"S",position:"initial",word:"soap"},
            {sound:"TH",position:"initial",word:"thin"},{sound:"TH",position:"initial",word:"think"},{sound:"TH",position:"initial",word:"three"},
            {sound:"S",position:"medial",word:"basin"},{sound:"S",position:"medial",word:"frosty"},{sound:"S",position:"medial",word:"lesson"},
            {sound:"TH",position:"medial",word:"author"},{sound:"TH",position:"medial",word:"nothing"},{sound:"TH",position:"medial",word:"method"},
            {sound:"S",position:"final",word:"base"},{sound:"S",position:"final",word:"peace"},{sound:"S",position:"final",word:"bus"},
            {sound:"TH",position:"final",word:"bath"},{sound:"TH",position:"final",word:"math"},{sound:"TH",position:"final",word:"teeth"}],
         stickers:[{emoji:"🌬️",price:50},{emoji:"🍃",price:100},{emoji:"🌀",price:200},{emoji:"⚡",price:300},{emoji:"🌊",price:500}]},
    3: { name:"F vs P", folder:"F_vs_P", sounds:["F","P"], targets:["🗼","🦆","🪆"],
         words:[
            {sound:"F",position:"initial",word:"fan"},{sound:"F",position:"initial",word:"feel"},{sound:"F",position:"initial",word:"photo"},
            {sound:"P",position:"initial",word:"pan"},{sound:"P",position:"initial",word:"peel"},{sound:"P",position:"initial",word:"pot"},
            {sound:"F",position:"medial",word:"after"},{sound:"F",position:"medial",word:"offer"},{sound:"F",position:"medial",word:"sofa"},
            {sound:"P",position:"medial",word:"paper"},{sound:"P",position:"medial",word:"open"},{sound:"P",position:"medial",word:"topic"},
            {sound:"F",position:"final",word:"leaf"},{sound:"F",position:"final",word:"roof"},{sound:"F",position:"final",word:"safe"},
            {sound:"P",position:"final",word:"leap"},{sound:"P",position:"final",word:"rope"},{sound:"P",position:"final",word:"tape"}],
         stickers:[{emoji:"🍂",price:50},{emoji:"🦊",price:100},{emoji:"🍁",price:200},{emoji:"🦋",price:300},{emoji:"🌸",price:500}]},
    4:  { name:"L vs R", folder:"L_vs_R", sounds:["L","R"], targets:["🍥","🦆","🪆"],
         words:[
            {sound:"L",position:"initial",word:"lake"},{sound:"L",position:"initial",word:"leaf"},{sound:"L",position:"initial",word:"low"},
            {sound:"R",position:"initial",word:"rain"},{sound:"R",position:"initial",word:"road"},{sound:"R",position:"initial",word:"rice"},
            {sound:"L",position:"medial",word:"alive"},{sound:"L",position:"medial",word:"balloon"},{sound:"L",position:"medial",word:"below"},
            {sound:"R",position:"medial",word:"arena"},{sound:"R",position:"medial",word:"carrot"},{sound:"R",position:"medial",word:"story"},
            {sound:"L",position:"final",word:"bell"},{sound:"L",position:"final",word:"feel"},{sound:"L",position:"final",word:"tall"},
            {sound:"R",position:"final",word:"star"},{sound:"R",position:"final",word:"door"},{sound:"R",position:"final",word:"far"}],
         stickers:[{emoji:"☁️",price:50},{emoji:"🌱",price:100},{emoji:"🌲",price:200},{emoji:"🦅",price:300},{emoji:"💎",price:500}]},
    5: { name:"Z vs TH (voiced)", folder:"Z_vs_TH_voiced", sounds:["Z","TH"], targets:["🐍","🦎","👾"],
         words:[
            {sound:"Z",position:"initial",word:"zoo"},{sound:"Z",position:"initial",word:"zone"},{sound:"Z",position:"initial",word:"zero"},
            {sound:"TH",position:"initial",word:"the"},{sound:"TH",position:"initial",word:"this"},{sound:"TH",position:"initial",word:"those"},
            {sound:"Z",position:"medial",word:"frozen"},{sound:"Z",position:"medial",word:"razor"},{sound:"Z",position:"medial",word:"season"},
            {sound:"TH",position:"medial",word:"father"},{sound:"TH",position:"medial",word:"mother"},{sound:"TH",position:"medial",word:"other"},
            {sound:"Z",position:"final",word:"bees"},{sound:"Z",position:"final",word:"nose"},{sound:"Z",position:"final",word:"phase"},
            {sound:"TH",position:"final",word:"bathe"},{sound:"TH",position:"final",word:"breathe"},{sound:"TH",position:"final",word:"soothe"}],
         stickers:[{emoji:"🐝",price:50},{emoji:"🦎",price:100},{emoji:"🐍",price:200},{emoji:"🦁",price:300},{emoji:"🔥",price:500}]},
    6: { name:"CH vs TS", folder:"CH_vs_TS", sounds:["CH","TS"], targets:["⛩️","🏮","🎋"],
         words:[
            {sound:"CH",position:"initial",word:"chain"},{sound:"CH",position:"initial",word:"chip"},{sound:"CH",position:"initial",word:"choose"},
            {sound:"CH",position:"medial",word:"teacher"},{sound:"CH",position:"medial",word:"kitchen"},{sound:"CH",position:"medial",word:"nature"},
            {sound:"CH",position:"final",word:"beach"},{sound:"CH",position:"final",word:"catch"},{sound:"CH",position:"final",word:"coach"},
            {sound:"TS",position:"final",word:"boats"},{sound:"TS",position:"final",word:"cats"},{sound:"TS",position:"final",word:"roots"}],
         stickers:[{emoji:"🎵",price:50},{emoji:"🎸",price:100},{emoji:"🎺",price:200},{emoji:"🎻",price:300},{emoji:"🎹",price:500}]},
    7: { name:"N vs NG", folder:"N_vs_NG", sounds:["N","NG"], targets:["🎋","🌿","🦆"],
         words:[
            {sound:"N",position:"initial",word:"nail"},{sound:"N",position:"initial",word:"night"},{sound:"N",position:"initial",word:"nose"},
            {sound:"N",position:"medial",word:"animal"},{sound:"N",position:"medial",word:"dinner"},{sound:"N",position:"medial",word:"money"},
            {sound:"NG",position:"medial",word:"anger"},{sound:"NG",position:"medial",word:"finger"},{sound:"NG",position:"medial",word:"longer"},
            {sound:"N",position:"final",word:"bone"},{sound:"N",position:"final",word:"moon"},{sound:"N",position:"final",word:"train"},
            {sound:"NG",position:"final",word:"king"},{sound:"NG",position:"final",word:"long"},{sound:"NG",position:"final",word:"song"}],
         stickers:[{emoji:"🌿",price:50},{emoji:"🍀",price:100},{emoji:"🌺",price:200},{emoji:"🦚",price:300},{emoji:"🌈",price:500}]},
    8: { name:"V vs B", folder:"V_vs_B", sounds:["V","B"], targets:["🙈","🙉","🙊"],
         words:[
            {sound:"V",position:"initial",word:"van"},{sound:"V",position:"initial",word:"vine"},{sound:"V",position:"initial",word:"vote"},
            {sound:"B",position:"initial",word:"ban"},{sound:"B",position:"initial",word:"bone"},{sound:"B",position:"initial",word:"boat"},
            {sound:"V",position:"medial",word:"clever"},{sound:"V",position:"medial",word:"oven"},{sound:"V",position:"medial",word:"river"},
            {sound:"B",position:"medial",word:"table"},{sound:"B",position:"medial",word:"robot"},{sound:"B",position:"medial",word:"cabin"},
            {sound:"V",position:"final",word:"cave"},{sound:"V",position:"final",word:"live"},{sound:"V",position:"final",word:"stove"},
            {sound:"B",position:"final",word:"cab"},{sound:"B",position:"final",word:"robe"},{sound:"B",position:"final",word:"tube"}],
         stickers:[{emoji:"💧",price:50},{emoji:"🐚",price:100},{emoji:"🦀",price:200},{emoji:"🦈",price:300},{emoji:"🔱",price:500}]},
    9: { name:"L vs R Blends", folder:"L_blends_vs_R_blends", sounds:["L_blend","R_blend"], labels:["L","R"], targets:["🍢","🏮","👾"],
         words:[
            {sound:"L_blend_bl",position:"initial",word:"blade"},{sound:"L_blend_bl",position:"initial",word:"blow"},{sound:"L_blend_bl",position:"initial",word:"blue"},
            {sound:"L_blend_cl",position:"initial",word:"clay"},{sound:"L_blend_cl",position:"initial",word:"clean"},{sound:"L_blend_cl",position:"initial",word:"climb"},
            {sound:"L_blend_fl",position:"initial",word:"flag"},{sound:"L_blend_fl",position:"initial",word:"flat"},{sound:"L_blend_fl",position:"initial",word:"flow"},
            {sound:"L_blend_gl",position:"initial",word:"glad"},{sound:"L_blend_gl",position:"initial",word:"glow"},{sound:"L_blend_gl",position:"initial",word:"glue"},
            {sound:"L_blend_pl",position:"initial",word:"plan"},{sound:"L_blend_pl",position:"initial",word:"play"},{sound:"L_blend_pl",position:"initial",word:"plus"},
            {sound:"R_blend_br",position:"initial",word:"brain"},{sound:"R_blend_br",position:"initial",word:"bread"},{sound:"R_blend_br",position:"initial",word:"broke"},
            {sound:"R_blend_cr",position:"initial",word:"crab"},{sound:"R_blend_cr",position:"initial",word:"crime"},{sound:"R_blend_cr",position:"initial",word:"cross"},
            {sound:"R_blend_fr",position:"initial",word:"frame"},{sound:"R_blend_fr",position:"initial",word:"free"},{sound:"R_blend_fr",position:"initial",word:"frog"},
            {sound:"R_blend_gr",position:"initial",word:"grab"},{sound:"R_blend_gr",position:"initial",word:"green"},{sound:"R_blend_gr",position:"initial",word:"grow"},
            {sound:"R_blend_pr",position:"initial",word:"price"},{sound:"R_blend_pr",position:"initial",word:"proud"},{sound:"R_blend_pr",position:"initial",word:"prove"}],
         stickers:[{emoji:"🌊",price:50},{emoji:"🏄",price:100},{emoji:"🐬",price:200},{emoji:"🦅",price:300},{emoji:"🏆",price:500}]},
};

const FINAL_LEVEL = 9;
const ROUND_LENGTH = 10;
const CHALLENGE_LENGTH = 15;
const BASE_FALL_SPEED = 2.2;
const MAX_FALL_SPEED = 5.5;
const CHALLENGE_TARGETS = ["👻","👻","👾","👻","👻"];

// ─── STATE ────────────────────────────────────────────────────────────────
let state = {
    curLevel:1, maxLevel:1, audioRate:1.0, lives:3, bonusHearts:0,
    coins:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0},
    invest:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0},
    inventory:[], roundHits:0, isPaused:true, gender:"male", seenHelp:false,
    soundFx:true, streakDays:0, lastPlayedDate:"", bestAccuracy:{}
};

let currentBlock=null, animationId=null, currentAudio=null, typeInterval=null;
let confettiParticles=[], confettiRaf=null;
let timerRaf=null, timerStart=0;
let inChallenge=false, challengeBlock=0, challengeRate=1.0;
let comboCount=0, comboBannerTimer=null;
let roundCoinsEarned=0;
let driftAngle=0;
let roundCorrect=0, roundTotal=0; // for accuracy tracking
let perfectLightning=false;       // for perfect round badge

// ─── HELPERS ──────────────────────────────────────────────────────────────
function coins(){ return state.coins[state.curLevel]??0; }
function addCoins(n){ state.coins[state.curLevel]=(state.coins[state.curLevel]??0)+n; roundCoinsEarned+=n; }
function spendCoins(n){ state.coins[state.curLevel]=(state.coins[state.curLevel]??0)-n; }

function buildAudioPath(w){
    const g=state.gender==='male'?'male':'female';
    return `audio/${levels[state.curLevel].folder}/${w.sound}_${w.position}_${w.word}_${g}.mp3`;
}
function preloadAudio(){
    const g=state.gender==='male'?'male':'female';
    levels[state.curLevel].words.forEach(w=>{
        const a=new Audio(); a.preload='auto';
        a.src=`audio/${levels[state.curLevel].folder}/${w.sound}_${w.position}_${w.word}_${g}.mp3`;
    });
}
function pickTarget(){
    const pool=inChallenge?CHALLENGE_TARGETS:levels[state.curLevel].targets;
    return pool[Math.floor(Math.random()*pool.length)];
}

// ─── SOUND ATTRIBUTION ────────────────────────────────────────────────────
function isLeftSound(w){
    const lvl=levels[state.curLevel];
    if(lvl.sounds[0].includes('_blend')) return w.sound.startsWith(lvl.sounds[0].split('_')[0]+'_blend');
    return w.sound===lvl.sounds[0];
}

// ─── WEB AUDIO FX ────────────────────────────────────────────────────────
// Sound FX removed — visual feedback (flash, heart break, combo) handles it.
function startFxKeepAlive(){}
function stopFxKeepAlive(){}

// ─── STREAK ──────────────────────────────────────────────────────────────
function todayStr(){ return new Date().toISOString().slice(0,10); }
function updateStreak(){
    const today=todayStr();
    if(state.lastPlayedDate===today) return; // already counted today
    const yesterday=new Date(); yesterday.setDate(yesterday.getDate()-1);
    const yStr=yesterday.toISOString().slice(0,10);
    if(state.lastPlayedDate===yStr){ state.streakDays++; }
    else if(state.lastPlayedDate!==today){ state.streakDays=1; }
    state.lastPlayedDate=today;
    saveGame();
}
function showStreakBanner(){
    if(state.streakDays<2) return;
    const el=document.getElementById('streak-banner');
    if(!el) return;
    el.innerText=`🔥 ${state.streakDays} DAY STREAK!`;
    el.classList.remove('hidden');
}

// ─── ACCURACY ────────────────────────────────────────────────────────────
function getAccuracyKey(){ return `${state.curLevel}_${inChallenge?'lightning':'practice'}`; }
function recordAccuracy(correct,total){
    const key=getAccuracyKey();
    const pct=Math.round((correct/total)*100);
    if(!state.bestAccuracy[key]||pct>state.bestAccuracy[key]) state.bestAccuracy[key]=pct;
    saveGame();
    return pct;
}

// ─── SAVE / LOAD ──────────────────────────────────────────────────────────
function saveGame(){ localStorage.setItem('phoneticFlowSave',JSON.stringify(state)); }
function loadGame(){
    const s=localStorage.getItem('phoneticFlowSave');
    if(s){ const saved=JSON.parse(s); state={...state,...saved}; }
    state.curLevel=Number(state.curLevel)||1;
    state.maxLevel=Number(state.maxLevel)||1;
    state.audioRate=state.audioRate||1.0;
    state.bonusHearts=state.bonusHearts||0;
    if(state.soundFx===undefined) state.soundFx=true;
    if(!state.streakDays) state.streakDays=0;
    if(!state.lastPlayedDate) state.lastPlayedDate="";
    if(!state.bestAccuracy) state.bestAccuracy={};
    const fc={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
    const fi={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
    for(let k=1;k<=9;k++){
        fc[k]=Number(state.coins[k]??state.coins[String(k)]??0);
        fi[k]=Number(state.invest[k]??state.invest[String(k)]??0);
    }
    state.coins=fc; state.invest=fi;
    setGender(state.gender);
    // Fox comeback nudge — if played before but not today or yesterday
    const today=todayStr();
    const yesterday=new Date(); yesterday.setDate(yesterday.getDate()-1);
    const yStr=yesterday.toISOString().slice(0,10);
    if(state.lastPlayedDate && state.lastPlayedDate!==today && state.lastPlayedDate!==yStr){
        FOX_MESSAGES.unshift("Your ears need exercise! 👂 Let's go!");
    }
    updateUI();
    showStreakBanner();
    if(!state.seenHelp) showHelp();
}

// ─── UI ───────────────────────────────────────────────────────────────────
function typeWriter(text,gold){
    clearInterval(typeInterval);
    const el=document.getElementById('shopkeeper-text');
    el.innerHTML=""; el.className=gold?'trade-offer':'';
    let i=0;
    typeInterval=setInterval(()=>{ el.innerHTML+=text.charAt(i); i++; if(i>=text.length) clearInterval(typeInterval); },40);
}
function showMenu(id){
    state.isPaused=true; cancelAnimationFrame(animationId); stopTimer();
    stopFxKeepAlive();
    if(currentAudio) currentAudio.pause();
    document.querySelectorAll('.overlay').forEach(el=>el.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    document.getElementById('pause-btn').classList.remove('visible');
    if(id==='shop-menu') renderShop();
    if(id==='level-select') renderTower();
    if(id==='sticker-book') renderBook();
    updateUI();
}
function updateUI(){
    document.getElementById('currency-display').innerText=`⭐ ${coins()}`;
    document.getElementById('lives-display').innerHTML='❤️'.repeat(Math.max(0,state.lives));
    // Update start button labels with sound pair
    const lvl=levels[state.curLevel];
    const isFinal=(state.curLevel===FINAL_LEVEL);
    const pairLabel=isFinal?'L vs R 👑':''+((lvl.labels||lvl.sounds).join(' vs '));
    const goLabel=`"${pairLabel}" <span style="font-size:1.25em;font-weight:900;">GO!</span>`;
    const singleBtn=document.getElementById('btn-start-single');
    const practiceBtn=document.getElementById('btn-practice');
    if(singleBtn) singleBtn.innerHTML=goLabel;
    if(practiceBtn) practiceBtn.innerHTML=goLabel;
    if(state.maxLevel>=2) document.getElementById('btn-world-map').classList.remove('hidden');
    document.querySelectorAll('#pause-menu button[id^="speed-"]').forEach(b=>b.classList.remove('active-yellow'));
    const rk=state.audioRate===0.5?'speed-0.5':state.audioRate===1.6?'speed-1.6':'speed-1.0';
    const sb=document.getElementById(rk); if(sb) sb.classList.add('active-yellow');
    const cu=(state.invest[state.curLevel]??0)>=400;
    document.getElementById('btn-start-single').classList.toggle('hidden',cu);
    document.getElementById('start-btn-group').classList.toggle('hidden',!cu);
    document.querySelectorAll('#dev-level-btns button').forEach(b=>{
        b.classList.toggle('dev-active',Number(b.dataset.lvl)===state.curLevel);
    });
    saveGame();
}
function setGender(g){
    state.gender=g;
    document.getElementById('btn-mike').classList.toggle('active-yellow',g==='male');
    document.getElementById('btn-jenny').classList.toggle('active-yellow',g==='female');
    if(window.speechSynthesis){
        window.speechSynthesis.cancel();
        const u=new SpeechSynthesisUtterance('Hello!'); u.lang='en-US';
        const voices=window.speechSynthesis.getVoices();
        const match=voices.find(v=>g==='female'?/female|woman|girl|zira|samantha|karen|victoria/i.test(v.name):/male|man|david|alex|daniel/i.test(v.name));
        if(match) u.voice=match; u.pitch=g==='female'?1.2:0.9;
        window.speechSynthesis.speak(u);
    }
    saveGame();
}

// ─── TIMER BAR ────────────────────────────────────────────────────────────
function startTimer(duration){ /* timer bar removed */ }
function stopTimer(){ if(timerRaf){ cancelAnimationFrame(timerRaf); timerRaf=null; } }

// ─── ARENA BG SHIFT (⚡ ROUND intensity) ─────────────────────────────────
function setArenaBg(blockNum){
    if(!inChallenge){ document.getElementById('game-container').style.background='#0a0a1a'; return; }
    const t=Math.min(1,(blockNum-1)/14);
    const r=Math.round(10+t*60), g=Math.round(10-t*8), b=Math.round(26-t*22);
    document.getElementById('game-container').style.background=`rgb(${r},${g},${b})`;
}

// ─── COMBO ────────────────────────────────────────────────────────────────
function showCombo(n){
    const old=document.getElementById('combo-banner'); if(old) old.remove();
    if(comboBannerTimer){ clearTimeout(comboBannerTimer); comboBannerTimer=null; }
    if(n<3) return;
    const sz=Math.min(26+n*4, 68);
    const glow=Math.min(n*8, 48);
    const label=n>=10?'🔥 UNSTOPPABLE!':n>=7?'🔥 ON FIRE!':n>=5?'⚡ SCORCHING!':'✨ NICE STREAK!';
    const el=document.createElement('div');
    el.id='combo-banner';
    el.innerHTML=
        `<span style="font-size:${sz}px;display:block;text-shadow:0 0 ${glow}px var(--accent),0 2px 8px rgba(0,0,0,0.9);">${n} IN A ROW!</span>`+
        `<span class="combo-label">${label}</span>`;
    document.body.appendChild(el);
    comboBannerTimer=setTimeout(()=>{
        const b=document.getElementById('combo-banner'); if(b) b.remove();
    }, 1450);
}

// ─── COIN POP ─────────────────────────────────────────────────────────────
function spawnCoinPop(side){
    const pf=document.getElementById('play-field');
    const pw=pf.offsetWidth, ph=pf.offsetHeight;
    const el=document.createElement('div'); el.className='coin-pop'; el.innerText='⭐';
    el.style.left=(side==='L'?pw*0.25:pw*0.75)-12+'px';
    el.style.top=ph*0.5+'px';
    pf.appendChild(el);
    setTimeout(()=>el.remove(),750);
}

// ─── HEART BREAK ─────────────────────────────────────────────────────────
function showHeartBreak(correctSide){
    // Update the lives display
    const remaining=Math.max(0,state.lives);
    document.getElementById('lives-display').innerHTML='❤️'.repeat(remaining);

    // Spawn a floating broken heart on the correct-answer side
    const pf=document.getElementById('play-field');
    const pw=pf.offsetWidth, ph=pf.offsetHeight;
    const hb=document.createElement('div');
    hb.className='heart-break';
    hb.textContent='💔';
    // Position at mid-height of play field, in the correct lane
    const xPos = correctSide==='L' ? pw*0.25 : pw*0.75;
    const rect = pf.getBoundingClientRect();
    hb.style.left = (rect.left + xPos - 27) + 'px';
    hb.style.top  = (rect.top + ph*0.5) + 'px';
    document.body.appendChild(hb);
    setTimeout(()=>{ if(hb.parentNode) hb.parentNode.removeChild(hb); }, 1100);
}

// ─── HELP ─────────────────────────────────────────────────────────────────
function showHelp(){
    state.isPaused=true; cancelAnimationFrame(animationId); stopTimer();
    if(currentAudio) currentAudio.pause();
    // Ensure main-menu is showing underneath so dismissHelp finds an overlay
    // and doesn't try to resume a game that hasn't started yet
    const anyOverlay=[...document.querySelectorAll('.overlay')].some(el=>!el.classList.contains('hidden'));
    if(!anyOverlay) document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('help-screen').classList.remove('hidden');
    document.getElementById('pause-btn').classList.remove('visible');
}
function dismissHelp(){
    document.getElementById('help-screen').classList.add('hidden');
    state.seenHelp=true; saveGame();
    // If another overlay (e.g. main-menu) is visible, leave it showing — don't resume game
    const anyVisible=[...document.querySelectorAll('.overlay')].some(el=>!el.classList.contains('hidden'));
    if(!anyVisible) closeMenus();
}

// ─── REPLAY CURRENT ───────────────────────────────────────────────────────
function replayCurrent(){
    if(!currentBlock||state.isPaused) return;
    const rate=inChallenge?challengeRate:(state.audioRate??1.0);
    if(currentAudio){ currentAudio.pause(); currentAudio.onended=null; currentAudio=null; }
    const a=new Audio(buildAudioPath(currentBlock.data));
    a.playbackRate=rate; currentAudio=a;
    a.onerror=()=>console.warn('Missing:',buildAudioPath(currentBlock.data));
    a.play().catch(e=>console.warn(e));
}

// ─── SHOP ─────────────────────────────────────────────────────────────────
function buyHeart(){
    if(coins()>=75){
        spendCoins(75); state.lives++; state.bonusHearts++; updateUI();
        const livesEl=document.getElementById('lives-display');
        livesEl.innerHTML='❤️'.repeat(Math.max(0,state.lives-1))+`<span class="heart-new">❤️</span>`;
        typeWriter("THIS WILL HELP YOU STAY STRONG.",false);
    } else { typeWriter("NOT ENOUGH COINS.",false); }
}
function buyItem(emoji,price,idx){
    if(coins()>=price){
        const card=document.getElementById(`shop-item-${idx}`); if(card) card.classList.add('purchased-anim');
        spendCoins(price);
        state.invest[state.curLevel]=(state.invest[state.curLevel]??0)+price;
        state.inventory.push({emoji,level:state.curLevel});
        const lines=["NICE ONE!","GREAT CHOICE!","GOOD TASTE!","EXCELLENT!","WISE PICK!"];
        typeWriter(lines[Math.floor(Math.random()*lines.length)],false);
        setTimeout(()=>{ renderShop(); updateUI(); },600);
    } else { typeWriter("NOT ENOUGH COINS.",false); }
}
function renderShop(){
    const inv=state.invest[state.curLevel]??0;
    const grid=document.getElementById('shop-items-grid'); grid.innerHTML="";
    const eligible=(inv>=400)||hasKey(state.curLevel);
    if(eligible&&!hasKey(state.curLevel)) typeWriter("👻 YOU'VE UNLOCKED THE BOSS ROUND!",true);
    else if(eligible) typeWriter("👻 BOSS ROUND AVAILABLE!",true);
    else typeWriter("FLOOR "+state.curLevel+" SHOP!",false);
    const hc=document.createElement('div'); hc.className="item-card";
    hc.innerHTML=`<div>❤️</div><button onclick="buyHeart()">⭐75</button>`; grid.appendChild(hc);
    levels[state.curLevel].stickers.forEach((item,idx)=>{
        const count=state.inventory.filter(i=>i.emoji===item.emoji).length;
        const stock=count===0?"2X":(count===1?"1X":"SOLD");
        const card=document.createElement('div'); card.className="item-card"; card.id=`shop-item-${idx}`;
        card.innerHTML=`<div>${item.emoji}</div><button onclick="buyItem('${item.emoji}',${item.price},${idx})" ${count>=2?'disabled':''}>${stock}: ⭐${item.price}</button>`;
        grid.appendChild(card);
    });
}
function hasKey(lvl){ return state.inventory.some(i=>i.level===lvl&&i.isKey); }

let keyCeremonyTimer=null;
function showKeyCeremony(lvl){
    document.getElementById('ceremony-text').innerHTML=`YOU GOT THE KEY!<br>Floor ${lvl+1} is now open.`;
    document.getElementById('key-ceremony').classList.remove('hidden');
    if(keyCeremonyTimer) clearTimeout(keyCeremonyTimer);
    keyCeremonyTimer=setTimeout(dismissKeyCeremony,8000);
}
function dismissKeyCeremony(){
    if(keyCeremonyTimer){ clearTimeout(keyCeremonyTimer); keyCeremonyTimer=null; }
    document.getElementById('key-ceremony').classList.add('hidden');
}

// ─── GAME FLOW ────────────────────────────────────────────────────────────
function livesForRoundStart(){ state.lives=Math.max(state.lives,3); }

function startGame(){
    inChallenge=false; challengeBlock=0; challengeRate=1.0;
    comboCount=0; roundCoinsEarned=0; roundCorrect=0; roundTotal=0; perfectLightning=false;
    recentWords=[];
    document.getElementById('lightning-hud').classList.add('hidden');
    setArenaBg(0); cleanup(); livesForRoundStart(); state.roundHits=0;
    document.getElementById('left-stack').innerHTML="";
    document.getElementById('right-stack').innerHTML="";
    const lvl=levels[state.curLevel], labels=lvl.labels||lvl.sounds;
    document.getElementById('l-label').innerText=labels[0];
    document.getElementById('r-label').innerText=labels[1];
    preloadAudio();
    document.querySelectorAll('.overlay').forEach(el=>el.classList.add('hidden'));
    state.isPaused=false;
    document.getElementById('pause-btn').classList.add('visible');
    startFxKeepAlive();
    showFoxIntro(()=>{ spawnBlock(); });
}
function startChallenge(){
    inChallenge=true; challengeBlock=0; challengeRate=1.0;
    comboCount=0; roundCoinsEarned=0; driftAngle=0; roundCorrect=0; roundTotal=0; perfectLightning=true;
    recentWords=[];
    cleanup(); livesForRoundStart(); state.roundHits=0;
    document.getElementById('left-stack').innerHTML="";
    document.getElementById('right-stack').innerHTML="";
    const lvl=levels[state.curLevel], labels=lvl.labels||lvl.sounds;
    document.getElementById('l-label').innerText=labels[0];
    document.getElementById('r-label').innerText=labels[1];
    preloadAudio(); updateUI();
    document.querySelectorAll('.overlay').forEach(el=>el.classList.add('hidden'));
    document.getElementById('pause-btn').classList.add('visible');
    startFxKeepAlive();
    runCountdown(3,()=>{
        state.isPaused=false;
        document.getElementById('lightning-hud').classList.remove('hidden');
        spawnBlock();
    });
}

// ─── COUNTDOWN ────────────────────────────────────────────────────────────
function runCountdown(n,onDone){
    const screen=document.getElementById('lightning-countdown');
    const content=document.getElementById('lcd-content');
    screen.classList.remove('hidden');
    // Add floating ghost to the play field for boss round atmosphere
    const playField=document.getElementById('play-field');
    const floatGhost=document.createElement('div');
    floatGhost.id='boss-ghost-float';
    floatGhost.innerText='👻';
    playField.appendChild(floatGhost);
    function showStep(val){
        if(val===0){
            content.innerHTML=`<div class="lcd-ghost">👻</div>`;
            setTimeout(()=>{
                screen.classList.add('hidden');
                // Expand the ghost out before starting gameplay
                floatGhost.classList.add('expanding');
                setTimeout(()=>{ floatGhost.remove(); onDone(); },680);
            },600);
            return;
        }
        content.innerHTML=`<div class="lcd-number">${val}</div>`;
        setTimeout(()=>showStep(val-1),800);
    }
    showStep(n);
}

// ─── SPEED CURVES ─────────────────────────────────────────────────────────
function getChallengeAudioRate(b){ if(b<=3) return 1.0+(b*0.15); if(b<=6) return 1.45; return 1.45*Math.pow(2.65/1.45,(b-7)/8); }
function getChallengeFallSpeed(b){ if(b<=3) return BASE_FALL_SPEED+(b*0.4); if(b<=6) return BASE_FALL_SPEED+1.2; return (BASE_FALL_SPEED+1.2)+((MAX_FALL_SPEED-(BASE_FALL_SPEED+1.2))*Math.pow((b-7)/8,0.7)); }
function updateLightningHud(){ document.getElementById('lhud-block').innerText=challengeBlock; document.getElementById('lhud-speed').innerText=challengeRate.toFixed(2); }

// ─── FOX MASCOT ───────────────────────────────────────────────────────────
const FOX_MESSAGES = [
    "Are you ready?٩(◕‿◕｡)۶",
    "You can do it!!(°◡°♡)",
    "Hey, Let's go!! 。.:☆*:･'(*⌒―⌒*)))",
    "Don't think, Feel!! (๑˃ᴗ˂)ﻭ"
];
let foxMsgIndex = 0;

const FOX_RESULT = {
    high: [
        "Amazing!! You're on fire! ٩(◕‿◕｡)۶",
        "Perfect ears!! Keep it up!(°◡°♡)",
        "Incredible!! You're a natural! 。.:☆*:･'(*⌒―⌒*)))",
        "Outstanding!! You make it look easy! (๑˃ᴗ˂)ﻭ"
    ],
    mid: [
        "Good Job!! Don't stop, you're getting better! (づ ◕‿◕ )づ",
        "Nice work!! A little more practice and you'll nail it! (づ ◕‿◕ )づ",
        "Keep going!! You're improving every round! (づ ◕‿◕ )づ",
        "Well done!! The more you play, the sharper you get! (づ ◕‿◕ )づ"
    ],
    low: [
        "Don't give up!! It's tough at first, but soon it'll be too easy!! (◕‿◕)♡",
        "Stay with it!! Every listen makes your ears stronger! (◕‿◕)♡",
        "No worries!! Even the best started where you are! (◕‿◕)♡",
        "Keep trying!! Your brain is learning even when it's hard! (◕‿◕)♡"
    ],
    lightning: [
        "BOSS CLEARED!! You're unstoppable! 👻٩(◕‿◕｡)۶",
        "INCREDIBLE!! You beat the Boss! 👻(°◡°♡)",
        "AMAZING!! You conquered the ghost! 👻。.:☆*:･'(*⌒―⌒*)))",
        "LEGENDARY!! The fox is impressed! 👻(๑˃ᴗ˂)ﻭ"
    ]
};
let foxResultIdx = {high:0, mid:0, low:0, lightning:0};

function getFoxResultMsg(pct, isLightning){
    if(isLightning){
        const msgs=FOX_RESULT.lightning;
        return msgs[(foxResultIdx.lightning++)%msgs.length];
    }
    if(pct==null||pct>=80){
        const msgs=FOX_RESULT.high;
        return msgs[(foxResultIdx.high++)%msgs.length];
    } else if(pct>=50){
        const msgs=FOX_RESULT.mid;
        return msgs[(foxResultIdx.mid++)%msgs.length];
    } else {
        const msgs=FOX_RESULT.low;
        return msgs[(foxResultIdx.low++)%msgs.length];
    }
}

function showFoxIntro(onDone) {
    const el = document.getElementById('fox-intro');
    const msg = document.getElementById('fox-msg');
    msg.innerText = FOX_MESSAGES[foxMsgIndex % FOX_MESSAGES.length];
    foxMsgIndex++;
    el.classList.remove('hidden', 'fox-out');
    setTimeout(()=>{
        el.classList.add('fox-out');
        setTimeout(()=>{
            el.classList.add('hidden');
            el.classList.remove('fox-out');
            onDone();
        }, 400);
    }, 1500);
}

// ─── SPAWN ────────────────────────────────────────────────────────────────
let recentWords=[]; // tracks last 4 word keys to avoid repeats

function pickWord(){
    const pool=levels[state.curLevel].words;
    // Build a filtered pool excluding recently played words
    const key=w=>`${w.sound}_${w.word}`;
    let candidates=pool.filter(w=>!recentWords.includes(key(w)));
    // If pool is small enough that we can't avoid all recent, just use full pool
    if(candidates.length===0) candidates=pool;
    const w=candidates[Math.floor(Math.random()*candidates.length)];
    recentWords.push(key(w));
    if(recentWords.length>4) recentWords.shift();
    return w;
}

function spawnBlock(){
    const limit=inChallenge?CHALLENGE_LENGTH:ROUND_LENGTH;
    if(state.isPaused||state.lives<=0||state.roundHits>=limit) return;
    if(currentBlock) return;

    const w=pickWord();

    if(inChallenge){ challengeBlock++; challengeRate=getChallengeAudioRate(challengeBlock); updateLightningHud(); setArenaBg(challengeBlock); }

    document.getElementById('block-counter').innerText=`${state.roundHits+1}/${inChallenge?CHALLENGE_LENGTH:ROUND_LENGTH}`;

    // Reset and place target
    const targetEl=document.getElementById('falling-target');
    targetEl.style.transition='none';
    targetEl.style.transform='translateX(-50%)';
    targetEl.style.opacity='1';
    targetEl.style.filter='none';
    targetEl.style.top='-70px';
    targetEl.style.left='50%';
    targetEl.innerText=pickTarget();

    currentBlock={data:w, top:-70};

    // Pre-create audio so it starts buffering immediately
    const rate=inChallenge?challengeRate:(state.audioRate??1.0);
    if(currentAudio){ currentAudio.pause(); currentAudio.onended=null; currentAudio=null; }
    const a=new Audio(buildAudioPath(w));
    a.playbackRate=rate; currentAudio=a;

    // Calculate timer duration based on fall speed
    const speed=inChallenge?getChallengeFallSpeed(challengeBlock):BASE_FALL_SPEED;
    const arenaH=document.getElementById('play-field').offsetHeight||500;
    const duration=((arenaH+70)/speed)*(1000/60);

    // ── SYNC: timer and animation both start the instant audio plays ──
    // load() before play() fixes Chrome not auto-playing the very first word
    a.load();
    a.onerror=()=>{ console.warn('Missing:',buildAudioPath(w)); startTimer(duration); animate(); };
    a.play()
        .then(()=>{ startTimer(duration); animate(); })
        .catch(e=>{ console.warn(e); startTimer(duration); animate(); });
}

// ─── ANIMATE ─────────────────────────────────────────────────────────────
function animate(){
    if(state.isPaused||!currentBlock) return;
    const speed=inChallenge?getChallengeFallSpeed(challengeBlock):BASE_FALL_SPEED;
    currentBlock.top+=speed;
    let xOffset=0;
    if(inChallenge){ driftAngle+=0.04; xOffset=Math.sin(driftAngle)*22; }
    const targetEl=document.getElementById('falling-target');
    targetEl.style.top=currentBlock.top+'px';
    targetEl.style.left=`calc(50% + ${xOffset}px)`;
    const arenaH=document.getElementById('play-field').offsetHeight||500;
    if(currentBlock.top>arenaH) resolve(null);
    else animationId=requestAnimationFrame(animate);
}

// ─── INPUT ────────────────────────────────────────────────────────────────
window.addEventListener('pointerdown',e=>{
    if(state.isPaused||!currentBlock) return;
    if(e.target.closest('.overlay')) return;
    if(e.target.closest('#help-btn')) return;
    if(e.target.closest('#pause-btn')) return;
    if(e.target.closest('#speaker-btn')) return;
    if(e.target.closest('#currency-display')) return;
    if(e.target.closest('#lives-display')) return;
    if(e.target.closest('#lightning-hud')) return;
    if(e.target.closest('#dev-panel')) return;
    if(e.target.closest('#stall-header')) return;
    if(e.target.closest('#speaker-row')) return;
    if(e.target.closest('#fox-intro')) return;
    resolve(e.clientX<window.innerWidth/2?"L":"R");
});

// ─── RESOLVE ──────────────────────────────────────────────────────────────
function resolve(choice){
    if(!currentBlock) return;
    const w=currentBlock.data;
    const leftSide=isLeftSound(w);
    const correct=leftSide?"L":"R";
    const missed=choice===null;
    const ok=!missed&&choice===correct;
    const side=missed?correct:choice;

    // Target fly-off — clone the target so it animates while the original resets
    const targetEl=document.getElementById('falling-target');
    const ghost=document.createElement('div');
    ghost.style.cssText=`position:absolute;font-size:58px;line-height:1;z-index:21;pointer-events:none;top:${targetEl.style.top};left:${targetEl.style.left};transform:translateX(-50%);transition:transform 0.38s ease-in,opacity 0.38s ease-in,filter 0.2s;`;
    ghost.innerText=targetEl.innerText;
    document.getElementById('play-field').appendChild(ghost);
    // Trigger fly animation on next frame
    requestAnimationFrame(()=>{
        const flyX=side==='L'?-180:180;
        const flyColor=ok?'#2ecc71':'#e74c3c';
        ghost.style.transform=`translateX(calc(-50% + ${flyX}px)) rotate(${side==='L'?-45:45}deg) scale(0.3)`;
        ghost.style.opacity='0';
        ghost.style.filter=`drop-shadow(0 0 16px ${flyColor})`;
    });
    setTimeout(()=>ghost.remove(), 420);

    // Flash
    const flashEl=document.getElementById(side==='L'?'flash-l':'flash-r');
    flashEl.className=''; void flashEl.offsetWidth;
    flashEl.className=ok?'do-flash-green':'do-flash-red';

    // Brick — placed in the lane-half div for correct positioning
    const brick=document.createElement('div'); brick.className='brick'; brick.innerText=w.word;
    brick.style.background=ok?'var(--l-color)':'var(--r-color)';
    document.getElementById(side==='L'?'left-stack':'right-stack').appendChild(brick);

    stopTimer();

    if(!missed) roundTotal++;
    if(ok){
        state.roundHits++; addCoins(10); comboCount++; roundCorrect++;
        spawnCoinPop(side); showCombo(comboCount);
    } else {
        comboCount = 0;
        const old=document.getElementById('combo-banner'); if(old) old.remove();
        if(comboBannerTimer){ clearTimeout(comboBannerTimer); comboBannerTimer=null; }
        state.lives--;
        if(inChallenge) perfectLightning=false;
        showHeartBreak(correct);

        if(state.lives <= 0){
            cleanup();
            document.getElementById('lightning-hud').classList.add('hidden');
            document.getElementById('pause-btn').classList.remove('visible');
            inChallenge = false; 
            setArenaBg(0); 
            updateUI();
            return showMenu('game-over');
        }
    }
    cleanup(); updateUI();

    const limit=inChallenge?CHALLENGE_LENGTH:ROUND_LENGTH;
    if(state.roundHits>=limit){
        const old=document.getElementById('combo-banner'); if(old) old.remove();
        if(comboBannerTimer){ clearTimeout(comboBannerTimer); comboBannerTimer=null; }
        addCoins(50);
        updateStreak();
        const pct=roundTotal>0?recordAccuracy(roundCorrect,roundTotal):null;
        if(inChallenge){
            document.getElementById('lightning-hud').classList.add('hidden');
            inChallenge=false; setArenaBg(0);
            // Award perfect badge if no hearts lost
            if(perfectLightning){
                const badge={emoji:"⚡🏅",level:state.curLevel,isPerfect:true};
                if(!state.inventory.some(i=>i.isPerfect&&i.level===state.curLevel)){
                    state.inventory.push(badge); saveGame();
                }
            }
            setTimeout(()=>showLightningClear(pct),400);
        } else if(state.curLevel===FINAL_LEVEL){
            // On final level, practice round shows CLEAR not congrats
            setTimeout(()=>showRoundWin(pct),500);
        } else {
            setTimeout(()=>showRoundWin(pct),500);
        }
    } else { setTimeout(spawnBlock,500); }
}

function cleanup(){
    const t=document.getElementById('falling-target');
    if(t){ t.style.transition='none'; t.style.top='-200px'; t.style.opacity='1'; t.style.transform='translateX(-50%)'; t.style.filter='none'; }
    currentBlock=null; cancelAnimationFrame(animationId); stopTimer();
}
function togglePause(){
    const pauseMenu=document.getElementById('pause-menu');
    const pauseBtn=document.getElementById('pause-btn');
    if(!pauseMenu.classList.contains('hidden')){
        // Menu is open — bounce it out, then resume
        pauseMenu.classList.add('bouncing-out');
        setTimeout(()=>{
            pauseMenu.classList.add('hidden');
            pauseMenu.classList.remove('bouncing-out');
            state.isPaused=false;
            pauseBtn.classList.add('visible');
            const limit=inChallenge?CHALLENGE_LENGTH:ROUND_LENGTH;
            if(!currentBlock && state.roundHits<limit){
                spawnBlock();
            } else if(currentBlock){
                const rate=inChallenge?challengeRate:(state.audioRate??1.0);
                if(currentAudio){ currentAudio.pause(); currentAudio.onended=null; currentAudio=null; }
                const a=new Audio(buildAudioPath(currentBlock.data));
                a.playbackRate=rate; currentAudio=a;
                a.onerror=()=>{ animate(); };
                a.play().then(()=>{ animate(); }).catch(()=>{ animate(); });
            }
        }, 260);
    } else {
        // Open the pause menu
        state.isPaused=true; cancelAnimationFrame(animationId); stopTimer();
        if(currentAudio) currentAudio.pause();
        document.querySelectorAll('.overlay').forEach(el=>el.classList.add('hidden'));
        pauseMenu.classList.remove('hidden');
        pauseBtn.classList.add('visible'); // stays visible as the toggle target
        updateUI();
    }
}
function pauseExitToMenu(){
    const pauseMenu=document.getElementById('pause-menu');
    pauseMenu.classList.add('bouncing-out');
    setTimeout(()=>{
        pauseMenu.classList.add('hidden');
        pauseMenu.classList.remove('bouncing-out');
        document.getElementById('pause-btn').classList.remove('visible');
        showMenu('main-menu');
    }, 260);
}
function closeMenus(){
    document.querySelectorAll('.overlay').forEach(el=>el.classList.add('hidden'));
    state.isPaused=false;
    const limit=inChallenge?CHALLENGE_LENGTH:ROUND_LENGTH;
    if(!currentBlock&&state.roundHits<limit){
        spawnBlock();
    } else if(currentBlock){
        const rate=inChallenge?challengeRate:(state.audioRate??1.0);
        if(currentAudio){ currentAudio.pause(); currentAudio.onended=null; currentAudio=null; }
        const a=new Audio(buildAudioPath(currentBlock.data));
        a.playbackRate=rate; currentAudio=a;
        a.onerror=()=>{ animate(); };
        a.play().then(()=>{ animate(); }).catch(()=>{ animate(); });
    }
}
function setSpeed(s){ state.audioRate=s; updateUI(); }

// ─── ROUND WIN ────────────────────────────────────────────────────────────
function showRoundWin(pct){
    const best=state.bestAccuracy[getAccuracyKey()]||0;
    let coins=`💰 +${roundCoinsEarned} coins!`;
    if(pct!=null){
        coins+=`<br><span style="font-size:15px;color:#aaa;">Accuracy: ${pct}%`;
        if(pct>=best&&pct>0) coins+=` ⭐ BEST!`;
        coins+=`</span>`;
    }
    document.getElementById('round-win-coins').innerHTML=coins;
    document.getElementById('fox-round-msg').innerText=getFoxResultMsg(pct, false);
    showMenu('round-win');
}

// ─── BOSS CLEAR ───────────────────────────────────────────────────────────
function showLightningClear(pct){
    const isFinalLevel = state.curLevel===FINAL_LEVEL;
    if(!hasKey(state.curLevel)){
        state.inventory.push({emoji:"🗝️",level:state.curLevel,isKey:true});
        if(!isFinalLevel) state.maxLevel=Math.max(state.maxLevel,state.curLevel+1);
        saveGame();
    }
    const subEl=document.getElementById('lc-accuracy');
    if(subEl&&pct!=null){
        const best=state.bestAccuracy[getAccuracyKey()]||0;
        subEl.innerHTML=`Accuracy: ${pct}%${pct>=best&&pct>0?' ⭐ BEST!':''}`;
        subEl.classList.remove('hidden');
    }
    const foxEl=document.getElementById('lc-fox-msg');
    if(foxEl) foxEl.innerText=getFoxResultMsg(pct, true);
    document.getElementById('lightning-clear').dataset.finalLevel = isFinalLevel ? '1' : '';
    document.getElementById('lightning-clear').classList.remove('hidden');
}
function dismissLightningClear(){
    const isFinal = document.getElementById('lightning-clear').dataset.finalLevel==='1';
    document.getElementById('lightning-clear').classList.add('hidden');
    if(isFinal){
        setTimeout(()=>showCongrats(),300);
    } else {
        const lvl=state.curLevel; showMenu('main-menu');
        setTimeout(()=>showKeyCeremony(lvl),200);
    }
}

// ─── TOWER & BOOK ─────────────────────────────────────────────────────────
function renderTower(){
    const list=document.getElementById('tower-list'); list.innerHTML="";
    for(let i=1;i<=9;i++){
        if(!levels[i]) continue;
        const div=document.createElement('div'), locked=i>state.maxLevel;
        div.className="tower-item";
        if(i===state.curLevel){ div.style.borderColor="var(--accent)"; div.style.boxShadow="0 0 15px var(--accent)"; }
        div.style.opacity=locked?"0.4":"1";
        const kb=hasKey(i)?`<span style="float:right;filter:sepia(1) saturate(5) hue-rotate(5deg) brightness(1.2);">🗝️</span>`:'';
        const displayName=i===FINAL_LEVEL?'L vs R 👑':levels[i].name;
        div.innerHTML=`Floor ${i}: ${displayName} ${locked?'🔒':''}${kb}`;
        if(!locked) div.onclick=()=>{ state.curLevel=Number(i); preloadAudio(); updateUI(); renderTower(); };
        list.appendChild(div);
    }
}
function renderBook(){
    const b=document.getElementById('book-display'); b.innerHTML="";
    if(!state.inventory.length){ b.innerHTML="<p>BOOK IS EMPTY</p>"; return; }
    state.inventory.forEach(item=>{
        const d=document.createElement('div'); d.className="book-sticker"; d.innerText=item.emoji;
        if(item.isKey) d.style.filter="sepia(1) saturate(5) hue-rotate(5deg) brightness(1.4) drop-shadow(0 0 12px #f1c40f)";
        b.appendChild(d);
    });
}

// ─── CONGRATULATIONS ──────────────────────────────────────────────────────
function showCongrats(){
    document.querySelectorAll('.overlay').forEach(el=>el.classList.add('hidden'));
    document.getElementById('congrats-screen').classList.remove('hidden');
    startConfetti();
}
function dismissCongrats(){ stopConfetti(); document.getElementById('congrats-screen').classList.add('hidden'); showMenu('main-menu'); }
function startConfetti(){
    const canvas=document.getElementById('confetti-canvas'), ctx=canvas.getContext('2d');
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    const colors=['#f1c40f','#2ecc71','#e67e22','#3498db','#e74c3c','#9b59b6','#fff'];
    confettiParticles=Array.from({length:120},()=>({ x:Math.random()*canvas.width, y:Math.random()*canvas.height-canvas.height, r:6+Math.random()*8, d:Math.random()*120, color:colors[Math.floor(Math.random()*colors.length)], tilt:Math.random()*10-10, tiltSpeed:0.1+Math.random()*0.3, speed:1.5+Math.random()*2.5, angle:0 }));
    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        confettiParticles.forEach(p=>{ ctx.beginPath(); ctx.lineWidth=p.r/2; ctx.strokeStyle=p.color; ctx.moveTo(p.x+p.tilt+p.r/4,p.y); ctx.lineTo(p.x+p.tilt,p.y+p.tilt+p.r/4); ctx.stroke(); p.angle+=0.02; p.tilt=Math.sin(p.angle+p.d)*12; p.y+=p.speed; p.x+=Math.sin(p.angle)*1.5; if(p.y>canvas.height){ p.y=-10; p.x=Math.random()*canvas.width; } });
        confettiRaf=requestAnimationFrame(draw);
    }
    draw();
}
function stopConfetti(){ cancelAnimationFrame(confettiRaf); confettiRaf=null; const canvas=document.getElementById('confetti-canvas'); canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height); confettiParticles=[]; }

// ─── DEV BACKDOOR ─────────────────────────────────────────────────────────
let devTapCount=0, devTapTimer=null;
function devTitleTap(){
    devTapCount++; if(devTapTimer) clearTimeout(devTapTimer);
    devTapTimer=setTimeout(()=>{ devTapCount=0; },600);
    if(devTapCount>=3){ devTapCount=0; buildDevPanel(); document.getElementById('dev-panel').classList.remove('hidden'); }
}
function buildDevPanel(){
    const container=document.getElementById('dev-level-btns'); container.innerHTML='';
    for(let i=1;i<=9;i++){
        if(!levels[i]) continue;
        const b=document.createElement('button'); b.textContent=`F${i}`; b.dataset.lvl=i;
        b.classList.toggle('dev-active',i===state.curLevel);
        b.onclick=()=>{ state.curLevel=i; preloadAudio(); updateUI(); showMenu('main-menu'); };
        container.appendChild(b);
    }
}
function devUnlockAll(){
    state.maxLevel=9;
    for(let i=1;i<=9;i++){
        if(!state.inventory.some(x=>x.level===i&&x.isKey)) state.inventory.push({emoji:"🗝️",level:i,isKey:true});
        state.invest[i]=Math.max(state.invest[i]??0,400);
    }
    updateUI(); document.getElementById('btn-world-map').classList.remove('hidden');
}
function devAddCoins(){ addCoins(500); updateUI(); }
function devResetSave(){ if(confirm('Reset ALL save data? This cannot be undone.')){ localStorage.removeItem('phoneticFlowSave'); location.reload(); } }

// ─── BOOT ─────────────────────────────────────────────────────────────────
loadGame();