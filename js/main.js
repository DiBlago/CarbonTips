"use strict";

var $portfolio_filter, $grid_selectors, $blog, $port_filter;
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


/*==============================================================
 owl slider
 ==============================================================*/
$(document).ready(function () {

    var isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    $('.owl-animate-slider').owlCarousel({
        animateOut: 'fadeOut',
        animateIn: 'flipIn',
        items:1,
        loop:true,
        smartSpeed:450,
        mouseDrag: true,
        nav: true,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true
    });

    $('.owl-photosynthesis-5').owlCarousel({
        navigation: true,
        slideSpeed: 600,
        items: 2,
        itemsMobile : [479,1],
        navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    })

    $('.owl-slider-full').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 3,
        paginationSpeed: 400,
        autoPlay: 5000,
        singleItem: true,
        navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.owl-slider-style2').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 2,
        itemsDesktop: [1200, 2],
        itemsTablet: [800, 2],
        itemsMobile: [700, 1],
        paginationSpeed: 400,
         navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.owl-slider-style3').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 3,
        itemsDesktop: [1200, 4],
        itemsTablet: [800, 2],
        itemsMobile: [700, 1],
        paginationSpeed: 400,
        navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.owl-slider-style4').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 4,
        itemsDesktop: [1200, 4],
        itemsTablet: [991, 3],
        itemsMobile: [767, 1],
        paginationSpeed: 400,
        navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.testimonial-style3').owlCarousel({
        navigation: false,
        items: 3,
        itemsDesktop: [1200, 3],
        itemsTablet: [800, 2],
        itemsMobile: [700, 1]
    });

    $('.gallery-style4').owlCarousel({
        navigation: false,
        items: 4,
        itemsDesktop: [1200, 4],
        itemsTablet: [991, 3],
        itemsMobile: [767, 1]
    });

    $('.owl-slider-auto').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 3,
        autoPlay: 5000,
        paginationSpeed: 400,
        singleItem: true,
        navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    ////set equalize height
    $('.equalize').equalize();
    //fit videos
    $(".fit-videos").fitVids();

    /* ===================================
     counter number reset while scrolling
     ====================================== */

    // $('.timer').appear();Martin: What is <timer> and where do we use it?
    if($('.timer') && $('.timer').appear){
        $('.timer').appear();
    }
    $(document.body).on('appear', '.timer', function (e) {
        // this code is executed for each appeared element
        if (!$(this).hasClass('appear')) {
            animatecounters();
            $(this).addClass('appear');
        }
    });

    /* ===================================
     masonry
     ====================================== */

    $blog = $('.masonry-items');
    $blog.imagesLoaded(function () {
        $blog.isotope({
            itemSelector: 'li',
            layoutMode: 'masonry'
        });
    });

    /*==============================================================*/
    //Lightbox gallery - START CODE
    /*==============================================================*/

     $('.lightbox-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        midClick: true,
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        },
        callbacks: {
                open: function () {
                    $.magnificPopup.instance.close = function() {
                        if (!isMobile){
                            $.magnificPopup.proto.close.call(this);
                        } else {
                            $(document).on('click', 'button.mfp-close', function (event) {
                                $.magnificPopup.proto.close.call(this);
                            });
                        }
                    }
                }
            }
    });

    /*===========================================================
     Contact Form
     ============================================================ */
    $('.tz_submit').on('click', function (event) {
        event.preventDefault();
        var name_attr = [];
        var values = [];
        var tz_process = "";
        if($(this).closest("section").attr('id') !== undefined)
        {
            var section_id = $(this).closest("section").attr('id');
        }else{
            var section_id = $(this).closest("footer").attr('id');
        }
        var submit_loader = '<div class="loading text-deep-green display-inline-block margin-five no-margin-tb no-margin-right" id="loading">Loading...</div>';
        $('#' + section_id).find('form').find('button').after(submit_loader);
        $('#' + section_id).find('form input, form select,form textarea').each(
                function (index) {

                    if ($(this).is('[data-email="required"]')) {
                        var required_val = $(this).val();
                        if (required_val != '') {
                            name_attr.push($(this).attr('name'));
                            values.push($(this).val());
                            tz_process = true;
                        } else {
                            $('#loading').remove();
                            $(this).addClass('tz_input_error');
                            tz_process = false;
                        }
                    }

                    if (!$(this).is('[data-email="required"]')) {
                        name_attr.push($(this).attr('name'));
                        values.push($(this).val());
                    }

                });

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#' + section_id).find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                tz_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                tz_process = true;
            }
        }
        if (tz_process)
        {
            localStorage.setItem('tz_section',section_id);
            $.post("tz_mail/contact.php", {
                data: { input_name: name_attr,values: values,section_id:section_id},
                type: "POST",
            }, function (data) {
                $('#loading').remove();
                var tz_form_output = '';
                if(data)
                {
                    if(data.type == "tz_message")
                    {
                       $('#error').remove();
                       $('#success').remove();
                       $('#google-recaptcha-error').remove();
                       var tz_form_output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "tz_error") {
                        $('#success').remove();
                        $('#error').remove();
                        var tz_form_output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var tz_form_output = '';
                    }
                }

                if(tz_form_output != '')
                {
                    var section_id = localStorage.getItem('tz_section');
                    $('#'+section_id).find('form').before(tz_form_output);
                }
                $('#' + section_id).find('form input,form textarea').each(function (index) {
                    $(this).val('');
                });

                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $(this).submit();
                 },5000);
                localStorage.removeItem('tz_section');
            }, 'json');
        }

        $('#' + section_id).find('form input,form textarea').each(function (index) {
            $(this).keypress(function () {
                $(this).removeClass('tz_input_error');
            });
        });

        $('#' + section_id).find('form input,form textarea').each(function (index) {
            if ($(this).is(":focus")) {
                $(this).removeClass('tz_input_error');
            }
        });

        $('#' + section_id).find('form select').each(function (index) {
            $(this).on("change", function () {
                var val = this.value;
                if (val == ''){
                    $(this).removeClass('tz_input_error');
                }
            });
        });
    });

    /*===========================================================
     Contact Form Stefan + Subscribe form
     ============================================================ */
    $('.contact-submit').on('click', function (event) {

        var href = window.location.href.split('/');
        var isInPreviewMode = href.indexOf('preview') > 2;

        if (window.self !== window.top) {
            console.warn('Builder: Form submit is disabled in Building mode');
            return false;
        } else if (isInPreviewMode === true){
            console.warn('Builder: Form submit is disabled in Preview mode');
            return false;
        }

        event.preventDefault();

        var url = $(this).closest('form').attr('action');
        var name  = $('input[name="name"]').val();
        var email  = $('input[name="email"]').val();
        var phone  = $('input[name="phone"]').val();
        var comment  = $('textarea[name="comment"]').val();
        var address  = $('input[name="address"]').val();
        var option  = $('#select_option option:selected').text();

        $.ajax({
            type: "POST",
            dataType: 'json',
            url: url,
            context: this, //keeps $(this) in success
            data: { name: name, email: email, comment: comment, phone: phone, address: address, option: option }, //

            success: function(data){
                console.log(data);
                var successDiv = $( "div.success" ).not("#frameWrapper div.success");
                successDiv.empty();
                successDiv.append( "<h4>" + data.msg + "</h4>" );
                $('input[name="name"]').val('');
                $('input[name="email"]').val('');
                $('textarea[name="comment"]').val('');
                $('textarea[name="phone"]').val('');
                $('input[name="address"]').val('');
            },
            error: function(data) {
                console.log(data);
                var successDiv = $( "div.success" ).not("#frameWrapper div.success");
                successDiv.empty();
                if(!data || !data.msg){
                    console.error('empty data');
                    return false;
                }
                successDiv.append( "<h4>" + data.msg + "</h4>" );
            }
        });
        return false; // required to block normal submit since you used ajax

    });

    $('.subscribe-submit').on('click', function (event) {

        event.preventDefault();

        var url = $(this).closest('form').attr('action');
        var fname  = $('input[name="fname"]').val();
        var email  = $('input[name="email"]').val();

        $.ajax({
            type: "POST",
            dataType: 'json',
            url: url,
            context: this, //keeps $(this) in success
            data: { fname: fname, email: email }, //

            success: function(data){
                console.log(data);
                var successDiv = $( "div.subscribe-success" ).not("#frameWrapper div.subscribe-success");
                successDiv.empty();
                successDiv.append( "<h4>" + data.msg + "</h4>" );
                $('input[name="email"]').val('');
                $('input[name="fname"]').val(''); // subscribe
            },
            error: function(data) {
                console.log(data);
                var successDiv = $( "div.subscribe-success" ).not("#frameWrapper div.subscribe-success");
                successDiv.empty();
                successDiv.append( "<h4>" + data.msg + "</h4>" );
            }
        });
        return false; // required to block normal submit since you used ajax

    });

});


