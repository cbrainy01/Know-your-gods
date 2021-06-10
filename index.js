

window.addEventListener("DOMContentLoaded", init);

function init() {
    let arrayOfGods;
    fetch("http://localhost:4000/gods")
    .then( (response) => {return response.json();} )
    .then( (responseData) => {
            godsTriviaNDisplay(responseData);
         
    } )
    .catch( (error) => {console.log("Error: ", error)} );

 //---------------------------------------------------------------------------------------------------------------------------------
    function godsTriviaNDisplay(responseData) {
        arrayOfGods = responseData;
            //filter through arrayofGods and only pick out the gods who have both parents
            const testPool = arrayOfGods.filter( (profile) => {
                //the god profile meets the criteria if it has both parents. If it meets criteria, it goes in testPool array
                return profile.father !== "None" && profile.mother !== "None"
                
            } );
            createQuestion(testPool);
    }
 //-----------------------------------------------------------------------------------------------------------------------------------
 /**(FOREIGN)*/
  
    function createQuestion(testPool) {    
            //create button for question
            const testSection = document.querySelector("section.test");
            const getQuestionButton = document.createElement("button");
            getQuestionButton.textContent = "get question";
            testSection.appendChild(getQuestionButton);
            //add click eventlistener to getQuestionButton
            getQuestionButton.addEventListener("click",(e) => showQuestion(testSection, testPool));
    
    }

    function showQuestion(testSection, testPool) {
        //create div for question answer form, and continuation option
        const div = document.createElement("div");
        //append div to testsection
        testSection.appendChild(div); /**(FOREIGN)*/
        //create p for question
        const p = document.createElement("p");
        //append p to div
        div.appendChild(p);
        //create random question
        const arraySize = testPool.length; /**(FOREIGN)*/
        const parents = ["mother", "father"];
        const randomParentNum = Math.floor(Math.random() * parents.length);
        const randomgodNum = Math.floor(Math.random() * arraySize);
        const randomGodProfile = testPool[randomgodNum]
        const randomParent = parents[randomParentNum]
        const question =  `Who was the ${randomParent} of ${randomGodProfile.name}?`;
        //go into selected profile and pick out the right parent n store into correctAnswer variable
        const correctAnswer = randomGodProfile[randomParent];
        //set random question as textContent of the p tag
        p.textContent = question;
        //create form for answering question
        const form = document.createElement("form");
        //set id for form
        form.setAttribute("id", "answerbox");
        //create input and button element
        const input = document.createElement("input");
        const userInput = input.value;
        const submitAnswer = document.createElement("button");
        submitAnswer.textContent = "submit answer"
        submitAnswer.setAttribute("class", "answer-button")
        //append form siblings to form and append form to div
        form.appendChild(input);
        form.appendChild(submitAnswer);
        div.appendChild(form);

        //create timer
        const timer = setTimeout(timeUser, 6000, form, div)

        form.addEventListener("submit", (event) => {event.preventDefault();
             const userInput = event.target.querySelector("input").value;
             submitAnswer.style.display = "none";
             clearTimeout(timer);
              checkAnswer(correctAnswer, userInput)
            });
        
    }    
 
    function checkAnswer(correctAnswer, userInput) {                
            //clearTimeout(timer);

            if(userInput.toUpperCase() === correctAnswer.toUpperCase()) {
                console.log("answer was correct");    
                console.log(userInput.toUpperCase());
                //increase count of gotRightCount
            }        
            else if(userInput.toUpperCase() !== correctAnswer.toUpperCase()) {
                console.log("answer was wrong");
                console.log(userInput.toUpperCase());
                console.log(correctAnswer.toUpperCase());
                //show user what the right answer was
            }
            
        }
    
    function timeUser(form, div) {
        console.log("timerRan");
        form.style.display = "none" /**(FOREIGN)*/
        const timeOutMessage = document.createElement("p");
        timeOutMessage.textContent = "Sorry, you ran out of time";
        div.appendChild(timeOutMessage); /**(FOREIGN)*/
    }    
    

        /**create boolean value which is attached to next question button
         * if user clicks on nextQuestion, that boolean value becomes true
         * we pass that boolean value into a function which creates a new question
         * with a true boolean value, whatever was in the previous section is erased and then we call the createQuestion function
         * inside that function, that boolean value returns to false
         */
        





}