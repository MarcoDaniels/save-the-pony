import Vue from 'vue';
import { Component } from 'vue-property-decorator';

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
        if (this.$props.id) {
            this.mazeId = this.$props.id;
        }
    }

}
