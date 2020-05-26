const questionULlist = document.getElementById("question-container")
const footer = document.getElementById("footer")
const skipOrContinueButton = document.getElementById("skip-continue-button")
const FormModule = window.SurveyModule
const response = {}
//const submitButton = document.getElementById("submit-button")

questionULlist.addEventListener("click", (event) => {
    if (event.target.tagName === "INPUT") {
        footer.style.display = "block"
        skipOrContinueButton.classList.toggle("skip-button")
        skipOrContinueButton.innerHTML = "Continue"
    }
})

skipOrContinueButton.addEventListener("click", (e) => {
    const selectedOptions = document.querySelectorAll(
        "input[name=optionsForGivenQuestion]:checked"
    )
    if (selectedOptions.length) {
        let allValues = []

        for (let i = 0; i < selectedOptions.length; i++) {
            allValues.push(selectedOptions[i].value)
        }
        response[selectedOptions[0].class] = allValues
    }
    FormModule.change()
    FormModule.renderList(questionULlist, FormModule.position())
})

const submitButton =  () => {
    console.log("Response", JSON.stringify(response))
};
