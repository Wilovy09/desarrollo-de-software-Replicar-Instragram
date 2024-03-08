<script setup>
    import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
	import { auth } from "@/firebase";
    import { ref } from "vue";

    const emits = defineEmits(["hideLogin"]);
    const isLoginShow = ref(true);

    const email = ref("");
    const password = ref("");

    async function Login(){
        try{
			await signInWithEmailAndPassword(auth, email.value, password.value);
			emits('hideLogin');
		} catch (e) {
			console.log(e.message)
		}
    }

    async function CreateAccount(){
        try{
			await createUserWithEmailAndPassword(auth, email.value, password.value);
			emits('hideLogin');
		} catch (e) {
			console.log(e.message)
		}
    }
</script>

<template>
    <section v-if="isLoginShow == true">
        <div class="flex justify-center items-center h-screen mx-auto">
            <div class="morph p-4 rounded-xl">
                <div class="flex justify-center">
                    <img src="/logo.svg" alt="LOGO" class="w-[150px]">
                </div>
                <form action="" class="text-xl" @submit.prevent>
                    <div class="grid mt-4">
                        <label for="email">Email</label>
                        <input v-model="email" type="text" name="email" placeholder="youremail@mail.com" class="p-1" required/>
                    </div>

                    <div class="grid mt-4">
                        <label for="password">Password</label>
                        <input v-model="password" type="password" name="password" placeholder="mysecretpassword123." class="p-1" required/>
                    </div>

                    <div class="grid">
                        <button @click="Login" type="submit" class="fondo-movido p-1 rounded-2xl mt-4 text-white bg-[var(--color-two)]">Login</button>
                        <span class="efecto p-1 mt-4 text-center cursor-pointer" @click="isLoginShow = false">Create Account</span>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <section v-else>
        <div class="flex justify-center items-center h-screen mx-auto">
            <div class="morph p-4 rounded-xl">
                <div class="flex justify-center">
                    <img src="/logo.svg" alt="LOGO" class="w-[150px]">
                </div>
                <form action="" class="text-xl" @submit.prevent>
                    <div class="grid mt-4">
                        <label for="email">Email</label>
                        <input v-model="email" type="text" name="email" placeholder="youremail@mail.com" class="p-1" required/>
                    </div>

                    <div class="grid mt-4">
                        <label for="password">Password</label>
                        <input v-model="password" type="password" name="password" placeholder="mysecretpassword123." class="p-1" required/>
                    </div>

                    <div class="grid">
                        <button @click="CreateAccount" type="submit" class="fondo-movido p-1 rounded-2xl mt-4 text-white bg-[var(--color-two)]">Create Account</button>
                        <span class="efecto p-1 mt-4 text-center cursor-pointer" @click="isLoginShow = true">I have account</span>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>