function load(){
    const logo = document.getElementById('logo');
    const spinner = document.getElementById('spinner');
    const fade = document.getElementsByClassName('container-load-page')[0];

    logo.fin = function(){
        spinner.setAttribute('style', 'opacity: 1');
        spinner.fin = function(){
            fade.setAttribute('style', 'opacity:0');
            setTimeout(function(){
                fade.remove();
                init();
            },500);
        };
        spinner.load();
    };
    logo.load();
}
function trial(){
    const feaure = document.getElementById('feature');
    Trial(feaure).within({
        distance: 1080,
        cord: 'center'
    }, function(distance, el, event){
        function getOffset(el) {
            var _x = 0;
            var _y = 0;
            while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                _x += el.offsetLeft - el.scrollLeft + el.offsetHeight/4;
                _y += el.offsetTop - el.scrollTop + el.offsetHeight/4;
                el = el.offsetParent;
            }
            return { top: _y, left: _x };
        }

        const tx = (event.clientX - getOffset(feature).left)/25;
        const ty = (event.clientY - getOffset(feature).top)/25;

        feature.setAttribute('style', 'transition-duration:0.24s; transform: rotateY(' + parseInt(tx)/3 + 'deg) translate(' + tx + 'px, ' + ty + 'px);')
        feature.children[feature.children.length - 1].setAttribute('style','transition-duration:0.24s; transform: translate(' + 2*tx + 'px, ' + 2*ty + 'px);');
    });
}
function sections(){
    const sections = Array.prototype.slice.call(document.getElementsByClassName('section')[0].getElementsByTagName('div'));
    const indicator = document.getElementsByClassName('section')[0].getElementsByTagName('hr')[0];

    indicator.setAttribute('style','width:' + sections[0].offsetWidth + 'px;transition-duration:0.5s;left:' + (0) + 'px');
    for(var i = 0; i < sections.length; i++){
        sections[i].addEventListener('click', function(event){
            let length = 0;
            for(var j = 0; j < sections.indexOf(this); j++){
                length = length + sections[j].offsetWidth;
            }

            anime({
                targets: indicator,
                duration: 250,
                left: length + sections.indexOf(this)*32,
                width: this.offsetWidth
            });
        });
    }
}
function menu(){
    const menu = document.getElementById('menu-icon');
    const back = document.getElementById('menu');
    const items = back.getElementsByTagName('tkt-h');

    menu.addEventListener('click', function(){
        if(this.state === 'open'){

            for(var j = 0; j < items.length; j++){
                const item = items[j];
                setTimeout(function(){item.out();}, 150*(j));
            }
            setTimeout(function(){back.setAttribute('style', 'top:-418px; right:-418px;transition-duration:0.75s;');}, 400);
        }else{
            back.setAttribute('style', 'top:-18px; right:-18px; transition-duration:0.75s;');
            for(var i = 0; i < items.length; i++){
                const item = items[i];
                setTimeout(function(){item.anim();}, 100*(i));
            }
        }
    });
    for(var k = 0; k < items.length; k++){
        const item = items[k];
        setTimeout(function(){item.out();}, 150*(k) + 1000);
    }
}
function scroll(){
    var body = document.body;
    var index = 0;
    var previous = null;

    var MouseWheelHandler = _.throttle(function(x) {
        // these codes make it so `delta` return 1 for up and -1 for down in any browser exclude Safari.
        var e = window.event || x;
        // delta is the direction of the scroll event
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        // to cancel the normal scrolling behavior
        e.preventDefault();

        // this is meant to cancel the normal scrolling behavior. Doesn't work here...
        const container = document.getElementsByClassName('container-page')[index - delta];
        if(container === undefined){
            return null;
        }else{
            previous = index;
            index = index - delta;
            outro(index, previous);
        }

        //
        return false;
    }, 1280, {trailing: false});

    if (body.addEventListener) {
        // IE9, Chrome, Safari, Opera
        body.addEventListener("mousewheel", MouseWheelHandler, false);
        // Firefox
        body.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
        // IE 6~8
    } else body.attachEvent("onmousewheel", MouseWheelHandler);
}
function outro(index, previous){
    const hs = Array.prototype.slice.call( document.getElementsByTagName('tkt-h'), 0 );
    const ps = Array.prototype.slice.call( document.getElementsByTagName('tkt-p'), 0 );
    const tickets = Array.prototype.slice.call( document.getElementsByTagName('tkt-ticket'), 0 );
    const blobs = Array.prototype.slice.call( document.getElementsByTagName('tkt-blob-image'), 0 );

    const section = document.getElementsByClassName('section')[0];

    const containers = document.getElementsByClassName('container-page');
    try{containers[previous].getElementsByTagName('tkt-back-image')[0].outro();}catch(e){}

    function animation(){
        for(var i = 0; i < hs.length; i++){
            const item = hs[i];
            setTimeout(function(){item.out();},0*i);
        }
        for(var j = 0; j < ps.length; j++){
            const item = ps[j];
            setTimeout(function(){item.out();},100*j);
        }
        for(var k = 0; k < tickets.length; k++){
            const item = tickets[k];
            setTimeout(function(){item.out();},100*k);
        }
        for(var l = 0; l < blobs.length; l++){
            const item = blobs[l];
            setTimeout(function(){item.out();},100*l);
        }
        setTimeout(function(){
            intro(index);
        },hs.length*100);

        section.setAttribute('style','transform:translate(0px, 64px); transition-duration:0.5s;');

        setTimeout(function(){
            const containers = document.getElementsByClassName('container-page');
            for(var i = 0; i < containers.length; i++){
                containers[i].setAttribute('style', 'transform:translate(-' + (100*index) + 'vw)');
            }
            index > 0 ? containers[index].setAttribute('style', 'z-index:-1;transform:translate(-' + (100*index) + 'vw)')
            : containers[index].setAttribute('style', 'z-index:1;transform:translate(-' + (100*index) + 'vw)');

            try{containers[index].getElementsByTagName('tkt-back-image')[0].intro();}catch(e){}
        }, 1000);
    }
    if(containers[index].getElementsByTagName('tkt-back-image')[0]){
        setTimeout(animation(),1000);
    }else{
        animation();
    }
}
function intro(index){
    const container = document.getElementsByClassName('container-page')[index];

    if(container === undefined)
        return;

    const ps = Array.prototype.slice.call( container.getElementsByTagName('tkt-p'), 0 );
    const hs = Array.prototype.slice.call( container.getElementsByTagName('tkt-h'), 0 );
    const tickets = Array.prototype.slice.call( container.getElementsByTagName('tkt-ticket'), 0 );
    const blobs = Array.prototype.slice.call( container.getElementsByTagName('tkt-blob-image'));

    const section = container.getElementsByClassName('section')[0];

    for(var i = 0; i < hs.length; i++){
        const item = hs[i];
        item.anim();
    }
    for(var j = 0; j < ps.length; j++){
        const item = ps[j];
        item.anim();
    }
    for(var k = 0; k < tickets.length; k++){
        const item = tickets[k];
        setTimeout(function(){item.anim();},50*k);
    }
    for(var l = 0; l < blobs.length; l++){
        const item = blobs[l];
        setTimeout(function(){item.introduce();},50*l);
    }

    if(section) section.setAttribute('style','');

    const containers = document.getElementsByClassName('container-page');
    for(var i = 0; i < containers.length; i++){
        containers[i].setAttribute('style', 'transform:translate(-' + (100*index) + 'vw)');
    }
}

function init(){
    const ps = Array.prototype.slice.call( document.getElementsByTagName('tkt-p'), 0 );
    const hs = Array.prototype.slice.call( document.getElementsByTagName('tkt-h'), 0 );
    const tickets = Array.prototype.slice.call( document.getElementsByTagName('tkt-ticket'), 0 );
    const images = Array.prototype.slice.call( document.getElementsByTagName('tkt-blob-image'));

    for(var i = 0; i < hs.length; i++){
        const item = hs[i];
        setTimeout(function(){
            item.anim();

            if(hs.indexOf(item) === (hs.length - 1)){
                for(var j = 0; j < ps.length; j++){
                    const item = ps[j];
                    setTimeout(function(){item.anim();}, 200*(j + 1));
                }
            }
        }, 160*i);
    }
    for(var k = 0; k < tickets.length; k++){
        const item = tickets[k];
        setTimeout(function(){item.anim();}, 320*(k + 1));
    }
    for(var l = 0; l < images.length; l++){
        const item = images[l];
        setTimeout(function(){item.introduce();}, 320*(l + 1));
    }

    trial();
    sections();
    menu();
    scroll();
}

(function(){
    window.onload = function(){
        load();
    }
})();
