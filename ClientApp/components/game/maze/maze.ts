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
    mazeData: MazeData[] = [];
    mazeId: string = '';
    
    mounted() {
        this.mazeId = this.$props.mazeId;
        this.getMazeData();
    }
    
    getMazeData() {
        axios.get('api/maze/status/' + this.mazeId + '/')
            .then(response => response.data as Promise<MazeData[]>)
            .then(data => this.mazeData = data)
            .catch(error => {
                console.warn(error);
            });
    }

    movePony(direction: string) {
        // use post for movement
        /*
        fetch('api/maze/movement/' + direction)
            .then(response => response.json() as Promise<MoveResult>)
            .then(data => { this.moveResult = data; })
            .then(fetch => this.mazeStatus(this.$props.id));

        this.moveTo = direction;
        */
        console.log(direction);
        this.getMazeData();
        }
    
    log() {
        console.log('key');
    }
}
