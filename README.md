<h1 align="center">
  <br>
  Genius Game
  <br>
</h1>

<h4 align="center">Teste prático para a posição de Desenvolvedor Front-End na Fehra</h4>

## :information_source: Como usar

Para clonar e executar esta aplicação, você vai precisar ter [Git](https://git-scm.com), [Node.js](https://nodejs.org/) + [Yarn](https://yarnpkg.com/) instalados na sua máquina.

Da sua linha de comando:

### Instalação

```bash
# Clone this repository
$ git clone https://github.com/toledo-livia/bigdashboard

# Go into the repository
$ cd bigdashboard

# Install dependencies
$ yarn install

# Run
$ yarn start

# running on port 3000
```

## :rocket: Regras do Jogo
- Clique no botão JOGAR para começar. 
- O jogo começará 3 segundos após a luz verde acender.
- Genius dará o primeiro comando (botão colorido aleatório irá piscar).
- Repita o sinal clicando no botão da mesma cor.
- Genius irá repetir o primeiro comando e adicionar outro. 
- Repita os dois comandos clicando nos botões da mesma cor na mesma ordem.
- Genius irá reproduzir novamente os dois primeiros comandos e adicionar outro.
- Continue jogando repetindo corretamente os comandos de cada sequência. 
- Nas sequências com o 5º, 9º e 13º comando, o Genius irá acelerar automaticamente os intervalos.
- Se você não repetir a sequência com precisão ou demorar mais de 5 segundos para repetir o primeiro sinal, o Genius piscará todos os 4 botões ao mesmo tempo representando que você perdeu e a sequência terminou.
- Você terá que clicar no botão JOGAR para iniciar um novo jogo.
- O número de comandos repetidos corretamente do jogo anterior será exibido no display à direita do botão JOGAR. 
- A pontuação mais alta de todos os tempos é mostrada no display à esquerda do botão JOGAR.