/*==============================================================
 LightboxGallery Function
 ==============================================================*/

function LoadLightboxGallery()
{
    $('.lightbox-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        }
    });
}

/*==============================================================
 portfolio-filter
 ==============================================================*/

$portfolio_filter = $('.grid');
$portfolio_filter.imagesLoaded(function () {
    $portfolio_filter.isotope({
        itemSelector: 'li',
        layoutMode: 'masonry'
    });
});

$grid_selectors = $('.portfolio-filter > li > a');
$grid_selectors.on('click', function () {

    $portfolio_filter = $('.grid');
    $('.portfolio-filter > li').removeClass('active');
    $(this).parent().addClass('active');

    var selector = $(this).attr('data-filter');
    $portfolio_filter.imagesLoaded(function () {
        $portfolio_filter.isotope({
            filter: selector,
            itemSelector: 'li',
            layoutMode: 'masonry'

        });
    });
    return false;
});

function LoadIsotope() {
    $port_filter = $('.grid');
    var $gridSelectors = $('.portfolio-filter > li.active');
    var filter_val = $gridSelectors.find('a').attr('data-filter');
    if ($port_filter.data('isotope')) {
        $port_filter.isotope('destroy');
    }
    $port_filter.imagesLoaded(function () {
        $port_filter.isotope({
            filter: filter_val,
            itemSelector: 'li',
            layoutMode: 'masonry',
        });
    });
}

