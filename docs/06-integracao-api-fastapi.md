# Integração planejada com a API FastAPI

O frontend usa o serviço `src/services/api.js` para concentrar as chamadas
HTTP. A URL padrão é `http://127.0.0.1:8000`; ela pode ser substituída sem
alterar o código criando um arquivo `.env.local` na raiz:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Reinicie o Vite depois de alterar essa variável. O backend ainda não faz parte
desta etapa.

Enquanto o FastAPI não estiver pronto, para continuar usando o JSON Server do
projeto, configure `.env.local` com `VITE_API_BASE_URL=http://localhost:3000`.
Assim, as telas continuam usando os mesmos caminhos e podem ser alternadas entre
os dois servidores sem editar o código.

## Endpoints propostos para manter as telas atuais

As rotas abaixo são uma proposta baseada nas operações já presentes no Vue e no
JSON Server. O FastAPI deverá fornecer:

| Método | Rota | Uso |
| --- | --- | --- |
| `GET` | `/pets` | Listar pets. |
| `GET` | `/pets/{id}` | Consultar um pet. |
| `POST` | `/pets` | Cadastrar um pet. |
| `DELETE` | `/pets/{id}` | Excluir um pet. |
| `GET` | `/tutores` | Listar tutores. |
| `GET` | `/tutores/{id}` | Consultar um tutor. |
| `POST` | `/tutores` | Cadastrar um tutor. |
| `DELETE` | `/tutores/{id}` | Excluir um tutor. |

O cadastro de pet envia os campos já usados pela aplicação:

```json
{
  "nome": "Nome do pet",
  "especie": "Cachorro",
  "tutorId": "id-do-tutor"
}
```

O cadastro de tutor envia `nome`, `telefone`, `Email`, `Cpf`,
`dataNascimento`, `rua`, `numero`, `bairro`, `cidade`, `cep` e `estado`, de
acordo com os campos atualmente presentes no formulário. O backend deve gerar
e devolver o `id`; o frontend não o envia no cadastro.

As consultas de coleção devem responder com listas JSON. As consultas por ID e
os cadastros devem responder com um objeto JSON contendo os campos do registro
e seu `id`. As exclusões podem responder com status `204` sem conteúdo.

Não há tela de edição funcionando nesta versão: o botão “Editar” da listagem
de pets abre a tela de consulta. Por isso, ainda não foram propostas rotas
`PUT` ou `PATCH`.

## Observações para o backend

- Configure CORS para permitir a origem local usada pelo Vite, normalmente
  `http://localhost:5173`.
- Use `tutorId` para representar a relação entre pet e tutor, como já ocorre
  nos dados atuais.
- Defina no backend se a exclusão de um tutor associado a pets será bloqueada;
  nesse caso, responda com um erro HTTP que explique o motivo.
- A aplicação apresenta erros de conexão, validação e status HTTP recebidos
  pela API, em vez de tratar falhas como sucesso.

## O que falta para concluir a integração

1. Implementar os endpoints e a validação de dados no FastAPI.
2. Criar os modelos e tabelas no MySQL e definir a geração dos IDs e a relação
   entre pets e tutores.
3. Configurar a conexão FastAPI–MySQL e o CORS.
4. Testar a API e o frontend juntos, incluindo consultas, cadastros, exclusões
   e respostas de erro.
