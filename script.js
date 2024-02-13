const typing_ground = document.querySelector("#text_area");
const btn = document.querySelector("#btn");
const score = document.querySelector("#score");
const show_sentence = document.querySelector("#show-sentence");
const show_time = document.querySelector("#show-time");

let startTime, endTime, totalTimeTaken, sentence_to_write;

let sentences = [
  "good things are going to happens , All power is within you , you can do everything and anything",
  "It was always dangerous to drive with him since he insisted the safety cones were a slalom course.",
  "The boy walked down the street in a carefree way, playing without notice of what was about him.",
  "He didn't hear the sound of the car as his ball careened into the road. He took a step toward it.",
];

const errorChecking = (words) => {
  let num = 0;
  console.log(words);
  sentence_to_write = show_sentence.innerHTML;
  sentence_to_write = sentence_to_write.trim().split(" ");
  console.log(sentence_to_write);
for(let i = 0 ; i <words.length ; i++){
  if(words[i]=== sentence_to_write[i]){
    num++;
  }
}
return num;
};

const calculateTypingSpeed = (time_taken) => {
  let totalWords = typing_ground.value.trim();
  let actualWords = totalWords === "" ? 0 : totalWords.split(" ");
  actualWords = errorChecking(actualWords);

  if (actualWords !== 0) {
    let typing_speed = (actualWords / time_taken) * 60;
    typing_speed = Math.round(typing_speed);
    score.innerHTML = `your typing speed is ${typing_speed} words per minute and you wrote ${actualWords} correct words out of ${sentence_to_write.length} & time taken ${time_taken} sec`;
  } else {
    score.innerHTML = `You haven't write anything`;
  }
};

let intervalID,
  elapsedTime = 0;
const showTimer = () => {
  if (btn.innerText === "Done") {
    intervalID = setInterval(() => {
      elapsedTime++;
      show_time.innerHTML = elapsedTime;
    }, 1000);
  } else if (btn.innerText === "Start") {
    elapsedTime = 0;
    clearInterval(intervalID);
    show_time.innerHTML = "";
  }
};
const startTyping = () => {
  let randomNumber = Math.floor(Math.random() * sentences.length);
  show_sentence.innerHTML = sentences[randomNumber];

  let date = new Date();
  startTime = date.getTime();

  btn.innerText = "Done";
  showTimer();
};

const endTypingTest = () => {
  btn.innerText = "Start";
  showTimer();
  let date = new Date();
  endTime = date.getTime();
  totalTimeTaken = (endTime - startTime) / 1000;
  //    console.log(totalTimeTaken);

  calculateTypingSpeed(totalTimeTaken);
  typing_ground.value = "";
  show_sentence.innerHTML = "";
};

btn.addEventListener("click", (e) => {
  switch (btn.innerText.toLowerCase()) {
    case "start":
      typing_ground.removeAttribute("disabled");
      startTyping();
      break;

    case "done":
      typing_ground.setAttribute("disabled", true);
      endTypingTest();
      break;
  }

  // if(btn.innerText === "Done"){
  //   typing_ground.removeAttribute('disabled')
  //   startTyping();
  // }else if (btn.innerText === "Start"){
  //   typing_ground.setAttribute('disabled')
  //   endTypingTest();
  // }
});
