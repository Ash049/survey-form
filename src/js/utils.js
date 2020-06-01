window.utilsModule = (() => {

    const questionItem = (id, options, type, itemPerRow, multiSelect, optionType) => {
    
        const listContainer = document.createElement("ul");
    
    if(itemPerRow === 2){
        listContainer.style.gridTemplateRows = "repeat(2,1fr)";
        listContainer.style.gridTemplateColumns = "repeat(2,1fr)";
    }
   
    options.forEach((element, index) => {
        const listItem = document.createElement("li");
        const label = document.createElement("label");
        const inputElement = document.createElement("input");
        inputElement.type = type;
        inputElement.name = "optionsForGivenQuestion";
        inputElement.value = element.value;
        inputElement.id = element.value
        inputElement.class = id;
        label.setAttribute("for",element.value);
        label.appendChild(document.createTextNode(element.label.text));
        if(optionType === "image_text"){
            const image = document.createElement('img');
            image.src = element.img.src;
           listItem.appendChild(image);
        }
        listItem.appendChild(inputElement);
        listItem.appendChild(label);
        listContainer.appendChild(listItem);
    })

    return listContainer;
}

const createSubmitPage = () => {
    const submitDiv = document.createElement("div");
    submitDiv.id = "submit-page";

    const submitButton = document.createElement("button");
    submitButton.id = "submit-button"
    submitButton.innerHTML = "Submit";
    submitButton.setAttribute("onclick","window.eventModule.submitButton()");

    submitDiv.appendChild(submitButton);
    return submitDiv;

}
return {
    questionItem: questionItem,
    createSubmitPage: createSubmitPage
}
})();