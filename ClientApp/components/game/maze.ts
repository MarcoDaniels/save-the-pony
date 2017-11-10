import Vue from 'vue';
import { Component } from 'vue-property-decorator';

class MazeData {
    maze_id: string;
}

class MoveResult {
    state: string;
    state_result: string;
}

@Component
export default class MazeComponent extends Vue {
    mazeData: MazeData[] = [];
    moveResult: MoveResult = new MoveResult;
    moveTo: string = '';

    mazeStatus() {
        fetch('api/maze/status')
        .then(response => response.json() as Promise<MazeData[]>)
        .then(data => {
            this.mazeData = data;
        });
    }

    mounted() {
        this.mazeStatus();
    }    

    move(direction: string) {    
        fetch('api/maze/movement/' + direction)
            .then(response => response.json() as Promise<MoveResult>)
            .then(data => { this.moveResult = data; })
            .then(fetch => this.mazeStatus());
            
        this.moveTo = direction;
    }

}
