// Script feito pelo Arthur O BRABO
    function generateConclusaoAluno() {
    const docs = document.getElementById("doc");
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

        const nomeAluno = document.getElementById('nomeAluno').value;
        const nomeMae = document.getElementById('nomeMae').value;
        const nomePai = document.getElementById('nomePai').value;

        // Renderiza o documento (substitui os placeholders pelos valores fornecidos pelo usuário)
        doc.render({
            nomeAluno: nomeAluno,
            nomeMae: nomeMae,
            nomePai: nomePai
        });

        const blob = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            compression: "DEFLATE",
        });

        // Salva o documento gerado
        saveAs(blob, nomeAluno + "_matricula.docx");

        // Esvazia os campos de texto
        document.getElementById('nomeAluno').value = '';
        document.getElementById('nomeMae').value = '';
        document.getElementById('nomePai').value = '';
    };
};