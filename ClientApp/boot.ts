import './css/site.css';
import 'bootstrap';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    { 
        path: '/', 
        component: require('./components/home/home.vue.html') 
    },
    { 
        path: '/maze/:id', 
        component: require('./components/game/game.vue.html'), 
        props: true
    }
];

new Vue({
    el: '#app-root',
    router: new VueRouter({ mode: 'history', routes: routes }),
    render: h => h(require('./components/app/app.vue.html'))
});
