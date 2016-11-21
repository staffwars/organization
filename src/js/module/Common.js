export default class Common {
  constructor(elObj) {
    const _this = this;

    Object.keys(elObj).forEach(function (key) {
      _this[`$${key}`] = this[key];
    }, elObj);

    this.getFrameBoneHeight();
  }

  init() {
    this.setPageNum();
    this.setPage();
    this.scrollToCurrentPage();
    this.addResizeEvent();
    this.addClickButtonEvent();
    this.addClickBackEvent();
    this.addClickNextEvent();
  }

  setPageNum() {
    const hash = this.getHash();

    if (hash) {
      this.pageNum = hash;
    } else {
      this.pageNum = 1;
    }
  }

  getHash() {
    const hash = location.hash;

    if (hash) {
      return Number(location.hash.split('#')[1]);
    }
    return null;
  }

  setHash(value) {
    location.hash = value;
  }

  scrollToCurrentPage() {
    if (this.pageNum !== 1) {
      this.$frameBone.scrollTop(this.frameBoneHeight * (this.pageNum - 2));
    }
  }

  getFrameBoneHeight() {
    this.frameBoneHeight = this.$frameBone.height();
  }

  setPage() {
    this.setHash(this.pageNum);

    switch (this.pageNum) {
      // 説明画面
      case 1:
        this.hiddenMemberPage();
        this.hiddenSlidePage();
        this.hiddenMoviePage();
        this.hiddenMakingPage();
        this.hiddenFinishPage();
        this.compressFrame();
        this.showIntroPage();
        this.hiddenEl(this.$back);
        this.hiddenEl(this.$next);
        break;
      // メンバー画面
      case 2:
        this.hiddenIntroPage();
        this.expandFrame();
        this.showMemberPage();
        this.showSlidePage();
        this.showMoviePage();
        this.showMakingPage();
        this.showFinishPage();
        this.$next.text('NEXT');
        setTimeout(() => {
          this.fadeInEl(this.$back);
          this.fadeInEl(this.$next);
        }, 1000);
        break;
      // スライド画面
      case 3:
        this.hiddenIntroPage();
        this.expandFrame();
        this.showMemberPage();
        this.showSlidePage();
        this.showMoviePage();
        this.showMakingPage();
        this.showFinishPage();
        setTimeout(() => {
          this.fadeInEl(this.$back);
          this.fadeInEl(this.$next);
        }, 1000);
        break;
      // YouTube画面
      case 4:
        this.hiddenIntroPage();
        this.expandFrame();
        this.showMemberPage();
        this.showSlidePage();
        this.showMoviePage();
        this.showMakingPage();
        this.showFinishPage();
        setTimeout(() => {
          this.fadeInEl(this.$back);
          this.fadeInEl(this.$next);
        }, 1000);
        break;
      // メイキング画面
      case 5:
        this.hiddenIntroPage();
        this.expandFrame();
        this.showMemberPage();
        this.showSlidePage();
        this.showMoviePage();
        this.showMakingPage();
        this.showFinishPage();
        setTimeout(() => {
          this.fadeInEl(this.$back);
          this.fadeInEl(this.$next);
        }, 1000);
        break;
      // 終了画面
      case 6:
        this.hiddenIntroPage();
        this.compressFrame();
        this.showMemberPage();
        this.showSlidePage();
        this.showMoviePage();
        this.showMakingPage();
        this.showFinishPage();
        this.$next.text('TOP');
        setTimeout(() => {
          this.fadeInEl(this.$back);
          this.fadeInEl(this.$next);
        }, 1000);
        break;
      // case 1と同じ
      default:
        this.hiddenMemberPage();
        this.hiddenSlidePage();
        this.hiddenMoviePage();
        this.hiddenMakingPage();
        this.hiddenFinishPage();
        this.compressFrame();
        this.showIntroPage();
        this.hiddenEl(this.$back);
        this.hiddenEl(this.$next);
        break;
    }
  }

  scrollToBack() {
    this.$frameBone.animate({
      scrollTop: this.$frameBone.scrollTop() - this.frameBoneHeight
    }, 1000);
  }

  scrollToNext() {
    this.$frameBone.animate({
      scrollTop: this.$frameBone.scrollTop() + this.frameBoneHeight
    }, 1000);
  }

  addResizeEvent() {
    $(window).on('resize', () => {
      this.getFrameBoneHeight();
    });
  }

  addClickBackEvent() {
    this.$back.on('click', () => {
      this.hiddenEl(this.$back);
      this.hiddenEl(this.$next);

      this.pageNum = this.pageNum - 1;

      if (this.pageNum !== 1) {
        this.scrollToBack();
      }

      this.setPage();
    });
  }

  addClickNextEvent() {
    this.$next.on('click', () => {
      this.hiddenEl(this.$back);
      this.hiddenEl(this.$next);

      if (this.pageNum === 6) {
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

  showMoviePage() {
    this.fadeInEl(this.$movie);
  }

  hiddenMoviePage() {
    this.hiddenEl(this.$movie);
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

  compressFrame() {
    this.$frame
      .removeClass('frame--l')
      .addClass('frame--s');
  }

  expandFrame() {
    this.$frame
      .removeClass('frame--s')
      .addClass('frame--l');
  }

  fadeInEl($el) {
    $el
      .removeClass('is-hidden isfadeIn')
      .addClass('is-fadeIn');
  }

  hiddenEl($el) {
    $el.addClass('is-hidden');
  }
}