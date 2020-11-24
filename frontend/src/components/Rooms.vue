<template>
    <v-container>
        <v-card
            class="mx-auto"
            max-width="400"            
        >
            <v-card-title class="black--text orange lighten-2">
            Salas de juego
            <v-spacer></v-spacer>
            <v-btn
                color="white"
                class="text--primary"
                fab
                small
                 @click="newRoom()"
            >
                <i class="fa fa-plus" aria-hidden="true"></i>
            </v-btn>
            </v-card-title>

            <v-divider></v-divider>            
            <v-virtual-scroll
                :items="rooms"
                :item-height="50"
                height="240"
            >
            <template v-slot:default="{ item }">
                <v-list-item>
                    <v-list-item-avatar>
                        <v-avatar
                        color="#8D1A36"
                        size="40"
                        class="white--text"
                        >
                        <i class="fa fa-gamepad" aria-hidden="true"></i>
                        </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.id }}</v-list-item-title>
                    </v-list-item-content>

                <v-list-item-action>
                    <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="primary"
                        >
                    Ir
                   <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </v-btn>
                </v-list-item-action>
                </v-list-item>
            </template>
            </v-virtual-scroll>
        </v-card>
    </v-container>    
</template>
<script>
import $socket from '../socket-instance';
export default {
    name:'Rooms',
    data() {
        return {
            colors: ['#2196F3', '#90CAF9', '#64B5F6', '#42A5F5', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF', '#2962FF'],
            rooms:[],
            newRoomId:''
        }
    },
     mounted() {
        $socket.on('setUsers', (users)=>{
            console.log(users);
            this.players = users; 
        })
        $socket.emit('getInitRooms');

        $socket.on('setInitRooms', (rooms)=>{
            console.log(rooms);
            this.rooms = rooms; 
        })        

        $socket.on('setNewRoom', (data)=>{
            this.newRoomId =  data.Id
            this.rooms = data.rooms 
        })
    },
    
    methods: {
      genRandomIndex (length) {
        return Math.ceil(Math.random() * (length - 1))
      },
      newRoom(){
          $socket.emit('newRoom')
      }
    },
}
</script>