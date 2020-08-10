var bord = new Array(9);
    for(var i = 0;i < 9; i++){
          bord[i] = new Array(9);
    }
    

    function solvable(){
        for(var i = 0;i<9;i++){
            for(var j = 0;j<9;j++){
                var x = document.getElementById(`${i}${j}`);
                bord[i][j] = x.value==''?0:parseInt(x.value,10);
            }
        }
        var ans = true;
        for( var i = 0;i<9;i++){
            for(var j = 0;j<9;j++){
                 if(bord[i][j]==0) continue;
                 var val = bord[i][j];
                 bord[i][j] = 0;
                 // i is row
                 // j is col
                 var check = isSafe(bord, i, j, val);
                 bord[i][j] = val;
                 if(check) continue; 
                 ans = false;
                 var x = document.getElementById(`${i}${j}`);
                 x.style.color = 'red';
            }
        }
        if(!ans){
            var message =  document.getElementById('alert');
           message.innerHTML = `<input type="button" value="delete_wrong_entry" onclick="deleteitem()">`;
        }
        return ans;
    }    

    function solve(){
        for(var i = 0;i<9;i++){
            for(var j = 0;j<9;j++){
                var x = document.getElementById(`${i}${j}`);
                bord[i][j] = x.value==''?0:parseInt(x.value,10);
                
            }
        }
        var ans = solvable();
        if(ans){
            SolveSudoku(bord);
            for(var i = 0;i<9;i++){
                for(var j = 0;j<9;j++){
                    var x = document.getElementById(`${i}${j}`);
                        if(x.value==''){
                        x.style.color = 'blue';
                    }
                    x.value = bord[i][j];
                }
            }
        } else {
           var message =  document.getElementById('alert');
           message.innerHTML = `<input type="button" value="delete_wrong_entry" onclick="deleteitem()">`;
        }
    }
    function deleteitem(){
        for(var i = 0;i<9;i++){
            for(var j = 0;j<9;j++){
                var x = document.getElementById(`${i}${j}`);
                if(x.style.color == 'red') {
                    x.value = '';
                    x.style.color = 'black';
                }
            }
        }
    }
    function reset(){
        for(var i = 0;i<9;i++){
            for(var j = 0;j<9;j++){
                var x = document.getElementById(`${i}${j}`);
                x.value = '';
                x.style.color = 'black';
            }
        }
    }

    //
    UNASSIGNED = 0;
    N = 9;
    function SolveSudoku(grid){
            var x  = FindUnassignedLocation(grid);
            if (x==false) return true;
            var row = x.row;
            var col = x.col;
            for (var num = 1; num <= 9; num++)
            {
                if (isSafe(grid, row, col, num))
                {
                    grid[row][col] = num;
                    if (SolveSudoku(grid))
                        return true;
                    grid[row][col] = UNASSIGNED;
                }
            }
            return false;
        }
    function FindUnassignedLocation(grid,location_){
            for (row = 0;row < N;row++)
                for (col = 0;col < N;col++)
                    if (grid[row][col] == UNASSIGNED)
                        return {row,col};
            return false;
        }  
    function UsedInRow(grid, row, num){
            for (var col = 0; col < N; col++)
                if (grid[row][col] == num)
                    return true;
            return false;
        }  
    function UsedInCol(grid, col, num){
            for (var row = 0; row < N; row++)
                if (grid[row][col] == num)
                    return true;
            return false;
        }        
    function UsedInBox(grid, boxStartRow, boxStartCol, num){
            for (var row = 0; row < 3; row++)
                for (var col = 0; col < 3; col++)
                    if (grid[row+boxStartRow][col+boxStartCol] == num)
                        return true;
            return false;
        }  
    function isSafe(grid, row, col, num){
            return !UsedInRow(grid, row, num) && !UsedInCol(grid, col, num) &&
                !UsedInBox(grid, row - row % 3 , col - col % 3, num);
        }  
    //