'use strict';
// Original, locally synthesized music; no downloads or external audio services.
const Soundscape=(()=>{
 const storageKey='lost-library-audio-v1';let preference=null,master,music,effects,timer,nextNote=0,step=0,active=false,starting=false;
 const voices=new Set();let analyser;
 try{preference=localStorage.getItem(storageKey);}catch{}
 const melody=[72,null,76,79,null,76,74,null,69,null,72,76,null,74,72,null,65,null,69,72,null,76,74,null,67,null,71,74,null,72,67,null];
 const chords=[[48,55,60,64],[45,52,57,60],[41,48,53,57],[43,50,55,59]];
 const freq=n=>440*Math.pow(2,(n-69)/12);
 function persist(value){preference=value;try{localStorage.setItem(storageKey,value);}catch{}}
 function controls(){const label=active?'♫ Sound on':preference==='on'?'♫ Tap for sound':preference==='off'?'♫ Sound off':'♫ Enable sound';$('sound').textContent=label;$('sound').setAttribute('aria-pressed',String(active));$('sound').setAttribute('aria-label',active?'Mute music and sound effects':'Enable music and sound effects');const b=$('music-start');if(b){b.textContent=active?'♫ Music playing':'♫ Enable music';b.setAttribute('aria-pressed',String(active));}const note=$('audio-note');if(note)note.textContent=preference==='off'?'Sound is muted · you can turn it on above.':active?'Gentle music is playing · mute anytime.':'Begin your story to hear the music · mute anytime.';}
 function build(){if(audio)return;const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw Error('Audio is not supported');audio=new Audio();master=audio.createGain();master.gain.value=.42;music=audio.createGain();music.gain.value=.42;effects=audio.createGain();effects.gain.value=.6;music.connect(master);effects.connect(master);const limiter=audio.createDynamicsCompressor();limiter.threshold.value=-15;limiter.ratio.value=5;master.connect(limiter);analyser=audio.createAnalyser();analyser.fftSize=512;limiter.connect(analyser);analyser.connect(audio.destination);audio.onstatechange=()=>{if(audio.state==='suspended'&&active){active=false;sound=false;stopClock();controls();}};}
 function tone(note,time,duration,volume,bus=music,type='sine'){if(!audio||!active)return;const osc=audio.createOscillator(),gain=audio.createGain();osc.type=type;osc.frequency.value=freq(note);gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(volume,time+.035);gain.gain.exponentialRampToValueAtTime(.0001,time+duration);osc.connect(gain);gain.connect(bus);voices.add(osc);osc.onended=()=>{voices.delete(osc);osc.disconnect();gain.disconnect();};osc.start(time);osc.stop(time+duration+.03);}
 function schedule(){if(!active||document.hidden)return;while(nextNote<audio.currentTime+.75){const i=step%melody.length,n=melody[i];if(n!==null){tone(n,nextNote,2.4,.2);tone(n+12,nextNote+.015,1.2,.035);}if(i%8===0)for(const n of chords[Math.floor(i/8)])tone(n,nextNote,6.8,.055);step++;nextNote+=.8;}}
 function stopClock(){clearInterval(timer);timer=null;}
 function clearVoices(){for(const osc of voices){try{osc.stop();}catch{}}voices.clear();}
 async function enable(save=true){if(starting||active)return;starting=true;try{build();await audio.resume();if(audio.state!=='running')throw Error('Audio needs another tap');active=true;sound=true;if(save)persist('on');step=0;nextNote=audio.currentTime+.08;stopClock();schedule();timer=setInterval(schedule,250);reward();}catch{active=false;sound=false;toast('Sound could not start. Tap Enable sound again, and check that your browser tab is not muted.');}finally{starting=false;controls();}}
 function disable(){persist('off');active=false;sound=false;stopClock();clearVoices();audio?.suspend();controls();}
 function toggle(){if(active)disable();else enable();}
 function reward(){if(!active)return;[72,76,79,84].forEach((n,i)=>tone(n,audio.currentTime+i*.14,1.45,.22,effects));}
 function effect(kind){if(!active)return;const now=audio.currentTime;if(kind==='step')tone(43,now,.075,.07,effects,'triangle');else if(kind==='page'){tone(84,now,.3,.12,effects);tone(88,now+.12,.55,.1,effects);}else if(kind==='open'){tone(60,now,.32,.13,effects,'triangle');tone(67,now+.08,.5,.11,effects);}else if(kind==='lantern'){[76,79,83].forEach((n,i)=>tone(n,now+i*.12,.8,.15,effects));}}
 document.addEventListener('visibilitychange',()=>{if(document.hidden){stopClock();clearVoices();active=false;sound=false;audio?.suspend();controls();}else if(preference==='on')enable(false);});
 document.addEventListener('pointerdown',e=>{if(preference==='on'&&!active&&e.target.closest('#sound,#music-start')===null)enable(false);},{capture:true});
 ['play','continue'].forEach(id=>$(id).addEventListener('click',()=>{if(preference!=='off')enable();},{capture:true}));
 const musicButton=button('♫ Enable music',toggle);musicButton.id='music-start';document.querySelector('.home-actions').append(musicButton);const note=text('p','');note.id='audio-note';note.className='audio-note';document.querySelector('.home-actions').after(note);controls();
 return {toggle,reward,effect,enable,disable,get active(){return active;},get voiceCount(){return voices.size;},get analyser(){return analyser;}};
})();
