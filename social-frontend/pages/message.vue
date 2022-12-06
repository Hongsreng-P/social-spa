<script setup lang="ts">
import { io } from 'socket.io-client';
import { Message } from '@/constants/types';
    
    const socket = io('http://localhost:3030');

    const messages = ref<Message[]>();

    const user = useUser();
    
    const loadingMessage = ref<boolean>(true);
    onBeforeMount(() => {
        socket.on('newMessage', (res) => {
            messages.value.push(res);
        });

        socket.emit('findAllMessage', {}, (res)=>{
            messages.value = res;
            loadingMessage.value = false;
        });
    });

    const message = ref<string>('');
    const sendNewMessage = () => {
        const payload = {author: user.value.username, content:message.value};

        socket.emit('createMessage', payload, (res)=>{
            if (res.status === 'ok') {
                messages.value.push(res.message);
                message.value = '';
            }
        });
    }

</script>

<template>
    <div class="container">
        <h2>!Direct Message</h2>
        <p v-if="loadingMessage">Loading Messages</p>
        <MessageContainer :messages="messages"/>
        <div class="form" >
            <input v-model="message" @keyup.enter="sendNewMessage"/>
            <button @click="sendNewMessage">Send</button>
        </div> 
    </div>
</template>

<style scoped>
    .form {
        width: 35%;
    }
</style>