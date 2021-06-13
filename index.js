

window.addEventListener("DOMContentLoaded", init);

function init() {
    let arrayOfGods;
    let testPool;
    let questionsGiven = 0;
    let gotRightCount = 0;
    let visibleTimer;
    fetch("http://localhost:4000/gods")
    .then( (response) => {return response.json();} )
    .then( (responseData) => {
            godsTrivia(responseData);
            godsDisplay();
         
    } )
    .catch( (error) => {console.log("Error: ", error)} );

    function godsDisplay() {
        /*create search bar which has all gods in a scrollable dropdown.
        when god is clicked, thier profile is displayed on the screen.
        the profile will contain name, picture, father, mother, power, and a delete button*/
        createDropdown();
        
    }

    function createDropdown() {
        const dropdown = document.querySelector("#dropdown-menu");
        let profilePosition = 0;
        arrayOfGods.forEach(profile => {
            const option = document.createElement("option");
            option.textContent = profile.name;
            option.setAttribute("value", profilePosition);
            dropdown.appendChild(option);
           
            profilePosition++
        }); 
           //create change event for each element, whenever element gets selected, its id is taken and used to create a get request
            //that get request displays that
            dropdown.addEventListener("change", (event) => {
                const profileIndex = parseInt(event.target.value, 10);
                displayProfile(profileIndex);
            } ); 
    }

    function displayProfile(profileIndex) {
        //use profile index to get info for selected god and display in its div
        const selectedProfile = arrayOfGods[profileIndex] 
        const container = document.querySelector(".container");
        const landingDiv = document.createElement("div");
        landingDiv.setAttribute("class", "segment");
        //create tags to store god info: p, img, p, p, p
        const showName = document.createElement("p");    
        const showPicture = document.createElement("img");    
        const showPower = document.createElement("p");    
        const showFather = document.createElement("p");    
        const showMother = document.createElement("p");    
        //create variables for god info to display
        const godName = selectedProfile.name;
        const godPicture = selectedProfile.url;
        const godPower = selectedProfile.power;
        const godFather = selectedProfile.father;
        const godMother = selectedProfile.mother;
        //set textContent of tags and attributes of image
        showPicture.setAttribute("src", godPicture);
        showPicture.setAttribute("alt", godName);
        //possibly set attribute for fixed size
        showPicture.setAttribute("width", 425);
        showPicture.setAttribute("height", 417);
        showName.textContent = `${godName}`;
        showPower.textContent = `Power(s)/title(s): ${godPower}`;
        showFather.textContent = `Father: ${godFather}`;
        showMother.textContent = `Mother: ${godMother}`;
        //append tags to landing div
        landingDiv.appendChild(showName);
        landingDiv.appendChild(showPicture);
        landingDiv.appendChild(showPower);
        landingDiv.appendChild(showFather);
        landingDiv.appendChild(showMother);
        //append landing div to container
        container.appendChild(landingDiv);

        //create delete button
        removeButton = document.createElement("button");
        removeButton.textContent = "remove";
        //append button to landing div;
        landingDiv.appendChild(removeButton);
        //add click event listener to button. when clicked, remove() its parent element
        removeButton.addEventListener("click", (event) => {
            event.target.parentElement.remove();

        } );
    }



 //---------------------------------------------------------------------------------------------------------------------------------
    function godsTrivia(responseData) {
        arrayOfGods = responseData;
            //filter through arrayofGods and only pick out the gods who have both parents
                testPool = arrayOfGods.filter( (profile) => {
                //the god profile meets the criteria if it has both parents. If it meets criteria, it goes in testPool array
                return profile.father !== "None" && profile.mother !== "None"
                
            } );
   
                createQuestion(testPool);

    }
 //-----------------------------------------------------------------------------------------------------------------------------------
  
    function createQuestion(testPool) {    
        //create button for question
        const testSection = document.querySelector("section.test");
        const getQuestionButton = document.createElement("button");
        getQuestionButton.textContent = "start";
        testSection.appendChild(getQuestionButton);
        //add click eventlistener to getQuestionButton and hide question button so user cant generate multiple quesions
        getQuestionButton.addEventListener("click",(e) => { 
            showQuestion(testPool);
            getQuestionButton.style.display = "none";
            
        });
    }

    function showQuestion(testPool) {
        questionsGiven++; 
        const testSection = document.querySelector("section.test");
        //create div for question answer form, and continuation option
        const div = document.createElement("div");
        //append div to testsection
        testSection.appendChild(div); /**(FOREIGN)*/
        div.setAttribute("class", "question-div");
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
        const timeUserHas = 8000; /**in milliseconds */
        const timer = setTimeout(timeUser, timeUserHas, form, div, correctAnswer)
                //create countdown timer by using setInterval funcion. setInterval(function, milliseconds);
                const timeUserHasInSeconds = (timeUserHas / 1000) - 1;
                let count = timeUserHasInSeconds;
                countTracker = document.createElement("p");
                showTime = document.createElement("p");
                showTime.textContent = "Time left: ";
                countTracker.textContent = count;
                div.appendChild(showTime);
                div.appendChild(countTracker);
         visibleTimer = setInterval(countDown, 1000, countTracker, div);

        form.addEventListener("submit", (event) => {
             
             event.preventDefault();
             //get whatever user input was and pass into checkAnswer as argument
             const userInput = event.target.querySelector("input").value;
             //make submit answer disappear so user cant resubmit
             submitAnswer.style.display = "none";
             //if user clicks submit button, the questions been answered and theres no need for timers
             clearTimeout(timer);
             clearInterval(visibleTimer);
             checkAnswer(correctAnswer, userInput, div)
            });
        
    }    
 
    function checkAnswer(correctAnswer, userInput, div,) {                
            const feedback = document.createElement("p");
            div.appendChild(feedback);
            if(userInput.toUpperCase() === correctAnswer.toUpperCase()) {
                feedback.textContent = "✅ Correct";
                console.log("answer was correct");    
                //increase count of gotRightCount
                gotRightCount++;
                console.log(questionsGiven);
                console.log(gotRightCount);
                endOrContinue();
            }        
            else if(userInput.toUpperCase() !== correctAnswer.toUpperCase()) {
               //show user what the right answer was
                feedback.textContent = `❌ Incorrect. The right answer was ${correctAnswer}`;
                endOrContinue();
            }
            
    }
    
    function timeUser(form, div, correctAnswer) {
        form.style.display = "none" /**(FOREIGN)*/
        const timeOutMessage = document.createElement("p");
        timeOutMessage.textContent = `⌛ Sorry, you ran out of time. The correct answer was ${correctAnswer}`;
        div.appendChild(timeOutMessage); /**(FOREIGN)*/
        clearInterval(visibleTimer);

        endOrContinue();
    }    

    function countDown(countTracker, div) {
        
        let count = countTracker.textContent;
        let newCount = parseInt(count, 10);
        newCount--;
        countTracker.textContent = newCount;
        div.appendChild(countTracker);
    }
        
    function endOrContinue() {
        //this is where the option for a new game goes.
        //create button for ending test and button for new question
        const endButton = document.createElement("button");
        endButton.textContent = "end test";
        const newQuestion = document.createElement("button");
        newQuestion.textContent = "new question";
        //append these buttons to the test section
        const tSection = document.querySelector(".test");
        tSection.appendChild(newQuestion);
        tSection.appendChild(endButton);
        //add event listeners for buttons
        //for end button, test score will be calculated and displayed. also the new question button will disappear
        endButton.addEventListener("click", testResults);
        function testResults(e) {
            e.target.style.display = "none";
            newQuestion.style.display = "none";
            const score = `${((gotRightCount / questionsGiven) * 100)}%`
            const scoreDisplay = document.createElement("p");
            scoreDisplay.textContent = `Test score: ${score}`;
            tSection.appendChild(scoreDisplay);

            //create button for new test. when you click on that button, 
            const restart = document.createElement("button");
            restart.textContent = "start new test"
            tSection.appendChild(restart);
            restart.addEventListener("click", restartTest);
        }
        newQuestion.addEventListener("click", (event) => { 
            event.target.style.display = "none";
            endButton.style.display = "none";
            getNewQuestion();
        });
        
        function getNewQuestion() {
            showQuestion(testPool);
        }
       
    }   
    
    function restartTest() {
        const tSection = document.querySelector(".test");
        tSection.textContent = "";
        //create p which has the tests guidelines and append to t section
        const guidelines = document.createElement("p");
        guidelines.textContent = "This is the trivia section. You will have 8 seconds to answer each question. Capitalization does not matter but spelling does. Click on the start button to get started"
        tSection.appendChild(guidelines);
        gotRightCount = 0;
        questionsGiven = 0;
        createQuestion(testPool);
    }
  



}

// local server: json-server --watch db.json --port 4000