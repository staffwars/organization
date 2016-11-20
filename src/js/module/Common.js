export default class Common {
  constructor(elObj) {
    const _this = this;

    Object.keys(elObj).forEach(function (key) {
      _this[`$${key}`] = this[key];
    }, elObj);

    this.frameBoneHeight = this.$frameBone.height();

    this.pageNum = 1;
  }

  init() {
    this.setPage();
    this.addClickButtonEvent();
    this.addClickBackEvent();
    this.addClickNextEvent();
  }

  setPage() {
    switch (this.pageNum) {
      case 1:
        this.hiddenMemberPage();
        this.hiddenSlidePage();
        this.hiddenMakingPage();
        this.hiddenFinishPage();

        this.compressFrame();
        this.showIntroPage();
        this.hiddenEl(this.$back);
        this.hiddenEl(this.$next);
        break;
      case 2:
        this.hiddenIntroPage();
        this.expandFrame();
        this.showMemberPage();
        this.showSlidePage();
        this.showMakingPage();
        this.showFinishPage();
        this.$next.text('NEXT');
        setTimeout(() => {
          this.fadeInEl(this.$back);
          this.fadeInEl(this.$next);
        }, 1000);
        break;
      case 3:
        this.expandFrame();
        this.setSlideSize();
        break;
      case 4:
        this.compressFrame();
        break;
      case 5:
        this.$next.text('TOP');
        break;
      default:
    }
  }

  setSlideSize() {
    $('.speakerdeck-iframe').css({
      width: '470px',
      height: '414.5px'
    });
  }

  scrollToBack() {
    this.$frameBone.animate({
      scrollTop: this.$frameBone.scrollTop() - this.frameBoneHeight
    }, 1000);
  }

  scrollToNext() {
    this.$frameBone.animate({
      scrollTop: this.$frameBone.scrollTop() + this.frameBoneHeight
    }, 800);
  }

  addClickBackEvent() {
    this.$back.on('click', () => {
      this.pageNum = this.pageNum - 1;

      if (this.pageNum !== 1) {
        this.scrollToBack();
      }

      this.setPage();
    });
  }

  addClickNextEvent() {
    this.$next.on('click', () => {
      if (this.pageNum === 5) {
        this.pageNum = 1;
      } else {
        this.pageNum = this.pageNum + 1;
        this.scrollToNext();
      }
      this.setPage();
    });
  }

  addClickButtonEvent() {
    this.$button.on('click', () => {
      this.pageNum = 2;
      this.setPage();
    });
  }

  showIntroPage() {
    this.fadeInEl(this.$intro);
  }

  hiddenIntroPage() {
    this.hiddenEl(this.$intro);
  }

  showMemberPage() {
    this.fadeInEl(this.$member);
  }

  hiddenMemberPage() {
    this.hiddenEl(this.$member);
  }

  showSlidePage() {
    this.fadeInEl(this.$slide);
  }

  hiddenSlidePage() {
    this.hiddenEl(this.$slide);
  }

  showMakingPage() {
    this.fadeInEl(this.$making);
  }

  hiddenMakingPage() {
    this.hiddenEl(this.$making);
  }

  showFinishPage() {
    this.fadeInEl(this.$finish);
  }

  hiddenFinishPage() {
    this.hiddenEl(this.$finish);
  }

  // frameサイズS
  compressFrame() {
    this.$frame
      .removeClass('frame--l')
      .addClass('frame--s');
  }

  // frameサイズL
  expandFrame() {
    this.$frame
      .removeClass('frame--s')
      .addClass('frame--l');
  }

  // 要素をフェードイン
  fadeInEl($el) {
    $el
      .removeClass('is-hidden isfadeIn')
      .addClass('is-fadeIn');
  }

  // 要素を非表示
  hiddenEl($el) {
    $el.addClass('is-hidden');
  }
}