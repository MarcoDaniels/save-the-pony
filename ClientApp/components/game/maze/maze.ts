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
        console.log(this.$props);
        if (this.$props.mazeId) {
            this.mazeData.maze_id = this.$props.mazeId;
            this.getMazeData();
        }
    }
    
    getMazeData() {
        axios.get('api/maze/status/' + this.mazeData.maze_id + '/')
            .then(response => response.data as Promise<MazeData>)
            .then(data => this.mazeData = data)
            .catch(error => {
                console.warn(error);
            });
    }

    movePony(direction: string) {
        console.log(direction);
        console.log(this.$props.mazeId);
        console.log(this.mazeData.maze_id);
        // use post for movement
        /*
        fetch('api/maze/movement/' + direction)
            .then(response => response.json() as Promise<MoveResult>)
            .then(data => { this.moveResult = data; })
            .then(fetch => this.mazeStatus(this.$props.id));

        this.moveTo = direction;
        */
        let urlParams = this.mazeData.maze_id + '/' + direction; 
        
        axios.post('api/maze/movement/' + urlParams)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.warn(error);
            });
        
        //this.getMazeData();
        }
}
