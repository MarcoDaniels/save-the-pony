import Maze from '../maze/maze';
import { Component } from 'vue-property-decorator';

@Component({
    name: 'Controllers',
    props: ['mazeId'],
})
export default class ControllersComponent extends Maze {
    
    move(direction: string) {
        if (this.$props.mazeId) {
            this.movePony(this.$props.mazeId, direction);
        }
    }
}
