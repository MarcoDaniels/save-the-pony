import Vue from 'vue';
import axios from 'axios';
import { Component } from 'vue-property-decorator';

class MazeStatus {
    maze_id: string;
}

@Component({
    name: 'Home',
    components: {
        GameComponent: require('../game/game.vue.html')
    },
})
export default class HomeComponent extends Vue {
    mazeData: MazeStatus[] = [];
    
    mounted() {
        axios.get('api/maze/status')
            .then(response => response.data as Promise<MazeStatus[]>)
            .catch(error => {
                console.log(error);
            });
    }
}
