

      // Make our variables global to the runtime of our application
      var imageChar, imagePlayer, imageEnemy, imageDefender, playerIndex, enemyIndex, defenderIndex;
      var player, defender;
      var enemySelect;
      var wins = 0; losses = 0;
      var selectedCharacters = [];
      var gameOver = false;

      //make character objects
      var characters = [
          {name: 'Dark Helmet', imageSrc: 'assets/images/darkHelmet.jpg', playerHp: 180, playerDamage: 10, playerCounterDamage: 25}, 
          {name: 'Lonestar', imageSrc: 'assets/images/lonestar.jpg', playerHp: 120, playerDamage: 8, playerCounterDamage: 15},
          {name: 'Yogurt', imageSrc: 'assets/images/yogurt.jpg', playerHp: 150, playerDamage: 9, playerCounterDamage: 20},
          {name: 'Barf', imageSrc: 'assets/images/barf.jpg', playerHp: 100, playerDamage: 6, playerCounterDamage: 5}
        ];

        buildCharacters();


      // Use a function to initialize our game or clear for a new round.
      // This way when the user hits clear, we can guarantee a reset of the app.
          function clearPlayArea() {
            $('#playerDiv').empty();
            $('#enemiesDiv').empty();
            $('#defenderDiv').empty();
            $('#buttonDiv').empty();
            $('#playerHeader').empty();
            $('#defenderHeader').empty();
            $('#attackHeader').empty();

            selectedCharacters = [];
            player = '';
            defender = '';
            playerDamage = '';

            buildCharacters();
          }

      //dynamically build the characters into the charactersDiv
      function buildCharacters() {

        $('#charactersHeader').html('CHOOSE A CHARACTER');

        console.log('buildCharacters working');

        for (i = 0; i < characters.length; i++) {
        char = characters[i];
        imageChar = $('<img>');
        imageChar.addClass('imageClass playerClass select'); //assign classes and attributes to the images
        imageChar.attr('src', char.imageSrc);
        imageChar.attr('charIndex', i); //assign a character index number (of characters array) to help
                                        //move the images to the proper div
        $('#charactersDiv').append(imageChar);                      
        }

      }
       //below: build listening events for clicks on the 'select' class
       //this will run the first time an image is clicked, this will select a player, send the player
       //info to the playerDiv, then send the rest of the characters to the enemiesDiv


        $(document).on('click', '.select', function() { 
          $('#charactersDiv').empty(); //empty the characters from the charactersDiv
          $('#charactersHeader').empty();

            playerIndex = parseInt($(this).attr('charIndex')); //identifies the player index as the charIndex attr of
                                                               //'this' image converted to integer          
            selectedCharacters.push(playerIndex); //push the playerIndex to the selectedCharacters array

            console.log('playerIndex ' + playerIndex);
            console.log('selectedCharacters ' + selectedCharacters);

            imagePlayer = $('<img>');                        
            imagePlayer.addClass('playerClass');
            imagePlayer.attr('src', $(this).attr('src'));
            imagePlayer.attr('playerIndex', playerIndex);

                   player = characters[playerIndex];
                   playerHp = player.playerHp;
                   playerDamage = player.playerDamage;
                   playerCD = player.playerCounterDamage;

            $('#playerDiv').append(imagePlayer);
            $('#playerHeader').html('HEALTH  ' + playerHp);
            $('#attackHeader').html('Choose your enemy!!!');

             buildEnemies();
        })


            function buildEnemies() {
             //make a loop below to replace the enemiesDiv with the remaining characters
                $('#enemiesDiv').empty();
                console.log('buildEnemies working');

                for (i = 0; i < characters.length; i++) {
                  //run the below condition if the character index number,'i', is not in the selectedCharacters array
                  if (selectedCharacters.indexOf(i)<0) {    

                    imageEnemy = $('<img>');
                    imageEnemy.addClass('imageClass enemySelect');
                    imageEnemy.attr('src', characters[i].imageSrc);
                    imageEnemy.attr('enemyIndex', i);

                    $('#enemiesDiv').append(imageEnemy);
                  } 
                }
            }


        //this will move the selected enemy to the defender area
        //below: build listening events for clicks on the 'enemySelect' class     
                     
        $(document).on('click', '.enemySelect', function(){  
            console.log('enemySelect clicked'); 
            defenderIndex = parseInt($(this).attr('enemyIndex'));
            selectedCharacters.push(defenderIndex);
            console.log('defenderIndex ' + defenderIndex);
            console.log('selectedCharacters.length ' + selectedCharacters.length);
            imageDefender = $('<img>');
            imageDefender.addClass('defenderClass');
            imageDefender.attr('src', characters[defenderIndex].imageSrc);

            defender = characters[defenderIndex];
            defenderHp = defender.playerHp;
            defenderDamage = defender.playerDamage;
            defenderCD = defender.playerCounterDamage;

            $('#defenderDiv').append(imageDefender);
            $('#defenderHeader').html('HEALTH  ' + defenderHp);
            $('#attackHeader').html('Hit the Attack Button!!!');

            $('#enemiesDiv').empty();
            buildButtons();
        }) 




            $(document).on('click', '.attack', function() {//

                    playerHp -= defenderCD;  //player hit by defender
                    defenderHp -= playerDamage;   // defender hit by player
                    playerDamage += characters[playerIndex].playerDamage;  //players damage points increase every attack by 
                      console.log('playerDamage ' + playerDamage);                                                    //characters damage points

                    $('#playerHeader').html('HEALTH  ' + playerHp);
                    $('#defenderHeader').html('HEALTH  ' + defenderHp);

                    if (playerHp <= 0) {
                      $('#attackHeader').html('YOU LOSE!! GAME OVER');
                      losses++;
                      $('#losses').html(losses);
                      console.log('losses ' + losses);
                      resetOnly();
                    }

                    else if (defenderHp <= 0) {  //

                      if (characters.length == selectedCharacters.length) {
                        $('#defenderDiv').empty();
                        $('#attackHeader').html('YOU WIN!! GAME OVER');
                        $('#defenderHeader').empty();
                        wins++;
                        $('#wins').html(wins);
                       resetOnly();
                      }

                      else {
                      $('#buttonDiv').empty();
                      $('#enemiesDiv').empty();
                      $('#defenderDiv').empty();
                      $('#defenderHeader').empty();
                      $('#attackHeader').html('YOU WIN!! Choose another enemy');
                      buildEnemies();
                      }
                    }
            })
    

              function buildButtons(){

                $('#buttonDiv').empty();

                var attackButton = $('<button>');
                attackButton.addClass('btn btn-danger attack');
                attackButton.text('ATTACK');

                var resetButton = $('<button>');
                resetButton.addClass('reset btn btn-success');
                resetButton.text('NEW ROUND');

                $('#buttonDiv').append(attackButton);
                $('#buttonDiv').append(resetButton);                               
              }

              function resetOnly() {
                var resetButton = $('<button>');
                resetButton.addClass('reset btn btn-success');
                resetButton.text('NEW ROUND');
                $('#buttonDiv').html(resetButton);
              } 

            //new round function when reset is clicked
              $(document).on('click','.reset', function() {
                console.log('reset is clicking');
                clearPlayArea();
              })
                         
