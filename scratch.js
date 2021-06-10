        
        // /*create a tiimeout thing which will make answer field disappear when
        // the times up. a bool called tooSlow would equal true. and a message saying
        // ran out of time would show up*/

        // /**FOREIGN ELEMENTS:
        //  * form (found in createQuestion)
        //  * div (found in createQuestion)
        //  */
        function createTimer() {
             setTimeout(timeUser(form, div), 6000)

            function timeUser(form, div) {
                console.log("timerRan");
                form.style.display = "none" /**(FOREIGN)*/
                const timeOutMessage = document.createElement("p");
                timeOutMessage.textContent = "Sorry, you ran out of time";
                div.appendChild(timeOutMessage); /**(FOREIGN)*/
                
            }
        }

        
        
        /**ask user if they would like to continue test
                 * if they do, you would call the function which creates question 
                 * alongside that will be an option to end the test that will give score as a percentage
                */
        // const endButton = document.createElement("button");
        // div.appendChild(endButton);
        // endButton.textContent = "end test";
        // //add event listener which displays results of test
        // endButton.addEventListener("click", displayResults);
        // function displayResults() {
        //     const testResult = (correctAnswerCount / questionsGiven) * 100 + "%";
        //     const pResult = document.createElement("p");
        //     pResult.textContent = testResult.
        //     div.appendChild(pResult);
        // }


        // function createGrader() {
        // //create submit event for form
        // /**FOREIGN ELEMENTS:
        //  * input (found in createQuestion)
        //  * randomGodProfile (found in createQuestion)
        //  * randomParent (found in createQuestion)
        //  * answerTimer (found in createTimer)
        //  * tooSlow (found in createTimer)
        //  */
        //     //createQuestion(testPool);
           
        //     //unable to access elements in the createQuestion function
        //     //find way to access the elemnts in createQuestion in order to use them in createGrader
        //     console.log("generated question: ", question);
        //         if(input.value === randomGodProfile[randomParent] && tooSlow === false) {
        //             //answer was correct
        //             console.log("Congrats, right answer")
        //             //show answer on page

                    
        //         }
        //         else if(input.value !== randomGodProfile[randomParent] && tooSlow === false) {
        //             console.log(`Wrong answer. Correct answer was ${randomGodProfile[randomParent]}`);
        //         }
        //         /**this is where you would call the function which creates question and judges it */
            
        // }


            /**when user clicks on start test button, a new div is created. in that div is: a p tag with question
            a form which user types answer in. also questionsGiven is initialized with value of 1
            something which shows answer feedback(if answer was wrong or if time ran out)
            something which prompts user to continue or end test. (if user decides to end test, display test score as percentage
                if not, create another question. also, add one to variable that tracks number of questions(questionsGiven). Also add variable 
                that keeps track of number of questions gotten right.)
            **/ 