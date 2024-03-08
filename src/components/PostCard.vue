<script setup>
    import { ref } from "vue";

    const picture = ref('')
    const likes = ref(0)

    defineProps(["post"])

    const incrementLikes = () => {
        likes.value++
    }
</script>

<template>  
    <section class="bg-white shadow-xl rounded-lg p-4 max-w-[500px]">
        <div class="grid items-center">
            <section class="mb-1 flex">
                <img :src="post?.userPhotoURL ?? '/placeholder_profile.png'" 
                    alt="Imagen de perfil" 
                    class="w-12 h-12 rounded-full"/>
                <div class="ml-2">
                    <h3 class="font-bold text-lg">{{ post?.userEmail  }}</h3>
                    <p class="text-gray-500">{{ post?.createdAt.toDate().toLocaleDateString() }}</p>
                </div>
            </section>
            <section v-if="post?.postImage">
                <img :src="post?.postImage" alt="PICTURE" class="min-w-[100%]">
            </section>
            <section v-else>
                <img src="https://via.placeholder.com/1080" alt="PICTURE" class="animate-pulse">
            </section>
        </div>
        <section class="mt-4">
            <div class="likes flex justify-end">
                <span class="">Likes falsos :/</span>
                <button @click="incrementLikes" class="cursor-pointer text-3xl">❤️{{ likes }}</button>
            </div>
            <p>{{ post?.postDescription }}</p>
        </section>
    </section>
</template>

<style scoped>
    .likes > span {
        display: none;
    }
    .likes:hover > span {
        display: contents;
    }
</style>