<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const API_URL = 'http://localhost:3000';

const pets = ref([]);
const tutores = ref([]);

async function carregarDados() {
  const respostaPets = await fetch(`${API_URL}/pets`);
  pets.value = await respostaPets.json();

  const respostaTutores = await fetch(`${API_URL}/tutores`);
  tutores.value = await respostaTutores.json();
}

function nomeDoTutor(tutorId) {
  const tutor = tutores.value.find(
    (item) => String(item.id) === String(tutorId),
  );

  return tutor ? tutor.nome : 'Tutor não encontrado';
}

async function excluirPet(id) {
  const confirmarExclusao = window.confirm('Deseja retirar o pet do sistema?');

  if (!confirmarExclusao) {
    return;
  }

  await fetch(`${API_URL}/pets/${id}`, {
    method: 'DELETE',
  });

  await carregarDados();
}

onMounted(carregarDados);
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Listagem de Pets</h1>
      <p class="text-body-secondary mb-0">
        Listagem dos pets cadastrados no sistema.
      </p>
    </header>

    <div class="mb-3">
      <RouterLink
        class="btn btn-success"
        to="/pets/novo"
      >
        Cadastrar pet
      </RouterLink>
    </div>
  </div>

  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Espécie</th>
        <th>Tutor</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="pet in pets"
        :key="pet.id"
      >
        <td>{{ pet.id }}</td>
        <td>{{ pet.nome }}</td>
        <td>{{ pet.especie }}</td>
        <td>{{ nomeDoTutor(pet.tutorId) }}</td>
        <td>
          <RouterLink
            class="btn btn-sm btn-outline-primary me-2"
            :to="`/pets/${pet.id}`"
          >
            Editar
          </RouterLink>
          <button
            class="btn btn-sm btn-danger"
            @click="excluirPet(pet.id)"
          >
            Excluir
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>