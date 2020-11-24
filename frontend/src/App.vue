<template>
  <v-app>  
    <v-main>      
      <div id="game">
        <Game />
      </div>
      <div id="input">
        <Chat />
      </div> 
    </v-main>
  </v-app>
</template>

<script>
  import Chat from './components/Chat'
  import Game from './components/Game'
  import $socket from './socket-instance';

  export default {    
    name: 'App',

    components: {          
      Chat,      
      Game
    },

    data: () => ({            
      latency_ping:0,
      user:{
        id: '',
        nickname:''
      },      
    }),
    methods: {
      
    },
    created: function () {      
      setInterval(()=>{ // función que se repite cada 2000 milésimas de segundos
          let ping_time = Date.now();
          $socket.emit('setPing', ping_time); // enviamos el ping
      }, 2000);

      $socket.on('setPong', (ping_time) => {
        this.latency_ping = Date.now() - ping_time;        
      })
      $socket.on('setUpdateUser', (newUSer)=>{
        this.user = newUSer;
      });
    },

  };
</script>
