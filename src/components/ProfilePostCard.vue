<script setup>
    import { ref, onMounted } from "vue";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth, firestore, storage } from "@/firebase";
    import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
    
    const user = ref(null)
    const likes = ref(0)

    defineProps(["post"])

    const incrementLikes = () => {
        likes.value++
    }

    // CHATGPT me arreglo todo lo que tenia mal (todo)
    async function deletePost(postDescription){
        if (!confirm("¿Seguro que deseas borrar la reseña?")){
            return;
        }
        try {
            // Realizar una consulta para obtener el ID del documento basado en la descripción
            const querySnapshot = await getDocs(query(collection(firestore, "posts"), where("postDescription", "==", postDescription)));
            
            // Verificar si se encontró algún documento
            if (!querySnapshot.empty) {
                // Obtener el primer documento de la consulta (suponiendo que la descripción es única)
                const docSnapshot = querySnapshot.docs[0];
                // Obtener la referencia al documento y eliminarlo
                await deleteDoc(doc(docSnapshot.ref.firestore, docSnapshot.ref.path));
                console.log('Post Deleted');
            } else {
                console.log('No se encontró ninguna reseña con la descripción proporcionada');
            }
        } catch (e){
            console.error(e);
            alert(`Error al borrar la reseña: ${e}`);
        }
    }

    // Aqui me ayudo CHATGPT
    async function editPost(postId, content){
        const newContent = prompt("Edita la descripción", content);
        if (!newContent){
            alert("El Post no puede estar vacio");
            return;
        }
        try{
            console.log(postId)
            const postQuery = collection(firestore, "posts");
            const querySnapshot = await getDocs(query(postQuery, where("postId", "==", postId)));
            querySnapshot.forEach(async (doc) => {
                try {
                    await updateDoc(doc.ref, {
                        postDescription: newContent,
                        updatedAt: serverTimestamp(),
                    });
                    console.log("Post actualizado exitosamente");
                } catch (error) {
                    console.error("Error actualizando el documento: ", error);
                }
            });
        } catch(e){
            console.error("Error obteniendo documentos: ", e);
        }
    }


    onMounted(()=>{
        onAuthStateChanged(auth,(currentUser) => {
            user.value = currentUser;
        })
    })
</script>

<template>  
    <section class="bg-white shadow-xl rounded-lg p-4 max-w-[500px]">
        <div class="grid items-center">
            
            <section class="mb-1 flex">
                
                <img :src="post?.userPhotoURL ?? '/placeholder_profile.png'" 
                    alt="Imagen de perfil" 
                    class="w-12 h-12 rounded-full"/>
                
                    <div class="ml-2 flex">
                        <div class="">
                            <h3 class="font-bold text-lg">{{ post?.userEmail }}</h3>
                            <p class="text-gray-500">{{ post?.createdAt.toDate().toLocaleDateString() }}</p>
                        </div>
                    </div>
            
            </section>

            <section v-if="post?.postImage">
                <img :src="post?.postImage" alt="PICTURE" class="z-1 min-w-[100%]">
            </section>
            <section v-else>
                <img src="https://via.placeholder.com/1080" alt="PICTURE">
            </section>
        </div>
        <section class="mt-4">
            <div class="likes flex justify-end">
                <span class="">Likes falsos :/</span>
                <button @click="incrementLikes" class="cursor-pointer text-3xl">❤️{{ likes }}</button>
            </div>
            <p>{{ post?.postDescription }}</p>
        </section>
        <section class="grid gap-2 mt-3">
            <button @click="deletePost(post?.postDescription)" class="p-2 bg-red-500">Borrar</button>
            <button @click="editPost(post?.postId, post?.postDescription)" class="p-2 bg-orange-500">Editar</button>
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