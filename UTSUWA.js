$(document).ready(function () {

  // ハンバーガーメニューを閉じるヘルパー
  function closeMenu() {
    if ($('.hamburger-menu').hasClass('active')) {
      $('.hamburger-menu').removeClass('active');
      $('.menu-overlay').slideUp('slow', 'swing');
      $('.menu .menu-list').slideUp('slow', 'swing');
      $('.hamburger-menu-wrapper').removeClass('bounce-effect');
    }
  }

  // スムーズスクロール（メニューが開いている場合は先に閉じる）
  $('a[href^="#"]').on('click', function () {
    var href = $(this).attr('href');
    var target = $(href === '#' || href === '' ? 'html' : href);
    if (!target.length) return;
    closeMenu();
    setTimeout(function () {
      $('html, body').animate({ scrollTop: target.offset().top - 64 }, 600, 'swing');
    }, 200);
    return false;
  });

  // ハンバーガーメニュー
  $('.hamburger-menu').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.menu-overlay').slideToggle('slow', 'swing');
    $('.menu .menu-list').slideToggle('slow', 'swing');
    $('.hamburger-menu-wrapper').toggleClass('bounce-effect');
  });

  // Hero 画像ズームイン開始
  setTimeout(function () { $('#hero').addClass('loaded'); }, 100);

  // Fade-in (IntersectionObserver)
  var fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

});
