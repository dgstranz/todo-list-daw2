(function() {

	var root = this;
	var todos = {};
	var numTodos = 0;
	var id = 0;
	var filter = "all";

	function reset() {
		todos = {};
		numTodos = 0;
		id = 0;
		filter = "all";
	}

	function addTodo(text) {
		var checked = false;
		var creationDate = new Date();
		var todo = {
			getId: (function(myId) {
				return function() {
					return myId;
				};
			}(id)),
			getText: function() {
				return text;
			},
			setText: function(myText) {
				text = myText;
			},
			getChecked: function() {
				return checked;
			},
			setChecked: function(myState) {
				if (myState !== true && myState !== false) {
					throw "Bad state (only true or false are valid values)";
				} else {
					checked = myState;
				}
			},
			getCreationDate: function() {
				return creationDate;
			},
			setCreationDate: function(myDate) {
				creationDate = myDate;
			},
			getCheckedDate: function() {
				return checkedDate;
			},
			setCheckedDate: function(myDate) {
				checkedDate = myDate;
			},
			isVisible: isVisible,
			isDeleted: function() {
				return false;
			}
		};
		todos[id] = todo;
		numTodos++;
		id++;

		return todo;
	}

	function getTodo(id) {
		return todos[id];
	}

	function delTodo(id) {
		var deleted = todos[id];
		deleted.isDeleted = function() {
			return true;
		};
		delete todos[id];
		numTodos--;
		return deleted;
	}

	function modTodo(id, text) {
		todos[id].setText(text);
		return todos[id];
	}

	function checkTodo(id, state) {
		todos[id].setChecked(state);
		if(todos[id].getChecked()) {
			todos[id].setCheckedDate(new Date());
		}
		else {
			todos[id].setCheckedDate(undefined);
		}
		return todos[id];
	}

	function countTodos() {
		return numTodos;
	}

	function toString() {
		var s = "";
		var prop;
		for (prop in todos) {
			if (!s) {
				s += "[";
			} else {
				s += ", ";
			}
			s += "{id: " + todos[prop].getId();
			s += ", checked: " + todos[prop].getChecked();
			s += ", text: " + todos[prop].getText();
			s += ", creationDate: " + todos[prop].getCreationDate();
			if (todos[prop].getCheckedDate()) {
				s += ", checkedDate: " + todos[prop].getCheckedDate();
			}
			s += "}";
		}
		s += "]";
		return s;
	}

	function checkAll(state) {
		var keys = Object.keys(todos);
		for (var i = 0; i < keys.length; i++) {
			checkTodo(keys[i], state);
		}
	}

	function delChecked() {
		var keys = Object.keys(todos);
		for (var i = 0; i < keys.length; i++) {
			if (todos[keys[i]].getChecked()) {
				delTodo(keys[i]);
			}
		}
	}

	function itemsLeft() {
		var left = 0;
		var keys = Object.keys(todos);
		for (var i = 0; i < keys.length; i++) {
			if (!todos[keys[i]].getChecked()) {
				left++;
			}
		}
		return left;
	}

	function isVisible() {
		switch (filter) {
			case "all":
				return true;
			case "active":
				return !this.getChecked();
			case "completed":
				return this.getChecked();
			default:
				return true;
		}
	}

	function filterTodos(newFilter) {
		filter = newFilter;
	}


	root.TODO_APP = {
		addTodo: addTodo,
		getTodo: getTodo,
		delTodo: delTodo,
		modTodo: modTodo,
		checkTodo: checkTodo,
		countTodos: countTodos,
		checkAll: checkAll,
		delChecked: delChecked,
		itemsLeft: itemsLeft,
		filterTodos: filterTodos,
		toString: toString,
		reset: reset
	};

}).call(this);