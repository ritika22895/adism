var DECENTTHEMES = DECENTTHEMES || {};

(function($){

  // USE STRICT
  "use strict";

  DECENTTHEMES.initialize = {

    init: function(){
      DECENTTHEMES.initialize.defaults();
      DECENTTHEMES.initialize.swiper();
      DECENTTHEMES.initialize.background();
      DECENTTHEMES.initialize.background_parallax();
      DECENTTHEMES.initialize.skills();
      DECENTTHEMES.initialize.owl_slider();
      DECENTTHEMES.initialize.map();
      DECENTTHEMES.initialize.mobile_menu();
      DECENTTHEMES.initialize.countup();
      DECENTTHEMES.initialize.contactForm();
      DECENTTHEMES.initialize.navbar_scroll();
      DECENTTHEMES.initialize.mobile_navbar_scroll();
    },
    defaults: function() {
      var $toggle = $('[data-dt-toggle]');

      $toggle.each(function() {
        var $this   = $(this),
            $class  = $this.data('dt-toggle');

        $this.on('click', function(e) {
          e.preventDefault();
          $this.toggleClass('active');
          $('body').toggleClass($class);
        })
      });

      $('.toggle-menu').jPushMenu();

      /* Return To Top */

      $(window).scroll(function() {
        if ($(this).scrollTop() >= 400) {
          $('.return-to-top').addClass('visible');
        } else {
          $('.return-to-top').removeClass('visible');
        }
      });

      $('.return-to-top').on('click', function() {
        $('body,html').animate({
          scrollTop : 0
        }, 500);
      });

      /* Search Visible */

      $('#search-trigger').on('click', function() {
        $('#search-input').toggleClass('search-input-open');
      });

      $(document).on('click', function(e){
        if(!$(e.target).closest('.ngen-search-form').length){
          $('#search-input').removeClass('search-input-open');
        }
      });


      /* Map Visible */

      $('#map-show').on('click', function() {
        $('.show-map').toggleClass('map-open');
      });

      $(window).on('load', function() {
        $(".loading").fadeOut("slow");
        new WOW().init();
      });
    },

    swiper: function() {
      $('[data-carousel="swiper"]').each( function() {

        var $this       = $(this);
        var $container   = $this.find('[data-swiper="container"]');
        var $asControl   = $this.find('[data-swiper="ascontrol"]');

        var conf = function(element) {
          var obj = {
            slidesPerView: element.data('items'),
            centeredSlides: element.data('center'),
            loop: element.data('loop'),
            speed: element.data('speed'),
            initialSlide: element.data('initial'),
            effect: element.data('effect'),
            spaceBetween: element.data('space'),
            autoplay: element.data('autoplay'),
            direction: element.data('direction'),
            paginationType: element.data('pagination-type'),
            paginationClickable: true,
            breakpoints: element.data('breakpoints'),
            slideToClickedSlide: element.data('click-to-slide'),
            loopedSlides: element.data('looped'),
            fade: {
              crossFade: element.data('crossfade')
            }
          };
          return obj;
        }

        var $primaryConf = conf($container);
        $primaryConf.prevButton = $this.find('[data-swiper="prev"]');
        $primaryConf.nextButton = $this.find('[data-swiper="next"]');
        $primaryConf.pagination = $this.find('[data-swiper="pagination"]');

        var $ctrlConf = conf($asControl);

        function animateSwiper(selector, slider) {
          var makeAnimated = function animated() {
            selector.find('.swiper-slide-active [data-animate]').each(function(){
              var anim = $(this).data('animate');
              var delay = $(this).data('delay');
              var duration = $(this).data('duration');

              $(this).addClass(anim + ' animated')
              .css({
                webkitAnimationDelay: delay,
                animationDelay: delay,
                webkitAnimationDuration: duration,
                animationDuration: duration
              })
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass(anim + ' animated');
              });
            });
          };
          makeAnimated();
          slider.on('SlideChangeStart', function() {
            selector.find('[data-animate]').each(function(){
              var anim = $(this).data('animate');
              $(this).removeClass(anim + ' animated');
            });
          });
          slider.on('SlideChangeEnd', makeAnimated);
        };

        if ($container.length) {
          var $swiper = new Swiper( $container, $primaryConf);
          animateSwiper($this, $swiper);

          if ($asControl.length) {
            var $control = new Swiper( $asControl, $ctrlConf);
            $swiper.params.control = $control;
            $control.params.control = $swiper;
          }

        } else {
          console.log('Swiper container is not defined!');
        };

      });
    },

    background: function() {
      $('[data-bg-image]').each(function() {

        var img = $(this).data('bg-image');

        $(this).css({
          backgroundImage: 'url(' + img + ')',
        });
      });

      $('[data-bg-color]').each(function() {

        var value = $(this).data('bg-color');

        $(this).css({
          backgroundColor: value,
        });
      });
    },

    background_parallax: function() {
      $('[data-parallax="image"]').each(function() {

        var actualHeight = $(this).position().top;
        var speed      = $(this).data('parallax-speed');
        var reSize     = actualHeight - $(window).scrollTop();
        var makeParallax = -(reSize/2);
        var posValue   = makeParallax + "px";

        $(this).css({
          backgroundPosition: '50% ' + posValue,
        });
      });
    },

    countup: function() {
      var options = {
        useEasing : true,
        useGrouping : true,
        separator : ',',
        decimal : '.',
        prefix : '',
        suffix : ''
      };

      var counteEl = $('[data-counter]');

      if (counteEl) {
        counteEl.each(function() {
         var val = $(this).data('counter');

         var countup = new CountUp(this, 0, val, 0, 2.5, options);
         $(this).appear(function() {
          countup.start();
        }, {accX: 0, accY: 0})
       });
      }
    },

    skills: function() {
      $(function() {
        $('progress').each(function() {

          var max = $(this).val();

          $(this).appear(function() {
            $(this).val(0).animate({ value: max }, { duration: 2000});
          }, {accX: 0, accY: 0})
        });
      });
    },

    owl_slider: function() {
      $('#feedback-slider').owlCarousel({
        loop:true,
        margin:10,
        items : 2,
        smartSpeed: 600,
        responsiveClass:true,
        responsive:{
          0:{
            items:1,
            nav:true
          },
          500:{
            items:1,
            nav:false
          },
          768:{
            items:1,
            nav:false
          },
          900:{
            items:2,
            nav:true,
            loop:false
          },
          1024:{
            items:2,
            nav:true,
            loop:false
          }
        }
      })


      $('#feedback-slider-two').owlCarousel({
        loop:true,
        margin:10,
        items : 3,
        autoplay: true,
        smartSpeed: 600,
        responsiveClass:true,
        responsive:{
          0:{
            items:1,
            nav:true
          },
          500:{
            items:1,
            nav:false
          },
          768:{
            items:1,
            nav:false
          },
          900:{
            items:2,
            nav:true,
            loop:false
          },
          1024:{
            items:3,
            nav:true,
            loop:false
          }
        }
      })

      var owl = $('#brand-slide');
      owl.owlCarousel({
        nav:true,
        margin:0,
        autoplay:true,
        loop: true,
        pagination:false,
        smartSpeed: 600,
        autoplayTimeout: 2000,
        navigationText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        responsive:{
          0:{
            items:2
          },
          600:{
            items:3
          },
          768:{
            items:4
          },
          960:{
            items:4
          },
          1200:{
            items:5
          }
        }
      });
    },

    map: function() {

      $('.gmap3-area').each(function() {
        var $this  = $(this),
        key    = $this.data('key'),
        lat    = $this.data('lat'),
        lng    = $this.data('lng'),
        mrkr   = $this.data('mrkr');

        $this.gmap3({
          center: [lat, lng],
          zoom: 16,
          mapTypeId : google.maps.MapTypeId.ROADMAP
        })
        .marker(function (map) {
          return {
            position: map.getCenter(),
            icon: mrkr
          };
        })

      });
    },

    mobile_menu: function() {

      var Accordion = function(el, multiple) {
        this.el = el || {};

        this.multiple = multiple || false;

        var dropdownlink = this.el.find('.dropdownlink');
        dropdownlink.on('click',
          { el: this.el, multiple: this.multiple },
          this.dropdown);
      };

      Accordion.prototype.dropdown = function(e) {
        e.preventDefault();
        var $el = e.data.el,
        $this = $(this),

        $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if(!e.data.multiple) {
          //show only one menu at the same time
          $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
        }
      }

      var accordion = new Accordion($('.accordion-menu'), false);
    },
    navbar_scroll: function() {
      if ($(window).scrollTop() > 100 ){
        $('#dt-header').addClass('navbar-fixed-top');
      } else {
        $('#dt-header').removeClass('navbar-fixed-top');
      }
    },
    mobile_navbar_scroll: function() {
      if ($(window).scrollTop() > 100){
        $('#mobile-header').addClass('mobile-fixed-top');
      } else {
        $('#mobile-header').removeClass('mobile-fixed-top');
      }
    },
    contactForm: function() {
      $('[data-corpoform]').each(function () {
        var $this = $(this);
        $('.form-result', $this).css('display', 'none');

        $this.submit(function () {

          $('button[type="submit"]', $this).addClass('clicked');

          $.ajax({
            url: $this.attr('action'),
            type: 'POST',
            data: {
              fname: $('[name="fname"]', $this).val(),
              lname: $('[name="lname"]', $this).val(),
              email: $('[name="email"]', $this).val(),
              phone: $('[name="phone"]', $this).val(),
              subject: $('[name="subject"]', $this).val(),
              website: $('[name="website"]', $this).val(),
              content: $('textarea[name="content"]', $this).val()
            },
            success: function success(data) {
              if (data.err == true) {
                $('.form-result', $this).addClass('alert-warning').removeClass('alert-success alert-danger').css('display', 'block');
              } else {
                $('.form-result', $this).addClass('alert-success').removeClass('alert-warning alert-danger').css('display', 'block');
              }
              $('.form-result', $this).html(data.msg);
              $('button[type="submit"]', $this).removeClass('clicked');
            },
            error: function error() {
              $('.form-result', $this).addClass('alert-danger').removeClass('alert-warning alert-success').css('display', 'block');
              $('.form-result', $this).html('Sorry, an error occurred.');
              $('button[type="submit"]', $this).removeClass('clicked');
            }
          });
          return false;
        });

      });
    }
  };




  DECENTTHEMES.documentOnReady = {
    init: function(){
      DECENTTHEMES.initialize.init();
    },
  };


  DECENTTHEMES.documentOnResize = {
    init: function(){
    },
  };


  DECENTTHEMES.documentOnScroll = {
    init: function(){
      DECENTTHEMES.initialize.navbar_scroll();
      DECENTTHEMES.initialize.mobile_navbar_scroll();
      DECENTTHEMES.initialize.background_parallax();
    },

  };

  $(document).ready( DECENTTHEMES.documentOnReady.init );
  $(window).on( 'resize', DECENTTHEMES.documentOnResize.init );
  $(document).on( 'scroll', DECENTTHEMES.documentOnScroll.init );

})(jQuery);