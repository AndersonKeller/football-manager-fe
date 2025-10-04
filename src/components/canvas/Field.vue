<script setup lang="ts">
import { onMounted } from "vue";
const players = [
  { position: { name: "GK", numbers: ["1"] } },
  { position: { name: "CB", numbers: ["3", "4"] } },
];
const mountPlayers = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  ctx.fillStyle = "yellow";
  ctx.font = "20px serif";
  const mountGoalKeeper = () => {
    ctx.beginPath();
    ctx.arc(16, canvas.height / 2, 12, 0, 180);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();

    ctx.fillStyle = "black";
    ctx.fillText(players[0].position.numbers[0], 10, canvas.height / 2 + 6);
    ctx.fill();
  };
  const mountCentralBack = () => {
    const cbs = players.find((item) => item.position.name === "CB");
    const HEIGTH = canvas.height / (cbs!.position.numbers.length + 1);
    cbs?.position.numbers.forEach((cb, index) => {
      ctx.beginPath();
      ctx.fillStyle = "yellow";
      ctx.arc(72, HEIGTH + index * HEIGTH, 12, 0, 180);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.fillText(cb, 66, HEIGTH + index * HEIGTH + 6);
      ctx.fill();
    });
  };
  mountGoalKeeper();
  mountCentralBack();
  //   canvas.setAttribute("style", "transform:rotate(270deg)");
};
onMounted(() => {
  const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Define a cor da linha (branca)
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2; // Espessura da linha

      // Desenha o contorno do campo
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Desenha a linha do meio-campo
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();

      //circulo central
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, 180);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 3, 0, 10);
      ctx.stroke();

      // AREA ESQUERDA
      ctx.beginPath();
      ctx.moveTo(0, 50);
      ctx.lineTo(150, 50);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(150, 50);
      ctx.lineTo(150, canvas.height - 50);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        150,
        canvas.height / 2,
        50,
        1.6,
        Math.PI + (Math.PI * 1) / 2,
        true
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 50);
      ctx.lineTo(150, canvas.height - 50);
      ctx.stroke();

      //PEQUENA AREA ESQUERDA
      ctx.beginPath();
      ctx.moveTo(0, 125);
      ctx.lineTo(75, 125);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(75, 125);
      ctx.lineTo(75, canvas.height - 125);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 125);
      ctx.lineTo(75, canvas.height - 125);
      ctx.stroke();

      // AREA DIREITA
      ctx.beginPath();
      ctx.moveTo(canvas.width - 150, 50);
      ctx.lineTo(canvas.width, 50);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width - 150, 50);
      ctx.lineTo(canvas.width - 150, canvas.height - 50);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        canvas.width - 150,
        canvas.height / 2,
        50,
        4.7,
        Math.PI + (Math.PI * 3) / 2,
        true
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width - 150, canvas.height - 50);
      ctx.lineTo(canvas.width, canvas.height - 50);
      ctx.stroke();

      //PEQUENA AREA DIREITA
      ctx.beginPath();
      ctx.moveTo(canvas.width - 75, 125);
      ctx.lineTo(canvas.width, 125);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width - 75, 125);
      ctx.lineTo(canvas.width - 75, canvas.height - 125);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width - 75, canvas.height - 125);
      ctx.lineTo(canvas.width, canvas.height - 125);
      ctx.stroke();
      mountPlayers(canvas, ctx);
    }
  }
});
</script>
<template>
  <canvas id="field" width="800" height="400"></canvas>
</template>
<style scoped>
canvas {
  width: 100%;
  max-width: 800px;
  border: 1px solid black;
  background-color: #2c652e; /* Verde para o campo */
}
</style>
