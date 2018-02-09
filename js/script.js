    //Global listen keydown;

    let myBlock = [ [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]];
            
    function choose(choices) {
        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
    };

    function transpose(array){
      array[0].map((col, i) => array.map(row => row[i]));
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
          myBlock[i][j]=choose([2,2,2,4]);
          render();
        }
    };

    const render = ()=>{
      for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
          if(myBlock[i][j]){
          $('.row'+i+' .col'+j).text(myBlock[i][j]);
          }else{
          $('.row'+i+' .col'+j).text('');
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
            }
          }
      }
    };
    }
    $(window).ready(pop());
    
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
        pop();
        break;
      case 37:
        console.log("left");
        merge(2);
        move(2);
        render()
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
        console.log(myBlock);
        break;
    }
    })