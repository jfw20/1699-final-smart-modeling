var city;

//Class Definitions
class Node{
    constructor(value, edges){
        this.value = value;
        this.edges = edges;
    }
    constructor(edges){
        this.edges = edges;
    }
    constructor(){
        this.edges = [];
    }
}

class Edge{
    constructor(capacity, directed, lNode, rNode){
        this.capacity = capacity;
        this.directed = directed;
        this.lNode = lNode;
        this.rNode = rNode;
    }
}

class Graph{
    constructor(size){
        this.nodes = [];
        generate(size);
    }

    generate(size){
        if(size === 'small' || '1'){
            
        }else if(size === 'medium' || '2'){

        }else if(size === 'large' || '3'){

        }
    }

    addNode(node){
        this.nodes[nodes.length] = node;
    }
}

class City{
    constructor(size){
        Graph = new Graph(size);
    }
}