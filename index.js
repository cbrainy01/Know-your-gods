

window.addEventListener("DOMContentLoaded", init);

function init() {
    fetch("http://localhost:4000/gods")
    .then( (response) => {return response.json();} )
    .then( (responseData) => {
            const arrayOfGods = responseData;
            //filter through arrayofGods and only pick out the gods who have both parents
            const testPool = arrayOfGods.filter( (profile) => {
                //the god profile meets the criteria if it has both parents. If it meets criteria, it goes in tesPool array
                return profile.father !== "None" && profile.mother !== "None"
                
            } );
            /**when user clicks on start test button, a new div is created. in that div is: a p tag with question
            a form which user types answer in. also questionsGiven is initialized with value of 1
            something which shows answer feedback(if answer was wrong or if time ran out)
            something which prompts user to continue or end test. (if user decides to end test, display test score as percentage
                if not, create another question. also, add one to variable that tracks number of questions(questionsGiven). Also add variable 
                that keeps track of number of questions gotten right.)
            **/ 
            
           
            
        //create element for start button
        const getQuestionButton = document.querySelector("#start-test");
        //add click eventlistener to getQuestionButton
        getQuestionButton.addEventListener("click", createTest);
        function createTest() {
            //create div for question answer form, and continuation option
            const div = document.createElement("div");
            //select section which div will be appended to and append div 
            const testSection = document.querySelector("section.test");
            testSection.appendChild(div);
            const p = document.createElement("p");
            //append p to div
            div.appendChild(p);
            //create random question
            const arraySize = testPool.length;
            const parents = ["mother", "father"];
            const randomParentNum = Math.floor(Math.random() * parents.length);
            const randomgodNum = Math.floor(Math.random() * arraySize);
            const randomGodProfile = testPool[randomgodNum]
            const randomParent = parents[randomParentNum]
            const question =  `Who was the ${randomParent} of ${randomGodProfile.name}?`;
            //set random question as textContent of the p tag
            p.textContent = question;
            //create form for answering question
            const form = document.createElement("form");
            //set id for form
            form.setAttribute("id", "answerbox");
            //create input and button element
            const input = document.createElement("input");
            const submitAnswer = document.createElement("button");
            submitAnswer.textContent = "submit answer"
            submitAnswer.setAttribute("class", "answer-button")
            //append form siblings to form and append form to div
            form.appendChild(input);
            form.appendChild(submitAnswer);
            div.appendChild(form);
            
            
            /*create a tiimeout thing which will make answer field disappear when
            the times up. a bool called tooSlow would equal true. and a message saying
            ran out of time would show up*/
            let tooSlow = false;
            const answerTimer = setTimeout(timeUser, 15000)
            function timeUser() {
                console.log("timerRan");
                form.style.display = "none"
                const timeOutMessage = document.createElement("p");
                timeOutMessage.textContent = "Sorry, you ran out of time";
                div.appendChild(timeOutMessage);
                tooSlow = true;
            }


            //create submit event for form
            form.addEventListener("submit", checkAnswer);
            function checkAnswer(event) {
                event.preventDefault();
                clearTimeout(answerTimer);
                console.log(input.value)
                console.log(randomGodProfile)
                if(input.value === randomGodProfile[randomParent]) {
                    //answer was correct
                    console.log("Congrats, right answer")
                }
            }
            //create verify answer function which takes in the userInput as argument to determine if answer was right
        }  
    } )
    .catch( (error) => {console.log("Error: ", error)} );














}