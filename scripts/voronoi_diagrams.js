//gerando numero total de pontos:
let totalPoints = getRandomInt(100, 5000);



//Criando Voronoi regiões
function voronoi (pieces, points) {
    for(var t in pieces) {
        var tile = pieces[t];
        tile.site = null;
        //para cada ponto, checar o que está mais próximo
        for (s in points){
            var site = points[s];
            var tempdist = distance(tile,site);
            if (tile.site === null || tempdist < distance(tile, tile.site) ){
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

//função para gerar um número inteiro entre o min e max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//função para criar os pontos
function setPoints(totalPoints){
    var points = [totalPoints];
    let x = 0;
    let y = 0;
    for(let i= 0; i<=totalPoints; i++){
        x = getRandomInt(10, 600);
        y = getRandomInt(10, 600);
        if(y === x ){
            y = getRandomInt(10, 600);
        }
        points[i] = {x,y};
    }
    return points;
}