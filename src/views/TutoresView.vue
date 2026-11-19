<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { mensagemErroApi, petService, tutorService } from '@/services/api';

const tutores = ref([]);
const pets = ref([]);
const erro = ref('');
const carregando = ref(false);

async function carregar() {
  carregando.value = true;
  erro.value = '';

  try {
    const [listaTutores, listaPets] = await Promise.all([
      tutorService.listar(),
      petService.listar(),
    ]);

    tutores.value = listaTutores;
    pets.value = listaPets;
  } catch (erroApi) {
    erro.value = mensagemErroApi(
      erroApi,
      'Não foi possível carregar tutores e pets.',
    );
  } finally {
    carregando.value = false;
  }
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

  try {
    await tutorService.excluir(id);
    await carregar();
  } catch (erroApi) {
    erro.value = mensagemErroApi(
      erroApi,
      'Não foi possível excluir o tutor.',
    );
  }
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

  <p
    v-if="erro"
    class="alert alert-danger"
    role="alert"
  >
    {{ erro }}
  </p>
  <p
    v-else-if="carregando"
    class="text-body-secondary"
    role="status"
  >
    Carregando tutores...
  </p>
  <p
    v-else-if="tutores.length === 0"
    class="text-body-secondary"
  >
    Nenhum tutor cadastrado.
  </p>

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
