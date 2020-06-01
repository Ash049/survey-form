window.SurveyModule = (() => {
    let surveyQuestions
    let position = 0
    const url = "https://flipkart-survey-mock.now.sh/"
    let surveyQuestionsLength = 0
    const footer = document.getElementById("footer")
    const skipOrContinueButton = document.getElementById("skip-continue-button")

    const getSurveyQuestions = async () => {
        try {
            const response = await fetch(url)
            surveyQuestions = await response.json()
        } catch (e) {
            throw "Internal Server Error";
        }

        surveyQuestionsLength = surveyQuestions.length
        // positon = 0;
    }

    const changePostion = () => {
        position += 1
    }

    const replaceClass = ( className, replaceWith, buttonName ) => {

        if (skipOrContinueButton.classList.contains(className)) {
            skipOrContinueButton.classList.remove(className);
            skipOrContinueButton.classList.add(replaceWith);
            skipOrContinueButton.innerHTML = buttonName;
         } else {
           skipOrContinueButton.classList.add(replaceWith);
         }

    }

    const renderQuestionList = (node, index) => {
        footer.style.display = 'none'
        if (index < surveyQuestionsLength && surveyQuestions[index]) {
            const questionDetail = surveyQuestions[index]
            node.innerHTML = " "

            const questionCount = document.createElement("div")
            questionCount.innerHTML = `Question ${index+1}/${surveyQuestionsLength}`
            

            if (!questionDetail.required) {
                
                const headingContainer = document.createElement("div")
                headingContainer.style.display = "flex"
                headingContainer.style.justifyContent = "space-between"

                const optinalDiv = document.createElement("div")
                optinalDiv.innerHTML = "(Optional)"

                headingContainer.appendChild(questionCount)
                headingContainer.appendChild(optinalDiv)
                node.appendChild(headingContainer)

                replaceClass("continue-button", "skip-button", "Skip");  
                footer.style.display = "block"
            }
            else{
                replaceClass("skip-button", "continue-button", "Continue"); 
                node.appendChild(questionCount)
            }

            const question = document.createElement("div")
            question.innerHTML = questionDetail.question.text
            node.appendChild(question)

            const type = questionDetail.multiSelect ? "checkbox" : "radio"



            //if (questionDetail.multiSelect === false) {
                const ulList = window.utilsModule.questionItem
                  (
                    questionDetail.id,
                    questionDetail.options,
                    type,
                    questionDetail.optionsPerRow,
                    questionDetail.multiSelect,
                    questionDetail.optionType
                )
                node.appendChild(ulList)
        } else {
            if (index === surveyQuestionsLength) {
                node.innerHTML = "";
                const submitPage = window.utilsModule.createSubmitPage();
                node.appendChild(submitPage);
            } else {
                console.log(`Questions detail is not availabe at ${position}`)
            }
        }
    }

    const getPosition = () => {
        return position
    }

    return {
        get: getSurveyQuestions,
        change: changePostion,
        renderList: renderQuestionList,
        position: getPosition,
    }
})()
