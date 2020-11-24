<template>
    <v-container>
        <v-card        
        max-width='400'
        class="mx-auto"
        >
            <v-virtual-scroll
                :bench="benched"
                :items="players"
                height="320"
                item-height="64"
            >
                <template v-slot:default="{ item }">
                <v-list-item :key="item.id">
                    <v-list-item-action>
                    <v-btn
                        fab
                        small
                        depressed
                        color="green lighten-3"
                    >
                        <i class="fa fa-user" aria-hidden="true"></i>
                    </v-btn>
                    </v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>
                         <strong>{{ item.nickname }}</strong>
                    </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                    <v-icon small>
                        mdi-open-in-new
                    </v-icon>
                    </v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>
                </template>
            </v-virtual-scroll>
            </v-card>
    </v-container>
</template>
<script> 
    import $socket from '../socket-instance';
    export default {
        name:'Players',
        data: function () {
            return {
                players:[],
                benched:0
            }            
        },
        mounted() {
            $socket.on('setUsers', (users)=>{
                console.log(users);
                this.players = users; 
            })
        }
    }
</script>