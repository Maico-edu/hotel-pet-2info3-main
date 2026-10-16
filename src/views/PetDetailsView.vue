<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

// chamando o useRouter

const router =useRoute();
// chamndo a nossa API

const API_URL = 'http://localhost:3000'

const pet = ref({});
const tutor = ref({});

// funçao para carregar os dados do pet e do tutor
async function carregarPet() {
  try {
    const respostaPet = await(fetch(`${API_URL}/pets/${router.params.id}`));
    if(!respostaPet.ok) {
      console.log( "Opssss, Pet não encontrado!")
    }

    pet.value = await respostaPet.json();

    const respostaTutor = await(fetch(`${API_URL}/tutores/${pet.value.tutorId}`));
    tutor.value = respostaTutor.ok ? await respostaTutor.json() : { nome: 'Tutor não encontrad'};
  } catch (erro) {
    console.erro('Erro ao carregar os dados do pet e do tutor:', erro);
  }
}


onMounted(carregarPet);
</script>

<template>

  <h1>Nome: {{ pet.nome }}</h1>
  <p>espécia: {{ pet.especie }}</p>
  <p>Tutor: {{ tutor.nome || 'Tutor não encontrado' }}</p>
</template>
