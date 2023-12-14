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
        x = getRandomInt(-5, 5);
        y = getRandomInt(-5, 5);
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
//calculo da distancia euclidiana para definir a distancia entre pontos
function distance(a, b) {
    var dx = b[0] - a[0];
    var dy = b[1] - a[1];
    return Math.sqrt(dx * dx + dy * dy); // Euclidean distance formula
}

//gerando os poligonos
function getVoronoiCellVertices(pointIndex, sites) {
    const cellVertices = [];
    const site = sites[pointIndex]; // O ponto para o qual estamos criando a célula

    for (let j = 0; j < totalPoints; j++) {
        if (j !== pointIndex) {
            const neighborSite = sites[j];
            // Encontre a interseção das linhas entre o site atual e seu vizinho
            const intersection = findLineIntersection(site, neighborSite);

            if (intersection !== null) {
                // Adicione os vértices da aresta entre o site atual e seu vizinho
                cellVertices.push(intersection.x, intersection.y);
            } else {
                // Se a interseção for null, adicione diretamente os vértices dos pontos vizinhos
                cellVertices.push(neighborSite.x, neighborSite.y);
            }
        }
    }
    return cellVertices;
}

// Função para encontrar a interseção entre as linhas formadas pelos pontos
function findLineIntersection(point1, point2) {
    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;

    // Verifique se as linhas são verticais
    if (x1 === x2) {
        // Linhas são paralelas ou coincidentes
        return null;
    }
    // Verifique se as linhas são horizontais
    if (y1 === y2) {
        // Linhas são paralelas ou coincidentes
        return null;
    }
    // Calcule as inclinações das linhas
    const m1 = (y2 - y1) / (x2 - x1);
    // Calcule as interceptações y
    const b1 = y1 - m1 * x1;
    // Ponto de interseção y para linhas horizontais
    const y = y1;
    // Ponto de interseção x
    const x = (y - b1) / m1;
    // Verifique se o ponto de interseção está dentro do intervalo dos segmentos de linha
    if (
        (x >= Math.min(x1, x2) && x <= Math.max(x1, x2)) &&
        (y >= Math.min(y1, y2) && y <= Math.max(y1, y2))
    ) {
        return { x, y };
    } else {
        // As linhas não se intersectam dentro do intervalo dos segmentos de linha
        return null;
    }
}