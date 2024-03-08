<script setup>
    import { ref, onMounted } from "vue";
    import { auth, storage } from "@/firebase.js";
    import { onAuthStateChanged, updateProfile } from "firebase/auth";
    import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
    import ProfileNavbar from "@/components/ProfileNavbar.vue";
    import GetPostsProfile from "@/components/GetPostsProfile.vue";

    const user = ref(null);
    const name = ref("");
    const profileImageUrl = ref(null);
    const profileImageFile = ref(null);

    function showNewImageOnImgElement(event) {
        profileImageFile.value = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => (profileImageUrl.value = e.target.result);
        reader.readAsDataURL(profileImageFile.value);
    }

    async function uploadFilesToStorage(file){
        const fileRef = storageRef(storage, `profilePictures/${user.value.uid}`);
        await uploadBytes(fileRef, profileImageFile.value);
        
        return await getDownloadURL(fileRef);
    }

    async function saveProfile(){
        try {
            await updateProfile(user.value,{
                displayName: name.value,
                photoURL: profileImageFile ? await uploadFilesToStorage(profileImageFile) : profileImageUrl,
            })
            alert("Perfil actualizado correctamente")
        } catch (error) {
            alert(error.message)
        }
    }

	const pageShow = ref('posts');
    function changePage(page){
        pageShow.value = page
    };
    onMounted(() => {
        onAuthStateChanged(auth, (currentUser) => {
            user.value = currentUser;
            if (currentUser.displayName) name.value = currentUser.displayName;
            if (currentUser.photoURL) profileImageUrl.value = currentUser.photoURL;
        });
    });
    
</script>

<template>
    <ProfileNavbar @change-profile-page="changePage"/>
    <section v-if="pageShow === 'editprofile'">
        <hr class="my-2">
        <section class="mt-14">
            <div class="flex justify-center">
                <img :src="profileImageUrl ?? '/placeholder_profile.png'" alt="Imagen de perfil"
                class="w-52 h-52 rounded-full"/>
            </div>
            
            <p class="text-center font-bold text-2xl">{{ user?.displayName }}</p>
            <p class="text-center font-bold text-xl">{{ user?.email }}</p>
            
            <div class="grid justify-center mt-8">
                <label for="selectimage" class="text-center font-bold text-2xl">Select image</label>
                <input class="mt-4" name="selectimage" id="selectimage" type="file" accept="image/*" @input="showNewImageOnImgElement"/>

                <label for="displayname" class="text-center font-bold text-2xl mt-16">Display name</label>
                <input class="p-2 border rounded-xl mt-4" name="displayname" id="displayname" type="text" v-model="name" placeholder="Añade un nombre a tu perfil"/>
                
                <button @click="saveProfile" class="fondo-movido mt-16 bg-[var(--color-two)] p-2 rounded-full">Guardar</button>
            </div>
        </section>
    </section>
    <section v-else-if="pageShow === 'posts'">
        <GetPostsProfile/>
    </section>
</template>