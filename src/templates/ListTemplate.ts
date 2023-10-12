import FullList from "../model/FullList";

interface DOMList{
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {
    ul: HTMLUListElement

    static instance: ListTemplate = new ListTemplate();

    private constructor(){
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = '';
    }

    render(fullList: FullList): void {
        this.clear();// delete list
        fullList.list.forEach(item=>{
            const li = document.createElement("li") as HTMLLIElement //create new element li
            li.className = "item";// set css for li 

            const check = document.createElement("input") as HTMLInputElement // create new element input checkbox
            check.type= "checkbox"; // set checkbox type
            check.id= item.id; // set ID for checbox
            check.tabIndex = 0; // set Tab for checkbox
            check.checked= item.check; // set status for checkbox
            li.append(check); // add checkbox to li element
            
            // add event change for checkbox
            check.addEventListener('change', ()=>{
                item.check = !item.check;// update status of checkbox
                fullList.save();// save list
            })

            const label = document.createElement("label") as HTMLLabelElement;// create new element label
            label.htmlFor = item.id;// set properties HTMLfor for label
            label.textContent = item.item;// set content for label
            li.append(label);// add label to li element

            const button = document.createElement("button") as HTMLButtonElement;// create new element button
            button.className = 'button';// set css for button
            button.textContent = 'X';// set content for button
            li.append(button);// add button to li

            // add event for button
            button.addEventListener('click', ()=>{
                fullList.removeItem(item.id);// delete item from the list
                this.render(fullList);// update list
            })

            this.ul.append(li);// add li to ul
        })
    }

}