///<reference path="../../../node_modules/vue-property-decorator/lib/vue-property-decorator.d.ts"/>
import Vue from 'vue';
import axios from 'axios';
import { Component } from 'vue-property-decorator';

class MazeData {
    maze_id: string;
}

class MoveResult {
    state: string;
    state_result: string;
}

class CreateMaze {
    maze_player_name: string;
    maze_width: number;
    maze_height: number;
    difficulty: number;
}

@Component
export default class MazeComponent extends Vue {
    mazeData: MazeData[] = [];
    moveResult: MoveResult = new MoveResult;
    moveTo: string = '';
    created: string = '';

    mazeStatus() {
        // use axios get
        fetch('api/maze/status')
        .then(response => response.json() as Promise<MazeData[]>)
        .then(data => {
            this.mazeData = data;
        });
    }

    mounted() {
        // check if there is a game initiated
        this.mazeStatus();
    }    

    move(direction: string) {    
        // use post for movement
        fetch('api/maze/movement/' + direction)
            .then(response => response.json() as Promise<MoveResult>)
            .then(data => { this.moveResult = data; })
            .then(fetch => this.mazeStatus());
            
        this.moveTo = direction;
    }

    create() {
        let create = new CreateMaze();
        create.difficulty = 1;
        create.maze_height = 15;
        create.maze_width = 25;
        create.maze_player_name = 'Twilight Sparkle';

        axios.post('api/maze/start', create)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        
        this.created = 'yes';
    }

}
