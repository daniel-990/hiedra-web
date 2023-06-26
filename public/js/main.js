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
});
