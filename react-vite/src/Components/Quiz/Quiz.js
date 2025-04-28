//quiz source is a JSON object, can use react-quiz-form to generate it
export const sonicQuiz = {
    quizTitle: "Sonic Lore Quiz",
    quizSynopsis: "Test your knowledge about Sonic and Green Hills!",
    progressBarColor: "#0a7832",
    nrOfQuestions: "10",
    questions: [
      {
        question: "Who created Shadow the Hedgehog?",
        questionType: "text",
        answerSelectionType: "single",
        answers: [
          "Dr. Eggman",
          "Gerald Robotnik",
          "Professor Pickle",
          "G.U.N."
        ],
        correctAnswer: "2",
        messageForCorrectAnswer: "Correct! Gerald Robotnik created Shadow.",
        messageForIncorrectAnswer: "Wrong!",
        explanation: "Gerald Robotnik created Shadow as part of Project Shadow.",
        point: "1"
      },
      {
        question: "What is Sonic's favorite food?",
        questionType: "text",
        answerSelectionType: "single",
        answers: [
          "Burger",
          "Fruit",
          "Chili Dog",
          "Doritos"
        ],
        correctAnswer: "3",
        messageForCorrectAnswer: "Correct, he loves devouring them",
        messageForIncorrectAnswer: "Wrong!",
        explanation: "Sonic's favorite food is chili dogs. This was first acknowledged by the Sonic Team and has been a recurring theme in Sonic games and media ever since.",
        point: "1"
      },
      {
        question: "What is the name of Sonic's world?",
        questionType: "text",
        answerSelectionType: "single",
        answers: [
          "Mobius",
          "Earth",
          "Angel Island",
          "The Ark"
        ],
        correctAnswer: "1",
        messageForCorrectAnswer: "You got it!",
        messageForIncorrectAnswer: "Nope! It's Mobius.",
        explanation: "Sonic's adventures mostly take place on Mobius.",
        point: "1"
      },
      {
        question: "Who did Rouge the Bat have a crush on?",
        questionType: "text",
        answerSelectionType: "single",
        answers: [
          "Sonic",
          "Tails",
          "Shadow",
          "Knuckles"
        ],
        correctAnswer: "4",
        messageForCorrectAnswer: "That's right!",
        messageForIncorrectAnswer: "Nope! It's Knuckles :D",
        explanation: "Unbeknownst to Knuckles, Rouge has a crush on him, but she would never admit it.",
        point: "1"
      },
      {
        question: "What is Sonic's fear?",
        questionType: "text",
        answerSelectionType: "single",
        answers: [
          "Dr. Eggman",
          "Shadow",
          "Water",
          "Heights"
        ],
        correctAnswer: "3",
        messageForCorrectAnswer: "Yup!",
        messageForIncorrectAnswer: "Nope!",
        explanation: "Sonic's greatest fear is water, which can be seen when he becomes vulnerable when submerged in water.",
        point: "1"
      },
      {
        question: "What happens when Shadow takes off his rings on his wrist?",
        questionType: "text",
        answerSelectionType: "single",
        answers: [
          "He dies",
          "Nothing, they're just fashion pieces",
          "He teleports",
          "He unlocks his full potential"
        ],
        correctAnswer: "4",
        messageForCorrectAnswer: "That's right!",
        messageForIncorrectAnswer: "Not quite!",
        explanation: "The rings serve as a source of power for Shadow, and by removing them, he unleashes the full extent of his abilities.",
        point: "1"
      },
      {
        question: "What item does Amy often carry as a weapon?",
        questionType: "text",
        answerSelectionType: "single",
        answers: [
          "The Piko Piko Hammer",
          "The Pink Axe",
          "The Heart Bomb",
          "The Boomerang"
        ],
        correctAnswer: "1",
        messageForCorrectAnswer: "Right on!",
        messageForIncorrectAnswer: "Wrong!",
        explanation: "Amy Rose's primary weapon is the Piko Piko Hammer, a large, pink hammer that makes a distinctive 'piko-piko' sound when used.",
        point: "1"
      },
      {
        question: "How did Tails first meet Sonic?",
        questionType: "text",
        answerSelectionType: "single",
        answers: [
          "Tails saved Sonic from Dr. Eggman",
          "Tails was part of Sonic's team from the beginning",
          "Tails was captivated by Sonic's speed and followed him, later being rescued from bullies",
          "Tails accidentally crashed his plane into Sonic’s house"
        ],
        correctAnswer: "3",
        messageForCorrectAnswer: "That's right!",
        messageForIncorrectAnswer: "Not quite!",
        explanation: "During the West Side Island incident, Tails was captivated by Sonic's speed and began to follow him. As depicted in Sonic Origins, their friendship truly blossomed later when Tails was rescued from the torment of two bullies by Sonic.",
        point: "1"
      },
      {
        question: "What do the Chaos Emeralds do when collected?",
        questionType: "text",
        answerSelectionType: "single",
        answers: [
          "Slow down time",
          "Grant powerful transformations",
          "Heal Sonic",
          "Make the world blow up"
        ],
        correctAnswer: "2",
        messageForCorrectAnswer: "Yup!",
        messageForIncorrectAnswer: "Nope!",
        explanation: "Collecting all seven Chaos Emeralds typically grants the character the ability to transform into a Super Form.",
        point: "1"
      },
      {
        question: "Who is Maria?",
        questionType: "text",
        answerSelectionType: "single",
        answers: [
          "The granddaughter of Professor Gerald Robotnik and cousin to Dr. Eggman.",
          "A character who is a member of Team Dark and fights alongside Shadow.",
          "A famous scientist who invented the Chaos Emeralds.",
          "The leader of the G.U.N. organization in the Sonic the Hedgehog series."
        ],
        correctAnswer: "1",
        messageForCorrectAnswer: "Well done!",
        messageForIncorrectAnswer: "Oops, not quite!",
        explanation: "Maria Robotnik was Gerald Robotnik's granddaughter, cousin to Dr. Eggman, befriended Shadow on the ARK, and was killed by a G.U.N. soldier, deeply affecting Shadow’s future.",
        point: "1"
      }
  ]
};