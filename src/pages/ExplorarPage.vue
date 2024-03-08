<script setup>
    import { ref, onMounted } from 'vue'
    import { onAuthStateChanged } from "firebase/auth";
    import { firestore, auth } from '@/firebase';
    import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
    import PostCard from '@/components/PostCard.vue'

    const posts = ref([])

    async function getPosts(){
        const q = query(collection(firestore, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            posts.value.push(doc.data())
        });
        console.log(posts.value)
    }

    onMounted(()=>{
        getPosts()
    })
</script>

<template>
    <section>
        <section>
            <div class="grid justify-center">
                <h2 class="text-center font-bold text-4xl mt-8">Posts</h2>
            </div>

            <section class="flex justify-center mt-4">
                <section class="columns-1">
                    <PostCard v-for="p in posts" :post="p" class="mb-8 last-of-type:mb-[10rem]"/>
                </section>
            </section>
        </section>
    </section>
</template>

<style scoped>
</style>