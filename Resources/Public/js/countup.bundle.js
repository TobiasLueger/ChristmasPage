webpackJsonp([19],{286:function(t,a,n){"use strict";(function(t){var e=n(108);Object.defineProperty(a,"__esModule",{value:!0}),a.init=function(){var t=document.querySelectorAll(s.componentSelector);if(navigator&&navigator.language){var a=navigator.language.substr(0,2);"en"===a&&(0,i.default)(s.settings,{options:{separator:",",decimal:"."}})}for(var n=0;n<t.length;n+=1){var e=t[n];l(e)}};var i=e(n(121)),o=e(n(397)),r=e(n(398)),s={componentSelector:".countup",pluginOptions:{},classes:{},selectors:{counterDigit:".countup__digit"},settings:{decimals:0,duration:6,options:{useEasing:!0,useGrouping:!0,separator:".",decimal:",",prefix:"",suffix:""}}};function l(a){var n=a.querySelector(s.selectors.counterDigit),e=t(n).attr("id"),i=t(n).data("start")||0,l=t(n).data("end")||1e3,u={};if(l.toString().indexOf(".")>=0){var m=l.toString(),c=m.indexOf("."),d=m.substr(c,m.length-1).length-1;u=new r.default(e,i,l,d,s.settings.duration,s.settings.options)}else u=new r.default(e,i,l,s.settings.decimals,s.settings.duration,s.settings.options);t(window).on("scroll",function(){!0===o.default.call(t(n))&&u.start()}),!0===o.default.call(t(n))&&u.start()}}).call(a,n(74))},397:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(){var t={top:Capitan.Vars.$window.scrollTop(),left:Capitan.Vars.$window.scrollLeft()};t.right=t.left+Capitan.Vars.$window.width(),t.bottom=t.top+Capitan.Vars.$window.height();var a=this.offset();return a.right=a.left+this.outerWidth(),a.bottom=a.top+this.outerHeight(),!(t.right<a.left||t.left>a.right||t.bottom<a.top||t.top>a.bottom)}},398:function(t,a,n){var e,i;void 0===(i="function"==typeof(e=function(t,a,n){return function(t,a,n,e,i,o){for(var r=0,s=["webkit","moz","ms","o"],l=0;l<s.length&&!window.requestAnimationFrame;++l)window.requestAnimationFrame=window[s[l]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[s[l]+"CancelAnimationFrame"]||window[s[l]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,a){var n=(new Date).getTime(),e=Math.max(0,16-(n-r)),i=window.setTimeout(function(){t(n+e)},e);return r=n+e,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)});var u=this;for(var m in u.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:null,formattingFn:null},o)o.hasOwnProperty(m)&&(u.options[m]=o[m]);""===u.options.separator&&(u.options.useGrouping=!1),u.options.prefix||(u.options.prefix=""),u.options.suffix||(u.options.suffix=""),u.d="string"==typeof t?document.getElementById(t):t,u.startVal=Number(a),u.endVal=Number(n),u.countDown=u.startVal>u.endVal,u.frameVal=u.startVal,u.decimals=Math.max(0,e||0),u.dec=Math.pow(10,u.decimals),u.duration=1e3*Number(i)||2e3,u.formatNumber=function(t){var a,n,e,i;if(t=t.toFixed(u.decimals),n=(a=(t+="").split("."))[0],e=a.length>1?u.options.decimal+a[1]:"",i=/(\d+)(\d{3})/,u.options.useGrouping)for(;i.test(n);)n=n.replace(i,"$1"+u.options.separator+"$2");return u.options.prefix+n+e+u.options.suffix},u.easeOutExpo=function(t,a,n,e){return n*(1-Math.pow(2,-10*t/e))*1024/1023+a},u.easingFn=u.options.easingFn?u.options.easingFn:u.easeOutExpo,u.formattingFn=u.options.formattingFn?u.options.formattingFn:u.formatNumber,u.version=function(){return"1.7.1"},u.printValue=function(t){var a=u.formattingFn(t);"INPUT"===u.d.tagName?this.d.value=a:"text"===u.d.tagName||"tspan"===u.d.tagName?this.d.textContent=a:this.d.innerHTML=a},u.count=function(t){u.startTime||(u.startTime=t),u.timestamp=t;var a=t-u.startTime;u.remaining=u.duration-a,u.options.useEasing?u.countDown?u.frameVal=u.startVal-u.easingFn(a,0,u.startVal-u.endVal,u.duration):u.frameVal=u.easingFn(a,u.startVal,u.endVal-u.startVal,u.duration):u.countDown?u.frameVal=u.startVal-(u.startVal-u.endVal)*(a/u.duration):u.frameVal=u.startVal+(u.endVal-u.startVal)*(a/u.duration),u.countDown?u.frameVal=u.frameVal<u.endVal?u.endVal:u.frameVal:u.frameVal=u.frameVal>u.endVal?u.endVal:u.frameVal,u.frameVal=Math.round(u.frameVal*u.dec)/u.dec,u.printValue(u.frameVal),a<u.duration?u.rAF=requestAnimationFrame(u.count):u.callback&&u.callback()},u.start=function(t){return u.callback=t,u.rAF=requestAnimationFrame(u.count),!1},u.pauseResume=function(){u.paused?(u.paused=!1,delete u.startTime,u.duration=u.remaining,u.startVal=u.frameVal,requestAnimationFrame(u.count)):(u.paused=!0,cancelAnimationFrame(u.rAF))},u.reset=function(){u.paused=!1,delete u.startTime,u.startVal=a,cancelAnimationFrame(u.rAF),u.printValue(u.startVal)},u.update=function(t){cancelAnimationFrame(u.rAF),u.paused=!1,delete u.startTime,u.startVal=u.frameVal,u.endVal=Number(t),u.countDown=u.startVal>u.endVal,u.rAF=requestAnimationFrame(u.count)},u.printValue(u.startVal)}})?e.call(a,n,a,t):e)||(t.exports=i)}});