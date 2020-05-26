window.App = (() => {
    const init = async() => {
        const questionContainer = document.getElementById("question-container");
        const FormModule = window.SurveyModule
       await FormModule.get();
        FormModule.renderList(questionContainer, FormModule.position());
    }

    return {
        init
    }
})()

window.onload = () => {
    window.App.init()
}
