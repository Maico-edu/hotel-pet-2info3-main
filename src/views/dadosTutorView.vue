<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { mensagemErroApi, tutorService } from '@/services/api';

const route = useRoute();
const tutor = ref({});
const erro = ref('');
const carregando = ref(true);

onMounted(async () => {
  try {
    tutor.value = await tutorService.buscarPorId(route.params.id);
  } catch (erroApi) {
    if (erroApi.response?.status === 404) {
      erro.value = 'Tutor não encontrado.';
    } else {
      erro.value = mensagemErroApi(
        erroApi,
        'Não foi possível carregar os dados do tutor.',
      );
    }
  } finally {
    carregando.value = false;
  }
});
</script>

<template>
  <RouterLink to="/tutores">Voltar para tutores</RouterLink>
  <h1>Dados do tutor</h1>

  <p
    v-if="carregando"
    class="text-body-secondary"
    role="status"
  >
    Carregando dados do tutor...
  </p>
  <p v-if="erro">{{ erro }}</p>

  <div v-else-if="!carregando">
    <p><strong>Nome:</strong> {{ tutor.nome }}</p>
    <p><strong>Telefone:</strong> {{ tutor.telefone }}</p>
    <p><strong>E-mail:</strong> {{ tutor.Email  }}</p>
    <p><strong>CPF:</strong> {{ tutor.Cpf }}</p>
    <p><strong>Data de nascimento:</strong> {{ tutor.dataNascimento }}</p>
    <p><strong>Rua:</strong> {{ tutor.rua }}</p>
    <p><strong>Número:</strong> {{ tutor.numero }}</p>
    <p><strong>Bairro:</strong> {{ tutor.bairro }}</p>
    <p><strong>Cidade:</strong> {{ tutor.cidade }}</p>
    <p><strong>Estado:</strong> {{ tutor.estado }}</p>
    <p><strong>CEP:</strong> {{ tutor.cep }}</p>
  </div>
</template>
