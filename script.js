const apiKey = "40efbaa58a0a19ff3aed9217d6f4c723";

async function buscarClima(){

    const cidade = document.getElementById("cidade").value;

    const urlAtual = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
    const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    const respostaAtual = await fetch(urlAtual);
    const dadosAtual = await respostaAtual.json();

    const respostaPrevisao = await fetch(urlPrevisao);
    const dadosPrevisao = await respostaPrevisao.json();

    mostrarClimaAtual(dadosAtual);
    mostrarPrevisao(dadosPrevisao);
}

function mostrarClimaAtual(dados){

    document.getElementById("climaAtual").innerHTML = `
        <h3>${dados.name}</h3>
        <p>🌡️ ${dados.main.temp}°C</p>
        <p>${dados.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png">
    `;
}

function mostrarPrevisao(dados){

    const previsao = document.getElementById("previsao5dias");
    previsao.innerHTML = "";

    const dias = dados.list.filter(item => item.dt_txt.includes("12:00:00"));

    dias.slice(0,5).forEach(dia => {

        const data = new Date(dia.dt_txt);
        const diaSemana = data.toLocaleDateString("pt-BR",{weekday:"short"});

        previsao.innerHTML += `
            <div class="dia">
                <p>${diaSemana}</p>
                <img src="https://openweathermap.org/img/wn/${dia.weather[0].icon}.png">
                <p>${Math.round(dia.main.temp)}°C</p>
            </div>
        `;
    });
}