$(document).ready(function () {
    var positionLeft = $('.letters-wrp').offset().left;
    console.log(positionLeft);
    var $pageContent = $(window);
// Initialize Equalizer
    (function () {
        var $equalizer = $('.equalizer');
        var $equalizerBtn = $('.toggle');
        var $equalizerText = $('.music-on');
        var $audio = $('audio')[0];
        $equalizer.liEqualizer({
            row:12,			//кол-во столбцов
            col:4,			//кол-во колонок
            speed:20,		//скорость подсветки кубиков
            freq:400,		//частота сигнала
            on:true			//включено по умолчанию (true,false)
        });
        $equalizerBtn.click(function(){
            if($equalizer.data('on')) {
                $equalizer.liEqualizer('stop');
                $equalizerText.text('Off');
                $audio.pause();
            } else {
                $equalizer.liEqualizer('start');
                $equalizerText.text('On');
                $audio.play();
            }
    	});
    })();
    // Initialize Equalizer end

    // FIRST SCREEN ANIMATED
    $(".first-screen-black").addClass("first-screen-black-visible");
    $(".first-screen-main-part-title").addClass("first-screen-main-part-visible");
    $(".presentation-text").addClass("first-screen-main-part-visible");
    $(".idea-birth").addClass("first-screen-main-part-visible");
    $(".underline").addClass("show-underline");

    // showing fixed menu
    (function () {
        var height = $('.first-screen').height();
        $pageContent.scroll(function(){
            if ($(this).scrollTop() >= height) {
                $('.container-fixed').fadeIn();
            } else {
                $('.container-fixed').fadeOut();
            }
        });
    })();

    // stop scrolling
    (function () {
        var height = $('.first-screen').height();
        var hiddenDone = false;
        var $lettersContainer = $(".letters-container")
        var destination = $lettersContainer.offset().top;

        $pageContent.scroll(function(){
            if($pageContent.width() >= 1024){
                if ($(this).scrollTop() >= height) {
                    if (hiddenDone === false) {
                        $('body').addClass('overflow-hidden');
                        console.log(destination + ".letters-container");
                        jQuery("html:not(:animated),body:not(:animated)").animate({
                          scrollTop: destination
                      }, 1500);
                    }
                    hiddenDone = true;
                } else {
                }
            }
        });
    })();

    // change equalizer in bottom line
    (function () {
        var $bottomFixedLine = $('.first-screen-bottom-line');
        var bottomFixedLineHeight = $('.first-screen-bottom-line').height();

        $pageContent.scroll(function(){
            if ($(this).scrollTop() >= bottomFixedLineHeight) {
                $bottomFixedLine.addClass('red-equalizer')
            } else {
                $bottomFixedLine.removeClass('red-equalizer')
            }
        });
    })();


    // SECOND SCREEN ANIMATED
    (function () {
        var $scrollBlock = $('.scroll-filling-active-content');
        var $startPointForLetterAnimation = $('.scroll-filling-active-title').position().top + 240;

        $scrollBlock.scroll(function(){
            var scrollTop = $(this).scrollTop();
            var x = scrollTop * 100 / 240 / 3;
            $('.red-filling').css({"height": x + "%", "max-height": 238 + "px"});

            if (scrollTop >= 672) {
                $('.scroll-filling-text-h2').addClass('scroll-filling-text-h2-hidden');
            } else {
                $('.scroll-filling-text-h2').removeClass('scroll-filling-text-h2-hidden');
            };

            if (scrollTop >= $startPointForLetterAnimation) {
                if ($('.red-filling').height() == 238) {
                    var positionTop = $('.letters-wrp').offset().top - $(window).scrollTop();
                    var positionLeft = $('.letters-wrp').offset().left;
                    $('.letters-wrp')
                        .css({top: positionTop,
                            left: positionLeft})
                        .addClass("letters-wrp-fixed");
                     $('.scroll-filling-text').css("display", "none");
                    $('.scroll-filling-letter-wrp')
                    .addClass('scroll-filling-letter-wrp-show');
                    $('.decor-letter-i').addClass('decor-letter-i-show');
                    $('.decor-letter-o').addClass('decor-letter-o-show');
                    $('.decor-letter-l').addClass('decor-letter-l-show');
                    $('.decor-letter-i2').addClass('decor-letter-i2-show');
                 }
            }
        });
    })();

    // letters fixed
    (function () {
        $('.scroll-filling-letter-wrp').on('transitionend', function (event) {
            if (event.originalEvent.propertyName != 'right') {
                return;
            }
             $(".scroll-filling-letter-wrp").replaceWith("<div class='decor-letter decor-letter-n'>N</div>");

            $('.letters-wrp').offset();
             $('body').removeClass('overflow-hidden');
        });
    })();

    // letters scale
    (function () {
        var Sx;

        var elementStartHeight = $('.letters-container').offset().top + $('.letters-container').height()/4;
        var elementEndHeight = $('.stages-summary').offset().top;
        var elementDeltaHeight = elementEndHeight - elementStartHeight;

        $pageContent.scroll(function () {
            if ($(this).scrollTop() > elementStartHeight && $(this).scrollTop() < elementEndHeight) {
                Sx = 0.2 * ($(this).scrollTop() - elementStartHeight) / elementDeltaHeight + 1;
                Ox = -0.96 * ($(this).scrollTop() - elementStartHeight) / elementDeltaHeight + 1;
                $('.letters-wrp').css({'transform': 'scale('+ Sx + ')', 'opacity': Ox});
            } else if ($(this).scrollTop() > elementEndHeight) {
                $('.letters-wrp').css({'transform': 'scale(1.2)', 'opacity': 0.04});
            } else if ($(this).scrollTop() < elementStartHeight) {
                $('.letters-wrp').css({'transform': 'scale(1)', 'opacity': 1});
            }
        });
    })();

    // scroll to block
    (function () {
        $(".scroll-to-block").click(function (event) {
            var elementClick = $(this).attr("href")
            var destination = $(elementClick).offset().top;
            jQuery("html:not(:animated),body:not(:animated)").animate({
              scrollTop: destination
          }, 1500);
            return false;
        });
    })();

    // scroll up
    (function () {
        $(".logo-block-wrp").click(function (event) {
            jQuery("html:not(:animated),body:not(:animated)").animate({
              scrollTop: 0
          }, 1500);
            return false;
        });
    })();

    // Initialize Parallax
    var rellax = new Rellax('.rellax');

    // animated frame
    (function () {
        var $elementTop = $('.start-for-frame-animation');
        var elementTopHeight = $elementTop.offset().top;
        $pageContent.scroll(function () {
            if ($(this).scrollTop() >= elementTopHeight) {
                $('.framed-block').addClass('show-frame')
            }
        });
    })();

    // MAP SCREEN ANIMATED
    var $elementForShowingMap = $('.results-presentation-title');
    var elementForShowingMapHeight = $elementForShowingMap.offset().top;
    // show block 1
    var $elementForShowingBlock1 = $('.stages-summary h2');
    var elementForShowingBlock1Height = $elementForShowingBlock1.offset().top;
    // show block 2
    var $elementForShowingBlock2 = $('#block-01 h2');
    var elementForShowingBlock2Height = $elementForShowingBlock2.offset().top - 100;
    // show block 3
    var $elementForShowingBlock3 = $('#block-02 h2');
    var elementForShowingBlock3Height = $elementForShowingBlock3.offset().top - 100;
    // show block 4
    var $elementForShowingBlock4 = $('#block-03 h2');
    var elementForShowingBlock4Height = $elementForShowingBlock4.offset().top - 100;
    // show block 5
    var $elementForShowingBlock5 = $('#block-04 h2');
    var elementForShowingBlock5Height = $elementForShowingBlock5.offset().top - 100;


    function init(config) {
        var setClassNameWithDelay = function (element, className, delay, config) {
            if (config.executed) {
                return;
            }
            config.executed = true;
            setTimeout(function () {
                element.addClass(className);
            }, delay);
        };

        var applyConfig = function () {
            var scrollTop = $pageContent.scrollTop();
            config.forEach(function (configForOneItem) {
                if (scrollTop >= configForOneItem.onScrollTop) {
                    setClassNameWithDelay(configForOneItem.element, configForOneItem.classNameForAnimation, configForOneItem.delay, configForOneItem);
                }
            });
        }
        $pageContent.scroll(function () {
            applyConfig();
        });
        applyConfig();
    }

    init([
        {onScrollTop: elementForShowingBlock1Height, element: $('#block-01'), classNameForAnimation: 'end-position-blocks', delay: 0},
        {onScrollTop: elementForShowingBlock2Height, element: $('#block-02'), classNameForAnimation: 'end-position-blocks', delay: 0},
        {onScrollTop: elementForShowingBlock3Height, element: $('#block-03'), classNameForAnimation: 'end-position-blocks', delay: 0},
        {onScrollTop: elementForShowingBlock4Height, element: $('#block-04'), classNameForAnimation: 'end-position-blocks', delay: 0},
        {onScrollTop: elementForShowingBlock5Height, element: $('#block-05'), classNameForAnimation: 'end-position-blocks', delay: 0},

        {onScrollTop: elementForShowingMapHeight, element: $('form'), classNameForAnimation: 'end-position', delay: 0},
        {onScrollTop: elementForShowingMapHeight, element: $('.adress-shape'), classNameForAnimation: 'adress-shape-show', delay: 500},
    ]);



    // POP-UPS OPEN/CLOSE
    var $menuBtn = $('.desctop-version .menu-btn-wrp');
    var $menuPopUp = $('.open-menu');
    var $closePopUp = $('.btn-close-menu');

    var $btnApplication = $('.btn-application');
    var $application = $('.open-application');
    var $btnCloseApplication = $('.btn-close-application');
    var $openForm = $('.open-app-form-wrp');
    var $openThnx = $('.open-thnx-wrp');
    var $btnOrderSendRequestPopUp = $('.form-send-pop-up .btn-order-send-request');
    var $btnOrderSendRequestMap = $('.map-section .btn-order-send-request');

// open/close pop-up menu with dark overlay
    $menuBtn.click(function () {
        $menuPopUp.fadeIn();
    })
    $closePopUp.click(function () {
        $menuPopUp.fadeOut();
    })
// open/close form
    $btnApplication.click(function () {
        $application.fadeIn();
        $openForm.addClass('show-pop-up-block');
        $('body').addClass('overflow-hidden-pop-up');
    })

// open/close thanks message
    $btnOrderSendRequestPopUp.click(function () {
        $openForm.removeClass('show-pop-up-block');
        $openThnx.addClass('show-pop-up-block');
    })
// open/close pop-up with dark overlay
    $btnCloseApplication.click(function () {
        $openForm.removeClass('show-pop-up-block');
        $openThnx.removeClass('show-pop-up-block');
        $application.fadeOut();
        $('body').removeClass('overflow-hidden-pop-up');
    })
    //
    $btnOrderSendRequestMap.click(function () {
        $application.fadeIn();
        $openThnx.addClass('show-pop-up-block');
        $('body').addClass('overflow-hidden-pop-up');
    })


    // MOBILE BEHAVIOR
    // scroll down
        $(".scrollTo").click(function (event) {
            var elementClick = $(this).attr("href")
            var destination = $(elementClick).offset().top;
            jQuery("html:not(:animated),body:not(:animated)").animate({
                scrollTop: destination
            }, 1500);
            return false;
        });

        // showing fixed mobile menu
        var heightMob = $('.first-screen-mob').height() - 50;

        $pageContent.scroll(function(){
            if ($(this).scrollTop() > heightMob) {
                $('.header-block-mob-fixed').fadeIn();
            } else {
                $('.header-block-mob-fixed').fadeOut();
            }
        });

        // SLIDER MOBILE
        (function () {
            var $slidersWrp = $('.slides-wrp-mob');
            var $slider = $('.slide-block-content-mob');
            var $prevBtn = $('.btn-steps-back-mob');
            var $nextBtn = $('.btn-steps-next-mob');
            var $currentSlideNumber = $('.current-step');
            var $slidesNumber = $('.total-step-mob');
            var countSlides = $slidersWrp.children('.slide-block-content-mob').length;
            var slidesArr = [];
            var currentSlideItem;

            $slider.each(function (index) {
                var attrNumber = index + 1;
                attrNumber = '0' + attrNumber;
                $(this).attr({'data-number': attrNumber});
                slidesArr.push($(this));
            });
            $slidesNumber.text(countSlides);
            goToSlide(0);

            function goToSlide(index) {
                currentSlideItem = index;
                $currentSlideNumber.text(currentSlideItem + 1);
                slidesArr.forEach(function (item) {
                    item.removeClass('active');
                });
                slidesArr[currentSlideItem].addClass('active');
            };

            $prevBtn.click(function(){
                var newSlideIndex = currentSlideItem - 1;
                if (newSlideIndex < 0) {
                    newSlideIndex = countSlides - 1;
                }
                goToSlide(newSlideIndex);
            });

            $nextBtn.click(function(){
                var newSlideIndex = currentSlideItem + 1;
                if (newSlideIndex >= countSlides) {
                    newSlideIndex = 0;
                }
                goToSlide(newSlideIndex);
            });
        })();


        // POP-UPS MOBILE
        var $openThnxPopUpMob = $('.open-thnx-popup-mob');
        var $closeFormPopUpMob = $('.form-popup-mob-btn');
        var $btnMobSend = $('.btn-mob-send');

        var $btnOpenMenuMob = $('.btn-open-menu-mob');
        var $menuPopUpMob = $('.open-menu-popup-mob');
        var $btnCloseMenuMob = $('.btn-close-menu-mob');

        $btnMobSend.click(function () {
            $openThnxPopUpMob.addClass('open-thnx-popup-mob-appear')
            $('body').addClass('overflow-hidden-pop-up');
        })
        $closeFormPopUpMob.click(function () {
            $openThnxPopUpMob.removeClass('open-thnx-popup-mob-appear');
            $('body').removeClass('overflow-hidden-pop-up');
        })

        $btnOpenMenuMob.click(function () {
            $menuPopUpMob.addClass('open-menu-popup-mob-appear')
        })
        $btnCloseMenuMob.click(function () {
            $menuPopUpMob.removeClass('open-menu-popup-mob-appear')
        });

});
