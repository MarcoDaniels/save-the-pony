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
    name: 'Home',
    components: {
        GameComponent: require('../game/game.vue.html')
    }
})
export default class HomeComponent extends Vue {
    data: createMazeData = new createMazeData;
    response: string = '';
    
    mounted() {
        this.data.maze_width= 0;
        this.data.maze_height = 0;
        this.data.maze_player_name = "";
        this.data.difficulty = 0;
    }
    
    submitForm($event: any) {
        $event.preventDefault();
        console.log(this.data);
        
        axios.post('api/maze/start', this.data)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
