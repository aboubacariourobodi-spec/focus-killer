let time = 25 * 60;
let timer = null;
let isRunning = false;
const hardcoreCheckbox = document.getElementById("hardcoreMode");
let totalTime = localStorage.getItem("totalTime") || 0;
let sessions = localStorage.getItem("sessions") || 0;

const totalTimeDisplay = document.getElementById("totalTime");
const sessionsDisplay = document.getElementById("sessions");

// afficher au début
totalTimeDisplay.textContent = totalTime;
sessionsDisplay.textContent = sessions;

// récupération du streak sauvegardé
let streak = localStorage.getItem("streak") || 0;

const timerDisplay = document.getElementById("timer");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

// créer affichage streak
const streakDisplay = document.createElement("p");
streakDisplay.textContent = "🔥 Streak : " + streak + " jours";
document.querySelector(".container").appendChild(streakDisplay);

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timerDisplay.textContent = minutes + ":" + seconds;
}

function startTimer() {
  if (isRunning) return;

  timeInitial = time; // 🔥 sauvegarde du temps choisi
  isRunning = true;

  message.textContent = "💪 Travaille maintenant. Pas d’excuse.";

  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;

      // 🔥 réussite → augmenter streak
      streak++;
localStorage.setItem("streak", streak);

// 📊 ajouter stats
sessions++;
totalTime += Math.floor(timeInitial / 60);

localStorage.setItem("sessions", sessions);
localStorage.setItem("totalTime", totalTime);

// update affichage
sessionsDisplay.textContent = sessions;
totalTimeDisplay.textContent = totalTime;

streakDisplay.textContent = "🔥 Streak : " + streak + " jours";
message.textContent = "✅ Bravo ! Session validée.";
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;

  // 🔄 reset du temps à 25 min
  time = 25 * 60;
  updateDisplay();

  // 💀 reset streak
  streak = 0;
  localStorage.setItem("streak", streak);

  streakDisplay.textContent = "🔥 Streak : 0 jour";
  message.textContent = "❌ Tu as abandonné... retour à zéro.";
}



if (startBtn && stopBtn) {
  startBtn.addEventListener("click", startTimer);
  stopBtn.addEventListener("click", stopTimer);
}

updateDisplay();
document.addEventListener("visibilitychange", () => {
  if (document.hidden && isRunning && hardcoreCheckbox.checked) {
    
    clearInterval(timer);
    isRunning = false;

    // reset temps
    time = 25 * 60;
    updateDisplay();

    // reset streak
    streak = 0;
    localStorage.setItem("streak", streak);
    streakDisplay.textContent = "🔥 Streak : 0 jour";

    message.textContent = "💀 Tu as quitté... échec total (Hardcore).";
  }
});
function setTime(minutes) {
  if (isRunning) return; // empêche changement en cours
  
  time = minutes * 60;
  updateDisplay();
  message.textContent = "⏱ Temps réglé à " + minutes + " min";
}

function setCustomTime() {
  if (isRunning) return;

  const input = document.getElementById("customTime").value;

  if (input && input > 0) {
    time = input * 60;
    updateDisplay();
    message.textContent = "⏱ Temps personnalisé : " + input + " min";
  } else {
    message.textContent = "⚠️ Entre un nombre valide";
  }
}