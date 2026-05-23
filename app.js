// ─── CONSTANTS ────────────────────────────────────────────────────────────
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
let roundCorrect=0, roundTotal=0;
let perfectLightning=false;

// ─── SOFT-PAUSE STATE ─────────────────────────────────────────────────────
// softPause: the play field is frozen for review; distinct from the full pause menu
let softPaused = false;
let softPauseTapTimer = null;       // used to detect double-tap on bricks
let softPauseLastBrick = null;      // last brick element tapped (for double-tap)
let softPauseBrickFlipped = false;  // is the last tapped brick showing Japanese?
let audioCtx = null;                // Web Audio context for soft-pause click sound

function getAudioCtx(){
    if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

// Play a short, friendly click using a Web Audio oscillator — no files needed
function playClickSound(type){
    // type: 'on' (entering soft-pause) or 'off' (leaving soft-pause)
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        if(type === 'on'){
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.12);
            gain.gain.setValueAtTime(0.18, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.15);
        } else {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.14, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.12);
        }
    } catch(e){ /* silently ignore if audio not available */ }
}

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

// ─── STREAK ──────────────────────────────────────────────────────────────
function todayStr(){ return new Date().toISOString().slice(0,10); }
function updateStreak(){
    const today=todayStr();
    if(state.lastPlayedDate===today) return;
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
    // Exit soft-pause cleanly before going to any overlay
    if(softPaused) exitSoftPause(false);
    state.isPaused=true; cancelAnimationFrame(animationId); stopTimer();
    if(currentAudio) currentAudio.pause();
    document.querySelectorAll('.overlay').forEach(el=>el.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    document.getElementById('pause-btn').classList.remove('visible');
    // Hide answer zones when in any menu
    showAnswerZones(false);
    // Hide help button when in menus (it has its own button inside each overlay)
    document.getElementById('help-btn').classList.add('hidden');
    if(id==='shop-menu') renderShop();
    if(id==='level-select') renderTower();
    if(id==='sticker-book') renderBook();
    updateUI();
}
function updateUI(){
    document.getElementById('currency-display').innerText=`⭐ ${coins()}`;
    document.getElementById('lives-display').innerHTML='❤️'.repeat(Math.max(0,state.lives));
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
    // Update answer zone labels to match current level's sound labels
    const labels = lvl.labels || lvl.sounds;
    const azl = document.getElementById('answer-zone-l');
    const azr = document.getElementById('answer-zone-r');
    if(azl) azl.querySelector('.az-label').innerText = labels[0];
    if(azr) azr.querySelector('.az-label').innerText = labels[1];
    saveGame();
}
function setGender(g){
    state.gender=g;
    document.getElementById('btn-mike').classList.toggle('active-yellow',g==='male');
    document.getElementById('btn-jenny').classList.toggle('active-yellow',g==='female');
    // Play the pre-recorded greeting file for the selected voice
    const greetingPath = `audio/greeting_${g==='male'?'male':'female'}.mp3`;
    if(currentAudio){ currentAudio.pause(); currentAudio.onended=null; currentAudio=null; }
    const a = new Audio(greetingPath);
    a.playbackRate = state.audioRate || 1.0;
    a.onerror = ()=>console.warn('Missing greeting file:', greetingPath);
    a.play().catch(e=>console.warn('Greeting play failed:', e));
    saveGame();
}

// ─── TIMER ────────────────────────────────────────────────────────────────
function startTimer(duration){ /* timer bar removed */ }
function stopTimer(){ if(timerRaf){ cancelAnimationFrame(timerRaf); timerRaf=null; } }

// ─── ARENA BG SHIFT ───────────────────────────────────────────────────────
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
    const remaining=Math.max(0,state.lives);
    document.getElementById('lives-display').innerHTML='❤️'.repeat(remaining);
    const pf=document.getElementById('play-field');
    const pw=pf.offsetWidth, ph=pf.offsetHeight;
    const hb=document.createElement('div');
    hb.className='heart-break';
    hb.textContent='💔';
    const xPos = correctSide==='L' ? pw*0.25 : pw*0.75;
    const rect = pf.getBoundingClientRect();
    hb.style.left = (rect.left + xPos - 27) + 'px';
    hb.style.top  = (rect.top + ph*0.5) + 'px';
    document.body.appendChild(hb);
    setTimeout(()=>{ if(hb.parentNode) hb.parentNode.removeChild(hb); }, 1100);
}

