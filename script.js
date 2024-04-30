/*Tipos de API a tener en cuenta*/ 
APIRecipe = 'http://www.themealdb.com/api/json/v1/1/search.php?s'   //falta el  =
APIIngredient = 'http://www.themealdb.com/api/json/v1/1/filter.php?i='
APICategory = 'http://www.themealdb.com/api/json/v1/1/filter.php?c='
APINationality = 'http://www.themealdb.com/api/json/v1/1/filter.php?a='

/*Despliegue del menú de opciones de filtrado, por defecto está por plato*/
let OptionFilter = document.querySelector("select");
function updatefilter(API) {
    console.log(API)
}
OptionFilter.onchange = function () {
    /*Se manda señal de qué API usar*/
    OptionFilter.value === "recipe"
    ? updatefilter(APIRecipe)                //true "recipe"
    : OptionFilter.value === "ingredient"
        ? updatefilter(APIIngredient)        //true "ingredient"
        : OptionFilter.value === "category"
            ? updatefilter(APICategory)      //true "category"
            : updatefilter(APINationality);
};

/*Conexion con APIs*/ //por ahora solo con APIRecipe
async function consultarApiRecipe(url){
    try{
        const response = await axios.get(url);
        /*Se pueden hacer validaciones para evitar errores y hacer validacion de estatus*/
        return response.data;
    }catch(error){
        console.error(`fallo la consulta a la api: ${error}`);
        const contError = document.querySelector('.error');
        const contDish = document.querySelector('.request');
        contError.style.display = 'inline-block';
        contDish.style.display = 'none';
    }
}

/*Creación de galería*/
async function crearGalería(name, photo){
    /*
    Función que recibe dos arrays con las imagenes y nombres de
    los diferentes platos a poner en la galería.
    */
    "Se toma el espacio de la galería en el html"
    let DivGallery = document.querySelector('.request');
    "Por cada plato se saca la imagen y la foto para ponerla en espacio anterior"
    for (e in name){
        var newItem = document.createElement("div");
        newItem.setAttribute("class","item");
        var newPhoto = document.createElement("div");
        newPhoto.setAttribute("class","photo");
        var newImg = document.createElement("img");
        newImg.setAttribute("src",photo[e]);
        newPhoto.appendChild(newImg);
        var newDescription = document.createElement("div");
        newDescription.setAttribute("class","description");
        newDescription.innerHTML=name;
        newItem.appendChild(newPhoto);
        newItem.appendChild(newDescription);
        console.log(newItem);
        DivGallery.appendChild(newItem);
        console.log(DivGallery);
    }
    console.log('listo galeria')
}

nam=Array("primer123456789");
phot=Array("images/check-mark.png");
crearGalería(nam, phot);

