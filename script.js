$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
  // make the pet jump when clicked 
  $(".pet-image").on("click", function () {
    const $pet = $(this);
    $pet.addClass("jump");

  // return to original position after 300ms
  setTimeout(() => {
    $pet.removeClass("jump");
    }, 300);
  });
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.pet-button').click(clickedPetButton);
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {
      name:"My Pet Name",
      weight: 10,
      happiness: 20,
      love: 10};
  
    function clickedTreatButton() {
      // Increase pet happiness
      pet_info.happiness += 10;
       // Increase pet weight
      pet_info.weight += 5;
      showMessage("was the brain yours? that's why I'm not full");
      dropImages(["pancakes.png", "apple.png", "brain.png"]);
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      // Decrease pet weight
      // the weight never goes below minWeight
      const minWeight = 10;
      pet_info.weight = Math.max(minWeight, pet_info.weight - 5);
       // Increase pet happiness
      pet_info.happiness += 15;
      
      showMessage("More >:C");
      dropImages(["bear.png", "plane.png", "book.png"]);
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      // Decrease pet weight
      const minWeight = 10;
      pet_info.weight = Math.max(minWeight, pet_info.weight - 5);

      // Decrease pet happiness
      pet_info.happiness -= 10;
      showMessage("Now YOU go exercise");
      dropImages(["jordans.png", "tennis.png", "volleball.png"]);
      checkAndUpdatePetInfoInHtml();
    }

    function clickedPetButton() {
      // Increase pet happiness
      pet_info.happiness += 10;
      // Increase pet love
      pet_info.love += 10;
      showMessage("Don't get too touchy");
      dropImages(["heart.png", "balloon.png", "star.png"]);
      checkAndUpdatePetInfoInHtml();
    }

     // falling food images animation
    function dropImages(images, numDrops = 30) {
      for (let i = 0; i < numDrops; i++) {
        // gotta mutliply by array length cuz Math.random() is useless
        const randomImg = images[Math.floor(Math.random() * images.length)];
        // make <img> a jQuery object
        const $img = $("<img>")
        // .attr() gets the value of an attribute for the first element
        // in the set of matched elements or set one or more attributes for every matched element.
        .attr("src", "./images/" + randomImg)
         // .addClass() adds the specified class(es) to each element in the set of matched elements. 
        .addClass("food-drop");

        // random horizontal position
        const randomLeft = Math.random() * window.innerWidth;
        $img.css("left", randomLeft + "px");

        // random animation delay
        const randomDelay = Math.random() * 1.5;
        $img.css("animation-delay", randomDelay + "s");

        // add to body
        $("body").append($img);

        // remove after animation ends
        setTimeout(() => {
          $img.remove();
          }, 3000 + randomDelay * 1000);
      }
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      // if any stat goes below 0, snap it back to 0
      if (pet_info.weight < 0) pet_info.weight = 0;
      if (pet_info.happiness < 0) pet_info.happiness = 0;
      if (pet_info.love < 0) pet_info.love = 0;

       // if any stat goes above the maximum, cap it at 100
      if (pet_info.weight > 100) pet_info.weight = 100;
      if (pet_info.happiness > 100) pet_info.happiness = 100;
      if (pet_info.love > 100) pet_info.love = 100;
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      // update the old value with new
      // ('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.love').text(pet_info['love']);

      // converting to percentage for bar width
      const happinessPercent = Math.min(pet_info.happiness, 100) + '%';
      const weightPercent = Math.min(pet_info.weight, 100) + '%';
      const lovePercent = Math.min(pet_info.love, 100) + '%';

      // select all the .fill elements inside .stat and update their widths
      const bars = $('.stat .fill');
      $(bars[0]).css('width', happinessPercent);
      $(bars[1]).css('width', weightPercent);
      $(bars[2]).css('width', lovePercent);
    }

    // show the message
    function showMessage(msg) {
      // re,move existing message first
      $(".pet-message").remove();
      const bubble = $("<div class='pet-message'></div>").text(msg);
      $("main").append(bubble);
      bubble.fadeIn(300).delay(1500).fadeOut(800, function () {
      $(bubble).remove();
    });
}
  