

     $(document).ready( function () { 

      // Make our variables global to the runtime of our application
      var imageChar, imagePlayer, imageEnemy, imageDefender, playerIndex, enemyIndex, defenderIndex;
      var enemySelect;
      var enemies = [];
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

            $('#attackHeader').append('Choose your enemy!!!')
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


        console.log(playerIndex);
        //this will move the selected enemy to the defender area

        //this will move the selected enemy to the defender area
        //below: build listening events for clicks on the 'enemySelect' class

        $('.enemySelect').on('click', function(){
          console.log('cool');
        defenderIndex = parseInt($(this).attr('enemyIndex'));
        console.log('defenderIndex ' + defenderIndex);
        imageDefender = $('<img>');
        imageDefender.addClass('imageClass');
        imageDefender.attr('src', characters[defenderIndex].imageSrc);

        $('#defenderDiv').append(imageDefender);


        })

      // Add an on click listener to all elements that have the class "reset"
    //  $(".reset").on("click", function() {

        // Call initializeCalculater so we can reset the state of our app
    //    initializeRound();
//
  //    });

      // Call initializeCalculater so we can set the state of our app
     // initializeRound();


             });  


    }) 

