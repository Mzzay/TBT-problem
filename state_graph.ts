const TORCH_STATE_TIME: number = 12;

interface Person {
    name: string, 
    timeToTravel: number
}

interface PositionState {
    persons: Person[]
}

interface State {
    P1: PositionState;
    P2: PositionState;
    torchTime: number;
}

const initPersons: Person[] = [{ name: "A", timeToTravel: 1}, { name: "B", timeToTravel: 3 }, { name: "C", timeToTravel: 5 }]

const INITIAL_STATE: State = {
    P1: { persons: initPersons }, 
    P2: {  persons: [] },
    torchTime: TORCH_STATE_TIME
}

class GameNode {
    children: GameNode[]; 
    state: State; 
    level: number;

    constructor(state: State, level: number) {
        this.state = state;
        this.level = level +1 ;
        this.children = [];
    }

    filterList(new_list) {
        return [...this.state.P1.persons.filter(p => {
            for (let j = 0; j < new_list.length; j++)
                if (new_list[j].name == p.name)
                    return false;
            return true;
        })]
    }

    alreadyExist(total_list: Person[][], l2: Person[]) {
        return total_list
            .map(l1 => JSON.stringify(l1.sort((a,b) => a.name.localeCompare(b.name))) == JSON.stringify(l2.sort((a,b) => a.name.localeCompare(b.name))))
            .some(e => e == true);
    }

    expand() {
        // generate next state  
        const torch_pos = (this.level + 2) % 2; 
        let peopleAtPos: Person[]; 
        let traveller_list: Person[] = [];

        if (torch_pos == 1) { // torch is at P1
            peopleAtPos = this.state.P1.persons;
            
            for (let i = 0; i < peopleAtPos.length; i++) {
                for (let k = 0; k < peopleAtPos.length; k++) {
                    if (i != k && initPersons.some(person => person.name == peopleAtPos[k].name) && traveller_list.length < 2) {
                        // @ts-ignore
                        traveller_list.push(initPersons.find(person => person.name == peopleAtPos[k].name))
                    }
                }
                
                if (traveller_list.length == 1) {
                    // @ts-ignore
                    traveller_list.push(initPersons.find(person => person.name == peopleAtPos[i].name))
                }
                
                let new_node: GameNode = new GameNode({
                    P1: { persons: this.filterList(traveller_list) },
                    P2: { persons: [ ...this.state.P2.persons, ...traveller_list] },
                    torchTime: this.state.torchTime - Math.max(...traveller_list.map(p => p.timeToTravel))
                }, this.level)
                
                if (new_node.state.torchTime > 0 && !this.alreadyExist(this.children.map(child => child.state.P2.persons), [ ...this.state.P2.persons, ...traveller_list]))
                    this.children.push(new_node);

                traveller_list = [];
            }
        }else { // torch is at P2
            peopleAtPos = this.state.P2.persons;

            for (let i = 0; i < peopleAtPos.length; i++) {
                for (let k = 0; k < peopleAtPos.length; k++) {
                    if (i != k && initPersons.some(person => person.name == peopleAtPos[k].name)) {
                        // @ts-ignore
                        traveller_list.push(initPersons.find(person => person.name == peopleAtPos[k].name))
                    }
                }

                // create node
                let new_node: GameNode = new GameNode({
                    P1: { persons: [ ...this.state.P1.persons, ...traveller_list] },
                    P2: { persons: [ ...peopleAtPos.filter((_,index) => i == index)] },
                    torchTime: this.state.torchTime - Math.max(...traveller_list.map(p => p.timeToTravel))
                }, this.level)

                if (new_node.state.torchTime > 0 && !this.alreadyExist(this.children.map(child => child.state.P1.persons), [ ...this.state.P1.persons, ...traveller_list]))
                    this.children.push(new_node);

                traveller_list = [];
            }
        }

        // expand all children
        this.children.forEach((child: GameNode) => child.expand() );
    }
}

class GameTBT {
    public nodeCount: number = 0; 
    public root: GameNode; 

    constructor() {
        this.root = new GameNode(INITIAL_STATE, 0);
        this.nodeCount++;
    }

    showGraph(node: GameNode) {
        const indent: string = Array(node.level).join("|   ");
        console.log(indent + "P1: [", ...node.state.P1.persons, "] & P2: [", ...node.state.P2.persons, "]: torch time left => ", node.state.torchTime);
        node.children.forEach(child => this.showGraph(child));
    }

    start() {
        console.log("Start expand...");
        this.root.expand();
        this.showGraph(this.root);
    }
}

new GameTBT().start();