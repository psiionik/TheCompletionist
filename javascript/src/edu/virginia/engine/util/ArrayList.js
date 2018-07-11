"use strict";

/**
 * A very basic arraylist for your convenience
 *
 * */
class ArrayList{

	constructor(){
		this.contents = [];
	}

	/**
	 * add() and push() below both add item to end of the list. Duplicates allowed.
	 */
	add(item){
		this.contents.push(item);
	}
	push(item){this.add(item);}

	/* Size. Self-explanatory */
	size(){
		return this.contents.length;
	}

	/**
	 * Two equivalent methods for getting an item at a specific index
	 */
	itemAt(index){
		return this.contents[index];
	}
	get(index){return this.itemAt(index);}


	/**
	 * Returns the index of the first instance of item found in the list.
	 * otherwise returns -1
	 */
	indexOf(item){

		for	(var i = 0; i < this.contents.length; i++) {
    		if(this.contents[i] == item) return i;
		}
		return -1;
	}

	/* Returns true iff item is in the list somewhere */
	contains(item){return this.indexOf(item) != -1; }

	/* Set item at a specific index */
	set(index, item){
		this.contents[index] = item;
	}

	/* Removes ALL instances of the given item */
	removeIns(item){
		var newContents = [];
		for(var i=0; i<this.contents.length; i++){
			if(this.contents[i] != item)
				newContents.push(this.contents[i]);
		}
		this.contents = newContents;
	}

	/**
 	 * remove the element at a specific index
	 */
	removeAt(index){
		var newContents = [];
		for(var i=0; i<this.contents.length; i++){
			if(i != index)
				newContents.push(this.contents[i]);
		}
		this.contents = newContents;
	}

	print(){
		for(var i=0; i<this.contents.length; i++){
			console.log(this.contents[i] + ", ");
		}
	}

	size(){
		return this.contents.length;
	}

	empty(){
		this.contents = [];
	}
}
