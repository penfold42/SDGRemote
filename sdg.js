var P="";var K="";var x="";var W=["all"];var u="frequency";var U=500;var r=3;var V=7200;var s=0;var G=false;var q=true;var Y=true;var a=100;var c="";var Q="";var j=false;var o=false;var $=false;const Z=window.location.search;const e=new URLSearchParams(Z);if(e.has("gateway"))K=e.get("gateway");if(e.has("device"))P=e.get("device");if(e.has("scpiheight"))x=e.get("scpiheight");if(e.has("view"))W=e.getAll("view");if(e.has("demo"))o=true;var z=window.location.href;if(z.includes("github.io"))o=true;var l="";function J(){if(K){l=K}else if(!l){l="ws://"+window.location.host}console.log("wsGateway: "+l)}function X(e){if(c!=e){if(ct.includes(e)){websocket.send(JSON.stringify({action:"setDevice",argument:e}));c=e}}}function ee(){field=C("devices");if(field.value<ct.length){X(ct[field.value]);A("*IDN?",true);g()}}function te(){el=document.getElementsByClassName("checkrow");for(i=0;i<el.length;i++){el[i].onclick=function(e){var t=e.currentTarget;if(t.classList.contains("green")){t.classList.remove("green");t.cells[0].firstElementChild.checked=false}else{t.classList.add("green");t.cells[0].firstElementChild.checked=true}}}}function ae(e,t){if(t==="accept"){el=document.getElementsByClassName("cb");var a=true;for(i=0;i<el.length;i++){if(el[i].checked===false){a=false}}if(a||e.shiftKey){f(true)}else{alert("You must agree to each clasue")}}else{el=document.getElementsByClassName("checkrow");for(i=0;i<el.length;i++){el[i].classList.remove("green");el[i].cells[0].firstElementChild.checked=false}alert("Launching demo mode with fake static data.\nNothing is sent to a real device.");o=true;f(false)}}document.addEventListener("DOMContentLoaded",function(){if(o){f(false);return}C("accept").onclick=function(e){ae(e,"accept")};C("decline").onclick=function(e){ae(e,"decline")};te();var e=Number(localStorage.getItem("disclaimer"));if(Date.now()-e<7654321012){f(false)}else{C("disclaimer").style.display="block"}});function f(e){if(e)localStorage.setItem("disclaimer",Date.now());C("disclaimer").style.display="none";setTimeout(()=>{k("vfdarea",false)},"900");lt();st();C("devices").onchange=function(){ee()};C("screenbmp").onclick=function(){Ie()};C("frequency").onclick=function(){ue("toggle")};C("navknob").onwheel=function(e){pe(e)};C("helppage").onmouseenter=function(){j=true};C("helppage").onmouseleave=function(){j=false};if(t==false){C("helppage").style.display="block"}if(-1==we.indexOf(u))u="frequency";document.addEventListener("keydown",Me);document.addEventListener("click",Le);var t=false;W.forEach(e=>{switch(e){case"frontpanel":C("frontpanel").style.display="block";t=true;break;case"counter":ge("on");t=true;break;case"tools":$e("on");t=true;break;case"help":je("on");t=true;break;case"all":C("frontpanel").style.display="block";ge("on");$e("on");t=true;break}})}const ne={"!":"KB_FUNC1","@":"KB_FUNC2","#":"KB_FUNC3",$:"KB_FUNC4","%":"KB_FUNC5","^":"KB_FUNC6",Escape:"KB_FUNC6",1:"KB_NUMBER_1",2:"KB_NUMBER_2",3:"KB_NUMBER_3",4:"KB_NUMBER_4",5:"KB_NUMBER_5",6:"KB_NUMBER_6",7:"KB_NUMBER_7",8:"KB_NUMBER_8",9:"KB_NUMBER_9",".":"KB_POINT",0:"KB_NUMBER_0","-":"KB_NEGATIVE",M:"KB_MOD",S:"KB_SWEEP",B:"KB_BURST",P:"KB_PARAMETER",U:"KB_UTILITY",D:"KB_STORE_RECALL",W:"KB_WAVES",C:"KB_CHANNEL",ArrowUp:"KB_KNOB_RIGHT",ArrowLeft:"KB_LEFT",Backspace:"KB_LEFT",Enter:"KB_KNOB_DOWN",ArrowRight:"KB_RIGHT",ArrowDown:"KB_KNOB_LEFT","[":"KB_OUTPUT1","]":"KB_OUTPUT2","{":"INT_TRIGGER1","}":"INT_TRIGGER2",H:"INT_SHOWHELP",T:"INT_SHOWTOOLS",F:"INT_SHOWCOUNTER",R:"INT_REFRESH",K:"INT_BEEP",issend:"INT_SCPI_SEND",isclr:"INT_SCPI_CLEAR",iscopy:"INT_SCPI_COPY",isccsv:"INT_SCPI_COPYCSV",icrn:"INT_CTR_REFRESH_ON",icrf:"INT_CTR_REFRESH_OFF",icon:"INT_CTR_ONOFF",icdf:"INT_CTR_DISP_FREQ",icdt:"INT_CTR_DISP_TIME",icdo:"INT_CTR_DISP_OTHER",icf:"INT_CTR_FAST",icac:"INT_CTR_AC",ichf:"INT_CTR_HFR"};var ie=["KB_MOD","KB_SWEEP","KB_BURST","KB_CHANNEL"];var re=["KB_PARAMETER","KB_UTILITY","KB_STORE_RECALL","KB_WAVES"];var se=ie.concat(re);function ce(e){if(se.includes(e)){websocket.send(JSON.stringify({action:"ledHack",argument:e}))}}function oe(t){re.forEach(e=>{if(e==t){document.getElementsByName(t)[0].classList.add("onon")}else{document.getElementsByName(e)[0].classList.remove("onon")}})}var d;function T(e,t){if(typeof websocket!="object"||websocket.readyState!=1){le()}if(t){var a=document.getElementsByName(e)[0];He(a)}var n=true;if(Object.values(ne).includes(e)){ce(e);switch(e){case"INT_SHOWHELP":Ne();break;case"INT_SHOWTOOLS":Ce();break;case"INT_SHOWCOUNTER":ge();break;case"INT_CTR_REFRESH_ON":ue("on");break;case"INT_CTR_REFRESH_OFF":ue("off");break;case"INT_BEEP":De();break;case"INT_REFRESH":Ie();break;case"INT_TRIGGER1":n=be(1);break;case"INT_TRIGGER2":n=be(2);break;case"INT_SCPI_SEND":Ae();break;case"INT_SCPI_CLEAR":H("","clear");break;case"INT_SCPI_COPY":Xe("text");break;case"INT_SCPI_COPYCSV":Xe("csv");break;case"INT_CTR_FAST":Ee();break;case"INT_CTR_ONOFF":Se();break;case"INT_CTR_DISP_FREQ":Oe("f");break;case"INT_CTR_DISP_TIME":Oe("t");break;case"INT_CTR_DISP_OTHER":Oe("o");break;case"INT_CTR_AC":_e("a");break;case"INT_CTR_HFR":_e("h");break;default:var i="vkey value,"+e+",state,1";A(i,false);v(r)}if(n){fe()}else{le()}}else{le()}}function le(){if(b("beep"))ut(220,.5,"square",100)}function fe(){if(b("beep"))ut(880,.5,"sine",50)}function v(e){if(e>0){Be("On");if(t==undefined){g();t=setInterval(g,U);p=e}else{if(e>p)p=e}}else{t=clearInterval(t);p=0;Be("Off")}}var m;var t;var p=0;function g(){var e=C("screenbmp");if(o){e.src="sample.bmp";F("screenbmp","staleinfo")}else{A("scdp",false)}if(t!=undefined){p--;if(p<=0){t=clearInterval(t);p=0;Be("off")}}A("C1:outp?\nC2:outp?\n"+"C1:mdwv?\nC2:mdwv?\n"+"C1:btwv?\nC2:btwv?\n"+"C1:swwv?\nC2:swwv?\n",false);if(s){clearTimeout(m);m=setTimeout(()=>{R("screenbmp","staleinfo")},s*1e3)}}var h;function ue(e){switch(e){case"on":N("on");break;case"off":if(h==undefined){A("FCNT?",false)}else{N("off")}break;case"toggle":if(h==undefined){N("on")}else{N("off")}break}}function N(e){if(e=="on"){if(h==undefined){h=setInterval(A,500,"FCNT?",false)}E("refreshFCNT_on");S("refreshFCNT_off");return}else{h=clearInterval(h);S("refreshFCNT_on");E("refreshFCNT_off")}}function de(e){if(e[1].match(/AC/i)){E("acLed")}else{S("acLed")}if(e[3].match(/on/i)){E("hfrLed")}else{S("hfrLed")}if(e[5].match(/fast/i)){E("fastFCNT")}else{S("fastFCNT")}}function Te(e){if(e.match(/off/i)){S("onoffFCNT")}else{E("onoffFCNT")}}function C(e){return document.getElementById(e)}function b(e){return C(e).classList.contains("green")}function E(e){F(e,"red");F(e,"yellow");R(e,"green");F(e,"black")}function ve(e){F(e,"red");R(e,"yellow");F(e,"green");F(e,"black")}function _(e){R(e,"red");F(e,"yellow");F(e,"green");F(e,"black")}function S(e){F(e,"red");F(e,"yellow");F(e,"green");R(e,"black")}function y(e){F(e,"red");F(e,"yellow");F(e,"green");F(e,"black")}function k(e,t){if(t){R(e,"cyanblack")}else{F(e,"cyanblack")}}function me(e,t){C(e).className=t}function R(e,t){C(e).classList.add(t)}function F(e,t){C(e).classList.remove(t)}lastWheelSent=0;function pe(e){e.preventDefault();var t=Date.now();if(t-lastWheelSent>100){if(e.wheelDeltaY>=2){T("KB_KNOB_RIGHT",true);lastWheelSent=Date.now()}if(e.wheelDeltaY<=-2){T("KB_KNOB_LEFT",true);lastWheelSent=Date.now()}}}function ge(e){if(e=="on"||!b("counterBut")){Qe("on");N("on")}else{Qe("off");N("off")}}var he=0;function Ne(){switch(C("scpitext").value){case"clear":localStorage.clear();C("scpitext").value="done";break;case"timings":alert("scdpTimings "+bt(gt)+"\n"+"pyScdpTimings "+bt(ht));break;default:if(b("helpBut")){window.scroll(0,0);je("off")}else{je("on");C("helppage").scrollIntoView({behavior:"smooth",block:"start"})}break}}function Ce(){if(b("toolsBut")){$e("off")}else{$e("on")}v(r)}function be(t){var e=true;const a=["btwv","swwv"];var n="";a.forEach(e=>{if(We[e+t]=="on"){n="C"+t+":"+e.toUpperCase()+" MTRIG"}});if(n){E("trigger"+t);A(n,false)}else{_("trigger"+t);e=false}setTimeout(()=>{y("trigger"+t)},"200");v(r);return e}function Ee(){if(b("fastFCNT")){A("FCNT TYPE,SLOW")}else{A("FCNT TYPE,FAST")}v(r)}function _e(e){if(e=="a"){if(b("acLed")){A("FCNT MODE,DC")}else{A("FCNT MODE,AC")}}if(e=="h"){if(b("hfrLed")){A("FCNT HFR,OFF")}else{A("FCNT HFR,ON")}}v(r)}function Se(){if(b("onoffFCNT")){A("FCNT STATE,OFF");N("off");setTimeout(()=>{A("FCNT?",false)},500)}else{A("FCNT STATE,ON");N("on")}v(r)}function ye(e){switch(e){case"f":E("freqFCNT");S("timeFCNT");S("otherFCNT");break;case"t":S("freqFCNT");E("timeFCNT");S("otherFCNT");break;case"o":S("freqFCNT");S("timeFCNT");E("otherFCNT");break}}var w="f";const ke=["frequency","reference"];const Re=["period","pWidth","nWidth","gate"];const Fe=["deviation","duty","trigLev"];const we=ke.concat(Re,Fe);function Oe(e){var t;switch(e){case"f":t=ke.indexOf(u);t=(t+1)%ke.length;u=ke[t];w="f";break;case"t":t=Re.indexOf(u);t=(t+1)%Re.length;u=Re[t];w="t";break;case"o":t=Fe.indexOf(u);t=(t+1)%Fe.length;u=Fe[t];w="o";break}if(!b("refreshFCNT_on")){Ye(qe)}}function Be(e){if(e.match(/on/i)){E("refresh")}else{y("refresh")}}function Ie(){if(t==undefined){v(V)}else{v(0)}}function De(){if(b("beep")){y("beep")}else{E("beep");audioCtx=new(window.AudioContext||window.webkitAudioContext)}}function Le(e){const t=e.target.nodeName==="BUTTON";if(!t)return;T(e.target.name,false)}function Me(e){d=Date.now();var t=e.key;if(t.length==1){t=t.toUpperCase()}if(j==true){if(t!="H"){return}}if(document.activeElement.id=="scpitext"){switch(t){case"Enter":Ae("user");O=0;break;case"ArrowUp":if(++O<B.length){C("scpitext").value=B[O]}else{O=B.length-1}break;case"ArrowDown":if(--O>=0){C("scpitext").value=B[O]}else{C("scpitext").value="";O=-1}break}}if(t=="Enter"){if(document.activeElement.id=="macros"){Ae()}}if(document.activeElement.classList.contains("nokey")){return}if(e.altKey&&e.ctrlKey&&t=="F"){console.log(e);var a=C("frequency").style.fontFamily;if(a=="FourteenSeg"){a="SevenSeg"}else{a="FourteenSeg"}C("frequency").style.fontFamily=a;return}if(e.altKey||e.ctrlKey||e.metaKey){return}if(t in ne){var n=ne[t];T(n,true);e.preventDefault();var i=document.getElementsByName(n)[0];He(i)}}function He(e){if(e){e.classList.add("active");setTimeout(()=>{e.classList.remove("active")},"100")}}var O=0;var B=[];function Ae(e){var t=C("scpitext").value;var a=C("macro12").value;if(e!="user"){var n=C("macros").value;if(n>=1&&n<rt.length){t=rt[n]}}if(t.match(/^scdp/i)){H("","clear");H("Refusing to ask for binary junk!","notable");return}if(t.match(/^MCBD?/i)){H("","clear");H("Sorry, MCDB? only works using telnet to port 5024","notable");return}if(t.length>0){t.split(/&/).forEach(e=>{if(a==1||a==2){e=e.replace(/^C\?:/i,`C${a}:`)}A(e,true)});v(r);if(e=="user"||q){if(B[0]!=t){B.unshift(t)}}}}function Pe(e){var t=e.split(",");var a=t[0];Q=t[1];C("model").innerHTML=Q;document.title=`${Q}@${c}`}function Ke(e){var t;if(t=e.match(/^ROSC (int|ext),10MOUT,(on|off)/i)){var a=t[1];var n=t[2];if(a.match(/^ext/i)){k("extrefLed",true)}else{k("extrefLed",false)}}}function xe(e){var t;if(t=e.match(/^C(\d):OUTP (on|off),/i)){var a=t[1];var n=t[2].toLowerCase();if(n.match(/^on/i)){E("ch"+a)}else{S("ch"+a)}}}var I={};var We={};function Ue(e){var t;if(t=e.match(/^C(\d):(MDWV|SWWV|BTWV) STATE,(on|off),*/i)){var a=t[1];var n=t[2].toLowerCase();var i=t[3].toLowerCase();I[n+a]=i}if(Object.keys(I).length==6){if(Object.values(We).toString()!=Object.values(I).toString()){const r=["mdwv","btwv","swwv"];r.forEach(e=>{var t=I[e+"1"]+I[e+"2"];F(e,"offoff");F(e,"offon");F(e,"onoff");F(e,"onon");R(e,t)});We=Object.assign({},I);I={}}}}var Ve=["uS","sec","MHz","Hz","pcent"];function Ge(){we.forEach(e=>{if(e==u){k(e+"Led",true)}else{k(e+"Led",false)}});Ve.forEach(e=>{k(e,false)});switch(u){case"frequency":case"reference":k("Hz",true);break;case"duty":k("pcent",true);break;case"deviation":case"trigLev":break;default:k("sec",true);break}}function D(e){C("frequency").innerHTML=e}var qe;function Ye(e){var t="Counter!Off!";if(e.startsWith("FCNT STATE,OFF")){Te("Off");D(t)}if(e.startsWith("FCNT STATE,ON")){qe=e;Te("On");var a=e.split(",");Ge();ye(w);de(a.slice(16,22));switch(u){case"frequency":var t=a[3];var n=t.match(/^\d+(\.\d+)?/);t=n[0];t=Number(t)/1;var i=9;if(t>1e6){t=t/1e6;k("MHz",true);i=9}else if(t>1e3){k("MHz",false);i=6}else if(t>1){k("MHz",false);i=9}t=t.toLocaleString("en-US",{minimumFractionDigits:i,maximumFractionDigits:i});D(t);break;case"reference":var r=Number(a[7].replace(/HZ/,""));if(r>1e6){r=r/1e6;k("MHz",true)}else{k("MHz",false)}r=r.toLocaleString("en-US",{minimumSignificantDigits:6,maximumSignificantDigits:6,roundingMode:"trunc"});D(r);break;case"period":case"pWidth":case"nWidth":case"gate":var s=Number(a[11].replace(/S$/,""));var c=Number(a[13].replace(/S$/,""));var o;var l=6;switch(u){case"period":o=s+c;break;case"pWidth":o=s;break;case"nWidth":o=c;break;case"gate":l=4;if(a[21].match(/fast/i)){o=.5}else{o=1};break}if(o<1e-6){o*=1e6;k("uS",true)}o=o.toLocaleString("en-US",{minimumSignificantDigits:l,maximumSignificantDigits:l,roundingMode:"halfExpand"});D(o);break;case"duty":duty=a[5];duty=(Math.round(duty*100)/100).toFixed(2);D(duty);break;case"deviation":var f=a[15].replace(/ppm/,"")*1e3;if(Math.abs(f)<1e7){f=f.toLocaleString("en-US",{minimumFractionDigits:3,maximumFractionDigits:3,roundingMode:"trunc"})}else{f="out!of!range"}D(f);break;case"trigLev":trig=Number(a[9].replace(/V$/,""));trig=trig.toFixed(3);D(trig+"!v!");break}}}function Qe(e){if(e=="on"){E("counterBut");C("counter").style.display="block"}else{y("counterBut");C("counter").style.display="none"}}function je(e){if(e=="on"){E("helpBut");C("helppage").style.display="block"}else{y("helpBut");C("helppage").style.display="none"}}function $e(e){if(e=="on"){E("toolsBut");C("scpitools").style.display="block"}else{y("toolsBut");C("scpitools").style.display="none"}}function L(e){switch(e){case"green":E("txbut");E("txFCNT");break;case"yellow":ve("txbut");ve("txFCNT");break;case"red":_("txbut");_("txFCNT");break;default:y("txbut");S("txFCNT");break}}function M(e){switch(e){case"green":E("rxbut");break;case"yellow":ve("rxbut");break;case"red":_("rxbut");break;default:y("rxbut");break}}var Ze=0;function ze(e,t){if(e.toString().startsWith("4")){var a=(new Date).getTime()/1e3;if(a-Ze>5){v(0);N("off");alert(e+": "+t);Ze=a;L("")}}else{alert(t)}}function Je(e){if(window.clipboardData&&window.clipboardData.setData){return clipboardData.setData("Text",e)}else if(document.queryCommandSupported&&document.queryCommandSupported("copy")){var t=document.createElement("textarea");t.textContent=e;t.style.position="fixed";document.body.appendChild(t);t.select();try{return document.execCommand("copy")}catch(e){console.warn("Copy to clipboard failed.",e);return false}finally{document.body.removeChild(t)}}}function Xe(e){if(e=="text")Je(et);if(e=="csv")Je(tt)}var et="";var tt="";function H(e,t){var a=C("scpireplies");var n=C("csvtable");for(var i=0;i<n.rows.length;){n.deleteRow(i)}tt="";if(t=="clear"){C("43").style.display="none";et="";a.innerHTML="";return}if(e.length==0)return;if(Y==true){et+=e+"\n";a.innerHTML+=`<div class="nokey scpireply">${e}</div>`}else{et=e+"\n";a.innerHTML=`<div class="nokey scpireply">${e}</div>`}if(t!="notable"){e=e.replace(" ",",");var r=e.split(/,/);var s=r.length;if(s%2==1){s=r.unshift(r[0]);r[1]=""}for(var i=0;i<s;i+=2){tt+=`${r[i]},${r[i+1]}\n`;var c=n.insertRow(-1);var o=c.insertCell(0);var l=c.insertCell(1);o.innerHTML=r[i];l.innerHTML=r[i+1]}C("43").style.display="block"}}var at=`Siglent Technologies,SDGDEMO!,SDG42424242242,2.01.01.38
C1:OUTP ON,LOAD,50,POWERON_STATE,0,PLRT,NOR
C2:OUTP ON,LOAD,50,POWERON_STATE,0,PLRT,NOR
C1:MDWV STATE,ON,FM,MDSP,ARB,INDEX,63,SRC,INT,FRQ,1HZ,DEVI,50000HZ,CARR,WVTP,SINE,FRQ,108000000HZ,AMP,0.632551V,AMPVRMS,0.223607Vrms,AMPDBM,0dBm,OFST,0V,PHSE,0
C2:MDWV STATE,OFF
C1:BTWV STATE,OFF
C2:BTWV STATE,OFF
C1:SWWV STATE,OFF
C2:SWWV STATE,ON,TIME,23S,STOP,773999HZ,START,773999HZ,TRSR,INT,TRMD,OFF,SWMD,LINE,DIR,UP,SYM,5419472.01183249,MARK_STATE,OFF,MARK_FREQ,0HZ,IDLE_FREQ,START_FREQ,CARR,WVTP,SINE,FRQ,773999HZ,AMP,0.632551V,AMPVRMS,0.223607Vrms,AMPDBM,-7.47755e-07dBm,OFST,0V,PHSE,0
FCNT STATE,ON,FRQ,10000000.07HZ,DUTY,46.5815,REFQ,1e+07HZ,TRG,4.38538e-15V,PW,4.65815e-08S,NW,5.34185e-08S,FRQDEV,0.00667211ppm,MODE,AC,HFR,OFF,TYPE,SLOW 
`;function nt(e,t){if(t)H(e,"");lines=e.split("\n");lines.forEach(e=>{if(e.startsWith("FCNT ")){if(b("refreshFCNT_on")){Ye(e)}else{Ye(qe)}}if(e.startsWith("Siglent ")){Pe(e)}if(e.match(/^C\d:(MDWV|BTWV|SWWV) /i)){Ue(e)}if(e.match(/^C\d:OUTP /)){xe(e)}if(e.match(/^ROSC /)){Ke(e)}})}function it(e,t){L("yellow");if(t){nt("DEMO STATE,ON,FRQ,10000000.07HZ,DUTY,46.5815,"+"REFQ,1e+07HZ,TRG,4.38538e-15V,PW,4.65815e-08S,"+"NW,5.34185e-08S,FRQDEV,0.00667211ppm,"+"MODE,AC,HFR,OFF,TYPE,SLOW",t)}else{nt(at,t)}setTimeout(()=>{L("")},200);return}function A(e,t){if(e=="")return;if(o){it(e,t);return}var a="scpiCmd";if(e.includes("?")){a="scpiQuery"}else if(e.match(/^scdp/i)){a="scdp"}else{a="scpiCmd"}if(websocket.readyState==1){L("green");setTimeout(()=>{L("")},100);websocket.send(JSON.stringify({action:a,argument:e,updateResponse:t}))}else{L("red")}}var rt=["Free Text"];function st(){const e=new XMLHttpRequest;e.open("GET","sdg-macros.json");e.send();e.responseType="json";e.onload=()=>{if(e.readyState==4&&e.status==200){const i=e.response;var a=C("macros");var n=1;Object.keys(i).forEach(e=>{if(i[e]){rt.push(i[e]);var t=document.createElement("option");t.text=e;t.value=n++;a.add(t)}else{var t=document.createElement("optgroup");t.label=e;a.add(t)}})}else{console.log(`Error readMacros() : ${e.status}`)}}}var ct=[];function ot(a){data=Object.keys(a["value"]);var n=C("devices");n.length=0;c=a["currentDevice"];var i=0;data.forEach(e=>{ct.push(e);var t=document.createElement("option");t.text=e;t.value=i++;if(e==a["currentDevice"]){t.selected=true}n.add(t)})}function lt(){const t=new XMLHttpRequest;t.open("GET","sdg-config.json");t.send();t.responseType="json";t.onload=()=>{if(t.readyState==4&&t.status==200){const e=t.response;if("updateTime"in e)U=e.updateTime;if("smallUpdateCycles"in e)r=e.smallUpdateCycles;if("longUpdateCycles"in e)V=e.longUpdateCycles;if("idleTimeout"in e)s=e.idleTimeout;if("highlightNew"in e)G=e.highlightNew;if("macrosUpdateHistory"in e)q=e.macrosUpdateHistory;if("scpiResultsAppend"in e)Y=e.scpiResultsAppend;if("scpiHeightPx"in e)a=Number(e.scpiHeightPx);if("wsGateway"in e)l=e.wsGateway;ft();if(!o){J();Tt()}else{g();ot(Object({type:"getDevices",currentDevice:"demo.device",value:{"demo.device":""}}))}}else{console.log(`Error readConfig() : ${t.status}`)}}}function ft(){if(x>0)a=x;C("42").style.height=a+"px";C("43").style.height=a+"px"}function ut(e,t,a,n){if(!audioCtx)return;var i=audioCtx.createOscillator();var r=audioCtx.createGain();i.connect(r);r.connect(audioCtx.destination);r.gain.value=t;i.frequency.value=e;i.type=a;i.start();setTimeout(()=>{i.stop()},n)}function dt(e){C("userCount").innerHTML=e}function Tt(){console.log("Trying to open a WebSocket connection...");websocket=new WebSocket(l);websocket.onopen=mt;websocket.onclose=pt;websocket.onmessage=Ct}var vt=0;function mt(){console.log("ws opened");L("");M("");vt=0;websocket.send(JSON.stringify({action:"getDevices"}))}function pt(){console.log("ws closed");L("red");M("red");if(vt++<5){setTimeout(()=>{Tt()},500)}else{confirm("Cannot connect to sdg proxy.\nReload page to retry.")}}var gt=[0];var ht=[0];var Nt;function Ct(e){M("green");setTimeout(()=>{M("")},100);const t=JSON.parse(e.data);if(t.hasOwnProperty("currentDevice")){if(c!=t["currentDevice"]){c=t["currentDevice"]}}switch(t.type){case"error":console.log(t.value);M("red");break;case"users":dt(t.count);break;case"scdp":n=Date.now();if(t.time>0){ht.push(t.time);ht[0]++}if(Nt!=t.value){Nt=t.value;var a=C("screenbmp");a.src="data:image/png;base64,"+t.value;if(G){R("screenbmp","newimg");highlightBlur=setTimeout(()=>{F("screenbmp","newimg")},50)}if(d){var i=Date.now()-d;d="";gt.push(Number(i));gt[0]++}}F("screenbmp","staleinfo");if(s){clearTimeout(m);m=setTimeout(()=>{R("screenbmp","staleinfo")},s*1e3)}break;case"scpi":nt(t.value,t.updateResponse);break;case"getDevices":ot(t);if(!$){$=true;if(P){X(P)}g();A("*IDN?",true)}break;case"ledHack":oe(t.value);break;default:console.error("unsupported msg",t)}}function bt(e){var t=e[0];var a=e.slice(1);var n=Math.max.apply(null,a);var i=Math.min.apply(null,a);return"count: "+t+", range: "+(n-i)+", mean: "+(n+i)/2}