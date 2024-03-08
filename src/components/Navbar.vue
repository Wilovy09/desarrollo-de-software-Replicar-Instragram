<script setup>
    import { signOut } from "firebase/auth";
    import { auth } from "@/firebase";

    const emits = defineEmits(["changePage"]);
    async function SignOut(){
        await signOut(auth);
    }
</script>

<template>
    <nav class="flex justify-between gap-4 shadow-xl p-2 mb-4">
        <span @click="SignOut" class="efecto w-8 cursor-pointer">
            <img src="/icons/logout.svg" alt="logout">
        </span>
        <span @click="emits('changePage', 'explorer')" class="efecto w-8 cursor-pointer">
            <img src="/icons/search.svg" alt="explorer">
        </span>
        <span @click="emits('changePage', 'create')" class="efecto w-8 cursor-pointer">
            <img src="/icons/create.svg" alt="explorer">
        </span>
        <span @click="emits('changePage', 'profile')" class="efecto w-8 cursor-pointer">
            <img src="/icons/profile.svg" alt="profile">
        </span>
    </nav>
</template>

<style scoped>
</style>