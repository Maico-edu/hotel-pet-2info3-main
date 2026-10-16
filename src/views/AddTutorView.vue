
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const API_URL = 'http://localhost:3000';
const router = useRouter();

const novoTutor = ref({
  nome: '',
  telefone: '',
  Email: '',
  Cpf: '',
});

async function salvarTutor() {
  await fetch(`${API_URL}/tutores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(novoTutor.value),
  });

  router.push('/tutores');
}
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Cadastro de Tutor</h1>
      <p class="text-body-secondary mb-0">Cadastro de tutores no sistema</p>
      <h3><br /> Dados do Tutor <br /></h3>
    </header>

    <form
      @submit.prevent="salvarTutor"
      class="row g-3"
    >
      <div class="col-md-6">
        <label
          for="nomeTutor"
          class="form-label"
        >
          ID
        </label>
        <input
          id="nomeTutor"
          v-model="novoTutor.nome"
          type="text"
          class="form-control"
          placeholder="Gerado automaticamente"
          required
        />
      </div>

      <div class="col-md-6">
        <label
          for="telefoneTutor"
          class="form-label"
        >
          Nome Completo
        </label>
        <input
          id="nomeTutor"
          v-model="novoTutor.nome"
          type="text"
          class="form-control"
          placeholder="Digite o nome completo"
          required
        />
      </div>

      <div class="col-md-6">
        <label
          for="telefoneTutor"
          class="form-label"
        >
          CPF / CNPJ
        </label>
        <input
          id="cpfTutor"
          v-model="novoTutor.Cpf"
          type="text"
          class="form-control"
          placeholder="digite CPF ou CNPJ"
          required
        />
      </div>

      <div class="col-md-6">
        <label
          for="telefoneTutor"
          class="form-label"
        >
          Telefone / Celular / WhatsApp
        </label>
        <input
          id="telefoneTutor"
          v-model="novoTutor.telefone"
          type="tel"
          class="form-control"
          placeholder="(00) 0000-0000"
          required
        />
      </div>

      <div class="col-md-6">
        <label
          for="telefoneTutor"
          class="form-label"
        >
          E-mail
        </label>
        <input
          id="emailTutor"
          v-model="novoTutor.Email"
          type="email"
          class="form-control"
          placeholder="nome@exemplo.com"
          required
        />
      </div>

      <div class="col-md-6">
        <label
          for="telefoneTutor"
          class="form-label"
        >
          Data de Nascimento
        </label>
        <input
          id="dataNascimentoTutor"
          v-model="novoTutor.dataNascimento"
          type="date"
          class="form-control"
          placeholder=""
          required
        />
      </div>

      <!-- aqui começa a parte da moradia/ Endereço do cidadao -->

      <h3><br /> Endereço <br /></h3>

      <div class="col-md-6">
        <label
          for="ruaTutor"
          class="form-label"
        >
          Rua
        </label>
        <input
          id="ruaTutor"
          v-model="novoTutor.rua"
          type="text"
          class="form-control"
          placeholder="Digite o nome da rua"
          required
        />
      </div>

      <div class="col-md-6">
        <label
          for="telefoneTutor"
          class="form-label"
        >
          Numero (Casa / Apartamento)
        </label>
        <input
          id="numeroTutor"
          v-model="novoTutor.numero"
          type="text"
          class="form-control"
          placeholder="Número"
          required
        />
      </div>

      <div class="col-md-6">
        <label
          for="telefoneTutor"
          class="form-label"
        >
          Bairro
        </label>
        <input
          id="bairroTutor"
          v-model="novoTutor.bairro"
          type="text"
          class="form-control"
          placeholder="Digite o bairro"
          required
        />
      </div>

      <div class="col-md-6">
        <label
          for="telefoneTutor"
          class="form-label"
        >
          Cidade
        </label>
        <input
          id="cidadeTutor"
          v-model="novoTutor.cidade"
          type="text"
          class="form-control"
          placeholder="Digite a cidade"
          required
        />
      </div>

      <div class="col-md-6">
        <label
          for="telefoneTutor"
          class="form-label"
        >
          Estado
        </label>
        <input
          id="estadoTutor"
          v-model="novoTutor.estado"
          type="text"
          class="form-control"
          placeholder="Digite o estado"
          required
        />
      </div>

      <div class="col-md-6">
        <label
          for="telefoneTutor"
          class="form-label"
        >
          CEP
        </label>
        <input
          id="cepTutor"
          v-model="novoTutor.cep"
          type="number"
          class="form-control"
          placeholder="00000-000"
          required
        />
      </div>

      <div class="">
        <div class="">
          <button
            type="button"
            @click="router.push('/tutores')"
            class="vsfd"
          >
            cancelar
          </button>
        </div>

        <div class="col-12">
          <button
            type="submit"
            class="vsfd"
          >
            Cadastrar Tutor
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
