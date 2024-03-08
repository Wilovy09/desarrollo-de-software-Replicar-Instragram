<script setup>
	import { ref, computed, onMounted } from 'vue';
	import { onAuthStateChanged } from "firebase/auth";
	import { auth } from "@/firebase.js";
	import Navbar from '@/components/Navbar.vue';
	import Explorar from '@/pages/ExplorarPage.vue';
	import Perfil from '@/pages/PerfilPage.vue';
	import Login from '@/pages/LoginPage.vue';
	import CreatePost from '@/pages/CreatePost.vue';

	const pageShow = ref('explorer');
	const user = ref(null);
	const isUserAuthenticated = computed(()=> user.value != null)

	function changePage(page){
		pageShow.value = page
	};

	onMounted(() => {
		onAuthStateChanged(auth,(currentUser) => {
			if (currentUser != null) {
				user.value = currentUser;
			} else {
				user.value = null;
			}
		})
	});
</script>

<template>
	<Login @hide-login="isUserAuthenticated = false" v-if="isUserAuthenticated === false"/>
	
	<div v-else>
		<Navbar @change-page="changePage"/>

		<Explorar v-if="pageShow == 'explorer'"/>
		<Perfil v-else-if="pageShow == 'profile'"/>
		<CreatePost v-else-if="pageShow == 'create'"/>
	</div>
	
	
</template>

<style>
	:root{
		--bg-size: 400%;
		--color-one: #9939b1;
		--color-two: #e54859;
		--color-three: #f0af62;
	}

	.efecto:hover{
        background: linear-gradient(90deg,
			var(--color-one),
			var(--color-two),
			var(--color-three),
			var(--color-one)) 0 0 / 
			var(--bg-size) 100%;
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
        animation: move-bg 8s infinite linear;
    }
	.fondo-movido:hover{
		background: linear-gradient(90deg,
			var(--color-one),
			var(--color-two),
			var(--color-three),
			var(--color-one)) 0 0 / 
			var(--bg-size) 100%;  
		animation: move-bg 15s linear infinite;
	}
    @keyframes move-bg {
        to {
            background-position: var(--bg-size) 0;
        }
    }

	.morph{
        background: #FFFFFF;
        box-shadow: 50px 50px 100px #bfbfbf,
                    -50px -50px 100px #ffffff;
    }
</style>