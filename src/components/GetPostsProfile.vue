<script setup>
    import { ref, onMounted } from 'vue'
    import { onAuthStateChanged } from "firebase/auth";
    import { firestore, auth } from '@/firebase';
    import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
    import ProfilePostCard from "@/components/ProfilePostCard.vue";

    const posts = ref([])
    const user = ref(null);

    async function getPosts(){
        if (user.value) {
            const q = query(collection(firestore, "posts"), 
            orderBy("createdAt", "desc"),
            where("userId", "==", user.value.uid));

            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
                posts.value.push(doc.data())
            });
        }
    }

    onMounted(()=>{
        onAuthStateChanged(auth,(currentUser) => {
            user.value = currentUser;
            getPosts();
        })
    })
</script>

<template>
    <section class="flex justify-center mt-4">
        <section class="columns-1">
            <ProfilePostCard v-for="post in posts" :key="post.id" :post="post" class="mb-8 last-of-type:mb-[10rem]"/>
        </section>
    </section>
</template>
