class Tab {
    hide () {
        document.getElementById(this.divId ()).style.display = "none";
    }
    
    show () {
        document.getElementById(this.divId ()).style.display = "";
    }
    
    divId () {
        //abstract:
    }
}

class NewGameTab extends Tab {
    
}
