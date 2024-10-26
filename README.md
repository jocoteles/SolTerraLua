# Aplicação AR Multiplayer Sistema Solar

> Status do Projeto: Projeto em fase de desenvolvimento

## Tópicos
- [Objetivo](#Objetivo)
- [Tecnologias, biblioteca e frameworks](#Tecnologias-biblioteca-e-frameworks)
- [A-Frame](#A-Frame)
- [Pré-requisitos](#Pré-requisitos)
- [Transmissão do servidor para os clientes](#Transmissão-do-servidor-para-os-clientes)
- [Organização das pastas](#Organização-das-pastas)
- [Como rodar um exemplo em servidor https usando a estrutura de pastas acima](#Como-rodar-um-exemplo-em-servidor-https-usando-a-estrutura-de-pastas-acima)
- [Copiando pasta de um repositório Github](#Copiando-pasta-de-um-repositório-Github)
- [xecutando aplicação AR Multiplayer Sistema Solar](#xecutando-aplicação-AR-Multiplayer-Sistema-Solar)
- [Socket.io](#Socket.io)
- [Sobre ancoragem no A-Frame](#Sobre-ancoragem-no-A-Frame)
- [Sobre o modo sleep do óculos Meta Quest](#Sobre-o-modo-sleep-do-óculos-Meta-Quest)
- [Check-list de configuração dos óculos](#Check-list-de-configuração-dos-óculos)
- [Tarefas faltantes](#Tarefas-faltantes)

## Objetivo

Este projeto tem como objetivo criar uma experiência educacional multiplayer que visa ensinar de forma interativa o funcionamento do sistema solar.<br>
Inicialmente faremos uma breve introdução ao conceito do web framweork A-Frame, para então apresentar a aplicação de Realidade Aumentada (AR) Multiplayer Sistema Solar.

## Tecnologias, biblioteca e frameworks

- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- [A-Frame](https://aframe.io/)

## A-Frame

"A-Frame é um web framweork para construir experiências de realidade virtual (VR). A-Frame é baseado em HTML, o que o torna simples de começar. Mas o A-Frame não é apenas um gráfico de cena 3D ou uma linguagem de marcação, seu núcleo é uma estrutura poderosa de entidade-componente que fornece uma estrutura declarativa, extensível e componível para three.js" (AFRAME, 2023, tradução nossa).

### Modelo de projeto A-Frame
Sugere-se para iniciar um projeto A-Frame a estruturação de pastas da seguinte forma.<br>
![ExemplodeOrganizaçãoDeProjetoAframe](/exemploOrganizacaoDeProjetosAframe.png)

### Desenvolvimento baseado em componentes (ECS)

Para construir aplicativos de realidade aumentada (Virtual Real, VR), recomendamos colocar todo o código do aplicativo dentro de componentes, pois uma base de código A-Frame ideal consiste puramente em componentes modulares, encapsulados e desacoplados. Esses componentes podem ser testados em unidade isoladamente ou junto com outros componentes.

### Começando com A-Frame

O A-Frame pode ser desenvolvido a partir de um arquivo simples em HTML e pode ser executado facilmente na maioria dos navegadores. Para poder fazer uso do A-Frame, basta importa-lo no `head` do arquivo HTML com o seguinte código: `<script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>`<br>
Um exemplo simples de arquivo A-Frame pode ser observado a seguir:

```
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>A-frame</title>

      <!-- Importação da biblioteca A-Frame -->
      <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>

  </head>

  <body>
      <!-- Exemplo básico de objetos A-frame -->
      <a-scene>
        <a-camera position="0 1.6 0">
            <a-cursor></a-cursor>
        </a-camera>
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
        <a-sky color="#ECECEC"></a-sky>
      </a-scene>
  </body>
</html>
```

### Executar projeto A-Frame em servidor local

Pode-se executar a estrutura básica de um projeto A-Frame da seguinte forma:
1) Acesse pelo terminal do computador o diretório em que o projeto está alocado.
2) Execute o comando `npm i -g five-server@latest && five-server --port=8000`.
3) A partir disso abra o navegador e acesse `http://127.0.0.1:8000/`.
4) Por fim, escolha o arquivo HTML a ser executado.


## Multiplayer Sistema Solar

A partir deste ponto pretende-se apresentar a documentação dos projeto de Realidade Aumentada (AR) Multiplayer Sistema Solar.

## Pré-requisitos

Para iniciar o servidor em https são necessários os seguintes pré-requisitos:
1. __http-server__:
    - Para instalar o pacote node __http-server__ caso ainda não esteja instalado basta executar o comando: `npm install --global http-server`
2. Ter um certificado SSL. 
    - Para criar um certificado SSL execute o comando: `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`. 
    - O certificado terá validade pelo número de `days` indicado (3650, no exemplo).

## Transmissão do servidor para os clientes

Para transmitir uma aplicação em rede local via wi-fi hotspot do computador do servidor para as máquinas clientes é necessário realizar sua configuração:

### Distribuição Windows

#### __Configuração por Prompt de Comando (CMD)__

1. Abrao CMD como administrador.
2. Configure o hotspot com o nome da rede (SSID) e a senha (key) com o comando: `netsh wlan set hostednetwork mode=allow ssid=NomeDaRede key=SenhaDaRede`.
    - ssid=NomeDaRede: Defina o nome da sua rede Wi-Fi.
    - key=SenhaDaRede: Defina a senha da rede Wi-Fi
3. Inicie o hotspot com o seguinte comando: `netsh wlan start hostednetwork`

#### __Configuração via interface gráfica do Windows__

1. Acesse as configurações do windowns ou pressione `windows + i`.
2. Acesse as configurações de rede e internet.
3. Acesse hotspot móvel e realize a configuração de nome e senha da rede.
4. Libere o acesso.

#### __Dificuldade encontrada no Windows__
Pode ser que em algumas versões do windows exista uma dificuldade de executar o hotspot wifi. Para isso deve-se fazer um check-up inicial e verificar se o driver aceita hospoder rede.

1. Verificar drivers habilitados hospedagem de rede: `netsh wlan show drivers`
2. Verifique se a resposta em __Hosted network supported__ é YES
3. Se for NÃO, tente entrar no gerenciador de dispositivo e atualizar os adaptadores de rede
4. Caso o adaptador de rede ainda não permita o Hotspot como servidor, tente instalar algum desses drives "Microsoft Hosted Network Virtual Adapter" ou "Microsoft Virtual WiFi Miniport Adapter."


### Distribuição Linux

1. Ligue o Wi-Fi Hotspot na configuração wifi do ubuntu. É possível, também, ligá-lo pela linha de comando com `nmcli connection up <SSID>`, em que `<SSID>` é o nome da rede. 
2. Iniciar o servidor em https com o comando: `http-server -S -C cert.pem -o`
3. O `http-server` fornece dois endereços. Somente o endereço mais curto é acessível do cliente conectado na rede wi-fi hotspot do servidor. Exemplo: `https://10.42.0.1:8080`
4. No dispositivo cliente, conectar na rede hotspot do servidor (se tiver acesso a 4G, desabilitá-lo, senão ele vai tentar conectar no 4G para buscar internet).
5. Acessar o endereço informado no passo 3. No primeiro acesso, apesar do https, o browser informará que a conexão não é segura. Basta entrar na opção de modo inseguro e nas próximas vezes essa confirmação não será mais solicitada.

#### __Configurar Hotspot pelo terminal__
Em alguns casos pode ser necessário redefinir as configurações do Hotspot do seu computador pelo terminal de comando do Linux, para isso basta seguir os passos:
1. Execute o comando `ifconfig -a` para encontrar o nome da interface de rede de seu computador, geralmente ela aparece no último tópico e inicia-se com `wl`.
2. Crie seu Hotspot com a execução do comando: `nmcli dev wifi hotspot ifname <interface> ssid <nome_do_hotspot> password <senha>`. 
    - Observe o exemplo: `nmcli dev wifi hotspot ifname wlan0 ssid MeuHotspot password minhaSenha123`
3. Inicie o Hotspot com o comando `nmcli dev wifi hotspot ifname <interface> ssid <nome_do_hotspot> password <senha>`
Observação: Caso a conexão com o hotspot não funcione, reinicie o serviço com `sudo systemctl restart NetworkManager` e tente novamente. 

#### __Dificuldades com o Linux Mint__

As instruções acima funcionam bem com a distribuição Ubuntu do Linux, mas na versão Mint pode ocorrer algumas dificuldades. Para contornar esse problemas pode-se rodar o servidor da seguinte maneira:

1. Editar a conexão de rede e escolher Hotspot(ou ponto de acesso em PT) em Wi-Fi mode. 
2. Em Wi-fi Security, usar Enhanced Open. (Observação: Nenhum protocolo de segurança funcionou, por isso tivemos que deixar aberto).
3. No navegador do oculus quest escreva o endereço completo sem esquecer do https, por exemplo: `https://10.42.0.1:8080`

## Organização das pastas

- **ssl**. Arquivos dos certificados ssl
- **threejs**. Arquivos da biblioteca Three.js
- **basicThreeJs**. Exemplo básico do getting started no site do Three.js.
- **webxr_ar_cones**. Exemplo de AR no site do Three.js. Exemplo já testado e usado como ensaio básico de servidor local no notebook para o cliente no óculos.

## Como rodar um exemplo em servidor https usando a estrutura de pastas acima

A partir do diretório raiz do projeto rodar o script `runServer.sh` e escolher a pasta do exemplo de interesse na aba do navegador de internet que será aberta.

## Copiando pasta de um repositório Github

Para baixar pastas específicas de um repositório GitHub, como pastas de exemplos, basta acessar o site https://kinolien.github.io/gitzip/ e colar o endereço completo da pasta para baixar o seu conteúdo com arquivo zip.

## Executando aplicação AR Multiplayer Sistema Solar

### Sistema de referência comum para todos os óculos

Não encontrei uma ferramenta que crie um mesmo sistema de referência baseado no ambiente real para todos os óculos. Mas é possível obter um bom resultado com os seguintes procedimentos.

- Marcar uma fronteira no ambiente parecida (embora não seja crítico o tamanho).
- Iniciar a marcação e confirmar a marcação estando na mesma posição e olhando para a mesma direção em todos os óculos.
- Para garantir que posicionamentos anteriores não sejam usados pelo A-Frame, limpar o cache do navegador.
- Incluir a opção `real-world-meshing` em `<a-scene>`. Isso não necessariamente ajuda com o posicionamento e orientação comuns a todos os óculos, mas faz com que os objetos tenham tamanhos e posições em metros no ambiente.
- A origem do sistema de coordenadas é nos pés da pessoa quando ela confirmou a fronteira. A orientação é +z na direção das costas, +x à direita e +y para cima. Ou seja, é um sistema levogiro.
- Cuidado para não recentralizar a cena em local errado ao abrir o menu padrão do óculus em modo VR ou AR. Se isso acontecer, tem que apagar o cache e recarregar a página.

## Socket.io

Para inicializar um projeto com Socket.io e Express.js:

1) Na raiz da pasta do projeto criar o arquivo package.json com o conteúdo:
```json
{
  "name": "Project name",
  "version": "0.0.1",
  "description": "Project description",
  "type": "module",
  "dependencies": {}
}
```

2) Instalar o Express.js:
```bash
npm install express@4
```

3) Instalar o Socket.io:
```bash
npm install socket.io
```

4) Os arquivos básicos do projeto serão `index.js` e `index.html`. A estrutura básica do arquivo `index.js` será:
```js
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

import { readFileSync } from "fs";
import { createServer } from "https";

   
const app = express();
const httpsServer = createServer({
    key: readFileSync('../ssl/key.pem'),
    cert: readFileSync('../ssl/cert.pem')
  }, app);
const io = new Server(httpsServer);

//Inclusão da pasta aframe para acesso no index.html:
app.use('/aframe', express.static('../aframe/'));
//Inclusão da pasta raiz deste projeto para acesso no index.html
app.use('/', express.static('./'));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    socket.on('messageLabel', (msg) => {
      io.emit('messageLabel', msg);
    });
  });

const port = 8080;
httpsServer.listen(port, () => {
  console.log(`server running at https://127.0.0.1:${port} and https://10.42.0.1:${port}`);
});
```
5) Acesse a pasta do projeto sistemaSolar

6) Inicie o servidor com o comando: `node index.js`.

7) Acesse pelo óculos o wifi-hotspot liberado pelo seu computador

8) Acesse o navegador do óculos e digite `https://10.42.0.1:8080`

## Sobre ancoragem no A-Frame

- Para ancorar objetos ao mundo real, deve-se incluir a opção `anchored="persistent: true"` a uma `<a-entity>`. A princípio não funciona para uma `<a-entity>` que encapsule toda a cena. Tem que ancorar cada objeto individualmente ou ir testando para grupos de objetos.
- Com a ancoragem setada, mesmo deixando o oculus no modo descanso e/ou reabrindo o browser, a ancoragem é mantida. Salvo alguns bugs que ocorrem de vez em quando. Para evitá-los, o ideal é não deixar o oculus entrar em modo sleep.
- Para recentralizar os objetos e assim restabelecer uma nova ancoragem, deve limpar o cache do browser e restabelecer uma nova centralização pelo comando do próprio oculus (ícone de setas cima/baixo-esquerda/direita).

## Sobre o modo sleep do óculos Meta Quest

- Ir em settings e fazer a busca com a ferramenta de lupa pela palavra *power*. Setar os tempos de sleep e descanso para um tempo longo o suficiente para que o óculos não desligue no intervalo de troca de usuários.

- Para entrar no modo sleep mesmo antes do tempo automático, basta clicar no botão físico de ligar.

## Check-list de configuração dos óculos

- Configurar o hand tracking.
- Configurar o passthrough.
- Configurar o power sleep.

## Tarefas faltantes

- Deixar a cor do beiral diferente entre os pares de paredes para deixar menos homogêneo. Usar cores mais cinzas e talvez mais escuras.
