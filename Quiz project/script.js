$(document).ready(function () {

    const quiz = [
        {
            q: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Mark Language", "None"],
            answer: 0
        },
        {
            q: "Which language is used for styling web pages?",
            options: ["HTML", "CSS", "JQuery", "PHP"],
            answer: 1
        },
        {
            q: "Which is not a JavaScript framework?",
            options: ["Angular", "React", "Vue", "Django"],
            answer: 3
        },
        {
            q: "jQuery is a ___?",
            options: ["Framework", "Library", "Language", "Compiler"],
            answer: 1
        },
        {
            q: "Which company developed JavaScript?",
            options: ["Google", "Microsoft", "Netscape", "Oracle"],
            answer: 2
        }
    ];

    let index = 0;
    let score = 0;
    let timer;
    let timeLeft = 10;
    let userAnswers = [];

    
    $("#startQuizBtn").click(function () {
        $("#startPage").addClass("d-none");
        $("#quizPage").removeClass("d-none");
        loadQuestion();
    });

    function loadQuestion() {
        clearInterval(timer);
        timeLeft = 10;

        $("#question").text(quiz[index].q);
        $("#qno").text(index + 1);
        $("#time").text(timeLeft);
        $("#options").html("");
        $("#submitBtn").prop("disabled", true);

        quiz[index].options.forEach((opt, i) => {
            $("#options").append(`
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="option" value="${i}" id="opt${i}">
                    <label class="form-check-label option-label" for="opt${i}">
                        ${opt}
                    </label>
                </div>
            `);
        });

        $("#progress").css("width", ((index + 1) / quiz.length) * 100 + "%");
        startTimer();
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            $("#time").text(timeLeft);
            if (timeLeft === 0) autoSubmit();
        }, 1000);
    }

    function autoSubmit() {
        clearInterval(timer);
        userAnswers.push(null);
        index++;
        nextStep();
    }

    $(document).on("change", "input[name='option']", function () {
        $("#submitBtn").prop("disabled", false);
    });

    $("#quizForm").submit(function (e) {
        e.preventDefault();
        clearInterval(timer);

        let selected = $("input[name='option']:checked").val();
        userAnswers.push(selected);

        if (selected == quiz[index].answer) score++;
        index++;
        nextStep();
    });

    function nextStep() {
        if (index < quiz.length) loadQuestion();
        else showResult();
    }

    function showResult() {
        let resultHTML = `
            <div class="card shadow">
                <div class="card-body">
                    <h3 class="text-center">Quiz Result</h3>
                    <h5 class="text-center mb-3">Score: ${score}/${quiz.length}</h5>
                    <hr>
        `;

        quiz.forEach((q, i) => {
            let ua = userAnswers[i];
            let ca = q.answer;

            resultHTML += `
                <p><strong>Q${i + 1}. ${q.q}</strong></p>
                <p>Your Answer:
                    <span class="${ua == ca ? 'text-success' : 'text-danger'}">
                        ${ua !== null ? q.options[ua] : "Not Answered"}
                    </span>
                </p>
                <p class="text-success">Correct Answer: ${q.options[ca]}</p>
                <hr>
            `;
        });

        $("#quizPage").html(resultHTML);
    }

});
