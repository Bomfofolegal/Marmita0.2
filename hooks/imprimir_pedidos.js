export const Imprimir_pedidos = async (docId) => {
    const pedidoRef = firebase.firestore().collection("pedidos").doc(docId);
    try {
      const doc = await pedidoRef.get();
      if (doc.exists) {
        const pedido = doc.data();
        const total = pedido.valor + pedido.taxaEntrega;
        
        let recibo2v = '';
        let adicional2 = '';

        if (pedido.adicional > 1) {
            for (let i = 0; i <= pedido.adicional; i += 100) {
                adicional2 += `+ ${formatarMoeda(pedido.adicional)}`;
            }
        }

        for (let i = 0; i < pedido.via2; i++) {
          recibo2v += `
            <p>
            <div style="font-weight: bold;">=====================</div>
            <p>
            <div style="display: inline;text-align:right;font-weight: bold;">Rua: ${pedido.rua} - Nº${pedido.numero}</div>
            <p>
            <div style="display: inline;font-weight: bold;">Cliente: ${pedido.cliente}</div>
            <p>
            <div style="display: inline;font-weight: bold;">TOTAL: ${formatarMoeda(pedido.total)} / ${pedido.tipoEntrega}</div>
            <div style="font-weight: bold;">=====================</div>
            <p>
          `;
        }

        const htmlToPrint = `
          <style>
            body {
              font-size: 20px;
              font-family: Arial, sans-serif;
              padding: 0;
            }
            .resultado {
              padding: 0;
              border: 0 solid #ccc;
              background-color: #fff;
              max-width: 400px;
            }
            .resultado p {
              margin: 5px 0;
            }
            .resultado p:first-child {
              margin-top: 0;
            }
            .resultado p:last-child {
              margin-bottom: 0;
            }
            .titulo {
              font-size: 30px;
              font-weight: bold;
              text-align: left;
              margin-bottom: 10px;
            }
            info {
              font-size: 17px;
              margin-bottom: 5px;
            }
          </style>
          <div class="resultado">
            <div class="titulo">Marmitex Conventos</div>
            <strong>===================</strong>
            <p><strong>Tipo:</strong> Delivery </p>
            <strong>===================</strong></p>
            <strong>=======CLIENTE======</strong>
            <div class="info"><strong>Cliente...:</strong> ${pedido.cliente}</div>
            <div class="info"><strong>Telefone:</strong> ${pedido.telefone}</div>
            <strong>======ENDEREÇO======</strong>
            <div class="info"><strong>Rua........:</strong> ${pedido.rua}</div>
            <div class="info"><strong>Num......:</strong> ${pedido.numero}</div>
            <div class="info"><strong>Bairro....:</strong> ${pedido.bairro}</div>
            <div class="info"><strong>Ref........:</strong> ${pedido.referencia}</div>
            <div class="info"><strong>Obs.......:</strong> ${pedido.observacao}</div>
            <div class="info"><strong>Valor.....:</strong> ${formatarMoeda(pedido.valor)} ${adicional2}</div>
            <div class="info"><strong>Taxa......: </strong> ${formatarMoeda(pedido.taxaEntrega)}</div>
            <div class="info"><strong>TOTAL...: </strong> ${formatarMoeda(pedido.total)}</div>
            <div class="info"><strong>Status...:</strong> ${pedido.tipoEntrega}</div>
            <div></div>
            <strong>=====================</strong>
            ${recibo2v}
          </div>
        `;

        await Print.printAsync({
          html: htmlToPrint
        });
      } else {
        console.log("O pedido não foi encontrado!");
      }
    } catch (error) {
      console.log("Erro ao obter o documento:", error);
    }
  };