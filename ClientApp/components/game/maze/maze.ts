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

@Component({
    name: 'Maze',
    props: ['mazeId'],
})
export default class MazeComponent extends Vue {
    mazeData: MazeData = new MazeData;
    moveResult: MoveResult = new MoveResult;

    created() {
        window.addEventListener('keydown', this.keyDown);
    }
    
    mounted() {
        // check if we have the id before anythig
        if (this.$props.mazeId) {
            this.mazeData.maze_id = this.$props.mazeId;
            this.getMazeData();
        }
    }

    /**
     * listens to key down and moves pony
     * @param $event
     */
    keyDown($event: any) {
        let key = $event.keyCode;
        switch (key) {
            case 38: { // up key
                this.movePony('north');
                break;
            }
            case 40: { // down key
                this.movePony('south');
                break;
            }
            case 37: { // left key
                this.movePony('west');
                break;
            }
            case 39: { // right key
                this.movePony('east');
                break;
            }
            case 32: { // space key
                this.movePony('stay');
                break;
            }
            default: {
                this.getMazeData();
                break;
            }
        }
    }
    
    movePony(direction: string) {
        let urlParams = this.mazeData.maze_id + '/' + direction;
        
        axios.post('api/maze/movepony/' + urlParams)
            .then(response => response.data as Promise<MoveResult>)
            .then(data => this.moveResult = data)
            .then(data => { this.getMazeData(); })
            .catch(error => {
                console.warn(error);
            });
    }

    getMazeData() {
        axios.get('api/maze/status/' + this.mazeData.maze_id + '/')
            .then(response => response.data as Promise<MazeData>)
            .then(data => this.mazeData = data)
            .catch(error => {
                console.warn(error);
            });
    }
}
