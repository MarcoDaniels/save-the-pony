import Vue from 'vue';
import axios from 'axios';
import { Component } from 'vue-property-decorator';

class createMazeData {
    maze_width: number;
    maze_height: number;
    maze_player_name: string;
    difficulty: number;
}

@Component({
    name: 'Home'
})
export default class HomeComponent extends Vue {
    data: createMazeData = new createMazeData;
    createStatus: string = '';
    
    createMaze($event: any) {
        $event.preventDefault();
        
        // create new maze
        axios.post('api/maze/start', this.data)
            .then(response => {
                if (response.data.hasOwnProperty("maze_id")) {
                    let mazeId = response.data.maze_id;
                    this.$router.push('/maze/'  + mazeId);
                } else {
                    this.createStatus = response.data;    
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }
}
