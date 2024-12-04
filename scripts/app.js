let selectedLanguage = "en-es";

    function translateWord(word) {
      const languageMapping = {
      "en-es": { source: "english", target: "spanish" },
      "es-en": { source: "spanish", target: "english" }
      };

  const { source, target } = languageMapping[selectedLanguage];

    for (let category in dictionary.categories) {
    const wordData = dictionary.categories[category].find(
    item => item[source].toLowerCase() === word.toLowerCase()
    );
        if (wordData) {
        return {
    translation: wordData[target],
    example: wordData.example
      };
      }
      }
      return { translation: "No encontrado", example: "" };
    }

  document.querySelectorAll("input[name='language']").forEach(radio => {
  radio.addEventListener("change", (e) => {
  selectedLanguage = e.target.value;
  });
  });


  const translate_btn = document.getElementById("translate-btn") 
  translate_btn.addEventListener("click", () => {

  const inputWord = document.getElementById("word-input").value;
  const result = translateWord(inputWord);

  document.getElementById("result-translation").textContent = result.translation;
  document.getElementById("result-description").textContent = result.example;
  });

  //words
  function displayWords(category = "all") {
  const wordList = document.getElementById("word-list");
  wordList.innerHTML = ""; 0

  const categoriesToDisplay = category === "all" ? Object.keys(dictionary.categories) : [category];
  //recore el dicionario
  categoriesToDisplay.forEach(cate => { 

  //recorre el arreglo
  dictionary.categories[cate].forEach(wordData => {

    const li = document.createElement("li");

      if (selectedLanguage === "en-es") {
      li.textContent = `${wordData.english} → ${wordData.spanish}`;
      }  
      else if (selectedLanguage === "es-en") {
      li.textContent = `${wordData.spanish} → ${wordData.english}`;
      }
      //genra en forma de lista lis hijos li
      wordList.appendChild(li);
      });
      });

  }

  document.getElementById("sort-btn").addEventListener("click", () => {
  //guardamos las constantes
  const category = document.querySelector("input[name='category']:checked").value;
  const selectedLanguages = document.querySelector("input[name='language']:checked").value;

  if (selectedLanguages === "en-es") {
    if (category !== "all") {
    dictionary.categories[category].sort((a, b) => a.english.localeCompare(b.english));
    }
      else {
      for (let cate in dictionary.categories) {
      dictionary.categories[cate].sort((a, b) => a.english.localeCompare(b.english));

      }
    }
  displayWords(category);
  }

  if (selectedLanguages === "es-en"){
    if (category !== "all") {
    dictionary.categories[category].sort((a, b) => a.spanish.localeCompare(b.spanish));
      } else {
      for (let cate in dictionary.categories) {
      dictionary.categories[cate].sort((a, b) => a.spanish.localeCompare(b.spanish));
      }
  }
  displayWords(category);
  }



  });

  document.getElementById("sort-btns").addEventListener("click", () => {
  const category = document.querySelector("input[name='category']:checked").value;
  displayWords(category);
  });

  displayWords();


  document.querySelectorAll("input[name='category']").forEach(radio => {
  radio.addEventListener("change", () => {
  displayWords(radio.value);
  });
  });

  //new word

  document.getElementById("add-word-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const englishWord = document.getElementById("new-word-en").value;
  const spanishWord = document.getElementById("new-word-es").value;
  const Example = document.getElementById("new-word-description").value;
  const category = document.getElementById("new-word-category").value;
  const id = dictionary.categories[category].length + 1;

    if (englishWord && spanishWord) {
    dictionary.categories[category].push({
    id,
    english: englishWord,
    spanish: spanishWord,
    example: Example
    });

    displayWords(category);
    } else {
    alert("Por favor, complete todos los campos.");
    }
  });