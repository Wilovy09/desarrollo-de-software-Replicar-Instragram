<script setup>
    import { ref, onMounted } from "vue";
    import { auth, firestore, storage } from "@/firebase";
    
    const emits = defineEmits(["changeProfilePage"]);
</script>

<template>
    <nav class="flex justify-around text-2xl font-semibold">
        <span @click="emits('changeProfilePage', 'posts')">Posts</span>
        <span @click="emits('changeProfilePage', 'editprofile')">Edit profile</span>
    </nav>
</template>

<style scoped>
</style>