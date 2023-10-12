import ListItems from "./listItems";

interface List {
    list: ListItems[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItems): void,
    removeItem(id:string): void
}

export default class FullList implements List{

    static instance: FullList = new FullList();

    private constructor(
        private _list: ListItems[] = []
    ) {}

    get list(): ListItems[]{
        return this._list;
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList"); // get list from localStorage

        if(typeof storedList !== "string") return // if list null return nothing
        const parsedList: {_id:string, _item: string, _check: boolean}[]= JSON.parse(storedList);// transform JSON string to object array 

        parsedList.forEach(itemObj=>{
            const newListItem = new ListItems(itemObj._id, itemObj._item, itemObj._check);
            FullList.instance.addItem(newListItem); // add item to list
        })
    }

    save(): void{
        localStorage.setItem("myList", JSON.stringify(this._list));// save list to localstorage as a JSON string
    }

    clearList(): void {
        this._list = [],
        this.save();
    }

    addItem(itemObj: ListItems): void {
        this._list.push(itemObj);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter((item)=> item.id !== id)
        this.save();
    }

}