(function() {
    function find(array, value) {
        if (array.indexOf) { // если метод существует
            return array.indexOf(value);
        }

        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) return i;
        }

        return -1;
    }
    Number.isInteger = Number.isInteger || function(value) {
    	if(value < -1) {
    		return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    	} 
        return console.log('eror');
    };

    function arrayfindById(arr, name) {
        for (var idx = 0, l = arr.length; idx < l; idx++) {
            if (Number.isInteger(name)) {
                if (arr[idx].id == name) {
                    return idx;
                }
            } else {
                if (arr[idx].name == name) {
                    return idx;
                }
            }
        }
        return console.error('Немогу найти', name, ' в ', arr);
    }
    function arrayfindPush(arr, str, id) {
        var array = [];
        for (var idx = 0, l = arr.length; idx < l; idx++) {
            if (Number.isInteger(id)) {
                if (arr[idx][str] == id) {
                    array.push(arr[idx])
                }
            } else {
                if (arr[idx][str] == id) {
                    array.push(arr[idx])
                }
            }
        }
        return array;
    }

    function App(name) {
        this.student = [];
        this.mentor = [];
        this.task = [];
        this.group = [];
        // Возможные типы 
        var t = ['student', 'mentor', 'task', 'group']
            // Метод добавления
        this._Add = function(type, name) {
            if (find(t, type) != -1) {
                var idx = this[type].length;
                if (type == 'task') {
                    this[type].push({
                        "id": idx,
                        "name": name,
                        "type": arguments[2] && arguments[2] == 'group' ? arguments[2] : 'student',
                        "title": arguments[3] ? arguments[3] : '',
                        "description": arguments[4] ? arguments[4] : ''
                    });
                } else {
                    this[type].push({
                        "id": idx,
                        "name": name
                    });
                }
                return this;
            } else {
                console.error('Можно использовать только ' + t + ' а у вас - ', type);
            }
            return this;
        };
        this._Set = function(type, id, obj) {
            if (find(t, type) != -1 && obj) {
                var idx = arrayfindById(this[type], id);
                if (type == 'task') {
                    this[type][idx].name = obj.name ? obj.name : this[type][idx].name;
                    this[type][idx].title = obj.title ? obj.title : this[type][idx].title;
                    this[type][idx].description = obj.description ? obj.description : this[type][idx].description;
                    if (obj.type && (obj.type == 'group' || obj.type == 'student')) {
                        this[type][idx].type = obj.type;
                    }
                    return this[type][idx];
                } else {
                    this[type][arrayfindById(this[type], id)].name = obj.name ? obj.name : this[type][idx].name;
                    return this[type][idx];
                }
            } else {
                console.error('Ошибка при установке проверьте передаваемые данные');
            }
            return this;
        };
        this._Remove = function(type, id) {
            if (find(t, type) != -1) {
                var idx = arrayfindById(this[type], id);
                this[type].splice(idx, 1);
            }
            return this;
        };
        this._Get = function(type, id) {
            if (find(t, type) != -1) {
                var idx = arrayfindById(this[type], id);
                if (type == 'group') {
                	var stud = arrayfindPush(this.student, "group", idx);
                	return {"stud": stud, "group": this[type][idx]}
                	} 
                return this[type][idx];
            }
            return console.log('Немогу получить');
        };
        this._inviteGroup = function(id, student) {
            if (Number.isInteger(id) && Number.isInteger(student) && id > -1 && student > -1) {
                var idx = arrayfindById(this.group, id);
                var idv = arrayfindById(this.student, student);
                if (idx && idv) {
                    this.student[idv].group = id;
                    return this.student[idv]
                }
            }
            return console.error('Только id! >= 0')
        };
        this._Doer = function(type, id, val) {
        	if (type=='group' || type =='student') {
        		var idx = arrayfindById(this[type], val);
        		var ide = arrayfindById(this.task, id);
        		if (idx == id) {
        			this.task[ide].doer = idx;
        			return this.task;
        		}
        	} 
        	return console.error('Ошибка')
        };
        this._setValue = function(id, val) {
        	if (Number.isInteger(id) && Number.isInteger(val)) {
        		if (val < 5) {
        			var idx = arrayfindById(this.task, id);	
        			var result = idx ? this.task[idx].value = val : '';
        			return result;
        		} 
        		return console.error("Оценка должна быть от 1 до 5");
        	}
        };
        this._RespectMentor = function(who, whom, val) {
        	var student = arrayfindById(this.student, who);	
        	var mentor = arrayfindById(this.mentor, whom);
        	if (Number.isInteger(student) && Number.isInteger(mentor)) {
        		if (typeof this.mentor[mentor].like != 'object') {
        			this.mentor[mentor].like = [];
        		}
        			var id = this.student[student].id;
        			this.mentor[mentor].like.push({
        				student: id,
        				val: val
        			})
        		return this;
        	}
        	return this;
        };
        this._RespectStudent = function(who, whom, val) {
        	var mentor = arrayfindById(this.mentor, who);	
        	var student = arrayfindById(this.student, whom);
        	if (Number.isInteger(student) && Number.isInteger(mentor)) {
        		if (typeof this.student[student].like != 'object') {
        			this.student[student].like = [];
        		}
        			var id = this.mentor[mentor].id;
        			this.student[student].like.push({
        				mentor: id,
        				val: val
        			})
        		return this;
        	}
        	return this;
        };
    }

    var app = new App();
    
    // Для консоли
    window.app = app;

}());
