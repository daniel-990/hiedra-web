$(document).ready(function(){

    $(window).scroll(function(){
        const scroll = $(window).scrollTop();
        const imgLogo = $("#logo");

        const sinDecimales = scroll.toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')
        console.log(sinDecimales);

        if(sinDecimales >= 100.66){
            imgLogo.attr('src','/img/logo/c-01.svg');
        }
        if(sinDecimales <= 100.66){
            imgLogo.attr('src','/img/logo/c-02.svg');
        }
    });

    // $("#gal1").hide();
    // $("#gal2").hide();

    // $("body").hover(function(){
    //     $("#gal1").hide();
    //     $("#gal2").hide();
    // });

    // $(".texto-intro p b a.color-negro").hover(function(){
    //     $("#gal1").show();
    //     $("#gal2").hide();
    // });
    // $(".texto-intro p b.btn2 a").hover(function(){
    //     $("#gal2").show();
    //     $("#gal1").hide();
    // });
});
