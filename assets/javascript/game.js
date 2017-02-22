

     $(document).ready( function () { 

      // Make our variables global to the runtime of our application
      var imageChar, imagePlayer, imageEnemy, imageDefender, playerIndex, enemyIndex, defenderIndex;
      var player, defender;
      var enemySelect;
      var enemies = [];
      var wins = 0; losses = 0;
      //make character objects
      var characters = [
          {name: 'Dark Helmet', imageSrc: 'assets/images/darkHelmet.jpg', playerHp: 180, playerDamage: 10, playerCounterDamage: 25}, 
          {name: 'Lonestar', imageSrc: 'assets/images/lonestar.jpg', playerHp: 120, playerDamage: 8, playerCounterDamage: 15},
          {name: 'Yogurt', imageSrc: 'assets/images/yogurt.jpg', playerHp: 150, playerDamage: 9, playerCounterDamage: 20},
          {name: 'Barf', imageSrc: 'assets/images/barf.jpg', playerHp: 100, playerDamage: 6, playerCounterDamage: 5}
        ];


      // Use a function to initialize our game or clear for a new round.
      // This way when the user hits clear, we can guarantee a reset of the app.
          function initializeRound() {
            player = '';
            defender = '';
            $('#playerDiv').empty();
          }


      //dynamically build the characters into the charactersDiv
        for (i = 0; i < characters.length; i++) {
        char = characters[i];
        imageChar = $('<img>');
        imageChar.addClass('imageClass select'); //assign classes and attributes to the images
        imageChar.attr('src', char.imageSrc);
        imageChar.attr('charIndex', i); //assign a character index number (of characters array) to help
       
        $('#charactersDiv').append(imageChar);                      //move the images to the proper div
        }

       //below: build listening events for clicks on the 'select' class
       //this will run the first time an image is clicked, this will select a player, send the player
       //info to the playerDiv, then send the rest of the characters to the enemiesDiv

        $('.select').on('click', function() {

          $('#charactersDiv').empty(); //empty the characters from the charactersDiv

            playerIndex = parseInt($(this).attr('charIndex')); //identifies the player index as the charIndex attr of
            imagePlayer = $('<img>');                      //'this' image converted to integer  
            imagePlayer.addClass('imageClass');
            imagePlayer.attr('src', $(this).attr('src'));
            imagePlayer.attr('playerIndex', playerIndex);

            console.log('playerIndex ' + playerIndex);

            $('#playerHeader').append('Your Character');

            $('#playerDiv').append(imagePlayer);

            $('#attackHeader').append('Choose your enemy!!!');
            $('#enemiesHeader').append('Enemies Available to Attack');



                for (i = 0; i < characters.length; i++) {
                  if (i !== playerIndex) {    //go through the image builder for the 'other' index numbers

                  imageEnemy = $('<img>');
                  imageEnemy.addClass('imageClass enemySelect');
                  imageEnemy.attr('src', characters[i].imageSrc);
                  imageEnemy.attr('enemyIndex', i);

                 $('#enemiesDiv').append(imageEnemy);
                  } 
                }


        //this will move the selected enemy to the defender area
        //this will move the selected enemy to the defender area
        //below: build listening events for clicks on the 'enemySelect' class
        
        
        $('.enemySelect').on('click', function(){
        defenderIndex = parseInt($(this).attr('enemyIndex'));
        console.log('defenderIndex ' + defenderIndex);
        imageDefender = $('<img>');
        imageDefender.addClass('imageClass');
        imageDefender.attr('src', characters[defenderIndex].imageSrc);

        $('#defenderDiv').append(imageDefender);
        $('#attackHeader').html('Hit the Attack Button!!!');


       
        //make a loop below to replace the enemiesDiv with the remaining characters
                $('#enemiesDiv').empty();

                for (i = 0; i < characters.length; i++) {
                  if (i !== playerIndex && i !== defenderIndex) {    

                    imageEnemy = $('<img>');
                    imageEnemy.addClass('imageClass enemySelect');
                    imageEnemy.attr('src', characters[i].imageSrc);
                    imageEnemy.attr('enemyIndex', i);

                    $('#enemiesDiv').append(imageEnemy);
                  } 
                }

       //below will be the section for events happening after the attack button is pushed

                   var player = characters[playerIndex];
                   var playerHp = player.playerHp;
                   var playerDamage = player.playerDamage;
                   var playerCD = player.playerCounterDamage;

                   var defender = characters[defenderIndex];
                   var defenderHp = defender.playerHp;
                   var defenderDamage = defender.playerDamage;
                   var defenderCD = defender.playerCounterDamage;



               $('.attack').on('click', function() {
                //set the fight area variables to avoid changing the character array


                    playerHp -= defenderCD;  //player hit by defender
                    defenderHp -= playerDamage;   // defender hit by player
                    playerDamage += characters[playerIndex].playerDamage;  //players damage points incr-
                                                                                                      //ease every attack by charact-
                    console.log(playerHp);                                                     //ers damage points

                    if (playerHp <= 0) {
                      $('#attackHeader').html('YOU LOSE!! GAME OVER');
                      losses++
                      console.log('losses ' + losses);
                    }

                    else if (defenderHp <= 0) {
                      $('#defenderDiv').empty();
                      $('#attackHeader').html('YOU WIN!! SELECT ANOTHER PLAYER')
                      wins++
                    
                               //defender select events from above
                                $('.enemySelect').on('click', function(){
                                defenderIndex2 = parseInt($(this).attr('enemyIndex'));
                                console.log('defenderIndex2 ' + defenderIndex2);
                                imageDefender = $('<img>');
                                imageDefender.addClass('imageClass');
                                imageDefender.attr('src', characters[defenderIndex2].imageSrc);
                                $('#defenderDiv').append(imageDefender);
                                $('#attackHeader').html('Hit the Attack Button!!!');                               
                                        $('#enemiesDiv').empty();
                                        for (i = 0; i < characters.length; i++) {
                                          if (i !== defenderIndex && i !== defenderIndex2 && i !== playerIndex) {    
                                            imageEnemy = $('<img>');
                                            imageEnemy.addClass('imageClass enemySelect');
                                            imageEnemy.attr('src', characters[i].imageSrc);
                                            imageEnemy.attr('enemyIndex', i);
                                            $('#enemiesDiv').append(imageEnemy);
                                          } 
                                        }
                              defender = characters[defenderIndex];
                              defenderHp = defender.playerHp;
                              defenderDamage = defender.playerDamage;
                              defenderCD = defender.playerCounterDamage;
                                  
                             $('.attack').on('click', function() {
                              playerHp -= defenderCD;  //player hit by defender
                              defenderHp -= playerDamage;   // defender hit by player
                              playerDamage += characters[playerIndex].playerDamage;  

                              if (playerHp <= 0) {
                                $('#attackHeader').html('YOU LOSE!! GAME OVER');
                                losses++
                                console.log('losses ' + losses);
                              }
                              else if (defenderHp <= 0) {
                                $('#defenderDiv').empty();
                                $('#attackHeader').html('YOU WIN!! SELECT ANOTHER PLAYER')
                                wins++
                  /////////
                                                 //defender select events from above
                                $('.enemySelect').on('click', function(){
                                defenderIndex3 = parseInt($(this).attr('enemyIndex'));
                                console.log('defenderIndex3 ' + defenderIndex3);
                                imageDefender = $('<img>');
                                imageDefender.addClass('imageClass');
                                imageDefender.attr('src', characters[defenderIndex3].imageSrc);
                                $('#defenderDiv').append(imageDefender);
                                $('#attackHeader').html('Hit the Attack Button!!!');                               
                                        $('#enemiesDiv').empty();
                                        for (i = 0; i < characters.length; i++) {
                                if (i !== defenderIndex && i !== defenderIndex2 && i !== defenderIndex3 && i !== playerIndex) {    
                                            imageEnemy = $('<img>');
                                            imageEnemy.addClass('imageClass enemySelect');
                                            imageEnemy.attr('src', characters[i].imageSrc);
                                            imageEnemy.attr('enemyIndex', i);
                                            $('#enemiesDiv').append(imageEnemy);
                                          } 
                                        }
                              defender = characters[defenderIndex];
                              defenderHp = defender.playerHp;
                              defenderDamage = defender.playerDamage;
                              defenderCD = defender.playerCounterDamage;
                                  
                             $('.attack').on('click', function() {
                              playerHp -= defenderCD;  //player hit by defender
                              defenderHp -= playerDamage;   // defender hit by player
                              playerDamage += characters[playerIndex].playerDamage;  

                              if (playerHp <= 0) {
                                $('#attackHeader').html('YOU LOSE!! GAME OVER');
                                losses++
                                console.log('losses ' + losses);
                              }
                              else if (defenderHp <= 0) {
                                $('#defenderDiv').empty();
                                $('#attackHeader').html('YOU WIN!! GAME OVER')
                                wins++

                                var resetButton = $('<button>');
                                resetButton.addClass('reset btn btn-primary');
                                resetButton.text('RESET');
                                $('#attackHeader').html(resetButton);

                                $('.reset').on('click', function () {
                                  initializeRound();
                                })




                              }
                            })
                           })





                    }
                  })
                  })
                 }
               })

        })
      

      });  


    }) 


                              
