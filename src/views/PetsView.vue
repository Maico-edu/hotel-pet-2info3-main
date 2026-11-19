<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { mensagemErroApi, petService, tutorService } from '@/services/api';

const pets = ref([]);
const tutores = ref([]);
const erro = ref('');
const carregando = ref(false);

async function carregarDados() {
  carregando.value = true;
  erro.value = '';

  try {
    const [listaPets, listaTutores] = await Promise.all([
      petService.listar(),
      tutorService.listar(),
    ]);

    pets.value = listaPets;
    tutores.value = listaTutores;
  } catch (erroApi) {
    erro.value = mensagemErroApi(
      erroApi,
      'Não foi possível carregar pets e tutores.',
    );
  } finally {
    carregando.value = false;
  }
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

  try {
    await petService.excluir(id);
    await carregarDados();
  } catch (erroApi) {
    erro.value = mensagemErroApi(erroApi, 'Não foi possível excluir o pet.');
  }
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
    Carregando pets...
  </p>
  <p
    v-else-if="pets.length === 0"
    class="text-body-secondary"
  >
    Nenhum pet cadastrado.
  </p>

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