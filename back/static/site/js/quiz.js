class Quiz
{
    constructor()
    {
        this.name = "";
        this.time = 60;
        this.topic = "";
        this.description = "";
        this.is_public = 1;
        this.qntP = 0;

        this.keyP = 1; //Índice de criação (apenas front)
    }
}

class Pergunta
{
    constructor()
    {
        this.text = "";
        this.qntA = 0;
        this.alternatives = new Object();

        this.keyA = 1; //Índice de criação (apenas front)
    }
}

class Alternativa
{
    constructor()
    {
        this.text = "";
        this.is_correct = 0;
        this.points = 100;
    }
}


var quiz = new Quiz();
var questions = new Object();

function novaPergunta()
{
    var html = document.querySelector("#perguntaModel").innerHTML, index = quiz.keyP;
    html = html.replaceAll("$", index).replaceAll("@", "1");

    var element = document.createElement("div");
    element.innerHTML = html;

    document.querySelector("#perguntas").appendChild(element);

    var pergunta = new Pergunta();
    criarAlternativa(pergunta, index);
    questions["p"+index] = pergunta;
    quiz.qntP += 1;
    quiz.keyP += 1;
}

function novaAlternativa(pid)
{
    var html = document.getElementById("altsP$").innerHTML, index = questions["p"+pid].keyA;
    html = html.replaceAll("$", pid).replaceAll("@", index);

    var element = document.createElement("div");
    element.innerHTML = html;

    document.querySelector("#altsP"+pid).appendChild(element);
    criarAlternativa(questions["p"+pid], pid);
}

function removerPergunta(pid)
{
    delete questions["p"+pid];
    document.getElementById("p"+pid).remove();
    quiz.qntP -= 1;
}

function removerAlternativa(pid, aid)
{
    if(questions["p"+pid].qntA == 1)
        return false;

    //perguntas[pid-1].alternativas.splice(aid-1, 1);
    delete questions["p"+pid].alternatives["p"+pid+"a"+aid];
    document.getElementById("p"+pid+"a"+aid).remove();
    questions["p"+pid].qntA -= 1;
}

function criarAlternativa(pergunta, pid)
{
    pergunta.alternatives["p"+pid+"a"+pergunta.keyA] = new Alternativa();
    pergunta.qntA += 1;
    pergunta.keyA += 1;
}

function salvarJogo()
{
    quiz.name = document.querySelector("#name").value;
    quiz.topic = document.querySelector("#topic").value;
    quiz.description = document.querySelector("#description").value;
    quiz.time = document.querySelector("#time").value;
    for(var key of Object.keys(questions)) 
    {
        questions[key].text = document.querySelector("#"+key+"-input").value;

        for(var key2 of Object.keys(questions[key].alternatives))
        {
            questions[key].alternatives[key2].text = document.querySelector("#"+key2+"-input").value;
            questions[key].alternatives[key2].is_correct = document.querySelector("#"+key2+"-rb").checked ? 1 : 0;
            //if(questions[key].alternatives[key2].is_correct == 1)
            //    questions[key].alternatives[key2].points = document.querySelector("#"+key+"-input-p").value;
        }
    }

    $.ajax({
        method: "POST",
        data: 
        { 
            'csrfmiddlewaretoken': csrftoken, 
            'quiz': JSON.stringify(quiz), 
            'questions': JSON.stringify(questions) 
        }
        }).done(function(data, statusText, xhr) 
        {
            if(xhr.status == 200)
            {
                window.location = redirectURL;
            }
        });
}

String.prototype.replaceAll = function(searchStr, replaceStr)
{
    var str = this;
    // no match exists in string?
    if(str.indexOf(searchStr) === -1) {
        // return string
        return str;
    }
    // replace and remove first match, and do another recursirve search/replace
    return (str.replace(searchStr, replaceStr)).replaceAll(searchStr, replaceStr);
}