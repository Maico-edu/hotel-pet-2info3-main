<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

// chamndo a minha APIA para exibir os dados do tutor
const API_URL = "http://localhost:3000"
const router = useRouter()

//  wxibindo a lista de tutores da aplicação
const tutores = ref([]);

async function carregarTutores() {
        const resposta = await fetch(`${API-URL}/tutores`);
        console.log('tutores', resposta)
        // transformando os valores da minha API para o formato JSON
        tutores.value = await resposta.json();
}
// chamdno a minha API para salvar os dados dos pet
const novoPet = ref({
    nome: "",
    especie: "",
    tutorId: "",
});

async function salvarPet() {
    //  fazendo uma requisição ára o servidor
    await fetch(`${API_URL}/pets`,{
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(novoPet.value),
    }),
    router.push('/pet');
}

onMounted(carregarTutores)
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Listagem de Pets</h1>
      <p class="text-body-secondary mb-0">Cadastro de Pets no sistema.</p>
    </header>

    <!-- <RouterLink
      class="btn btn-primary"
      :to="{ name: 'addPet' }"
    >
      Adicionar Pet
    </RouterLink> -->

    <form @submit.prevent="salvarPet">
        <div class="col-md-6">
            <label for="nome" class="forme-label"
            >nome do Pet</label
        >
        <input 
        type="text"
        id="nome"
        v-model="novoPet.nome"
        class="form-control"
        required
        />
     </div>


     <div class="col-md-6">
        <label for="especie"
        class="form-label"
        >

       
        especie</label
        >

         <select v-model="novoPet.especie" 
        class="form-select"
        required
        >
        </select>
        <select>
        <option value="" disabled>Selecione a espécie</option>
        <option value="Cachorro" >Cachorro</option>
        <option value="Gato">Gato</option>
        </select>

     </div>

     <!-- dividindo os dois -->

     <div class="col-md-6">
        <label for="especie"
        class="form-label"
        >
        selecione um Tutor
       </label
        >

         <select v-model="novoPet.tutorId" 
        class="form-select"
        required
        >
        <option 
        value=""
        disabled>
        Selecione um tutor
        </option>
        </select> 
        <option v-for="tutor in tutores" :key="tutor.id" :value="tutor.id" >{{ tutor.nome }}</option>
     </div>
     <button type="submit" class="btn btn-success">Salvar pet</button>
    </form>

  </div>
</template>

