    function generateTransferencia() {
    const docs = document.getElementById("docTransferencia");
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

        const nomeAluno = document.getElementById('nomeAluno2').value;
        const nomeMae = document.getElementById('nomeMae2').value;
        const nomePai = document.getElementById('nomePai2').value;
        const aniversario = document.getElementById('aniversario').value;
        const periodo = document.getElementById('periodo').value;
        const ultimoDia = document.getElementById('ultimoDia').value;

        // Renderiza o documento (substitui os placeholders pelos valores fornecidos pelo usuário)
        doc.render({
            nomeAluno: nomeAluno,
            nomeMae: nomeMae,
            nomePai: nomePai,
            aniversario: aniversario,
            periodo: periodo,
            ultimoDia: ultimoDia
        });

        const blob = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            compression: "DEFLATE",
        });

        // Salva o documento gerado
        saveAs(blob, nomeAluno + "_matricula.docx");

        // Esvazia os campos de texto
        document.getElementById('nomeAluno2').value = '';
        document.getElementById('nomeMae2').value = '';
        document.getElementById('nomePai2').value = '';
        document.getElementById('aniversario').value = '';
        document.getElementById('periodo').value = '';
        document.getElementById('ultimoDia').value = '';
    };
};