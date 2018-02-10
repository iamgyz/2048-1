    let myBlock = [ [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]];
    let moveTag = 0;
     /*               
    let myBlock = [ [0,2,4,8],
                    [2,0,0,0],
                    [4,0,4,0],
                    [8,0,2,0]];
                    */
    function checkBox(array1,array2){
      //console.log(array1);
      //console.log(array2);
      for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
          if(array1[i][j]!==array2[i][j]){
            return false;
          }
        }
      }
      return true;
    }

    function checkTheEnd(){
      for(let i=0;i<4;i++){
        for(let j=0;j<3;j++){
          if(myBlock[i][j]===myBlock[i][j+1]){
            return false;
          }
        }
      }
      for(let j=0;j<4;j++){
        for(let i=0;i<3;i++){
          if(myBlock[i][j]===myBlock[i+1][j]){
            return false;
          }
        }
      }
      console.log('GameOver!');
      return true;
    }

    function choose(choices) {
        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
    };

    function transpose(array){
      let res = array[0].map((col, i) => array.map(row => row[i]));
      myBlock = res;
    }
    
    function checkfull(){
      //check full
      for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
          if(myBlock[i][j]===0){
            return false;
          }
        }
      }
      if(checkTheEnd()){
        confirm('You lose!');
        location.reload();
      }
//      console.log('Is that full?'+full);
      return true;
    }

    function pop(){
        //check full
        if(checkfull()===true){
          alert('臭魯蛇');
        }else{
          i = Math.floor(Math.random()*4);
          j = Math.floor(Math.random()*4);
          while(myBlock[i][j]){
            i = Math.floor(Math.random()*4);
            j = Math.floor(Math.random()*4);
          }
          myBlock[i][j]=choose([2,2,2,4,2,2,2]);
          render();
        }
        checkfull();
    };

    const render = ()=>{
      for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){          
          let button = $('.row'+i+' .col'+j);
          if(myBlock[i][j]){
            button.text(myBlock[i][j]);
          }
          else{
            button.text('');
          }
          //render
          switch(myBlock[i][j]){
              case 0:
                button.css({'background-color':'Beige'});
                break;
              case 2: 
                button.css({'background-color':'antiquewhite '});
                break;
              case 4:
                button.css({'background-color':'BurlyWood  '});
                break;
              case 8:
                button.css({'background-color':'Coral  '});
                break;
              case 16:
                button.css({'background-color':'Cyan  '});
                break;
              case 32:
                button.css({'background-color':'DarkOrange  '});
                break;
              case 64:
                button.css({'background-color':'DeepSkyBlue  '});
                break;
              case 128:
                button.css({'background-color':'FloralWhite  '});
                break;
              case 256:
                button.css({'background-color':'Gold  '});
                break;
              case 512:
                button.css({'background-color':'GoldenRod'});
                break;
              case 1024:
              button.css({
                  'background-color':'HotPink'
                });
                //alert('You are win!');
                break;
              case 2048:
                button.css({
                  'background-color':'Pink'
              });
                

                confirm('歡迎加入光明會');
                window.open('https://youtu.be/GRWbIoIR04c')
                location.reload();  
//                location.reload();
                break;
              default:
                button.css({'background-color':'Beige'});
                break;
        }
      }
    }
  }

    const merge = dir=>{
      //dir=1 merge forward
      //dir=2 merge back
      if(dir===1){
        for(let i=0;i<4;i++){
          //[0 2 4 4]
          for(let j=3;j>0;j--){
            if(myBlock[i][j]===0) continue;
            for(let k=j-1;k>=0;k--){
              if(myBlock[i][k]===0) continue;
              if(myBlock[i][j]!==myBlock[i][k]) break;
              if(myBlock[i][j]===myBlock[i][k]){
                console.log('merge')
                console.log('locate : i='+i+' j='+j);
                myBlock[i][j]*=2;
                myBlock[i][k]=0;
                j=k;
                break;
              }
            }
          }
        }
      }else if(dir===2){
        for(let i=0;i<4;i++){
          for(let j=0;j<3;j++){            
            if(myBlock[i][j]===0) continue;
            for(let k=j+1;k<=3;k++){
              if(myBlock[i][k]===0) continue;
              if(myBlock[i][j]!==myBlock[i][k]) break;
              if(myBlock[i][j]===myBlock[i][k]){
                console.log('merge')
                console.log('locate: i='+i+' j='+j);
                myBlock[i][j]*=2;
                myBlock[i][k]=0;
                j=k;
                break;
              }
            }
          }
        }
      }
    }

    const move = dir=>{

      if(dir===1){
        for(let i=0;i<4;i++){
          for(let j=3;j>0;j--){
            if(myBlock[i][j]!==0) continue;
            for(let k=j-1;k>=0;k--){
              if(myBlock[i][k]===0) continue;
              myBlock[i][j]=myBlock[i][k];
              myBlock[i][k]=0;
              break;
            }
          }
        }
      }else if(dir===2){
        for(let i=0;i<4;i++){
          for(let j=0;j<3;j++){
            if(myBlock[i][j]!==0) continue;
            for(let k=j+1;k<=3;k++){
              if(myBlock[i][k]===0) continue;
              myBlock[i][j]=myBlock[i][k];
              myBlock[i][k]=0;
              break;
            }
          }
        }
      }
    }

    function main(){
      let size;
      if(innerWidth>innerHeight){
        size = innerHeight
      }else{
        //$('h1').css('font-size',(innerHeight-innerWidth)/2)
        $('.bigBox').height(innerHeight);
        size = innerWidth
      }
    //   $('.bigBox').css({'width':size+'px','height':size+'px'});

      size-=120;
      //let size1 = size-100;
      $('.box').width(size);
      $('.box').height(size);
      //let w = $('.col').width();
      let w = size/4;
      $('.col').width(w);
      $('.col').height(w);
      $('.col').css('font-size',w*2/5);
      $('.col').css('font-weight','bold');
     // $('.col').css('line-height',w+' px')
      //$('.box').css({'width':size+' px','height':size+' px'});
     // $('h1').css({'width':size+'px','height':'auto'});
      //$('.box').css({'width':size+'px','height':'auto'});
      console.log(size);
      pop();
    }


    $(window).ready(
        main()
      );
    
    let temp;
    $(document).keyup(event=>{
    switch(event.keyCode){
      case 38:
        console.log('up');
        temp = myBlock;
        transpose(myBlock);
        merge(2);
        move(2);
        transpose(myBlock);        
        if(!checkBox(temp,myBlock)){
          pop();
        }else{
          render();
        }
        break;
      case 40:
        console.log("down");
        temp = myBlock;
        transpose(myBlock);
        merge(1);
        move(1);
        transpose(myBlock);
        if(!checkBox(temp,myBlock)){
          pop();
        }else{
          render();
        }
        break;
      case 37:
        console.log("left");
        temp = myBlock;

        transpose(myBlock);
        transpose(myBlock);
        merge(2);
        move(2);
        transpose(myBlock);
        transpose(myBlock);
        if(!checkBox(temp,myBlock)){
          pop();
        }else{
          render();
        }
        break;
      case 39:
        console.log("right");
        temp = myBlock;
        transpose(myBlock);
        transpose(myBlock);
        merge(1);
        move(1);
        transpose(myBlock);
        transpose(myBlock);
        if(!checkBox(temp,myBlock)){
          pop();
        }else{
          render();
        }
        break;
      case 32:
        transpose(myBlock);
        render()
        console.log(myBlock);
        break;
    }
    })