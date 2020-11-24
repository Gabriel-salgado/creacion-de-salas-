<template>
    <v-container>
        <section ref="chatArea" class="chat-area">
            <p v-for="(message, i) in messages" 
                class="message" 
                :key='i' 
                :class="{ 'message-system': message.author === 'system', 'message-out': message.author === user.id, 'message-in': message.author !== user.id }
                ">
            <b>{{message.nickname}}:</b> {{ message.body }}
            </p>
        </section>
        <section class="message-area">            
            <v-footer padless>
                <v-card class="flex" flat tile>
                <v-card-title class="orange lighten-1">                        
                    <v-text-field
                        class="message-input"
                        id="youMessage"
                        v-model="youMessage"
                        :label = user.nickname 
                        placeholder="chatea aqui!"
                        v-on:keyup.enter="sendMessage('out')"
                        ></v-text-field>                        
                    <v-btn small fab @click="sendMessage('out')">
                        <i class="fa fa-paper-plane" aria-hidden="true"></i>
                    </v-btn>                        
                </v-card-title>
                </v-card>
            </v-footer>            
        </section>
    </v-container>
</template>
<script>
    import $socket from '../socket-instance';
    export default {
        name:'Chat',
        data: function () {
            return {               
                user:{
                    id:'',
                    nickname:''
                },
                othersMessage: '',
                youMessage: '',
                messages: [
                    {
                        body: 'Bienvenido a "Juego"',
                        author: 'system',
                        nickname: 'System'
                    },                
                ]
            }
        },
        async mounted(){
            await $socket.emit('getMessage');
            await $socket.on('setMessage',(msgs)=>{
                this.message = msgs;
            });
           $socket.on('setUpdateUser', (newUSer)=>{
                this.user = newUSer;
            })
        },
        methods: {            
            sendMessage(direction) {
                $socket.emit('send', {text:this.youMessage, nickname:this.user.nickname, direction} );
                this.youMessage = ''
                
                this.$nextTick(() => {
                    let messageDisplay = this.$refs.chatArea
                    messageDisplay.scrollTop = messageDisplay.scrollHeight
                }) 
            },
            clearAllMessages() {
                this.messages = []
            }            
        },
        created: function () {
            $socket.on('connect', () => {
                console.log('Connected!');
                this.user.id = $socket.id;               
            });

            $socket.on('receive', (msg) => {
                let {userId, text, nickname } = msg
                this.messages.push({body: text, author: userId, nickname:nickname})
            });
        }
    }
</script>
<style scoped>
 
.chat-area {
/*   border: 1px solid #ccc; */
  background: #321456;
  height: 40vh;
  padding: 1em;
  overflow: auto;
  max-width: 99vw;
  margin: 0 auto 0em auto;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3)
}
.message-area {
    height: 10vh;
}
.message {
  width: 90%;
  border-radius: 10px;
  padding: .5em;
  font-size: .8em;
}
.message-out {
  background: #575594;
  color: white;
  margin-left: 10%;
}
.message-in {
  background: #817FB2;
  color: black;
}
.message-system {
  background:#FFF9C4;
  color: black;
}
</style>