// ─── HELP ─────────────────────────────────────────────────────────────────
function showHelp(){
    const wasPlaying = !state.isPaused;
    state.isPaused=true; cancelAnimationFrame(animationId); stopTimer();
    if(currentAudio) currentAudio.pause();
    // Only show main-menu behind help if no game is in progress
    const gameInProgress = (state.roundHits > 0) || currentBlock;
    if(!gameInProgress){
        document.querySelectorAll('.overlay').forEach(el=>el.classList.add('hidden'));
        document.getElementById('main-menu').classList.remove('hidden');
    }
    document.getElementById('help-screen').classList.remove('hidden');
    document.getElementById('help-btn').classList.add('hidden');
    document.getElementById('pause-btn').classList.remove('visible');
}
function dismissHelp(){
    document.getElementById('help-screen').classList.add('hidden');
    state.seenHelp=true; saveGame();
    // If a game is in progress, resume it and show help-btn
    const gameInProgress = (state.roundHits > 0) || currentBlock;
    if(gameInProgress){
        document.getElementById('help-btn').classList.remove('hidden');
        document.getElementById('pause-btn').classList.add('visible');
        // Resume: restart animation/audio for current block
        state.isPaused = false;
        if(currentBlock){
            const rate = inChallenge ? challengeRate : (state.audioRate ?? 1.0);
            if(currentAudio){ currentAudio.pause(); currentAudio.onended=null; currentAudio=null; }
            const a = new Audio(buildAudioPath(currentBlock.data));
            a.playbackRate = rate; currentAudio = a;
            a.onerror = ()=>{ animate(); };
            a.play().then(()=>{ animate(); }).catch(()=>{ animate(); });
        }
    } else {
        // No game in progress — stay on main menu, help-btn stays hidden
        document.getElementById('help-btn').classList.add('hidden');
        const anyVisible=[...document.querySelectorAll('.overlay')].some(el=>!el.classList.contains('hidden'));
        if(!anyVisible){
            document.getElementById('main-menu').classList.remove('hidden');
        }
    }
}

