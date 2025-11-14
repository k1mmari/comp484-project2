$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
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
    var pet_info = {name:"My Pet Name", weight: 10, happiness: 20, love: 10};
  
    function clickedTreatButton() {
      // Increase pet happiness
      // Increase pet weight
      pet_info.happiness += 10;
      pet_info.weight += 5;
      showMessage("Yum! That was tasty 🥕");
      dropFood();
      checkAndUpdatePetInfoInHtml();
    }

    function dropFood() {
      const foods = ["pancakes.png", "brain.png", "apple.png"];  // your image names
      const numDrops = 15;  // how many fall each click

      for (let i = 0; i < numDrops; i++) {
        const randomFood = foods[Math.floor(Math.random() * foods.length)];
        const $food = $("<img>")
        .attr("src", "./images/" + randomFood)
        .addClass("food-drop");

      // random horizontal position
      const randomLeft = Math.random() * window.innerWidth;
      $food.css("left", randomLeft + "px");

      $("body").append($food);

      // remove after animation ends
      setTimeout(() => {
        $food.remove();
      }, 2500);
    }
  }
    
    function clickedPlayButton() {
      // Increase pet happiness
      // Decrease pet weight
      pet_info.happiness += 15;
      pet_info.weight -= 5;
      showMessage("That was fun! 🐇💨");
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      // Decrease pet happiness
      // Decrease pet weight
      const minWeight = 10;

      if (pet_info.weight <= minWeight) {
        showMessage("No, you go exercise");
        pet_info.weight = minWeight; 
      } else {
        pet_info.happiness -= 10;
        pet_info.weight -= 5;
        showMessage("Phew... what a workout! 😅");
  }
      checkAndUpdatePetInfoInHtml();
    }

    function clickedPetButton() {
      pet_info.happiness += 10;
      pet_info.love += 10;
      showMessage("Aww... I love cuddles! 💗🐰");
      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      if (pet_info.weight < 0) pet_info.weight = 0;
      if (pet_info.happiness < 0) pet_info.happiness = 0;
      if (pet_info.love < 0) pet_info.love = 0;
      if (pet_info.weight > 100) pet_info.weight = 100;
      if (pet_info.happiness > 100) pet_info.happiness = 100;
      if (pet_info.love > 100) pet_info.love = 100;
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.love').text(pet_info.love);

      const happinessPercent = Math.min(pet_info.happiness, 100) + '%';
      const weightPercent = Math.min(pet_info.weight, 100) + '%';
      const lovePercent = Math.min(pet_info.love, 100) + '%';

      const bars = $('.stat .fill');
      $(bars[0]).css('width', happinessPercent);
      $(bars[1]).css('width', weightPercent);
      $(bars[2]).css('width', lovePercent);
    }

    function showMessage(msg) {
      $(".pet-message").remove();
      const bubble = $("<div class='pet-message'></div>").text(msg);
      $("main").append(bubble);
      bubble.fadeIn(300).delay(1500).fadeOut(800, function () {
      $(this).remove();
    });
}
  