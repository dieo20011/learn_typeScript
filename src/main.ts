import './css/style.css'
import FullList from './model/FullList';
import ListItems from './model/listItems';
import ListTemplate from './templates/ListTemplate';

const initApp = (): void =>{
    const fullList = FullList.instance
    const template = ListTemplate.instance
    
    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement
    itemEntryForm.addEventListener("submit", (event: SubmitEvent):void =>{
        event.preventDefault();// prevent form submission from ref refreshing page

        const input = document.getElementById("newItem") as HTMLInputElement
        const newEntryText: string = input.value.trim()

        if(!newEntryText.length) return

        const itemId: number = fullList.list.length
        ? parseInt(fullList.list[fullList.list.length-1].id) +1 : 1 // create a unique ID for new item

        const newItem = new ListItems(itemId.toString(), newEntryText);

        fullList.addItem(newItem);// add the newitem to fullList

        template.render(fullList);// render update a new list

        input.value = ''; // clear input when submitted
    })
    const clearItem = document.getElementById("clearItemsButton") as HTMLButtonElement

    clearItem.addEventListener('click', ():void =>{
        fullList.clearList();
        template.clear();
    })

    fullList.load()
    template.render(fullList);
}

document.addEventListener("DOMContentLoaded",initApp);