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
      let full = true;
      for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
          if(myBlock[i][j]===0){
            full=false;
            return false;
          }
        }
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
                button.css({'background-color':'GoldenRod  '});
                break;
              case 1024:
                button.css({'background-color':'HotPink  '});
                //alert('You are win!');
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
      let temp = myBlock;

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
      if(innerWidth>innerHeight){size = innerHeight
      }else{size = innerWidth}

      $('.bigBox').css({'width':size+'px','height':size+'px'});

      console.log(size);
      pop();
    }


    $(window).ready(
        main()
      );
    
    $(document).keyup(event=>{
    switch(event.keyCode){
      case 38:
        console.log('up');
        transpose(myBlock);
        merge(2);
        move(2);
        transpose(myBlock);
        render();
        pop();
        break;
      case 40:
        console.log("down");
        transpose(myBlock);
        merge(1);
        move(1);
        transpose(myBlock);
        render();
        pop();
        break;
      case 37:
        console.log("left");
        merge(2);
        move(2);
        render();
        pop();
        break;
      case 39:
        console.log("right");
        merge(1);
        move(1);
        render();
        pop();
        break;
      case 32:
        transpose(myBlock);
        render()
        console.log(myBlock);
        break;
    }
    })