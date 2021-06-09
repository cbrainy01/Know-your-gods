

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
            console.log(testPool);
            /**when user clicks on start test button, a new div is created. in that div is: a p tag with question
            a form which user types answer in. also questionsGiven is initialized with value of 1
            something which shows answer feedback(if answer was wrong or if time ran out)
            something which prompts user to continue or end test. (if user decides to end test, display test score as percentage
                if not, create another question. also, add one to variable that tracks number of questions(questionsGiven). Also add variable 
                that keeps track of number of questions gotten right.)
            **/ 

            
            console.log(randomQuestion(testPool));  
            
          
    } )
    .catch( (error) => {console.log("Error: ", error)} );


             //create function which generates a random question;
                function randomQuestion(profileArray) {
                    const arraySize = profileArray.length;
                    const parents = ["mother", "father"];
                    const randomParentNum = Math.floor(Math.random() * parents.length);
                    const randomgodNum = Math.floor(Math.random() * arraySize);
                    const randomGodProfile = profileArray[randomgodNum]
                    return `Who was the ${parents[randomParentNum]} of ${randomGodProfile.name}?`
                }











}