let sortBtn = document.querySelector(".Sort");
let dropDownMenu = document.querySelector(".drop-down-menu");
let quoteGenerateBtn = document.querySelector(".quote-generator button");
let quoteDiv = document.querySelector(".quote");
let nameOFAuthor = document.getElementById("name-oF-author");


dropDownMenu.classList.add("remove");
sortBtn.addEventListener("click",()=>{
    dropDownMenu.classList.toggle("remove");
});

let fetchQuote = async (queryString)=>{
    if(queryString == ""){
    let query = await fetch("https://api.quotable.io/random");
    let quote = await query.json();
    console.log(quote);
    return quote;
    }
    else{
        let query = await fetch(`https://api.quotable.io/search/quotes?fields=tags&query=${queryString}`);
        let quote = await query.json();
        return quote;
    }
}

let generateRandomQuote = async (queryString)=>{
    quoteDiv.innerHTML = "<h3>Loading...</h3>"
    if(queryString == ""){
    let quote = await fetchQuote(queryString);
    quoteDiv.innerHTML = `
    <h1>${quote.content}</h1>
    <br>
    <h3> - By ${quote.author}</h3>
    <br>
    <h3>Type of quote = ${quote.tags}`;
    }
    else {
        let quote = await fetchQuote(queryString);
        if(quote.count == 0) quoteDiv.innerHTML = `<h1>Sorry currently we don't have quotes with this tag ... </h1>`
        else{let randomNumber = Math.floor(Math.random()*quote.count);
        console.log(randomNumber);
    quoteDiv.innerHTML = `
    <h1>${quote.results[randomNumber].content}</h1>
    <br>
    <h3> - By ${quote.results[randomNumber].author}</h3>
    <br>
    <h3>Type of Quote = ${queryString}</h3>`;
        }
    }

}

let listOfAuthors = async ()=>{
    let authors_json = await fetch("https://api.quotable.io/tags");
    let author = await authors_json.json();
    return author;
}

let fillOptions = (author)=>{
    let authorString = ""
    for(let i =0; i<67; i++){
        authorString = authorString + `<option value = "${author[i].name}">${author[i].name}</option>`;
    }
    return authorString;
}

let tryAnd = async ()=>{
let author = await listOfAuthors();

    nameOFAuthor.innerHTML =`${fillOptions(author)}
    `
    
}
tryAnd();


quoteGenerateBtn.addEventListener("click",()=>{
    generateRandomQuote("");
})


// customize quote generator

let submitbtn = document.querySelector(".Submit");
let resetbtn = document.querySelector(".reset");
let quoteSpecificationPopUp = document.querySelector(".quote-specification-pop-up");
let dropDownMenuBtns = document.getElementsByClassName("drop-down-menu-btn");
let mood = document.getElementById("name-oF-author");
let crossIcon = document.querySelector(".fa-regular");

quoteSpecificationPopUp.classList.add("remove");

for(btn of dropDownMenuBtns){
    btn.addEventListener("click",()=>{
        quoteSpecificationPopUp.classList.toggle("remove");
    })
}

let generateSpecificQuote = async (queryMood)=>{
    let query = await fetch(`https://api.quotable.io/search/quotes?fields=tags&query=${queryMood}`);
    let quote = await query.json();
    // console.log(quote.results.length);
    console.log(quote);

}
submitbtn.addEventListener("click",(event)=>{
    event.preventDefault();
    console.log("clicked");
    let queryMood = mood.value;
    generateRandomQuote(queryMood);
    quoteSpecificationPopUp.classList.toggle("remove");
    dropDownMenu.classList.toggle("remove");

    // quoteGenerateBtn.removeEventListener("click",()=>{
    //     generateRandomQuote();
    // });
    // console.log(queryMood);
    // quoteGenerateBtn.addEventListener("click",()=>{
    //     generateSpecificQuote(queryMood);
    // })

})
crossIcon.addEventListener("click",()=>{
    quoteSpecificationPopUp.classList.toggle("remove");
})
