import './css/site.css';
import 'bootstrap';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: require('./components/game/maze.vue.html') }
];

new Vue({
    el: '#app-root',
    methods: {
        startGame: function() {
            this.$http.post('http://demo8159500.mockable.io/post/check', {
                domain: this.domain
              }, function (data, status, request) {
                  this.postResults = data;
  
                  this.ajaxRequest = false;
              });
        }
    },
    router: new VueRouter({ mode: 'history', routes: routes }),
    render: h => h(require('./components/app/app.vue.html'))
});
