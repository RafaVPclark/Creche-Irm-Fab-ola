    function generateMatricula() {
    const docs = document.getElementById("docMatricula");
    const reader = new FileReader();

    if (docs.files.length === 0) {
        alert("Nenhum arquivo selecionado");
        return;
    }

    reader.readAsBinaryString(docs.files.item(0));

    reader.onerror = function (evt) {
        console.log("Erro ao ler o arquivo", evt);
        alert("Erro ao ler o arquivo");
    };

    reader.onload = function (evt) {
        const content = evt.target.result;
        const zip = new PizZip(content);
        const doc = new window.docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        const sexo = document.querySelector('input[name="sexo"]:checked').value;
        const nomeAluno = document.getElementById('nomeAluno3').value;
        const nomeMae = document.getElementById('nomeMae3').value;
        const nomePai = document.getElementById('nomePai3').value;
        const periodo = document.getElementById('periodo2').value;

        let sexoArtigo = '';
        if (sexo === 'masculino') {
            sexoArtigo = 'o';
        } else if (sexo === 'feminino') {
            sexoArtigo = 'a';
        }

        const hoje = new Date();
        const opcoes = { year: 'numeric', month: 'long', day: 'numeric' };
        const dataAtual = hoje.toLocaleDateString('pt-BR', opcoes);

        // Renderiza o documento (substitui os placeholders pelos valores fornecidos pelo usuário)
        doc.render({
            nomeAluno: nomeAluno,
            nomeMae: nomeMae,
            nomePai: nomePai,
            periodo: periodo,
            sexo: sexoArtigo,
            dataAtual: dataAtual
        });

        const blob = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            compression: "DEFLATE",
        });

        // Salva o documento gerado
        saveAs(blob, nomeAluno + "_matricula.docx");

        // Esvazia os campos de texto
        document.querySelector('input[name="sexo"]:checked').checked = false;
        document.getElementById('nomeAluno3').value = '';
        document.getElementById('nomeMae3').value = '';
        document.getElementById('nomePai3').value = '';
        document.getElementById('periodo2').value = '';
        document.getElementById('masculino').checked = true;
    };
};