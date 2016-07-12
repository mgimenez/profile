(function(win, doc){
    'use strict';

    var mainNav = doc.querySelector('.main-nav'),
        elemToScroll = doc.body,
        to,
        executed = false,
        skills = doc.querySelector('.skills');

    /**
     * Scroll navigation
     * @function
     * @param {Element} element - Element to scroll, in general document.body
     * @param {Number} to - Offset on pixels of element to where to go
     * @param {Number} duration - Duration on miliseconds of animation
     * 
     */
    function scrollTo(element, to, duration) {
        if (duration < 0) {
            return;
        }
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;

            if (element.scrollTop == to || element.offsetHeight + element.scrollTop + 1 >= element.scrollHeight) {
                return;
            }
            scrollTo(element, to, duration - 10);
        }, 10);
    }

    /**
     * Returns boolean if width screen is less to 960px
     * @function
     * 
     */
    function isMobile() {
        return (screen.width < 960);
    }

    /**
     * Auto animation on skill section
     * @function
     *
     */
    function animationSkills () {

        var skillsLis = doc.querySelectorAll('#skills li'),
            length = skillsLis.length,
            i = 0;

        setInterval(function() {
            if (i < length) {
                if (skillsLis[i].classList.contains('animation')) {
                    skillsLis[i].classList.remove('animation');
                } else {
                    skillsLis[i].classList.add('animation');
                }
                i++;
            } else {
                i = 0;
            }
        }, 1000);
    }
    
    mainNav.addEventListener('click', function(e) {

        if (e.target.nodeName === 'A') {
            e.preventDefault();
            var querySection = e.target.getAttribute('href'),
                sectionElement = doc.querySelector(querySection),
                rest = isMobile() ? 55 : 0;


            to = (sectionElement.id === 'home') ? 0 : sectionElement.offsetTop - rest;

          scrollTo(elemToScroll, to, 500);
        }
    }, false);

    

    /**
     * Sticky header on top for mobile
     */
    win.addEventListener('scroll', function() {
        if (doc.body.scrollTop >= 165) {
            doc.querySelector('.left-panel').classList.add('fixed');
        } else {
            doc.querySelector('.left-panel').classList.remove('fixed');
        }
        
        if (doc.body.scrollTop >= skills.offsetTop - 200) {
            if (!executed) {
                animationSkills();
                executed = true;
            }
        }
    });

    // Start animation when the scroll is in skill section
    doc.querySelector('main').addEventListener('scroll', function(e) {
        if (e.target.scrollTop >= skills.offsetTop - 200) {
            if (!executed) {
                animationSkills();
                executed = true;
            }
        }
    });

}(window, window.document));