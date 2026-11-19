<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { mensagemErroApi, petService, tutorService } from '@/services/api';
const router = useRouter();

const tutores = ref([]);
const erro = ref('');
const salvando = ref(false);
const novoPet = ref({
  nome: '',
  especie: '',
  tutorId: '',
});

async function carregarTutores() {
  try {
    tutores.value = await tutorService.listar();
  } catch (erroApi) {
    erro.value = mensagemErroApi(
      erroApi,
      'Não foi possível carregar a lista de tutores.',
    );
  }
}

async function salvarPet() {
  erro.value = '';
  salvando.value = true;

  try {
    await petService.cadastrar(novoPet.value);
    router.push('/pets');
  } catch (erroApi) {
    erro.value = mensagemErroApi(erroApi, 'Não foi possível cadastrar o pet.');
  } finally {
    salvando.value = false;
  }
}

onMounted(carregarTutores);
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Cadastro de Pets</h1>
      <p class="text-body-secondary mb-0">Cadastro de pets no sistema.</p>
    </header>

    <p
      v-if="erro"
      class="alert alert-danger"
      role="alert"
    >
      {{ erro }}
    </p>

    <form
      @submit.prevent="salvarPet"
      class="row g-3"
    >
      <div class="col-md-6">
        <label
          for="nome"
          class="form-label"
        >
          Nome do Pet
        </label>
        <input
          id="nome"
          v-model="novoPet.nome"
          type="text"
          class="form-control"
          required
        />
      </div>

      <div class="col-md-6">
        <label
          for="especie"
          class="form-label"
        >
          Espécie
        </label>
        <select
          id="especie"
          v-model="novoPet.especie"
          class="form-select"
          required
        >
          <option
            value=""
            disabled
          >
            Selecione a espécie
          </option>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
        </select>
      </div>

      <div class="col-md-6">
        <label
          for="tutor"
          class="form-label"
        >
          Tutor
        </label>
        <select
          id="tutor"
          v-model="novoPet.tutorId"
          class="form-select"
          required
        >
          <option
            value=""
            disabled
          >
            Selecione um tutor
          </option>
          <option
            v-for="tutor in tutores"
            :key="tutor.id"
            :value="tutor.id"
          >
            {{ tutor.nome }}
          </option>
        </select>
      </div>

      <div class="col-12">
        <button
          type="submit"
          class="btn btn-success"
          :disabled="salvando"
        >
          {{ salvando ? 'Salvando...' : 'Salvar Pet' }}
        </button>
      </div>
    </form>
  </div>
</template>