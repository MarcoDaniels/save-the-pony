import Vue from 'vue';
import axios from 'axios';
import { Component } from 'vue-property-decorator';


class CreateMaze {
    maze_player_name: string;
    maze_width: number;
    maze_height: number;
    difficulty: number;
}

@Component({
    name: 'Game',
    props: ['id'],
    components: {
        ControllersComponent: require('./controllers/controllers.vue.html'),
        MazeComponent: require('./maze/maze.vue.html')
    },
})
export default class MazeComponent extends Vue {
    mazeId: string = '';

    mounted() {
        this.mazeId = this.$props.id;
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
    }

}
