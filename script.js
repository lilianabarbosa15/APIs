/*Tipos de API a tener en cuenta*/ 
let APIRecipe = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
let APIIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
let APICategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
let APINationality = 'https://www.themealdb.com/api/json/v1/1/filter.php?a='
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

/*Conexion con APIs*/
async function consultarApi(url){
    try{
        //console.log(url);
        const response = await axios.get(url);
        //console.log(response)
        return response.data;
    }catch(error){
        console.error(`fallo la consulta a la api: ${error}`);
        updateWindow(false);
    }
}
async function obtenerDatosDish(url){
    const datos = await consultarApi(url);
    //console.log(datos)
    const Names = new Array();
    const Images = new Array();
    if(Array.isArray(datos.meals)==true){ //datos correctos
        for(let index in datos.meals){
            Names.push((datos.meals)[index].strMeal);
            Images.push((datos.meals)[index].strMealThumb);
            if(index==17){break;} //máximo 18 platos
        }
    }else{
        updateWindow(false);
    }
    //console.log(Names);
    //console.log(Images);
    crearGalería(Names,Images)
}

/*Captura de datos ingresador*/
const searchButton = document.querySelector('.search button');
const searchInput = document.querySelector('.search input');
"3. Escuchador de eventos: "
searchButton.addEventListener( /*Se agrega CallBack, función que se ejecuta en el momento del evento*/
    "click", () => { /*Función anonima para obtener datos del plato*/
        //Se limpia la pantalla de algún error anterior:
        updateWindow(true);
        //Se lee el valor ingresado por el usuario y se verifica levemente:
        let inputData = String(searchInput.value);
        if((APIused.lastIndexOf('c') === APIused.length-2)){        //Por categoría
            if(verifCategory(inputData)){
                obtenerDatosDish(APIused+inputData)
            }
        }else if((APIused.lastIndexOf('i') === APIused.length-2)){  //Por ingrediente
            if(verifIngredient("https://www.themealdb.com/api/json/v1/1/list.php?i=list",inputData)){
                inputData = inputData.replace(/ /g, "_");    
                obtenerDatosDish(APIused+inputData)
            }
        }else if ((APIused.lastIndexOf('a') === APIused.length-2)){ //Por nacionalidad
            if(verifNationality(inputData)){
                obtenerDatosDish(APIused+inputData)
            }
        }else{                                                      //Por plato
            obtenerDatosDish(APIused+inputData);
        }
    }
)

/*Verificación de area/nacionalidad*/
function verifNationality(input){
    const possiblities = Array("American","British","Canadian","Chinese","Croatian",
                            "Dutch","Egyptian","Filipino","French","Greek","Indian",
                            "Irish","Italian","Jamaican","Japanese","Kenyan","Malaysian",
                            "Mexican","Moroccan","Polish","Portuguese","Russian","Spanish",
                            "Thai","Tunisian","Turkish","Unknown","Vietnamese");
    for(p of possiblities){
        if (p.toLowerCase() === input.toLowerCase()){
            return true;
        }
    }
    updateWindow(false);
    return false;
}

/*Verificación de ingrediente*/
async function verifIngredient(url,input){
    const datos = await consultarApi(url);
    //console.log(datos)
    for(let e of datos.meals){
        //console.log(e.strIngredient)
        if(e.strIngredient.toLowerCase() === input.toLowerCase()){
            return true
        }
    }
    updateWindow(false);
    return false;
}

/*Verificación de categoría*/
function verifCategory(input){
    const possiblities = Array("beef","breakfast","chicken","dessert","goat","lamb","miscellaneous",
                                "pasta","pork","seafood","side","starter","vegan","vegetarian");
    for(p of possiblities){
        if (p === input.toLowerCase()){
            return true;
        }
    }
    updateWindow(false);
    return false;
}

/*Actualización de pantalla*/
function updateWindow(state){
    /*
    Recibe una variable booleana donde si es true se actualiza con la
    información nueva del servidor mientras que si es false muestra en
    pantalla que los datos no pudieron ser cargados.
    */
    //Se limpia la pantalla de algún error anterior:
    const contError = document.querySelector('.error');
    const contDish = document.querySelector('.request');
    if (state){
        contError.style.display = 'none';
        contDish.style.display = 'inline-block';
    }else{   //hubo error
        contError.style.display = 'inline-block';
        contDish.style.display = 'none';
    }
   
}

/*Creación de una sola página con información de 1 plato*/
const recipeBox = document.querySelector(".ful-img");
const nameRecipe = document.getElementById("dis-name");
const fulImg = document.getElementById("fulImg");
const linkRecipe = document.querySelector(".link");
async function openFulImg(urlImg, name){
    /*
    Función que recibe la url de la imagen para poder adjuntarla a 
    la página y también recibe el nombre del plato, asimismo, internamente
    llama al servidor para averiguar los ingredientes e instrucciones del 
    plato especifico. Además, llama a otra función (CallBack) con el
    fin de modificar la página con especificaciones de la receta señalada.
    */
    //console.log(recipeBox)
    nameRecipe.innerHTML=name;
    fulImg.src = urlImg
    recipeBox.style.display = "flex";
    const datos = await consultarApi(APIRecipe+name); //arreglar eso porque eso puede tener espacios
    //console.log(datos)
    const ingredientsItem = new Array();
    for(const [key, value] of Object.entries((datos.meals)[0])){
        if(key.startsWith("strIngredient")){
            //console.log(value);
            (value!="" && value!=null) ? ingredientsItem.push(value) : console.log()
        }
    }
    const recipeItem = (datos.meals)[0].strInstructions;
    const linkItem = (datos.meals)[0].strYoutube;
    linkRecipe.href = (datos.meals)[0].strYoutube;
    openDescImg(ingredientsItem,recipeItem)
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
    const ListOld = document.querySelector(".list-dis-ingre");
    ingreRecipe.replaceChild(newList, ListOld);
    //console.log(ingre)
    //console.log(prep)
    for(let i of ingre){
        var newItemList = document.createElement("li");
        newItemList.innerHTML=i;
        newList.appendChild(newItemList);
        //console.log(i)
    }
    ingreRecipe.appendChild(newList);
    var newText = document.createElement("p");
    newText.setAttribute("class","inst-text");
    const oldText = document.querySelector(".inst-text");
    prepRecipe.replaceChild(newText, oldText);

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
    los diferentes platos a poner en la galería. Además de ello,
    también recibe dos arrays donde ingredient es un array de arrays
    e instruction es un array de strings.
    */
    "Se toma el espacio de la galería en el html"
    let DivGallery = document.querySelector('.request');
    "Se crea un subespacio de galería"
    const SubGalery = document.createElement("div");
    SubGalery.setAttribute("class","subgallery");
    "Se reemplaza el subespacio de galería existente"
    const SubGaleryOld = document.querySelector(".subgallery");
    DivGallery.replaceChild(SubGalery, SubGaleryOld);
    //console.log(DivGallery)
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
        //console.log(newItem);
        SubGalery.appendChild(newItem);        
        //console.log(SubGalery);
    }
    DivGallery.appendChild(SubGalery);
}
