// require libraries up here
// const library = require('NAME_OF_LIBRARY')


class Keyfeatures {
  constructor() {

  }

  extractKeywords(str) {
    var keyword_extractor = require("keyword-extractor");
    var sentence = "Value Proposition Summary Noter is a platform that enhances the interview note-taking process. Improving the current user experience, this solution provides multiple tools to help professionals structure and organize conducted interviews. Noter is for all types of interviewers, ranging from recruiters to researchers to journalists. Compared to standard word processors, Noter saves users more time by providing an organizational system tailored specifically for interviews. An editable template system and tags helps reduce clutter and keep data clean. A method for providing aggregate data analysis on interview data also helps users make more informed decisions. The combination of efficiency, organization, and a seamless user interface make Noter the most ideal solution for managing interview documentation."
    var extraction_result = keyword_extractor.extract(sentence,{
                                                                language:"english",
                                                                remove_digits: true,
                                                                return_changed_case:true,
                                                                remove_duplicates: false
 
                                                           });
    
    var arr = []
    var i = 0
    while (i < 15) {
      var x = extraction_result[Math.floor(Math.random() * extraction_result.length)]
      arr.push(x)
      i = i +1
    }
    var extraction_result2 = keyword_extractor.extract(arr.join(" "),{
                                                                language:"english",
                                                                remove_digits: true,
                                                                return_changed_case:true,
                                                                remove_duplicates: true
 
                                                           });
    

    console.log("Key Words Extraction")
    return extraction_result2;
  }

  extractKeyphrases(str) {
    var extract = require('sentence-extractor').extract
    var arr = extract("Value Proposition Summary Noter is a platform that enhances the interview note-taking process. Improving the current user experience, this solution provides multiple tools to help professionals structure and organize conducted interviews. Noter is for all types of interviewers, ranging from recruiters to researchers to journalists. Compared to standard word processors, Noter saves users more time by providing an organizational system tailored specifically for interviews. An editable template system and tags helps reduce clutter and keep data clean. A method for providing aggregate data analysis on interview data also helps users make more informed decisions. The combination of efficiency, organization, and a seamless user interface make Noter the most ideal solution for managing interview documentation.")
    var a = []
    var i = 0
    while (i < 3) {
      var x = arr[Math.floor(Math.random() * arr.length)]
      a.push(x)
      i = i +1
    }
    console.log("Key Phrase Extraction")
    return a
    
  }

  extractSentiment(str) {
    
    return str;
  }
}

module.exports = new Keyfeatures();