/*==============================================================
 OwlSlider Function
 ==============================================================*/

function LoadOwlSlider() {

    // $('.owl-photosynthesis-5').owlCarousel({
    //     navigation: true,
    //     slideSpeed: 600,
    //     items: 2,
    //     itemsMobile : [479,1],
    //     navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    // })

    $('.owl-slider-full').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 3,
        paginationSpeed: 400,
        autoPlay: 5000,
        singleItem: true,
        navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.owl-slider-style2').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 2,
        itemsDesktop: [1200, 2],
        itemsTablet: [800, 2],
        itemsMobile: [700, 1],
        paginationSpeed: 400,
         navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.owl-slider-style3').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 3,
        itemsDesktop: [1200, 4],
        itemsTablet: [800, 2],
        itemsMobile: [700, 1],
        paginationSpeed: 400,
        navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.owl-slider-style4').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 4,
        itemsDesktop: [1200, 4],
        itemsTablet: [991, 3],
        itemsMobile: [767, 1],
        paginationSpeed: 400,
        navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.testimonial-style3').owlCarousel({
        navigation: false,
        items: 3,
        itemsDesktop: [1200, 3],
        itemsTablet: [800, 2],
        itemsMobile: [700, 1]
    });

    $('.gallery-style4').owlCarousel({
        navigation: false,
        items: 4,
        itemsDesktop: [1200, 4],
        itemsTablet: [991, 3],
        itemsMobile: [767, 1]
    });

    $('.owl-slider-auto').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 3,
        autoPlay: 5000,
        paginationSpeed: 400,
        singleItem: true,
        navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
}

parent.addEventListener('builder:reset-slider', function(){
    LoadOwlSlider();
});
// }
/*==============================================================
 Equalize Function
 ==============================================================*/

