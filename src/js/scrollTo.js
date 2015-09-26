(function(win, doc){
    'use strict';

    var mainNav = doc.querySelector(".main-nav"),
        elemToScroll = isMobile() ? doc.body : doc.querySelector("main"),
        to,
        executed = false,
        skills = doc.querySelector('.skills'),
        a = 1;
    
    mainNav.addEventListener("click", function(e) {

        if (e.target.nodeName === 'A') {
            e.preventDefault();
            var querySection = e.target.getAttribute('href'),
                sectionElement = doc.querySelector(querySection),
                rest = isMobile() ? 55 : 0;


            to = (sectionElement.id === 'home') ? 0 : sectionElement.offsetTop - rest;

          scrollTo(elemToScroll, to, 500);
        }
    }, false)

    function scrollTo(element, to, duration) {
        if (duration < 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;

            if (element.scrollTop == to || element.offsetHeight + element.scrollTop + 1 >= element.scrollHeight) return;
            scrollTo(element, to, duration - 10);
        }, 10);
    }

    function isMobile() {
        return (screen.width < 960);
    }

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
    })

    doc.querySelector('main').addEventListener('scroll', function(e) {
        if (e.target.scrollTop >= skills.offsetTop - 200) {
            if (!executed) {
                animationSkills();
                executed = true;
            }
        }
    })


    /**
     * Auto animation on skill section
     */

    function animationSkills () {

        var skillsLis = doc.querySelectorAll('#skills li'),
            length = skillsLis.length,
            i = 0;

        // Random skills
        // setInterval(function(){
        //     var random = getRandomInt(0, skillsLis.length);
        //     skillsLis[random].classList.add('animation');
        //     setTimeout(function(){
        //         skillsLis[random].classList.remove('animation');
        //     },1000)
        // }, 1000)
        
        // function getRandomInt(min, max) {
        //     return Math.floor(Math.random() * (max - min + 1)) + min;
        // }

        setInterval(function() {
            if (i < length) {
                if (skillsLis[i].classList.contains('animation')) {
                    skillsLis[i].classList.remove('animation');
                } else {
                    skillsLis[i].classList.add('animation');
                }
                // setTimeout(function(){
                    //skillsLis[i].classList.remove('animation');
                    //alert()
                // },1000)
                i++;
            } else {
                i = 0;
            }
        }, 1000)
    }



})(window, window.document);