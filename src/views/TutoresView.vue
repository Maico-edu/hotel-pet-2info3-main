<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const API_URL = 'http://localhost:3000';

const tutores = ref([]);
const pets = ref([]);

async function carregar() {
  const respostaTutores = await fetch(`${API_URL}/tutores`);
  tutores.value = await respostaTutores.json();

  const respostaPets = await fetch(`${API_URL}/pets`);
  pets.value = await respostaPets.json();
}

function contarPets(tutorId) {
  return pets.value.filter(
    (pet) => String(pet.tutorId) === String(tutorId),
  ).length;
}

async function excluir(id) {
  const confirmar = window.confirm('Excluir este tutor?');

  if (!confirmar) {
    return;
  }

  await fetch(`${API_URL}/tutores/${id}`, {
    method: 'DELETE',
  });

  await carregar();
}

onMounted(carregar);
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Tutores</h1>
      <p class="text-body-secondary mb-0">
        Tutores cadastrados.
      </p>
    </header>

    <div class="mb-3">
      <RouterLink
        class="btn btn-success"
        to="/tutores/novo"
      >
        Novo tutor
      </RouterLink>
    </div>
  </div>

  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Telefone</th>
        <th>Pets</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="tutor in tutores"
        :key="tutor.id"
      >
        <td>{{ tutor.id }}</td>
        <td>{{ tutor.nome }}</td>
        <td>{{ tutor.telefone || 'Telefone não informado' }}</td>
        <td>{{ contarPets(tutor.id) }}</td>
        <td>
          <div class="d-flex gap-2">
            <button
              class="btn btn-sm btn-danger"
              @click="excluir(tutor.id)"
            >
              Excluir
            </button>
            <RouterLink
              class="btn btn-sm btn-primary"
              :to="`/tutores/${tutor.id}`"
            >
              Visualizar
            </RouterLink>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
