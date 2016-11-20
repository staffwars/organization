export default class Common {
  constructor(elObj) {
    const _this = this;

    Object.keys(elObj).forEach(function (key) {
      _this[`$${key}`] = this[key];
    }, elObj);

    this.pageNum = 1;
  }

  init() {
    this.setPage();
    this.addClickButtonEvent();
    this.addClickBackEvent();
    this.addClickNextEvent();
  }

  setPage() {
    if (this.pageNum === 1) {
      this.hiddenMemberPage();
      this.hiddenFinishPage();
      this.showIntroPage();
      this.hiddenEl(this.$back);
      this.hiddenEl(this.$next);
    } else if (this.pageNum === 2) {
      this.hiddenIntroPage();
      this.hiddenSlidePage();
      this.showMemberPage();
      this.$next.text('NEXT');
      this.fadeInEl(this.$back);
      this.fadeInEl(this.$next);
    } else if (this.pageNum === 3) {
      this.hiddenMemberPage();
      this.hiddenMakingPage();
      this.showSlidePage();
      this.$next.text('NEXT');
      this.fadeInEl(this.$back);
      this.fadeInEl(this.$next);
    } else if (this.pageNum === 4) {
      this.hiddenSlidePage();
      this.hiddenFinishPage();
      this.showMakingPage();
      this.$next.text('NEXT');
      this.fadeInEl(this.$back);
      this.fadeInEl(this.$next);
    } else {
      this.hiddenMakingPage();
      this.showFinishPage();
      this.$next.text('TOP');
      this.fadeInEl(this.$back);
      this.fadeInEl(this.$next);
    }
  }

  addClickBackEvent() {
    this.$back.on('click', () => {
      this.pageNum = this.pageNum - 1;
      this.setPage();
    });
  }

  addClickNextEvent() {
    this.$next.on('click', () => {
      if (this.pageNum === 5) {
        this.pageNum = 1;
      } else {
        this.pageNum = this.pageNum + 1;
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
    this.compressFrame();
    this.fadeInEl(this.$intro);
  }

  hiddenIntroPage() {
    this.hiddenEl(this.$intro);
  }

  showMemberPage() {
    this.expandFrame();
    this.fadeInEl(this.$member);
  }

  hiddenMemberPage() {
    this.hiddenEl(this.$member);
  }

  showSlidePage() {
    this.expandFrame();
    this.fadeInEl(this.$slide);
  }

  hiddenSlidePage() {
    this.hiddenEl(this.$slide);
  }

  showMakingPage() {
    this.compressFrame();
    this.fadeInEl(this.$making);
  }

  hiddenMakingPage() {
    this.hiddenEl(this.$making);
  }

  showFinishPage() {
    this.compressFrame();
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