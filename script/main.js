
function insert() { 
    $('body').append('<div class="top"></div>');
        $('.top').append('<div class="menuitem-index"><a href="index.html">Elevation Aotearoa</a></div>');
        $('.top').append('<div class="menuitem"><span><a href="discover.html">Discover Data</a></span></div>');
        $('.top').append('<div class="menuitem"><a href="learn.html">Learn</a></div>');
        $('.top').append('<div class="menuitem"><a href="connect.html">Connect</a></div>');
        $('.top').append('<div class="menuitem"><a href="about.html">About</a></div>');


    $('body').append('<div class="imageholder"></div>');
    $('body').append('<div class="landboxframe"></div>');
        $('.landboxframe').append('<div class="landbox1"></div>');
            $('.landbox1').append('<div class="landbox1inner-left" data-href="https://xycarto.github.io/elevation.aotearoa.proto/discover.html"></div>');
                $('.landbox1inner-left').append('<div class="boxstyle-t">Discover Data</div>');
                $('.landbox1inner-left').append('<div class="boxstyle-b"><p>Some sort of text will go here. This will explain something about the link and what you are about to see.  It will be really cool content. </p></div>');
            $('.landbox1').append('<div class="landbox1inner-middle" data-href="https://xycarto.github.io/elevation.aotearoa.proto/stories.html"></div>');
                $('.landbox1inner-middle').append('<div class="boxstyle-t">Our Stories</div>');
                $('.landbox1inner-middle').append('<div class="boxstyle-b"><p>Some sort of text will go here. This will explain something about the link and what you are about to see.  It will be really cool content. </p></div>');
            $('.landbox1').append('<div class="landbox1inner-right" data-href="https://xycarto.github.io/elevation.aotearoa.proto/learn.html"></div>');
                $('.landbox1inner-right').append('<div class="boxstyle-t">Learn</div>');
                $('.landbox1inner-right').append('<div class="boxstyle-b"><p>Some sort of text will go here. This will explain something about the link and what you are about to see.  It will be really cool content. </p></div>');
        $('.landboxframe').append('<div class="landbox2"></div>');
            $('.landbox2').append('<div class="landbox2inner-left" data-href="https://xycarto.github.io/elevation.aotearoa.proto/connect.html"></div>');
                $('.landbox2inner-left').append('<div class="boxstyle-t">Connect</div>');
                $('.landbox2inner-left').append('<div class="boxstyle-b"><p>Some sort of text will go here. This will explain something about the link and what you are about to see.  It will be really cool content. </p></div>');
            $('.landbox2').append('<div class="landbox2inner-middle" data-href="https://xycarto.github.io/elevation.aotearoa.proto/about.html"></div>');
                $('.landbox2inner-middle').append('<div class="boxstyle-t">About</div>');
                $('.landbox2inner-middle').append('<div class="boxstyle-b"><p>Some sort of text will go here. This will explain something about the link and what you are about to see.  It will be really cool content. </p></div>');
    $('.menu').append('<div class="menuitem"><a href="discover.html">Discover Data</a></div>');
    $('.menu').append('<div class="menuitem"><a href="stories.html">Our Stories</a></div>');
    $('.menu').append('<div class="menuitem"><a href="learn.html">Learn</a></div>');
    $('.menu').append('<div class="menuitem"><a href="connect.html">Connect</a></div>');
    $('.menu').append('<div class="menuitem"><a href="about.html">About</a></div>');

    $(".landbox1inner-left").click(function(){
        window.location = $(this).attr("data-href");
        return false;
    });

    $(".landbox1inner-middle").click(function(){
        window.location = $(this).attr("data-href");
        return false;
    });

    $(".landbox1inner-right").click(function(){
        window.location = $(this).attr("data-href");
        return false;
    });

    $(".landbox2inner-left").click(function(){
        window.location = $(this).attr("data-href");
        return false;
    });

    $(".landbox2inner-middle").click(function(){
        window.location = $(this).attr("data-href");
        return false;
    });


};




    

