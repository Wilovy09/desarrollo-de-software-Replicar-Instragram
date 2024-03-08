<script setup>
    import { onMounted, ref } from "vue";
    import { auth, firestore, storage } from "@/firebase";
    import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
    import { onAuthStateChanged } from "firebase/auth";
    import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

    const user = ref(null);

    const postImageFile = ref(null);
    const postImageURL = ref(null);
    const newPostDescription = ref("");

    function showNewImageOnImgElement(event) {
        postImageFile.value = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => (postImageURL.value = e.target.result);
        reader.readAsDataURL(postImageFile.value);
    }
    async function uploadPhotoToStorage(){
        const photoRef = storageRef(storage, `postPictures/${user.value.uid}`);
        await uploadBytes(photoRef, postImageFile.value);
        return getDownloadURL(photoRef);
    }
    async function submitPost(){
        try {
            const postReview = collection(firestore, "posts");
            await addDoc(postReview, {
                postId: `${user.value.uid}-${new Date()}`,
                postDescription: newPostDescription.value,
                postLikes: 1,
                postImage: postImageURL.value,

                userId: user.value.uid,
                userEmail: user.value.email,
                userDisplayName: user.value.displayName,
                userPhotoURL: user.value.photoURL,
                
                createdAt: serverTimestamp(),
            });
            uploadPhotoToStorage();
            newPostDescription.value = "";
        } catch (error) {
            console.log(`Error \n ${error}`)
        }
    }

    onMounted(()=>{
        onAuthStateChanged(auth,(currentUser) => {
            user.value = currentUser;
            console.log(user.value)
        })
    });
</script>

<template>
    <section class="mb-8">
        <div class="grid justify-center">
            <h2 class="text-center font-bold text-4xl mt-8">Create post</h2>

            <form @submit.prevent="submitPost" class="morph mt-20 p-4 rounded-xl max-w-[500px]">
                <div class="grid">
                    <label for="image" class="font-bold text-2xl mb-2">Image</label>
                    <input @input="showNewImageOnImgElement" type="file" name="image" class="my-2">
                    <img :src="postImageURL ?? 'https://via.placeholder.com/1080'" alt="PREVIEW">
                </div>
                
                <div class="grid">
                    <label for="description" class="font-bold text-2xl my-2">Description</label>
                    <textarea v-model="newPostDescription" name="description" rows="5" class="bg-gray-100 p-2"></textarea>
                </div>

                <div class="grid mx-8">
                    <button type="submit" class="fondo-movido bg-[var(--color-two)] text-white rounded-xl p-2 font-bold text-xl my-4">Create</button>
                </div>
            </form>
        </div>
    </section>
</template>