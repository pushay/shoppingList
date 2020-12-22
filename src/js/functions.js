const formValidate = () => {
    const form = document.getElementById('formId').elements;
    let valid = true;
    let checked = false;

    form.forEach(formElement => {
        if (formElement.type === 'radio' && formElement.checked)
            checked = true;

        if (formElement.type === 'text' || formElement.type === 'number' || formElement.type === 'select-one'){
            if (formElement.value.length === 0)
                valid = false
        }
    })
    if (!checked) valid = false

    if (valid) document.getElementById('buttonId').removeAttribute('disabled') 
    else document.getElementById('buttonId').setAttribute('disabled', 'true');

    return valid;
}
window.formValidate = formValidate

const getForm = () => {
    const valid = formValidate();

    if (valid) {
        const form = document.getElementById('formId').elements;
        const formValues = {}
    
        for (let i=0;i<form.length;i++){
            if (form[i].type === 'radio'){
                if (form[i].checked === true){
                    formValues[form[i].name] = form[i].value;
                }
            }
            if (form[i].type === 'text' || form[i].type === 'number' || form[i].type === 'select-one'){
                formValues[form[i].name] = form[i].value;
            }
        }

        return formValues
    }
}
   

const createCategory = (category) => {
    switch(category){
        case 'fruits':
            return ["fas", "fa-apple-alt"];
        case 'pastries':
            return ["fas" ,"fa-bread-slice"];
        case 'hygieneProducts':
            return ["fas" ,"fa-toilet-paper"];
        case 'meat':
            return ['fas' ,'fa-drumstick-bite'];
        case 'cleaningProducts':
            return ['fas', 'fa-broom'];
        case 'clothes':
            return ['fas' ,'fa-tshirt'];
        case 'drinks':
            return ["fas" ,"fa-coffee"];
        case 'paperProducts':
            return ['fas' ,'fa-book'];
        case 'animalProducts':
            return ['fas', 'fa-dog'];
        case 'electronics':
            return ['fas', 'fa-tv'];        
        default:
            return []
    }
}

const addClasses = (iconsDiv, category, categoryChoice, listElement, frontInfo, bin) => {
    iconsDiv.classList.add('main__iconsContainer');
    listElement.classList.add("list-group-item");
    frontInfo.classList.add('main__frontInfo')
    bin.classList.add('fas', 'fa-trash');

    const categoryChoiceClasses = createCategory(categoryChoice)
    categoryChoiceClasses.map(oneClass => {
        category.classList.add(oneClass);
        return oneClass
    })
}  

const createSingleList = (singleList, index) => {
    const frontInfo = document.createElement('P')
    const frontInfoText = document.createTextNode(`${singleList.quantity} ${singleList.weight} ${singleList.name} `)
    frontInfo.append(frontInfoText);

    const category = document.createElement('SPAN')
    const bin = document.createElement('SPAN')
    bin.id = 'binId'
    bin.setAttribute('onclick', `window.deleteList("${index}");`);

    const iconsDiv = document.createElement('DIV');
    iconsDiv.append(category)
    iconsDiv.append(bin)

    const listElement = document.createElement("LI");
    listElement.append(frontInfo);
    listElement.append(iconsDiv);
    listElement.id = 'singleList' + index;
    
    addClasses(iconsDiv,category, singleList.category, listElement, frontInfo, bin);

    return listElement 
}

const createList = (list) => {
    let createdSingleList;
    const shoppingListContainer = document.getElementById('shoppingListId');
    const shoppingList = document.createElement("UL");
    shoppingList.classList.add("list-group", "main__shoppingList");
    shoppingList.id = 'shoppingListId'
    list.forEach((singleList, index) => {
       createdSingleList = createSingleList(singleList, index)
       createdSingleList.classList.add('main__singleList')
       shoppingList.append(createdSingleList);

    });
    shoppingListContainer.append(shoppingList)
}

const clearList = () => {
    document.getElementById('shoppingListId').innerHTML = '';
    document.getElementById("formId").reset();
}

const saveListOnLocalStorage = (list) => {
    if (list !== undefined){
        window.localStorage.setItem('list', JSON.stringify(list));
    }
}

const countItems  = (list) => {
    if (list.length >0){
        document.getElementById('counterContainer').setAttribute('style','display:block');
    }
    else document.getElementById('counterContainer').setAttribute('style','display:none');
    document.getElementById('counterId').innerHTML = `licznik: ${list.length}`
}


const retrieveListFromLocalStorage = () => {
    const localStorageList = window.localStorage.getItem('list')
    return JSON.parse(localStorageList)
}

const deleteList = (index) => {
    document.getElementById('singleList' + index).remove();
    const storedList = retrieveListFromLocalStorage();
    storedList.splice(index, 1);
    saveListOnLocalStorage(storedList)
    countItems(storedList)
    clearList()
    createList(storedList);
}
window.deleteList = deleteList;

export default {getForm, createList, saveListOnLocalStorage, retrieveListFromLocalStorage, clearList, deleteList, countItems, createCategory, formValidate}