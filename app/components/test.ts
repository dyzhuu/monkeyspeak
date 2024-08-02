export {done, not_done}

let text: string[] = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", 'Ut', 'enim', 'ad', 'minim', 'veniam,', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat.', 'Duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', "eu", "fugiat", "nulla", "pariatur", "Excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum."]
let speech: string[] = ["Lorem", "ipsum", "dolor"]
var common = 0
for (let i = 0; i < ((text.length > speech.length)? speech.length: text.length); i++){
    if (text[i].toLowerCase() == speech[i].toLowerCase()){
        common++
    }
    else{
        break
    }
}
var done = text.slice(0, common).join(" ") + " "
var not_done = text.slice(common, text.length).join(" ")