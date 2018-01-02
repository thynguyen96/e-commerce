jQuery(function($) {
    "use strict";

    var gamba = window.gamba || {};

    /*=======================================
    =             MAIN FUNCTION             =
    =======================================*/

    gamba.headerFunction = function() {
        //js for menu PC
        // Add class fixed for menu when scroll
        var window_height = $(window).height();

        $(window).on('scroll load', function (event) {
            if ($(window).scrollTop() > window_height) {
                $(".header-main").addClass('header-fixed');
            }
            else {
                $(".header-main").removeClass('header-fixed');
                $(".header-main").removeClass('hide-menu');
            }
        });

        // Show menu when scroll up, hide menu when scroll down
        var lastScroll = 50;
        $(window).on('scroll load', function (event) {
            var st = $(this).scrollTop();
            if (st > lastScroll) {
                $('.header-main').addClass('hide-menu');
                if ($('.nav-search').hasClass('hide') === false) {
                    $('.nav-search').toggleClass('hide');
                }
            }
            else if (st < lastScroll) {
                $('.header-main').removeClass('hide-menu');
            }

            if ($(window).scrollTop() <= 200 ){
                $('.header-main').removeClass('.header-fixed').removeClass('hide-menu');
            }
            else if ($(window).scrollTop() < window_height && $(window).scrollTop() > 0) {
                $('.header-main').addClass('hide-menu');
            }
            lastScroll = st;
        });

        
        // Show - hide box search on menu
        $('.button-search').on('click', function () {
            $('.nav-search').toggleClass('hide');
            $('.nav-search input').focus();
        });

        //hide box seach when click outside
        $('body').on('click', function (event) {
            if ($('.button-search').has(event.target).length === 0 && !$('.button-search').is(event.target) && $('.nav-search').has(event.target).length === 0 && !$('.nav-search').is(event.target)) {
                if ($('.nav-search').hasClass('hide') === false) {
                    $('.nav-search').toggleClass('hide');
                }
            }
        });

        // Menu Mobile
        $(".wrapper-menu-mobile").css("min-height", $(window).height());
        $(".wrapper-search-mobile").css("min-height", $(window).height());

        // show menu
        $(".hamburger-menu-mobile").on("click", function(){
            $('body').addClass("open-menu-mobile");
        });
        $(".mb-button-close").on("click", function(){
            $('body').removeClass("open-menu-mobile");
        });

        //show search
        $(".button-search-mobile").on("click", function(){
            $('body').addClass("open-search-mobile");
        });
        $(".mb-button-close").on("click", function(){
            $('body').removeClass("open-search-mobile");
        });


        // show hide dropdown menu
        $('.mb-nav>.dropdown>.icons-dropdown').on('click', function(){
            if ($(this).parents('.dropdown').hasClass('mb-menu-dropdown-open') === true) {
                $(this).parents('.dropdown').removeClass('mb-menu-dropdown-open');
            }
            else {
                $('.mb-nav .dropdown').removeClass('mb-menu-dropdown-open');
                $(this).parents('.dropdown').addClass('mb-menu-dropdown-open');
            }
        });
        $('.dropdown-2 .icons-dropdown').on('click', function(){
            $(this).parents('.dropdown-2').toggleClass('mb-menu-dropdown-open');
        });
    };

    gamba.mainFunction = function() {

        // ----------------------- WOW-JS --------------------------- //
        new WOW().init();

        // ----------------------- SELECTBOX --------------------------- //
        if($(".selectbox").length) {
            $(".selectbox").selectbox();
            $('body').on('click', function(event){
                if ( $('.sbHolder').has(event.target).length === 0 && !$('.sbHolder').is(event.target)) {
                    $(".selectbox").selectbox('close');
                }
            });
        }

        // ----------------------- SHOW GALLERY --------------------------- //
        if($(".fancybox").length) {
            $(".fancybox").fancybox({
                helpers : {
                    thumbs  : {
                        width   : 50,
                        height  : 50
                    },
                    overlay: {
                        locked: false
                    }
                }
            });
        
            if( $(window).width() > 600 ) {
                $.fancybox.helpers.thumbs.onUpdate = function( opts, obj ){
                    if (this.list) {
                        var center = Math.floor($(window).width() * 0.5 - (obj.group.length / 2 * this.width + this.width * 0.5));
                        this.list.css('left', center);
                    }
                };
            }
        }

        // ----------------------- padding bottom --------------------------- //
        if($(".contact-map").length == false) {
            $(".main-contents").css("padding-bottom", $(".subscribe-email").height()/2);
        }

        // ----------------------- BACK TOP --------------------------- //
        $('#back-top .link').on('click', function () {
            $('body,html').animate({
                scrollTop: 0
            }, 900);
            return false;
        });

        var temp = $(window).height();
        $(window).on('scroll load', function (event) {
            if ($(window).scrollTop() > temp){
                $('#back-top .link').addClass('show-btn');
            }
            else {
                $('#back-top .link').removeClass('show-btn');
            }
        });

        // ----------------------- Play videos --------------------------- //
        if ($('.block-video').length) {
            var gurl = $(".video-embed")[0].src;
            $(".video-button-play ").on('click', function(event) {
                $(".video-embed").addClass('show-video');
                $(".video-button-close").addClass('show-video');
                $(".video-embed")[0].src += "&autoplay=1";
                event.preventDefault();
            });

            $(".video-button-close").on('click', function(event) {
                $(".video-embed")[0].src = gurl;
                $(".video-embed").removeClass('show-video');
                $(".video-button-close").removeClass('show-video');
            });
        };

        // ----------------------- Isotop JS --------------------------- //
        setTimeout(function(){
            // Isotop
            if($('.gallery-grid').length) {
                var $grid = $('.gallery-grid').isotope({
                    itemSelector: '.grid-item',
                    layoutMode: 'masonry',
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.grid-item'
                    }
                });
                // filter functions
                var filterFns = {
                    // show if number is greater than 50
                    numberGreaterThan50: function () {
                        var number = $(this).find('.number').text();
                        return parseInt(number, 10) > 50;
                    },
                    // show if name ends with -ium
                    ium: function () {
                        var name = $(this).find('.name').text();
                        return name.match(/ium$/);
                    }
                };
                // bind filter button click
                $('.gallery-grid').parent().find('.tab-filter').on('click', '.tab', function () {
                    var filterValue = $(this).attr('data-filter');
                    // use filterFn if matches value
                    filterValue = filterFns[filterValue] || filterValue;
                    $grid.isotope({filter: filterValue});
                });
                // change is-checked class on buttons
                $('.gallery-grid').parent().find('.tab-filter').each(function (i, buttonGroup) {
                    var $buttonGroup = $(buttonGroup);
                    $buttonGroup.on('click', '.tab', function () {
                        $buttonGroup.find('.active').removeClass('active');
                        $(this).addClass('active');
                    });
                });
            }

            // Isotop 2
            if($('.gallery-grid-2').length) {
                var $grid = $('.gallery-grid-2').isotope({
                    itemSelector: '.grid-item',
                    layoutMode: 'masonry',
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.grid-sizer'
                    }
                });
                // filter functions
                var filterFns = {
                    // show if number is greater than 50
                    numberGreaterThan50: function () {
                        var number = $(this).find('.number').text();
                        return parseInt(number, 10) > 50;
                    },
                    // show if name ends with -ium
                    ium: function () {
                        var name = $(this).find('.name').text();
                        return name.match(/ium$/);
                    }
                };
                // bind filter button click
                $('.gallery-grid-2').parent().find('.tab-filter').on('click', '.tab', function () {
                    var filterValue = $(this).attr('data-filter');
                    // use filterFn if matches value
                    filterValue = filterFns[filterValue] || filterValue;
                    $grid.isotope({filter: filterValue});
                });
                // change is-checked class on buttons
                $('.gallery-grid-2').parent().find('.tab-filter').each(function (i, buttonGroup) {
                    var $buttonGroup = $(buttonGroup);
                    $buttonGroup.on('click', '.tab', function () {
                        $buttonGroup.find('.active').removeClass('active');
                        $(this).addClass('active');
                    });
                });
            }

            // Mansory
            if($(".blog-masonry").length) {
                $('.blog-masonry').isotope({
                    itemSelector: '.item',
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.item'
                    }
                });
            }
        }, 500);

        // ----------------------- audio, video --------------------------- //
        if ($("audio").length || $("video").length){
            $('audio,video').mediaelementplayer({
                videoWidth: '100%',
                videoHeight: '100%',
                enableAutosize: true,
                features: ['playpause','current','progress','tracks','volume','fullscreen']
            });
        }

        // ------------------------- Slick Slider ----------------------- //
        $(".list-images").slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 600,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                        dots: true,
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                        dots: true,
                    }
                },
                {
                    breakpoint: 415,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: true,
                    }
                }
            ]
        });

        // List customer review
        $(".list-customer-review").slick({
                dots: false,
                arrows: true,
                infinite: true,
                speed: 700,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 3,
                            arrows: false,
                            dots: true,
                        }
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2,
                            arrows: false,
                            dots: true,
                        }
                    },
                    {
                        breakpoint: 415,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                            dots: true,
                        }
                    }
                ]
        });

        // List customer review
        $(".list-customer-review-2").slick({
                dots: false,
                arrows: true,
                infinite: true,
                speed: 700,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 3,
                            dots: true,
                            arrows: false,
                        }
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2,
                            dots: true,
                            arrows: false,
                        }
                    },
                    {
                        breakpoint: 415,
                        settings: {
                            slidesToShow: 1,
                            dots: true,
                            arrows: false,
                        }
                    }
                ]
        });

        // Set height tab list vertical
        if ($(window).width()>1024) {
            if ($(".tab-vertical").length) {
                // set height 0 to counter table-cell calculate height
                $(".tab-vertical .tab-list").height(0);
                
                var contentHeight = $(".tab-vertical .tab-content").height();
                $(".tab-vertical .tab-list").height(contentHeight);
                
            }
        }

        jQuery('.shopping-cart .quantity').each(function() {
            var spinner = jQuery(this),
                input = spinner.find('input[type="number"]'),
                btnUp = spinner.find('.quantity-up'),
                btnDown = spinner.find('.quantity-down'),
                min = parseFloat(input.attr('min')),
                max = parseFloat(input.attr('max'));

            btnUp.click(function() {
                
                var oldValue = parseFloat(input.val());
                if (oldValue >= max) {
                  var newVal = oldValue;
                } else {
                  var newVal = oldValue + 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });

            btnDown.click(function() {
                
                var oldValue = parseFloat(input.val());
                if (oldValue <= min) {
                  var newVal = oldValue;
                } else {
                  var newVal = oldValue - 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });

        });

        // ----------------------- Shop detail --------------------------- //
        if ($(".shop-img-wrapper").length) {
            $(".shop-img-wrapper .slider-for").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                asNavFor: $(".shop-img-wrapper .slider-nav")
            });
            $(".shop-img-wrapper .slider-nav").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: $(".shop-img-wrapper .slider-for"),
                dots: false,
                centerPadding: '0',
                focusOnSelect: true
            });
        }

        if($('.our-product-list').length) {
            $('.our-product-list').slick({
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: false,
                autoplay: true,
                arrows: false,
                infinite: true,
                adaptiveHeight: true,
                responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                  }
                }]
            });
        }
    };

    gamba.home_slider = function() {
        
        // slide homepage 2 - background slide
        $('.background-slide').slick({
            dots: true,
            arrows: false,
            speed: 700,
            fade: true,
            autoplay: true,
            autoplaySpeed: 7000,
            cssEase: 'linear',
            pauseOnHover: false
        });

        $('.background-slide').on('afterChange', function(event, slick, currentSlide){
            $('.slick-active  .group-title').addClass('animated fadeInDown');
            //$('.slick-active  .description').addClass('animated fadeInUp');
            $('.slick-active  .btn-left').addClass('animated fadeInLeft');
            $('.slick-active  .btn-right').addClass('animated fadeInRight');

            $('.slick-active  .group-title').removeClass('hidden');
            //$('.slick-active  .description').removeClass('hidden');
            $('.slick-active  .btn-left').removeClass('hidden');
            $('.slick-active  .btn-right').removeClass('hidden');
        });

        $('.background-slide').on('beforeChange', function(event, slick, currentSlide){
            $('.slick-active  .group-title').removeClass('animated fadeInDown');
            //$('.slick-active  .description').removeClass('animated fadeInUp');
            $('.slick-active  .btn-left').removeClass('animated fadeInLeft');
            $('.slick-active  .btn-right').removeClass('animated fadeInRight');

            $('.slick-active  .group-title').addClass('hidden');
            //$('.slick-active  .description').addClass('hidden');
            $('.slick-active  .btn-left').addClass('hidden');
            $('.slick-active  .btn-right').addClass('hidden');
        });
    };

    gamba.datepick = function() {
        // js for calendar
        $('.input-daterange, .archive-datepicker').datepicker({
            format: 'mm/dd/yy',
            maxViewMode: 0
        });

        // js for time
        $('.times-open').timepicker({ 
            'scrollDefault': 'now' 
        });
    };

    gamba.reply = function() {

        // SHOW HIDE COMMENT WHEN CLICK BUTTON REALY
        $('div[class*="merge"]').css("display","none");

        $('.reply-1').on("click", function(event) {
            $('.merge-1').toggle(300);
        });

        $('.reply-2').on("click", function(event) {
            $('.merge-2').toggle(300);
        });
    };

    gamba.loading = function() {
        if($('#loading-page').length) {
            //$('.wrapper-content').addClass('loaded');
            setTimeout(function(){
                $('#loading-page').addClass('loaded');
            }, 1500);
        }
    };

    gamba.live_setting = function() {
        // toggle live setting
        if($('#live-setting').length) {
            $('.btn-live-setting').on('click', function(){
                if($('#live-setting').hasClass('open')) {
                    $('#live-setting').removeClass('open');
                } else {
                    $('#live-setting').addClass('open');
                }
            });

            $(".live-setting-content").mCustomScrollbar({
                theme: "minimal-dark"
            });
        }

        // toggle live setting when click outside
        $('body').on('click', function (event) {
            if ($('#live-setting').has(event.target).length === 0 && !$('#live-setting').is(event.target)) {
                if($('#live-setting').hasClass('open')) {
                    $('#live-setting').removeClass('open');
                }
            }
        });

        // skin color
        var list_color = $('#live-setting .skin-color .color');

        var setColor = function (color) {
            $('#color-skins').attr('href', 'assets/css/custom-color/'+ color + '.css');
        };

        list_color.on('click', function() {
            event.preventDefault();
            setColor($(this).attr('data-color'));
            Cookies.set('color-skin', $(this).attr('data-color'));
        });

        // color picker
        $('.skin-color .list-color .color').on('click', function (event) {
            if(!$(this).hasClass('active')) {
                $('.skin-color .list-color .color').removeClass('active');
                $(this).addClass('active');
            }
        });

        // layout wide or boxed
        $('.skin-bg .list-color .color').on('click', function (event) {
            if(!$(this).hasClass('active')) {
                $('.skin-bg .list-color .color').removeClass('active');
                $(this).addClass('active');
            }
        });
        $('.skin-color .list-color .color').on('click', function (event) {
            if(!$(this).hasClass('active')) {
                $('.skin-color .list-color .color').removeClass('active');
                $(this).addClass('active');
            }
        });

        $('.tab-menu .layout-wide').on('click', function (event) {
            if($('body').hasClass('gamba-boxed')) {
                $('body').removeClass('gamba-boxed');
            }
        });

        $('.tab-menu .layout-boxed').on('click', function (event) {
            if(!$('body').hasClass('gamba-boxed')) {
                $('body').addClass('gamba-boxed');
                $('.main-contents').css('background-color', '#fff');
                $('.gamba-boxed').css('background-color', '#f9f9f9');
            }
        });

        $('#layout-wide .list-color .color').on('click', function (event) {
            event.preventDefault();
            var color = $(this).attr('data-color');
            $('.main-contents').css('background-color', color);
        });

        $('#layout-boxed .list-color .color').on('click', function (event) {
            event.preventDefault();
            var color = $(this).attr('data-color');
            var background = $(this).attr('data-bg');
            $('.gamba-boxed').css({'background-color': color, 'background-image': ""});
            switch ( background ) {
                case '1':
                    $('.gamba-boxed').css('background-image', "url('assets/images/background-boxed/bg1.jpg')" );
                    break;
                case '2':
                    $('.gamba-boxed').css('background-image', "url('assets/images/background-boxed/bg2.jpg')" );
                    break;
                case '3':
                    $('.gamba-boxed').css('background-image', "url('assets/images/background-boxed/bg3.jpg')" );
                    break;
                case '4':
                    $('.gamba-boxed').css('background-image', "url('assets/images/background-boxed/bg4.jpg')" );
                    break;
                case '5':
                    $('.gamba-boxed').css('background-image', "url('assets/images/background-boxed/bg5.jpg')" );
                    break;
            }
        });
    }

    /*======================================
    =            INIT FUNCTIONS            =
    ======================================*/

    $(document).ready(function() {
        gamba.loading();
        gamba.headerFunction();
        gamba.mainFunction();
        gamba.live_setting();
        gamba.home_slider();
        gamba.datepick();
        gamba.reply();
    });

    /*=====  End of INIT FUNCTIONS  ======*/

    $(window).on('load', function() {
        //gamba.loading();
    });

});
