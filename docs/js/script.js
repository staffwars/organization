!function e(i,n,t){function a(o,h){if(!n[o]){if(!i[o]){var r="function"==typeof require&&require;if(!h&&r)return r(o,!0);if(s)return s(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var d=n[o]={exports:{}};i[o][0].call(d.exports,function(e){var n=i[o][1][e];return a(n?n:e)},d,d.exports,e,i,n,t)}return n[o].exports}for(var s="function"==typeof require&&require,o=0;o<t.length;o++)a(t[o]);return a}({1:[function(e,i,n){"use strict";function t(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,i){for(var n=0;n<i.length;n++){var t=i[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(i,n,t){return n&&e(i.prototype,n),t&&e(i,t),i}}(),s=function(){function e(i){t(this,e);var n=this;Object.keys(i).forEach(function(e){n["$"+e]=this[e]},i),this.getFrameBoneHeight(),this.pageNum=1}return a(e,[{key:"init",value:function(){this.setPage(),this.addResizeEvent(),this.addClickButtonEvent(),this.addClickBackEvent(),this.addClickNextEvent()}},{key:"getFrameBoneHeight",value:function(){this.frameBoneHeight=this.$frameBone.height()}},{key:"setPage",value:function(){var e=this;switch(this.pageNum){case 1:this.hiddenMemberPage(),this.hiddenSlidePage(),this.hiddenMoviePage(),this.hiddenMakingPage(),this.hiddenFinishPage(),this.compressFrame(),this.showIntroPage(),this.hiddenEl(this.$back),this.hiddenEl(this.$next);break;case 2:this.hiddenIntroPage(),this.expandFrame(),this.showMemberPage(),this.showSlidePage(),this.showMoviePage(),this.showMakingPage(),this.showFinishPage(),this.$next.text("NEXT"),setTimeout(function(){e.fadeInEl(e.$back),e.fadeInEl(e.$next)},1e3);break;case 3:this.expandFrame();break;case 4:this.expandFrame();break;case 5:this.compressFrame();break;case 6:this.$next.text("TOP")}}},{key:"scrollToBack",value:function(){this.$frameBone.animate({scrollTop:this.$frameBone.scrollTop()-this.frameBoneHeight},1e3)}},{key:"scrollToNext",value:function(){this.$frameBone.animate({scrollTop:this.$frameBone.scrollTop()+this.frameBoneHeight},1e3)}},{key:"addResizeEvent",value:function(){var e=this;$(window).on("resize",function(){e.getFrameBoneHeight()})}},{key:"addClickBackEvent",value:function(){var e=this;this.$back.on("click",function(){e.pageNum=e.pageNum-1,1!==e.pageNum&&e.scrollToBack(),e.setPage()})}},{key:"addClickNextEvent",value:function(){var e=this;this.$next.on("click",function(){5===e.pageNum?e.pageNum=1:(e.pageNum=e.pageNum+1,e.scrollToNext()),e.setPage()})}},{key:"addClickButtonEvent",value:function(){var e=this;this.$button.on("click",function(){e.pageNum=2,e.setPage()})}},{key:"showIntroPage",value:function(){this.fadeInEl(this.$intro)}},{key:"hiddenIntroPage",value:function(){this.hiddenEl(this.$intro)}},{key:"showMemberPage",value:function(){this.fadeInEl(this.$member)}},{key:"hiddenMemberPage",value:function(){this.hiddenEl(this.$member)}},{key:"showSlidePage",value:function(){this.fadeInEl(this.$slide)}},{key:"hiddenSlidePage",value:function(){this.hiddenEl(this.$slide)}},{key:"showMoviePage",value:function(){this.fadeInEl(this.$movie)}},{key:"hiddenMoviePage",value:function(){this.hiddenEl(this.$movie)}},{key:"showMakingPage",value:function(){this.fadeInEl(this.$making)}},{key:"hiddenMakingPage",value:function(){this.hiddenEl(this.$making)}},{key:"showFinishPage",value:function(){this.fadeInEl(this.$finish)}},{key:"hiddenFinishPage",value:function(){this.hiddenEl(this.$finish)}},{key:"compressFrame",value:function(){this.$frame.removeClass("frame--l").addClass("frame--s")}},{key:"expandFrame",value:function(){this.$frame.removeClass("frame--s").addClass("frame--l")}},{key:"fadeInEl",value:function(e){e.removeClass("is-hidden isfadeIn").addClass("is-fadeIn")}},{key:"hiddenEl",value:function(e){e.addClass("is-hidden")}}]),e}();n["default"]=s},{}],2:[function(e,i,n){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}var a=e("./module/Common"),s=t(a);!function(){var e={frame:$("#js-frame"),button:$("#js-button"),intro:$("#js-intro"),member:$("#js-member"),back:$("#js-back"),next:$("#js-next"),slide:$("#js-slide"),movie:$("#js-movie"),making:$("#js-making"),finish:$("#js-finish"),frameBone:$("#js-frame-bone")},i=new s["default"](e);i.init()}()},{"./module/Common":1}]},{},[2]);