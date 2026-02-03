$(document).ready(function () {
  var player1 = "";
  var player2 = "";
  var computerName = "Ordinateur 🤖";
  var currentPlayer = "X";
  var currentName = "";
  var gameActive = true;
  var gameState = ["", "", "", "", "", "", "", "", ""];
  var gameMode = "pvp";

  // 📊 Scores
  var scoreP1 = 0;
  var scoreP2 = 0;

  // 🎨 Fond animé
  function initBackgroundColorChange() {
    var colors = ["#f8efd4", "#d4f8ef", "#f8d4d8", "#d8d4f8", "#f7d4f8"];
    setInterval(function () {
      var randomColor = colors[Math.floor(Math.random() * colors.length)];
      $("body").css("background-color", randomColor);
    }, 2000);
  }

  initBackgroundColorChange();

  // 📊 Mise à jour score
  function updateScoreBoard() {
    $("#scoreP1").text(scoreP1);
    $("#scoreP2").text(scoreP2);

    $("#nameP1").text(player1);
    $("#nameP2").text(player2);
  }

  // 🔄 Rejouer
  $(document).on("click", "#replayBtn", function () {
    gameState.fill("");
    $(".box").text("").removeClass("winner");
    gameActive = true;
    currentPlayer = "X";
    currentName = player1;
    $("#statusArea").text("C'est votre tour, " + currentName);
  });

  // 🎯 Clique sur une case
  function handleBoxClicked() {
    var boxIndex = $(this).attr("data-index");

    if (gameState[boxIndex] !== "" || !gameActive) return;

    gameState[boxIndex] = currentPlayer;
    $(this).text(currentPlayer);

    checkForWinner();

    if (gameActive) {
      togglePlayer();

      // 🤖 Tour de l'ordinateur
      if (gameMode === "cpu" && currentPlayer === "O") {
        setTimeout(computerMove, 500);
      }
    }
  }

  // 🏆 Vérifie gagnant
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
      const win = winningConditions[i];
      let a = gameState[win[0]];
      let b = gameState[win[1]];
      let c = gameState[win[2]];

      if (a !== "" && a === b && b === c) {
        gameActive = false;

        // 📊 Incrément score
        if (currentPlayer === "X") {
          scoreP1++;
        } else {
          scoreP2++;
        }
        updateScoreBoard();

        // ✨ Animation gagnante
        win.forEach((index) => {
          $(`.box[data-index='${index}']`).addClass("winner");
        });

        $("#statusArea").html(`
          <h2>🎉 Félicitations ${currentName} !</h2>
          <button id="replayBtn" class="btn-replay">🔄 Rejouer</button>
        `);
        return;
      }
    }

    // 🤝 Match nul
    if (!gameState.includes("")) {
      gameActive = false;
      $("#statusArea").html(`
        <h2>🤝 Match nul !</h2>
        <button id="replayBtn" class="btn-replay">🔄 Rejouer</button>
      `);
    }
  }

  // 🔄 Change joueur
  function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentName = currentPlayer === "X" ? player1 : player2;
    $("#statusArea").text("C'est votre tour, " + currentName);
  }

  // 🤖 IA simple
  function computerMove() {
    if (!gameActive) return;

    var emptyBoxes = [];

    gameState.forEach((val, index) => {
      if (val === "") emptyBoxes.push(index);
    });

    if (emptyBoxes.length === 0) return;

    var randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];

    gameState[randomIndex] = "O";
    $(`.box[data-index='${randomIndex}']`).text("O");

    checkForWinner();

    if (gameActive) {
      togglePlayer();
    }
  }

  // ▶️ Démarrer le jeu
  $("#startGame").click(function () {
    player1 = $("#player1").val() || "Joueur 1";
    gameMode = $("#gameMode").val();

    if (gameMode === "cpu") {
      player2 = computerName;
    } else {
      player2 = $("#player2").val() || "Joueur 2";
    }

    currentPlayer = "X";
    currentName = player1;
    gameActive = true;
    gameState.fill("");
    $(".box").text("").removeClass("winner");

    $("#gameContainer").removeClass("d-none");
    $("#formContainer").addClass("d-none");

    updateScoreBoard();
    $("#statusArea").text("C'est votre tour, " + currentName);
  });

  $(".box").each(function () {
    $(this).click(handleBoxClicked);
  });
});
