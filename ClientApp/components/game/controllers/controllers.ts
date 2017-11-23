import Maze from '../maze/maze';
import { Component } from 'vue-property-decorator';

@Component({
    name: 'Controllers'
})
export default class ControllersComponent extends Maze {
    
    move(direction: string) {
        this.movePony(direction);
    }
}