function LoadEqualize()
{
    $('.equalize').equalize({reset: true});
}

/*==============================================================
 Counter Function
 ==============================================================*/

function LoadCounter()
{
    $('#counter-event').countdown($('#counter-event').attr("data-enddate")).on('update.countdown', function (event) {
        var $this = $(this).html(event.strftime('' + '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div>' + '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>' + '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>' + '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'))
    });
}

$(window).resize(function () {
    setTimeout(function () {
        $portfolio_filter.isotope('layout');
        //set equalize height
        if (!isMobile.any()) {
            $(window).unbind('equalize');
            $('.equalize').equalize({reset: true});
        }
    }, 500);
});

$(window).on("orientationchange", function () {
    if (isMobile.any()) {
        $(window).unbind('equalize');
        setTimeout(function () {
            $('.equalize').equalize();
        }, 500);
    }
});

//set equalize height
$(window).load(function () {
    $('.equalize').equalize();
});

/*==============================================================
 accordion
 ==============================================================*/
$('.accordion-style1 .collapse').on('show.bs.collapse', function () {
    var id = $(this).attr('id');
    $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
    $('a[href="#' + id + '"] .panel-title').find('i').addClass('fa-angle-up').removeClass('fa-angle-down');
});
$('.accordion-style1 .collapse').on('hide.bs.collapse', function () {
    var id = $(this).attr('id');
    $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
    $('a[href="#' + id + '"] .panel-title').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
});

/*==============================================================
 countdown timer
 ==============================================================*/
function runCounter()
{
    // $('#counter-event').countdown('stop');
    $('#counter-event').countdown($('#counter-event').attr("data-enddate")).on('update.countdown', function (event) {
        var $this = $(this).html(event.strftime('' + '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div>' + '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>' + '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>' + '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'))
        // $(this).countdown('stop');
    });
}
if ($('#counter-event').length > 0) {
    parent.addEventListener('builder:reset-counter', function(){
        runCounter();
    });
    runCounter();
}
/*==============================================================
 counter
 ==============================================================*/

jQuery(function ($) {
    // start all the timers
    animatecounters();
});

function animatecounters() {
    $('.timer').each(count);
    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }
}
/* ===========================================================
 TWITTER FEED
 ============================================================== */
function handleTweets(tweets) {

    var x = tweets.length,
            n = 0,
            element = document.getElementById('twitter-feed'),
            html = '<div class="twitter-post-slides">';
    while (n < x) {
        html += '<div>' + tweets[n] + '</div>';
        n++;
    }
    html += '</div>';
    element.innerHTML = html;
    /* Twits attached to owl-carousel */
    $(".twitter-post-slides").owlCarousel({
        slideSpeed: 300,
        paginationSpeed: 400,
        autoPlay: true,
        pagination: false,
        transitionStyle: "fade",
        singleItem: true
    });
}

if ($('#twitter-feed').length)
{
    var widgetId = $('#twitter-feed').attr('data-widget-id');
    var tz_config_feed = {
        "id": widgetId,
        "domId": 'twitter-feed',
        "maxTweets": 5,
        "enableLinks": true,
        "showUser": false,
        "showTime": true,
        "dateFunction": '',
        "showRetweet": false,
        "customCallback": handleTweets,
        "showInteraction": false
    };
    twitterFetcher.fetch(tz_config_feed);
}

/*==============================================================
 wow animation - on scroll
 ==============================================================*/

var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 90,
    mobile: false,
    live: true
});
wow.init();


/*==============================================================
 tabs change one click stefan
 ==============================================================*/
$( "ul.nav-tabs a span, ul.nav-tabs a span p" ).click(function() {
    $(this).closest('a').click();
});

// Remove cover ON videos in Preview/Export
if (window.self === window.top) {
    $('.frameCover').remove();
    $('.editCountdown').removeClass('editCountdown');
}

// Map set pointer-events
$(document).ready(function() {
    $('.maps').click(function () {
        $('.maps iframe').css('pointer-events', 'auto');
    });

    $('.maps').mouseleave(function() {
      $('.maps iframe').css('pointer-events', 'none');
    });
});

