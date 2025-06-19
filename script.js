$(document).ready(function () {
  var player1 = "";
  var player2 = "";
  var currentPlayer = "X";
  var currentName = "";
  var gameActive = true;
  var gameState = ["", "", "", "", "", "", "", "", ""];

  function initBackgroundColorChange() {
    var colors = ["#f8efd4", "#d4f8ef", "#f8d4d8", "#d8d4f8", "#f7d4f8"];
    setInterval(function () {
      var randomColor = colors[Math.floor(Math.random() * colors.length)];
      $("body").css("background-color", randomColor);
    }, 2000);
  }

  initBackgroundColorChange();

  function handleBoxClicked() {
    var boxIndex = $(this).attr("data-index");

    if (gameState[boxIndex] !== "" || !gameActive) {
      return;
    }

    gameState[boxIndex] = currentPlayer;
    $(this).text(currentPlayer);

    checkForWinner();
    if (gameActive) {
      togglePlayer();
    }
  }

  function checkForWinner() {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a !== "" && a === b && b === c) {
        gameActive = false;
        $("#statusArea").text(
          "Félicitations, " + currentName + ", vous avez gagné!"
        );
        return;
      }
    }

    if (!gameState.includes("")) {
      $("#statusArea").text("Match nul! Voulez-vous rejouer?");
      gameActive = false;
      return;
    }
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentName = currentPlayer === "X" ? player1 : player2;
    $("#statusArea").text("C'est votre tour, " + currentName);
  }

  $("#startGame").click(function () {
    player1 = $("#player1").val() || "Joueur 1";
    player2 = $("#player2").val() || "Joueur 2";
    currentPlayer = "X";
    currentName = player1;
    gameActive = true;
    gameState.fill("");
    $(".box").text("");
    $("#gameContainer").removeClass("d-none");
    $("#formContainer").addClass("d-none");
    $("#statusArea").text("C'est votre tour, " + currentName);
  });

  $(".box").each(function () {
    $(this).click(handleBoxClicked);
  });
});
