class Task {

    _id = 0; 
    _status = 'unchecked';
     
    constructor(title,desc) {
        this.title = title;
        this.desc = desc;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        value++;
        this._id = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

}