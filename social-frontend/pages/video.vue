<script setup lang="ts">
import { io } from "socket.io-client";

const localCam = ref(null);
const remoteCam = ref(null);
const start = async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  localCam.value.srcObject = localStream;
};
</script>

<template>
  <div>
    <button @click="start">Start</button>
    <video id="localCam" ref="localCam" autoplay playsinline></video>
    <video id="remoteCam" ref="remoteCam" autoplay playsinline></video>
  </div>
</template>

<style>
video {
  width: 320px;
}
</style>
