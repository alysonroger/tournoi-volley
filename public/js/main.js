(() => {
  // Scroll to top button appear
  $(document).scroll((event) => {
    const scrollDistance = $(event.target).scrollTop();

    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Collapse Navbar
  const navbarCollapse = () => {
    const mainNav = $('#mainNav');

    if (mainNav.offset().top > 100) {
      mainNav.addClass('navbar-shrink');
    } else {
      mainNav.removeClass('navbar-shrink');
    }
  };

  // Collapse now if page is not at top
  navbarCollapse();

  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
})();
