fetch('../../dados_risco_sp.json')
  .then(res => res.json())
  .then(data => {
    const mapa = L.map('mapa').setView([-23.56, -46.64], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa);

    let painelHtml = '';

    data.forEach(local => {
      let cor;
      if (local.risco === "Alto") cor = 'red';
      else if (local.risco === "Médio") cor = 'orange';
      else cor = 'green';

      L.circleMarker([local.lat, local.lng], {
        color: cor,
        radius: 10,
        fillOpacity: 0.8
      }).addTo(mapa)
        .bindPopup(`<strong>${local.bairro}</strong><br>${local.tipo_risco}<br>Risco: ${local.risco}`);

      painelHtml += `
        <div>
          <strong>${local.bairro}</strong> - ${local.tipo_risco}<br>
          Chuvas previstas: ${local.chuva_mm} mm<br>
          <span style="color:${cor}">Risco: ${local.risco}</span>
          <hr>
        </div>`;
    });

    document.getElementById('painel').innerHTML = painelHtml;
  });