// ─── REPLAY CURRENT ───────────────────────────────────────────────────────
function replayCurrent(){
    if(!currentBlock) return;
    // Allow replay both in normal play and soft-pause
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

function showAnswerZones(show){
    const wrap = document.getElementById('answer-zones');
    if(!wrap) return;
    if(show){ wrap.classList.remove('hidden'); }
    else    { wrap.classList.add('hidden');    }
}

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
    document.getElementById('help-btn').classList.remove('hidden');
    showAnswerZones(true);
    updateUI();
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
    document.getElementById('help-btn').classList.remove('hidden');
    showAnswerZones(true);
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
let recentWords=[];

function pickWord(){
    const pool=levels[state.curLevel].words;
    const key=w=>`${w.sound}_${w.word}`;
    let candidates=pool.filter(w=>!recentWords.includes(key(w)));
    if(candidates.length===0) candidates=pool;
    const w=candidates[Math.floor(Math.random()*candidates.length)];
    recentWords.push(key(w));
    if(recentWords.length>4) recentWords.shift();
    return w;
}

function spawnBlock(){
    const limit=inChallenge?CHALLENGE_LENGTH:ROUND_LENGTH;
    if(state.isPaused||softPaused||state.lives<=0||state.roundHits>=limit) return;
    if(currentBlock) return;

    const w=pickWord();

    if(inChallenge){ challengeBlock++; challengeRate=getChallengeAudioRate(challengeBlock); updateLightningHud(); setArenaBg(challengeBlock); }

    document.getElementById('block-counter').innerText=`${state.roundHits+1}/${inChallenge?CHALLENGE_LENGTH:ROUND_LENGTH}`;

    const targetEl=document.getElementById('falling-target');
    targetEl.style.transition='none';
    targetEl.style.transform='translateX(-50%)';
    targetEl.style.opacity='1';
    targetEl.style.filter='none';
    targetEl.style.top='-70px';
    targetEl.style.left='50%';
    targetEl.innerText=pickTarget();

    currentBlock={data:w, top:-70};

    const rate=inChallenge?challengeRate:(state.audioRate??1.0);
    if(currentAudio){ currentAudio.pause(); currentAudio.onended=null; currentAudio=null; }
    const a=new Audio(buildAudioPath(w));
    a.playbackRate=rate; currentAudio=a;

    const speed=inChallenge?getChallengeFallSpeed(challengeBlock):BASE_FALL_SPEED;
    const arenaH=document.getElementById('play-field').offsetHeight||500;
    const duration=((arenaH+70)/speed)*(1000/60);

    a.load();
    a.onerror=()=>{ console.warn('Missing:',buildAudioPath(w)); startTimer(duration); animate(); };
    a.play()
        .then(()=>{ startTimer(duration); animate(); })
        .catch(e=>{ console.warn(e); startTimer(duration); animate(); });
}

// ─── ANIMATE ─────────────────────────────────────────────────────────────
function animate(){
    if(state.isPaused||softPaused||!currentBlock) return;
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

// ─── INPUT — ANSWER ZONE BUTTONS (Step 3) ────────────────────────────────
// Answer is now delivered through the two full-width bottom tap zones.
// The old full-screen pointerdown listener is kept only for soft-pause interactions.

function handleAnswerTap(side){
    // Must not be in a menu, must not be soft-paused, must have a block
    if(state.isPaused) return;
    if(softPaused) return;       // answer zones shouldn't be reachable but guard anyway
    if(!currentBlock) return;
    resolve(side);
}

// ─── SOFT-PAUSE (Step 4) ──────────────────────────────────────────────────
// Soft-pause is triggered by tapping the play field (not an answer button,
// not a control). It freezes the falling block and dims the field.
// Disabled entirely during Boss challenge.

function enterSoftPause(){
    if(inChallenge) return;           // disabled during boss
    if(state.isPaused) return;        // hard-paused already
    if(!currentBlock && state.roundHits >= (inChallenge?CHALLENGE_LENGTH:ROUND_LENGTH)) return;
    softPaused = true;
    cancelAnimationFrame(animationId);
    stopTimer();
    if(currentAudio) currentAudio.pause();
    playClickSound('on');
    // Apply the dim overlay to the play field
    document.getElementById('play-field').classList.add('soft-paused');
    // Show the soft-pause hint bar
    document.getElementById('soft-pause-hint').classList.remove('hidden');
    // Make all bricks in the stacks interactive
    activateBricksForReview();
}

function exitSoftPause(andResume){
    if(!softPaused) return;
    softPaused = false;
    // Clear any pending double-tap timer
    if(softPauseTapTimer){ clearTimeout(softPauseTapTimer); softPauseTapTimer=null; }
    softPauseLastBrick = null;
    // Deactivate brick interactivity & reset any flipped bricks
    deactivateBricksAfterReview();
    document.getElementById('play-field').classList.remove('soft-paused');
    document.getElementById('soft-pause-hint').classList.add('hidden');
    playClickSound('off');
    if(andResume){
        // Resume: replay audio for current block and restart animation
        if(currentBlock){
            const rate=inChallenge?challengeRate:(state.audioRate??1.0);
            if(currentAudio){ currentAudio.pause(); currentAudio.onended=null; currentAudio=null; }
            const a=new Audio(buildAudioPath(currentBlock.data));
            a.playbackRate=rate; currentAudio=a;
            a.onerror=()=>{ animate(); };
            a.play().then(()=>{ animate(); }).catch(()=>{ animate(); });
        } else {
            // No block in flight — spawn the next one
            const limit=inChallenge?CHALLENGE_LENGTH:ROUND_LENGTH;
            if(state.roundHits < limit) setTimeout(spawnBlock, 200);
        }
    }
}

function activateBricksForReview(){
    // Find all bricks in both stacks and attach review tap handlers
    document.querySelectorAll('#left-stack .brick, #right-stack .brick').forEach(brick=>{
        brick.classList.add('review-mode');
        // Store original word text before any flipping happens
        if(!brick.dataset.word) brick.dataset.word = brick.innerText;
        brick.addEventListener('pointerdown', brickReviewPointerDown, {capture:true});
    });
}

function deactivateBricksAfterReview(){
    document.querySelectorAll('#left-stack .brick, #right-stack .brick').forEach(brick=>{
        brick.classList.remove('review-mode', 'brick-flipped');
        // Restore English text if it was flipped
        if(brick.dataset.word) brick.innerText = brick.dataset.word;
        brick.removeEventListener('pointerdown', brickReviewPointerDown, {capture:true});
    });
}

function brickReviewPointerDown(e){
    e.stopPropagation(); // prevent the play-field handler from seeing this
    if(!softPaused) return;
    const brick = e.currentTarget;
    // Double-tap detection: if this brick was the last one tapped and timer is running
    if(softPauseLastBrick === brick && softPauseTapTimer){
        // DOUBLE TAP — flip the brick between English and Japanese
        clearTimeout(softPauseTapTimer); softPauseTapTimer=null;
        softPauseLastBrick = null;
        flipBrick(brick);
    } else {
        // SINGLE TAP — replay that word's audio
        // Set up double-tap window
        if(softPauseTapTimer){ clearTimeout(softPauseTapTimer); softPauseTapTimer=null; }
        softPauseLastBrick = brick;
        // Replay the word audio for this brick
        replayBrickAudio(brick);
        softPauseTapTimer = setTimeout(()=>{
            softPauseTapTimer = null;
            softPauseLastBrick = null;
        }, 320); // 320ms double-tap window
    }
}

function replayBrickAudio(brick){
    // Find the word data matching this brick's word text
    const wordText = brick.dataset.word || brick.innerText;
    const pool = levels[state.curLevel].words;
    // Match by word text (there may be duplicates across sounds; pick first match)
    const wdata = pool.find(w => w.word === wordText);
    if(!wdata) return;
    const rate = state.audioRate ?? 1.0;
    const savedLevel = state.curLevel;
    if(currentAudio){ currentAudio.pause(); currentAudio.onended=null; currentAudio=null; }
    const path = `audio/${levels[savedLevel].folder}/${wdata.sound}_${wdata.position}_${wdata.word}_${state.gender==='male'?'male':'female'}.mp3`;
    const a = new Audio(path);
    a.playbackRate = rate; currentAudio = a;
    a.onerror = ()=>console.warn('Missing brick audio:', path);
    a.play().catch(err=>console.warn(err));
    // Brief glow pulse on the brick to indicate playback
    brick.classList.add('brick-playing');
    setTimeout(()=>brick.classList.remove('brick-playing'), 600);
}

function flipBrick(brick){
    const wordText = brick.dataset.word || brick.innerText;
    const pool = levels[state.curLevel].words;
    const wdata = pool.find(w => w.word === wordText);
    if(!wdata || !wdata.ja) return;
    // Toggle between English and Japanese
    if(!brick.classList.contains('brick-flipped')){
        brick.classList.add('brick-flipped');
        brick.innerText = wdata.ja;
    } else {
        brick.classList.remove('brick-flipped');
        brick.innerText = brick.dataset.word;
    }
}

// ─── PLAY-FIELD POINTER HANDLER (soft-pause trigger) ─────────────────────
// Tapping the play field while active:
//   - If not soft-paused: enter soft-pause
//   - If soft-paused: exit soft-pause and resume
//   - If boss challenge: nothing (soft-pause is disabled)
// Answer zones are separate elements and stop propagation.
document.addEventListener('DOMContentLoaded', ()=>{
    const playField = document.getElementById('play-field');
    if(playField){
        playField.addEventListener('pointerdown', e=>{
            // Ignore if any overlay is visible
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
            if(e.target.closest('#center-control-bar')) return;
            if(e.target.closest('#fox-intro')) return;
            // Bricks handle their own events in review mode
            if(softPaused && e.target.closest('.brick')) return;
            // Answer zones stop propagation themselves; guard here too
            if(e.target.closest('#answer-zone-l') || e.target.closest('#answer-zone-r')) return;

            if(inChallenge) return; // soft-pause disabled during boss

            if(softPaused){
                // Tapping empty space in soft-pause resumes
                exitSoftPause(true);
            } else if(!state.isPaused && currentBlock){
                // Enter soft-pause only when a block is actively falling
                enterSoftPause();
            }
        });
    }
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

    // Animate answer zone tap feedback
    const tapZone = document.getElementById(side==='L'?'answer-zone-l':'answer-zone-r');
    if(tapZone){
        tapZone.classList.remove('az-correct', 'az-wrong');
        void tapZone.offsetWidth; // reflow
        tapZone.classList.add(ok?'az-correct':'az-wrong');
        setTimeout(()=>{ tapZone.classList.remove('az-correct','az-wrong'); }, 450);
    }

    // Target fly-off
    const targetEl=document.getElementById('falling-target');
    const ghost=document.createElement('div');
    ghost.style.cssText=`position:absolute;font-size:58px;line-height:1;z-index:21;pointer-events:none;top:${targetEl.style.top};left:${targetEl.style.left};transform:translateX(-50%);transition:transform 0.38s ease-in,opacity 0.38s ease-in,filter 0.2s;`;
    ghost.innerText=targetEl.innerText;
    document.getElementById('play-field').appendChild(ghost);
    requestAnimationFrame(()=>{
        const flyX=side==='L'?-180:180;
        const flyColor=ok?'#2ecc71':'#e74c3c';
        ghost.style.transform=`translateX(calc(-50% + ${flyX}px)) rotate(${side==='L'?-45:45}deg) scale(0.3)`;
        ghost.style.opacity='0';
        ghost.style.filter=`drop-shadow(0 0 16px ${flyColor})`;
    });
    setTimeout(()=>ghost.remove(), 420);

    // Lane flash
    const flashEl=document.getElementById(side==='L'?'flash-l':'flash-r');
    flashEl.className=''; void flashEl.offsetWidth;
    flashEl.className=ok?'do-flash-green':'do-flash-red';

    // ── STEP 2: Brick carries word data (word + ja) ──────────────────────
    // dataset.word = English word, dataset.ja = Japanese translation
    const brick=document.createElement('div');
    brick.className='brick';
    brick.innerText=w.word;
    brick.dataset.word = w.word;
    brick.dataset.ja   = w.ja || '';   // Japanese translation from levels_revised.js
    brick.dataset.sound = w.sound;
    brick.dataset.position = w.position;
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
            document.getElementById('help-btn').classList.add('hidden');
            showAnswerZones(false);
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
        showAnswerZones(false);
        const pct=roundTotal>0?recordAccuracy(roundCorrect,roundTotal):null;
        if(inChallenge){
            document.getElementById('lightning-hud').classList.add('hidden');
            inChallenge=false; setArenaBg(0);
            if(perfectLightning){
                const badge={emoji:"⚡🏅",level:state.curLevel,isPerfect:true};
                if(!state.inventory.some(i=>i.isPerfect&&i.level===state.curLevel)){
                    state.inventory.push(badge); saveGame();
                }
            }
            setTimeout(()=>showLightningClear(pct),400);
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
    if(softPaused) exitSoftPause(false); // exit soft-pause before hard-pausing
    const pauseMenu=document.getElementById('pause-menu');
    const pauseBtn=document.getElementById('pause-btn');
    if(!pauseMenu.classList.contains('hidden')){
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
        state.isPaused=true; cancelAnimationFrame(animationId); stopTimer();
        if(currentAudio) currentAudio.pause();
        document.querySelectorAll('.overlay').forEach(el=>el.classList.add('hidden'));
        pauseMenu.classList.remove('hidden');
        pauseBtn.classList.add('visible');
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
        document.getElementById('help-btn').classList.add('hidden');
        showAnswerZones(false);
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
    let coinsHtml=`💰 +${roundCoinsEarned} coins!`;
    if(pct!=null){
        coinsHtml+=`<br><span style="font-size:15px;color:#aaa;">Accuracy: ${pct}%`;
        if(pct>=best&&pct>0) coinsHtml+=` ⭐ BEST!`;
        coinsHtml+=`</span>`;
    }
    document.getElementById('round-win-coins').innerHTML=coinsHtml;
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
