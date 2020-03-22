function showError(msg) {
    $('#msg-error').html(msg)
    $('#alerta-error').show()
}

function backgroundColor () {
    var colors = ['#7b1fa2', '#4a148c', '#6a1b9a', '#5e35b1', '#673ab7',// purple
                '#f44336', '#d32f2f', '#e53935', '#b71c1c', '#c62828', // red
                '#512da8', '#4527a0', '#311b92', '#3f51b5', '#3949ab', // dark-purple
                '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', // green
                '#303f9f', '#283593', '#1a237e', '#1e88e5', '#1976d2', // blue
                '#1565c0', '#0d47a1'];
    var i = 0;
    setInterval(function(){
        $('body').css({background: colors[i], webkitTransition: '0.5s ease-out',
                    mozTransition: '0.5s ease-out', oTransition: '0.5s ease-out',
                        transition: '1s ease-out'});
        i = (i == (colors.length -1)) ? 0 : i+1;
    },1000);
}

$(document).ready(function() {
    backgroundColor()
});

class Resposta
{
    constructor(id, idP, time)
    {
        this.id = id;
        this.idPergunta = idP;
        this.time = time;
    }
}

var lenQ = questions_length, answers = [], timer, tempo = quiz_time, tempoMax = tempo;

function responder(pergunta, alternativa, elemento)
{
    clearInterval(timer);
    console.log("Pergunta " + pergunta + " respondida em " + (tempoMax-tempo) + " segundos.");
    answers.push(new Resposta(alternativa, pergunta, tempoMax-tempo));
    document.getElementById("p"+pergunta+"-marcada").innerHTML = elemento ? elemento.innerHTML : "Nenhuma";
    document.getElementById("p"+pergunta).style.display = "none";
    if(pergunta == lenQ)
    {   
        document.getElementById("end").style.display = "flex";
        $.ajax({
            method: "POST",
            url: solveURL,
            dataType: 'json',
            data: 
            { 
                'csrfmiddlewaretoken': csrftoken,
                'id': quiz_id,
                'resp': JSON.stringify(answers), 
            }
            }).done(function(data, statusText, xhr) 
            {
                if(xhr.status == 200)
                {
                    for(var key of Object.keys(data))
                    {
                        document.getElementById("p"+data[key].idPergunta+"-certa").innerHTML = data[key].acertou == 1 ? "<span class='text-success'><i class='fa fa-check'></span>" : "<span class='text-danger'><i class='fa fa-times'></span>";
                        document.getElementById("p"+data[key].idPergunta+"-pontos").innerHTML = data[key].points;
                    }
                }
            });
    }
    else
    {
        document.getElementById("p"+(pergunta+1)).style.display = "flex";
        document.getElementById("p"+(pergunta+1)+"-timer").innerHTML = tempoMax;
        tempo = tempoMax;
        timer = setInterval(function()
        { 
            tempo -= 1;
            document.getElementById("p"+ (pergunta+1) +"-timer").innerHTML = tempo;

            if(tempo < 0)
            {
                clearInterval(timer);
                responder(pergunta, 0, null);
            }
        }, 1000);
    }
}

function iniciar()
{
    document.getElementById("start").style.display = "none";
    document.getElementById("p1").style.display = "flex";

    document.getElementById("p1-timer").innerHTML = tempoMax;
    timer = setInterval(function()
    { 
        tempo -= 1;
        document.getElementById("p1-timer").innerHTML = tempo;

        if(tempo == 0)
        {
            clearInterval(timer);
            responder(1, 0, null);
        }
    }, 1000);
}