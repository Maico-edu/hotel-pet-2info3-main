<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { mensagemErroApi, petService, tutorService } from '@/services/api';

const route = useRoute();
const pet = ref({});
const tutor = ref({});
const erro = ref('');

async function carregarPet() {
  try {
    pet.value = await petService.buscarPorId(route.params.id);

    try {
      tutor.value = await tutorService.buscarPorId(pet.value.tutorId);
    } catch (erroTutor) {
      if (erroTutor.response?.status === 404) {
        tutor.value = { nome: 'Tutor não encontrado' };
      } else {
        throw erroTutor;
      }
    }
  } catch (erroApi) {
    erro.value = mensagemErroApi(
      erroApi,
      'Não foi possível carregar os dados do pet.',
    );
  }
}

onMounted(carregarPet);
</script>

<template>
  <RouterLink to="/pets">Voltar para pets</RouterLink>
  <p
    v-if="erro"
    class="alert alert-danger mt-3"
    role="alert"
  >
    {{ erro }}
  </p>
  <template v-else>
    <h1>Nome: {{ pet.nome }}</h1>
    <p>espécia: {{ pet.especie }}</p>
    <p>Tutor: {{ tutor.nome || 'Tutor não encontrado' }}</p>
  </template>
</template>
