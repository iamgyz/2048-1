
    /*    function pop(){
        while(true){
            $('.row .col').eq(Math.floor(Math.random()*16)).html();
        }
    }*/
        
    $(document).keydown(event=>{
        switch(event.keyCode){
          case 38:
           alert("top");
            break;
          case 40:
           alert("down");
            break;
          case 37:
           alert("left");
            break;
          case 39:
           alert("right");
            break;
        }
        
    })
    //Global listen keydown;

    let myBlock = Array.from(Array(16).keys())    ;
            
    function choose(choices) {
        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
    };
    
    function randomBlock(leftover){

    };


    const initial = ()=>{
            //$('.col').html('');
            let some = choose([2,2,2,4]);
            //$('.row'+rand4()).children('.col'+rand4()).html(some);
            $('.row .col').eq(Math.floor(Math.random()*16)).text(some).addClass('flag');
        };

        
    const main = ()=>{
        initial();
        
    };
    
    
    $(window).ready(
        main()
    
    );
    
    