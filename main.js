window.onload = function() {
	
var num   		= 0,
	text    	= document.getElementById('text'),
	start    	= document.getElementById('start'),
	input    	= document.getElementById('input'),
	playAgain   = document.getElementById('playAgain'),
	preloader   = document.getElementById('preloader'),
	left    	= document.getElementsByClassName('left')[0],
	inputBlock  = document.getElementsByClassName('inputBlock')[0],
	winText    	= document.getElementsByClassName('winText')[0],
	right    	= document.getElementsByClassName('right')[0],
	title 		= document.getElementsByClassName('title')[0],
	ready 		= document.getElementsByClassName('ready')[0],
	squareBlock = document.getElementsByClassName('squareBlock')[0],
	buttonX 	= document.getElementsByClassName('button')[0],
	buttonO 	= document.getElementsByClassName('button')[1],
	game 		= document.getElementsByClassName('gameBlock')[0],
	lock 		= document.getElementsByClassName('lock')[0],
	winBlock 	= document.getElementsByClassName('winBlock')[0],
	myString  	= "Who starts the game ?",
	myArr     	= myString.split(""),
	buttonBlock = document.getElementsByClassName('buttonBlock')[0];

	start.onclick = function() {
		n = input.value;
 
		if(n < 3 || undefined || '' || n > 80 ){
			return;
		}
		   
	 	n = parseInt(n);

	 	var row = 1,
			column = 1,
			blockSize,
			blocksCount  = n * n,
			parentSize = squareBlock.clientWidth; 
			parentSize = parseInt(parentSize);
			// blockSize = (parentSize / n) - 2 + "px";
			blockSize = (parentSize / n) ;
			blockSize = (blockSize * 100 / parentSize) - 1 + '%';

		for(var i = 0; i < blocksCount; i++) {
			
			if(i === n * row){
				row++;
				column = 1;
			} 
			var blocks = document.createElement('div');
				blocks.setAttribute('class', 'blocks');
				blocks.setAttribute('data-row', row);
				blocks.setAttribute('data-column', column++);

				if(n - row === (n - column) + 1){
					blocks.setAttribute('diagonal_1', 1);
				}
				if(n - (row - 1) === (column) - 1){
					blocks.setAttribute('diagonal_2', 2);
				}
				blocks.style.width = blockSize;
				blocks.style.height = blockSize;
				squareBlock.appendChild(blocks);
		}
		
		for(var i = 1; i <= n; i++){
			var columnElements = document.querySelectorAll('[data-column="'+i+'"]' );
			for(var j = 0; j <= columnElements.length-1; j++) {
				columnElements[j].classList.add('offBorderLeft');
			}
		}

		for(var i = 1; i <= n; i++){
			var rowElements = document.querySelectorAll('[data-row="'+i+'"]' );
			for(var j = 0; j <= rowElements.length-1; j++) {
				rowElements[j].classList.add('offBorderTop');
			}
		}

		var length = columnElements.length-1;
		function removeBorder(elem, len, className) {
			for(var i = len; i !== len - n ; i--) {
				elem[i].classList.add(className);
			} 
		}
		removeBorder(columnElements, length, 'offBorderRight');
		removeBorder(rowElements, length, 'offBorderBottom');
		inputBlock.classList.add('none');
		
		setTimeout(function(){
			frameLooper();
		}, 1000);
	}

	window.onkeydown = function(e) {
		if(e.keyCode === 13) {
			start.click();
		}
	}
	
	var blocks = document.getElementsByClassName('blocks');

	left.onclick = function() {
		Dstart();
		lock.classList.add('unlock');
		squareBlock.classList.add('x-o');
		game.classList.add('gameAdd');
		buttonBlock.style.display = "none";
	};

	right.onclick = function() {
		Istart();
		game.classList.add('gameAdd');
		squareBlock.classList.add('x-o');
		buttonBlock.style.display = "none";
	};


	function Dstart() {
		playAgain.onclick = function() {
			num = 0;
			winBlock.classList.remove('winAdd');
			squareBlock.classList.add('x-o');
			lock.classList.add('unlock');
			firstStep();
		};
	 	var rnd = Math.floor(Math.random() * 9);

	 	function firstStep() {
	 		setTimeout(function(){
	 			blocks[rnd].classList.add('o');
	 			lock.classList.remove('unlock');
	 		}, 1000);
	 	};
	   firstStep();
			
		for(var i = 0; i < blocks.length; i++) {
			blocks[i].onclick = function(event) {
				if( this.classList.contains('x') || this.classList.contains('o') ){
					event.preventDefault();
				}
	
				else{
					num++;
					if(num % 2 == 1) {
						this.classList.add('x');
						lock.classList.add('unlock');
						win_noWin('x', function(winner){
							num = 1.5;
							squareBlock.classList.remove('x-o');
							setTimeout(function (){
								removeClass();
								lock.classList.add('unlock');
								winText.innerHTML = winner + ' is the winner ! ! !';
								showWinner(winBlock, 'winAdd');
							}, 500);

						});
					}
	
					num++;
	
					if( num % 2 == 0) {
	
						var emptyBlocks = new Array();
	
						for(var i = 0; i < blocks.length; i++) {
							if(blocks[i].classList.contains("x") || blocks[i].classList.contains("o")) {
								continue;
							}
							emptyBlocks.push(i);
						}
						
						if(emptyBlocks.length != 0) {
						var
							rnd = Math.floor(Math.random() * emptyBlocks.length),
							rndN = emptyBlocks[rnd];
					
							setTimeout( function(){	

								blocks[rndN].classList.add('o');
								lock.classList.remove('unlock');

								win_noWin('o', function(winner){
									num = 1.5;
									squareBlock.classList.remove('x-o');
									
									setTimeout(function (){

										removeClass();
										winText.innerHTML = winner + ' is the winner ! ! !';
										showWinner(winBlock, 'winAdd');
									}, 500);
								});
							}, 1000);
						}
					}
				}
			}
		}
	}//Dstart function end
	
	
	function Istart() {
		playAgain.onclick = function() {
			squareBlock.classList.add('x-o');
			num = 0;
			winBlock.classList.remove('winAdd');
		};

		for(var i = 0; i < blocks.length; i++) {
			blocks[i].onclick = function(event) {
				var emptyBlocks = new Array();
				if( this.classList.contains('x') || this.classList.contains('o') ){
					event.preventDefault();
				}
		
				else{
					num++;
					if(num % 2 == 1) {		
						this.classList.add('x');
						lock.classList.add('unlock');
						win_noWin('x', function(winner){
							num = 1.5;
							squareBlock.classList.remove('x-o');
							setTimeout(function (){
								removeClass();	
								winText.innerHTML = winner + ' is the winner ! ! !';
								showWinner(winBlock, 'winAdd');
							}, 500);
						});
					}
					num++;
					if( num % 2 == 0) {
						for(var i = 0; i < blocks.length; i++) {
							if(blocks[i].classList.contains("x") || blocks[i].classList.contains("o")) {
								continue;
							}
							emptyBlocks.push(i);	
						}
						if(emptyBlocks.length != 0) {
						var
							rnd = Math.floor(Math.random() * emptyBlocks.length),
							rndN = emptyBlocks[rnd];
						
							setTimeout( function(){	
								blocks[rndN].classList.add('o');
								lock.classList.remove('unlock');
								win_noWin('o', function(winner){
									num = 1.5;
									squareBlock.classList.remove('x-o');
									setTimeout(function (){
										removeClass();	
										winText.innerHTML = winner + ' is the winner ! ! !';
										showWinner(winBlock, 'winAdd');
										
									}, 500);
								});
							}, 1000);
						}
					}
				}
			}
		}
	}; // iStart function end

	function win_noWin(winner, f){
		var existsWinner = false,
		win = 0;

		for(var i = 1; i <= n; i++){
			var rowElements = document.querySelectorAll('[data-row="'+i+'"]' );
				existsWinner = true;
	
			for(var j = 0; j <= rowElements.length - 1; j++) {
	
				if(!(rowElements[j].classList.contains(winner))){
					existsWinner = false;
					break;
				}
			}
	
			if(existsWinner){
		     return  win = f(winner);
		       		
			}
		}
	
		for(var i = 1; i <= n; i++){
			var columnElements = document.querySelectorAll('[data-column="'+i+'"]' );
			existsWinner = true;
			for(var j = 0; j <= columnElements.length-1; j++) {
	
				if(!(columnElements[j].classList.contains(winner))){
					existsWinner = false;
					break;
				}
			}
			if(existsWinner){
	            return win = f(winner);
			}
		}
		
		existsWinner  = true;
		var diagonal_1 = document.querySelectorAll('[diagonal_1]');
		for(var j = 0; j <= diagonal_1.length-1; j++) {
			if(!(diagonal_1[j].classList.contains(winner))){
				existsWinner = false;
				break;
			}
		}
	
		if(existsWinner){
	        return win = f(winner);
		}
	
		existsWinner  = true;
		var diagonal_2 = document.querySelectorAll('[diagonal_2]');
		for(var j = 0; j <= diagonal_2.length-1; j++) {
	
			if(!(diagonal_2[j].classList.contains(winner))){
				existsWinner = false;
				break;
			}
		}
	
		if(existsWinner){
		   	return  win = f(winner);
		}
		existsWinner = true;
	
		for( var i = 0; i < blocks.length; i++ ){ 
			if( !(blocks[i].classList.contains('x')) && !(blocks[i].classList.contains('o')) ) {
				existsWinner = false;
				break;
			}
		}
	
		if(existsWinner){
			if(win === 0){
				num = 1.5;
				setTimeout(function(){
					squareBlock.classList.remove('x-o');
					removeClass();	
					winText.innerHTML = 'No one won ! ! !';
					showWinner(winBlock, 'winAdd');

				},500);
			}
		}
	}; // win_noWin function end

	function showWinner(elem, className){
		setTimeout( function(){
			elem.classList.add(className);
		}, 500);
	}

	function removeClass() {
		for(var i = 0; i < blocks.length; i++) {
			blocks[i].classList.remove('x');
			blocks[i].classList.remove('o');
		}
		lock.classList.remove('unlock');
		num = 0;
	};

	function frameLooper(elem, f) {
		if(myArr.length > 0 ) {
			title.innerHTML += myArr.shift();
		}
		else{
			clearTimeout(loopTimer);
			setTimeout( function() {
				buttonX.classList.add('buttonAdd');
				buttonO.classList.add('buttonAdd');
			}, 500);
		}
		loopTimer = setTimeout(frameLooper, 80);
		return false;
	};

	setTimeout(function() {
		if(!preloader.classList.contains('done')) {
			 preloader.classList.add('done');
			
		}
	}, 1000);

};// window.onload