webpackJsonp([21],{277:function(o,s,e){"use strict";(function(o){Object.defineProperty(s,"__esModule",{value:!0}),s.init=function(){var s=o(n.componentSelector),e=n.pluginOptions.classes.isVisible;Capitan.Vars.$window.on("scroll",function(){i().currY>i().posY?s.addClass(e):s.removeClass(e)})};var e={defaults:{componentSelector:".scrolltop",pluginOptions:{classes:{isVisible:"is-visible"}}}},n=e.defaults;function i(){var s=Capitan.Vars.$doc,n=o(e.defaults.componentSelector).position().top;return{currY:s.scrollTop()+n,posY:n}}}).call(s,e(74))}});