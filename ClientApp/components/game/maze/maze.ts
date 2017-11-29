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
    
    mounted() {
        // check if we have the id before anythig
        console.log('mounted ' + this.$props.mazeId);
        if (this.$props.mazeId) {
            this.mazeData.maze_id = this.$props.mazeId;
            this.getMazeData();
        }
    }
    
    getMazeData() {
        console.log('get maze data');
        console.log(this.mazeData.maze_id);
        axios.get('api/maze/status/' + this.mazeData.maze_id + '/')
            .then(response => response.data as Promise<MazeData>)
            .then(data => this.mazeData = data)
            .catch(error => {
                console.warn(error);
            });
    }

    move(direction: string) {
        let urlParams = this.mazeData.maze_id + '/' + direction;
        axios.post('api/maze/movement/' + urlParams)
            .then(response => {
                console.log(response);
                this.getMazeData();
            })
            .catch(error => {
                console.warn(error);
            });
    }
}
