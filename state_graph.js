var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TORCH_STATE_TIME = 12;
var initPersons = [{ name: "A", timeToTravel: 1 }, { name: "B", timeToTravel: 3 }, { name: "C", timeToTravel: 5 }];
var INITIAL_STATE = {
    P1: { persons: initPersons },
    P2: { persons: [] },
    torchTime: TORCH_STATE_TIME
};
var GameNode = /** @class */ (function () {
    function GameNode(state, level) {
        this.state = state;
        this.level = level + 1;
        this.children = [];
    }
    GameNode.prototype.filterList = function (new_list) {
        return __spreadArray([], this.state.P1.persons.filter(function (p) {
            for (var j = 0; j < new_list.length; j++)
                if (new_list[j].name == p.name)
                    return false;
            return true;
        }), true);
    };
    GameNode.prototype.alreadyExist = function (total_list, l2) {
        return total_list
            .map(function (l1) { return JSON.stringify(l1.sort(function (a, b) { return a.name.localeCompare(b.name); })) == JSON.stringify(l2.sort(function (a, b) { return a.name.localeCompare(b.name); })); })
            .some(function (e) { return e == true; });
    };
    GameNode.prototype.expand = function () {
        // generate next state  
        var torch_pos = (this.level + 2) % 2;
        var peopleAtPos;
        var traveller_list = [];
        if (torch_pos == 1) { // torch is at P1
            peopleAtPos = this.state.P1.persons;
            var _loop_1 = function (i) {
                var _loop_3 = function (k) {
                    if (i != k && initPersons.some(function (person) { return person.name == peopleAtPos[k].name; }) && traveller_list.length < 2) {
                        // @ts-ignore
                        traveller_list.push(initPersons.find(function (person) { return person.name == peopleAtPos[k].name; }));
                    }
                };
                for (var k = 0; k < peopleAtPos.length; k++) {
                    _loop_3(k);
                }
                if (traveller_list.length == 1) {
                    // @ts-ignore
                    traveller_list.push(initPersons.find(function (person) { return person.name == peopleAtPos[i].name; }));
                }
                var new_node = new GameNode({
                    P1: { persons: this_1.filterList(traveller_list) },
                    P2: { persons: __spreadArray(__spreadArray([], this_1.state.P2.persons, true), traveller_list, true) },
                    torchTime: this_1.state.torchTime - Math.max.apply(Math, traveller_list.map(function (p) { return p.timeToTravel; }))
                }, this_1.level);
                if (new_node.state.torchTime > 0 && !this_1.alreadyExist(this_1.children.map(function (child) { return child.state.P2.persons; }), __spreadArray(__spreadArray([], this_1.state.P2.persons, true), traveller_list, true)))
                    this_1.children.push(new_node);
                traveller_list = [];
            };
            var this_1 = this;
            for (var i = 0; i < peopleAtPos.length; i++) {
                _loop_1(i);
            }
        }
        else { // torch is at P2
            peopleAtPos = this.state.P2.persons;
            var _loop_2 = function (i) {
                var _loop_4 = function (k) {
                    if (i != k && initPersons.some(function (person) { return person.name == peopleAtPos[k].name; })) {
                        // @ts-ignore
                        traveller_list.push(initPersons.find(function (person) { return person.name == peopleAtPos[k].name; }));
                    }
                };
                for (var k = 0; k < peopleAtPos.length; k++) {
                    _loop_4(k);
                }
                // create node
                var new_node = new GameNode({
                    P1: { persons: __spreadArray(__spreadArray([], this_2.state.P1.persons, true), traveller_list, true) },
                    P2: { persons: __spreadArray([], peopleAtPos.filter(function (_, index) { return i == index; }), true) },
                    torchTime: this_2.state.torchTime - Math.max.apply(Math, traveller_list.map(function (p) { return p.timeToTravel; }))
                }, this_2.level);
                if (new_node.state.torchTime > 0 && !this_2.alreadyExist(this_2.children.map(function (child) { return child.state.P1.persons; }), __spreadArray(__spreadArray([], this_2.state.P1.persons, true), traveller_list, true)))
                    this_2.children.push(new_node);
                traveller_list = [];
            };
            var this_2 = this;
            for (var i = 0; i < peopleAtPos.length; i++) {
                _loop_2(i);
            }
        }
        // expand all children
        this.children.forEach(function (child) { return child.expand(); });
    };
    return GameNode;
}());
var GameTBT = /** @class */ (function () {
    function GameTBT() {
        this.nodeCount = 0;
        this.root = new GameNode(INITIAL_STATE, 0);
        this.nodeCount++;
    }
    GameTBT.prototype.showGraph = function (node) {
        var _this = this;
        var indent = Array(node.level).join("|   ");
        console.log.apply(console, __spreadArray(__spreadArray(__spreadArray(__spreadArray([indent + "P1: ["], node.state.P1.persons, false), ["] & P2: ["], false), node.state.P2.persons, false), ["]: torch time left => ", node.state.torchTime], false));
        node.children.forEach(function (child) { return _this.showGraph(child); });
    };
    GameTBT.prototype.start = function () {
        console.log("Start expand...");
        this.root.expand();
        this.showGraph(this.root);
    };
    return GameTBT;
}());
new GameTBT().start();
