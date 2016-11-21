import Common from './module/Common';

(function() {
  const elObj = {
    frame: $('#js-frame'),
    button: $('#js-button'),
    intro: $('#js-intro'),
    member: $('#js-member'),
    back: $('#js-back'),
    next: $('#js-next'),
    slide: $('#js-slide'),
    movie: $('#js-movie'),
    making: $('#js-making'),
    finish: $('#js-finish'),
    frameBone: $('#js-frame-bone')
  };

  const common = new Common(elObj);

  common.init();

})();

