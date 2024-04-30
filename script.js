/*Tipos de API a tener en cuenta*/ 
let APIRecipe = 'http://www.themealdb.com/api/json/v1/1/search.php?s='
let APIIngredient = 'http://www.themealdb.com/api/json/v1/1/filter.php?i='
let APICategory = 'http://www.themealdb.com/api/json/v1/1/filter.php?c='
let APINationality = 'http://www.themealdb.com/api/json/v1/1/filter.php?a='
let APIused = APIRecipe

/*Despliegue del menú de opciones de filtrado, por defecto está por plato*/
let OptionFilter = document.querySelector("select");
function updatefilter(API) {
    console.log(API)
    APIused = API
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
        /*Validación de estatus*/

        return response.data;
    }catch(error){
        console.error(`fallo la consulta a la api: ${error}`);
        const contError = document.querySelector('.error');
        const contDish = document.querySelector('.request');
        contError.style.display = 'inline-block';
        contDish.style.display = 'none';
    }
}


/*Captura de datos ingresador*/
const searchButton = document.querySelector('.search button');
const searchInput = document.querySelector('.search input');
"3. Escuchador de eventos: "
searchButton.addEventListener( /*Se agrega CallBack, función que se ejecuta en el momento del evento*/
    "click", () => { /*Función anonima para obtener datos del plato*/
        const inputData = searchInput.value;          /*.textContent; cuando está dentro de etiquetas*/
        
        console.log(APIused.length-2)
        console.log(APIused.lastIndexOf('s'))
        //verificar info.
        /*
        const url_api = "";
        (APIused.lastIndexOf('s') === APIused.length-2) ?

        const url = `${inputData}`;
        console.log(url);*/
        //obtenerDatosClima(url);
    }

)






















/*Creación de una sola página con información de 1 plato*/
const recipeBox = document.querySelector(".ful-img");
const nameRecipe = document.getElementById("dis-name");
const fulImg = document.getElementById("fulImg");
function openFulImg(urlImg, name){
    /*
    Función que recibe la url de la imagen para poder adjuntarla a 
    la página y también recibe el nombre del plato.
    */
    console.log(recipeBox)
    nameRecipe.innerHTML=name;
    fulImg.src = urlImg
    recipeBox.style.display = "flex";
}
const ingreRecipe = document.getElementById("dis-ingre");
const prepRecipe = document.getElementById("dis-reci");
function openDescImg(ingre,prep){
    /*
    Función que recibe 2 el elementos donde el primero corresponde
    a un array con cada uno de los ingredientes de la receta en
    preparación y el segundo corresponde a un string con toda la
    información de la preparación. Altera página con esa info.
    */
    var newList = document.createElement("ul");
    newList.setAttribute("class","list-dis-ingre");
    for(let i of ingre){
        var newItemList = document.createElement("li");
        newItemList.innerHTML=i;
        newList.appendChild(newItemList);
        console.log(i)
    }
    ingreRecipe.appendChild(newList);
    var newText = document.createElement("p");
    newText.innerHTML=prep;
    prepRecipe.appendChild(newText);
}
function closeImg(){
    recipeBox.style.display = "none";
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
    for (let e in name){
        var newItem = document.createElement("div");
        newItem.setAttribute("class","item");
        var newPhoto = document.createElement("div");
        newPhoto.setAttribute("class","photo");
        var newImg = document.createElement("img");
        newImg.setAttribute("src",photo[e]);
        newImg.setAttribute("name",name[e]);
        newImg.setAttribute("onclick","openFulImg(this.src, this.name)");
        newPhoto.appendChild(newImg);
        var newDescription = document.createElement("div");
        newDescription.setAttribute("class","description");
        newDescription.innerHTML=name[e];
        newItem.appendChild(newPhoto);
        newItem.appendChild(newDescription);
        console.log(newItem);
        DivGallery.appendChild(newItem);
        console.log(DivGallery);
    }
    console.log('listo galeria')
}





























nam=Array("primer123456789","second","tervero","cuarto","5","6to","7mo","octavo",
"primer123456789","second","tervero","cuarto","5","6to","7mo","octavo");
phot=Array("images/check-mark.png","images/img1.png","images/img2.png",
        "images/img3.png","images/img4.png","images/img5.png","images/img6.png"
        ,"images/img7.png","images/img8.png","images/check-mark.png","images/img1.png","images/img2.png",
        "images/img3.png","images/img4.png","images/img5.png","images/img6.png"
        ,"images/img7.png","images/img8.png");
ing=Array("images/check-mark.png","images/img1.png","images/img2.png",
        "images/img3.png","images/img4.png","images/img5.png","images/img6.png"
        ,"images/img7.png","images/img8.png","images/check-mark.png","images/img1.png","images/img2.png",
        "images/img3.png","images/img4.png","images/img5.png","images/img6.png"
        ,"images/img7.png","images/img8.png");
prep=Array("images/check-mark.png","images/img1.png","images/img2.png",
"images/img3.png","images/img4.png","images/img5.png","images/img6.png"
,"images/img7.png","images/img8.png","images/check-mark.png","images/img1.png","images/img2.png",
"images/img3.png","images/img4.png","images/img5.png","images/img6.png"
,"images/img7.png","images/img8.png");

ArrayInfo = Array(nam,phot,ing,prep);
crearGalería(nam, phot);
necesita = Array("qwe","segundooo","tercerooo");
openDescImg(necesita,"holas que más,esta es la prepa de esta vaina");
