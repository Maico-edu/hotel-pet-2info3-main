<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const tutor = ref({});
const erro = ref('');

onMounted(async () => {
  try {
    const resposta = await fetch(
      `http://localhost:3000/tutores/${route.params.id}`,
    );

    if (resposta.ok) {
      tutor.value = await resposta.json();
    } else {
      erro.value = 'Tutor não encontrado.';
    }
  } catch {
    erro.value = 'Não foi possível carregar os dados do tutor.';
  }
});
</script>

<template>
  <RouterLink to="/tutores">Voltar para tutores</RouterLink>
  <h1>Dados do tutor</h1>

  <p v-if="erro">{{ erro }}</p>

  <div v-else>
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
