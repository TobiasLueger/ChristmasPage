webpackJsonp([25],{263:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.rebindNavMain=function(){n(s.pluginOptions.selectors.navListItems).on("click mouseenter touchstart",function(e){var t=n(this),l=t.next(s.pluginOptions.selectors.flyout);!t.parent().hasClass("is-active")&&l.length?(e.preventDefault(),i(),a(t,l)):i()})},e.init=function(){document.querySelector(s.componentSelector)&&(!function(){var e=t.defaults,s=n(e.componentSelector),a=document.createElement("div"),i=document.createElement("div");a.classList.add(e.pluginOptions.classes.navFlyoutLayer),i.classList.add(e.pluginOptions.classes.navOverlay),s.append(a),n(e.pluginOptions.selectors.overlayParent).append(i)}(),e=document.querySelectorAll(s.pluginOptions.selectors.navList),n(s.pluginOptions.selectors.navListItems).on("click mouseenter touchstart",function(e){var t=n(this),l=t.next(s.pluginOptions.selectors.flyout);!t.parent().hasClass("is-active")&&l.length?(e.preventDefault(),i(),a(t,l)):i()}),n(s.pluginOptions.selectors.navOverlay).on("click mouseenter",function(n){e[0].contains(n.target)&&n.target!==e[0]||i()}),n(s.pluginOptions.selectors.closeBtn).on("click",function(){i()}),Capitan.Vars.$window.smartresize(function(){var e=document.querySelectorAll(s.pluginOptions.selectors.navListActiveItems),t=n("> "+s.pluginOptions.selectors.flyout,e);l(t)}),Capitan.Vars.$html.on("click",".is-nav-open",function(n){e[0].contains(n.target)&&n.target!==e[0]||i()}));var e};var t={defaults:{componentSelector:".nav-main",pluginOptions:{openOnClick:!0,selectors:{navList:".nav-main__list",navListItems:".nav-main__list > li > a, .nav-main__list > li > span",navListActiveItems:".nav-main__list > li.is-active",navFlyoutLayer:".nav-main__flyout-layer",navOverlay:".nav-main__overlay",flyout:".nav-main__flyout",closeBtn:".nav-main__close-btn",overlayParent:"#page-wrapper",navOpen:".is-nav-open",quicklinks:".nav-main__highlight"},classes:{navFlyoutLayer:"nav-main__flyout-layer",navOverlay:"nav-main__overlay",navOpen:"is-nav-open"},callbacks:{},errorMessages:{}}}},s=t.defaults;function a(n,e){Capitan.Vars.$body.addClass(s.pluginOptions.classes.navOpen),l(e),n&&n.parent().addClass("is-active")}function i(){if(Capitan.Vars.$body.hasClass(s.pluginOptions.classes.navOpen)){var n=document.querySelectorAll(s.pluginOptions.selectors.navListActiveItems);if(Capitan.Vars.$body.removeClass(s.pluginOptions.classes.navOpen),l(0),n.length)for(var e=0;e<n.length;e++)n[e].classList.remove("is-active")}}function l(e){var s=t.defaults,a=0,i="100%",l=n(s.pluginOptions.selectors.navFlyoutLayer),o=n(s.pluginOptions.selectors.quicklinks);if(e.length){var c=e[0].clientHeight+parseInt(window.getComputedStyle(e[0]).marginTop)+parseInt(window.getComputedStyle(e[0]).marginBottom);a=l.height()>c?l.height()/c:c/l.height(),i=e[0].scrollHeight}l.css("transform","scale3d(1 ,"+a+", 1)"),o.css("height",i)}}).call(e,t(74))}});