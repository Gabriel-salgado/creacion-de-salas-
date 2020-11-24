<template>
        <v-container  grid-list-xl text-xs-center>      
            <v-layout row wrap>
                <v-flex xs12 sm12>
                    <v-card>
                        <v-layout row wrap pa-3>
                            <v-flex xs10 sm6 md4>
                                <v-card>
                                    <v-img
                                    :src="require('../assets/escalera.jpg')"
                                    class="white--text" 
                                    height="18vw"                                    
                                    contain                                    
                                    />
                                    <v-card-actions class='yellow lighten-5'>                                                
                                        <v-btn icon>
                                            <i class="fa fa-user-circle" aria-hidden="true"></i>                                            
                                        </v-btn> Avanza {{dice}} posiciones
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                            <v-flex xs10 sm6 md4 class="pa-md-0">
                                <Players/>
                            </v-flex>
                            <v-flex xs10 sm6 md4 class="pa-md-0">                                
                                    <Rooms/>                                                                    
                            </v-flex>                            
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
    </v-container>
</template>
<script>
    import Rooms from './Rooms'
    import Players from './Players'
    import $socket from '../socket-instance';
    
    export default {
        name: 'Game',
        components: {    
            Rooms,
            Players
        },
        data: function () {
            return {
                user:{
                    id:'',
                    nickname:''
                },
                downloaded: false,
                gameInstance: null,
                containerId: 'game-container',
                dice:1
            }
        },
        mounted() {
            const game = import('../game/game');            
            this.downloaded = true;
            this.$nextTick(() => {
            })
            $socket.on('setUpdateUser', (newUSer)=>{
                this.user = newUSer;
            })

            $socket.on('setUsers', (users)=>{
                this.users = users;
            })            
        },
        destroyed() {}
    }
</script>
<style scoped>
    .game-area {    
        background: #321456;
        height: 40vh;
        padding: 0.5em;
        overflow: auto;
        max-width: 99vw;
        margin: 0 auto 0em auto;
        box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3)
    }
    .game {
        width: 100%;
        height: 50vh;
    }    
</style>