$(parent.document).find('.element').each(function(){
    var iframeDOM = $(this).find('iframe').contents();
    var id = iframeDOM.find('section, header').attr('id');
    if (id) {
        $(this).find('.frameCover .element-id-label').remove();
        $(this).find('.frameCover').append('<span class="element-id-label" data-tooltip="Име на секцията">#' + id + '</span>');
    }
});
/*==============================================================
DATE TIME PICKER BOOTSTRAP
 ==============================================================*/
$(function () {
    if($('#data').datetimepicker){
        $('#data').datetimepicker({
            format: 'DD/MM/YYYY',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-arrow-up",
                down: "fa fa-arrow-down",
                previous: 'fa fa-arrow-left',
                next: "fa fa-arrow-right"
            }
        });
    }

    if($('#hour').datetimepicker){
        $('#hour').datetimepicker({
            format: 'hh:mm A',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-arrow-up",
                down: "fa fa-arrow-down",
                previous: 'fa fa-arrow-left',
                next: "fa fa-arrow-right"
            }
        });
    }
});


/*==============================================================
smooth scroll
==============================================================*/
$('a[href*="#"]:not(".nav-tabs li a"):not(a[href*="#/"])').on('click', function(event){
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
});




/*==============================================================
sf-programa tabs
==============================================================*/
$(".sf-section-title .sf-tab .sf-tab-to-show").on('click', function (e) {
    e.preventDefault();
    $(".sf-section-title .sf-tab .sf-tab-to-show").removeClass("sf-tab-active");
    $(this).addClass("sf-tab-active");

    if ($(".sf-tab-to-show-1").hasClass("sf-tab-active")) {
        $(".sf-programa-po-dni").removeClass("sf-show");
        $(".sf-programa-den1").addClass("sf-show");
    } else if ($(".sf-tab-to-show-2").hasClass("sf-tab-active")) {
        $(".sf-programa-po-dni").removeClass("sf-show");
        $(".sf-programa-den2").addClass("sf-show");
    } else if ($(".sf-tab-to-show-3").hasClass("sf-tab-active")) {
        $(".sf-programa-po-dni").removeClass("sf-show");
        $(".sf-programa-den3").addClass("sf-show");
    }
});

var builderStyles = $("[data-builder]");
if (builderStyles.length > 0) {
    builderStyles.each(function(idx, item){
        var itemObj = $(item);
        itemObj.attr('style', $(item).attr('data-builder'));
        itemObj.css('outline', '');
        itemObj.css('outline-offset', '');
    });
}
var builderAllEditSelectors = $("[data-selector]");
if (builderAllEditSelectors.length > 0) {
    builderAllEditSelectors.each(function(idx, item){
        $(item).removeAttr('data-selector');
    });
}

// bgr img attached disabled on ios for mobile devices
var _isOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/);

if (_isOS) {
  $('body').addClass('is-os');
}

// oferta scorll
// $('#oferta-footer-new').prev().css("margin-bottom", "360px");
// $('#oferta-footer-new').css("z-index", "-2");
// $('#oferta-top-section').next().css("margin-top", "860px");



// $(document).scroll(function() {
//   var y = $(this).scrollTop();
//   if (y > 250) {
//     $('.custom-fade').css(
//         {transform:'translate(0%, -100%)', opacity: 0, transition: '2s ease'}
//     );
//
//   } else {
//       $('.custom-fade').css(
//           {transform:'translate(0%, 0%)', opacity: 1, transition: '2s ease'}
//       );
//
//   }
//   if (y > 860) {
//     $('#oferta-top-section').hide();
//     $('.custom-fade').css(
//         {transform:'scale(0.5)'}
//     );
//   } else {
//     $('#oferta-top-section').show();
//   }




//});

/*==============================================================
custom accordion tab
==============================================================*/
$('.accordion-title').on('click', function(){
    $(this).toggleClass('active').next('.accordion-content-show').toggleClass('active');
})
