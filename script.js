class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 1; i <= this.collection.length; i++) {
                if (element[1] < this.collection[i - 1][1]) {
                    this.collection.splice(i - 1, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    }

    dequeue() {
        const value = this.collection.shift();
        return value;
    }

    isEmpty() {
        return (this.collection.length === 0);
    }
}

function dijkstra(graph, start) {
    const distances = {};
    const pq = new PriorityQueue();
    const visited = new Set();

    for (let vertex in graph) {
        if (vertex === start) {
            distances[vertex] = 0;
            pq.enqueue([vertex, 0]);
        } else {
            distances[vertex] = Infinity;
        }
    }

    while (!pq.isEmpty()) {
        const [currentVertex, currentDistance] = pq.dequeue();
        visited.add(currentVertex);

        for (let neighbor in graph[currentVertex]) {
            if (!visited.has(neighbor)) {
                const newDistance = currentDistance + graph[currentVertex][neighbor];
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    pq.enqueue([neighbor, newDistance]);
                }
            }
        }
    }

    return distances;
}

const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

console.log(dijkstra(graph, 'A'));
