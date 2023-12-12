//let totalPoints = getRandomInt(100, 5000);
//let sites = setSites(totalPoints);
//fillVoronoi (sites);
//
//// Exibindo informações dos pontos após a função fillVoronoi
//console.log("Pontos de Voronoi:");
//for (let i = 0; i < sites.length; i++) {
//    let site = sites[i];
//    console.log(`Ponto ${i + 1}: Coordenadas (${site.x}, ${site.y}), Semente: (${site.site.x}, ${site.site.y})`);
//}

//Funções
//função para gerar um número inteiro entre o min e max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//função para criar os pontos
function setSites(totalSites) {
    let sites = new Array(totalSites);
    let x = 0;
    let y = 0;
    for (let i = 0; i < totalSites; i++) {
        x = getRandomInt(10, 600);
        y = getRandomInt(10, 600);
        sites[i] = { x, y };
    }
    return sites;
}

//Criando Voronoi regiões
function fillVoronoi (sites) {
    for(let t in sites) {
        let tile = sites[t];
        tile.site = null;
        //Then, for each player we will check if it's the nearest:
        for (let s in sites){
            let site = sites[s];
            let tempDist = distance(tile,site);
            if (tile.site === null || tempDist < distance(tile, tile.site) ){
                tile.site = site; // Update site owner
            }
        }
    }
}


/*
 Parameters:
   a: With two components: a[0] and a[1], 'x' and 'y' coordinates
   b: With two components: b[0] and b[1], 'x' and 'y' coordinates
 Returns: Euclidean Distance value.
*/
//calculo da distancia euclasiana para definir a distancia entre pontos
function distance(a, b) {
    var dx = b[0] - a[0];
    var dy = b[1] - a[1];
    return Math.sqrt(dx * dx + dy * dy); // Euclidean distance formula
}