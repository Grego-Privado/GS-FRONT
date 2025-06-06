const API_KEY = '14d0382101f97dbf642f275bdf705bd8';

const bairros = [
  { nome: "Capão Redondo", tipo_risco: "Deslizamento", lat: -23.6815, lon: -46.7903 },
  { nome: "Jardim Ângela", tipo_risco: "Deslizamento", lat: -23.6736, lon: -46.7359 },
  { nome: "Mooca", tipo_risco: "Alagamento", lat: -23.5614, lon: -46.5975 },
  { nome: "Barra Funda", tipo_risco: "Alagamento", lat: -23.5254, lon: -46.6639 },
  { nome: "Itaquera", tipo_risco: "Alagamento", lat: -23.5446, lon: -46.4695 },
  { nome: "Pinheiros", tipo_risco: "Alagamento", lat: -23.5617, lon: -46.7011 },
  { nome: "São Mateus", tipo_risco: "Deslizamento", lat: -23.5860, lon: -46.4282 },
  { nome: "Vila Mariana", tipo_risco: "Alagamento", lat: -23.5894, lon: -46.6341 },
  { nome: "Cidade Tiradentes", tipo_risco: "Deslizamento", lat: -23.5692, lon: -46.4108 },
  { nome: "Lapa", tipo_risco: "Alagamento", lat: -23.5270, lon: -46.7059 }
];

const map = L.map('map').setView([-23.56, -46.64], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function classificarRisco(chuva, tipo) {
  if (tipo === "Deslizamento") {
    if (chuva >= 80) return "Alto";
    if (chuva >= 40) return "Médio";
    return "Baixo";
  } else {
    if (chuva >= 60) return "Alto";
    if (chuva >= 30) return "Médio";
    return "Baixo";
  }
}

async function buscarPrevisao(bairro) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${bairro.lat}&lon=${bairro.lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
  const resp = await fetch(url);
  const data = await resp.json();

  let chuva = 0;
  for (let i = 0; i < 8; i++) {
    const entrada = data.list[i];
    if (entrada.rain && entrada.rain['3h']) {
      chuva += entrada.rain['3h'];
    }
  }

  return {
    ...bairro,
    chuva_mm: chuva.toFixed(1),
    risco: classificarRisco(chuva, bairro.tipo_risco)
  };
}

async function carregarMapa() {
  for (const bairro of bairros) {
    const dados = await buscarPrevisao(bairro);

    let cor = dados.risco === "Alto" ? "red" : dados.risco === "Médio" ? "orange" : "green";

    L.circleMarker([dados.lat, dados.lon], {
      color: cor,
      radius: 10,
      fillOpacity: 0.8
    })
    .addTo(map)
    .bindPopup(`
      <strong>${dados.nome}</strong><br>
      Tipo: ${dados.tipo_risco}<br>
      Chuva: ${dados.chuva_mm} mm<br>
      Risco: <span style="color:${cor}">${dados.risco}</span>
    `);
  }
}

carregarMapa();


