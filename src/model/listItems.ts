export interface Item{
    id:string,
    item:string,
    check: boolean
}

export default class ListItems implements Item{
    constructor(
        private _id:string = '',
        private _item:string = '',
        private _check:boolean = false
    ) {}

    get id():string{
        return this._id;
    }

    set id(id:string){
        this._id = id;
    }

    get item():string{
        return this._item;
    }

    set item(item:string){
        this._item = item;
    }

    get check():boolean{
        return this._check;
    }

    set check(check:boolean){
        this._check = check;
    }
}