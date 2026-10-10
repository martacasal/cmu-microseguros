// Motor de Simulação Inteligente no Cliente para o Chat do Pulso (100% compatível com GitHub Pages estático)

export function generateClientMockReply(
  personaId: string,
  userPrompt: string
): string {
  const promptLower = userPrompt.toLowerCase();

  if (personaId === "analyst") {
    if (promptLower.includes("maria") || promptLower.includes("anti-persona")) {
      return `Como investigador UX, a Maria (64 anos, Sintra) é essencial para definirmos a **fronteira de produto**. Segundo as normas da NN/g, uma anti-persona evita que a equipa cometa o erro de tentar agradar a toda a gente. Os dados do EuroSafe e Eurobarómetro mostram que acima dos 60 anos o risco de fratura grave de fémur é desproporcional, e o custo de apoio telefónico exigido por este perfil destruiria a margem de um microsseguro de 2,50€. Por isso, desenhámos um *graceful off-ramp* que a reencaminha respeitosamente para apólices convencionais anuais.`;
    }
    if (promptLower.includes("tiago") || promptLower.includes("core") || promptLower.includes("primária")) {
      return `O Tiago (31 anos, Lisboa) representa o perfil central de oportunidade do Pulso. Ele enquadra-se no segmento com maior índice de prática desportiva ao ar livre (Eurobarómetro 2022) e no grupo que mais se lesiona em prática não organizada (EuroSafe). Além disso, a literatura académica (Towers Watson e Eling et al.) aponta que jovens adultos urbanos têm a maior abertura a pagamentos por uso e forte aversão a fidelizações anuais desnecessárias.`;
    }
    if (promptLower.includes("rita") || promptLower.includes("filho") || promptLower.includes("família")) {
      return `A Rita (42 anos, Braga) testa a capacidade do Pulso de expandir para além do utilizador individual. O segmento de desporto outdoor em família (BTT/Trail) exige cobertura clara para menores de idade e garantias de busca e salvamento em serra (Sameiro/Gerês). Além disso, ela planeia na véspera, o que justifica a funcionalidade de agendamento prévio.`;
    }
    if (promptLower.includes("joana") || promptLower.includes("acessibilidade") || promptLower.includes("deficiência")) {
      return `A Joana (36 anos, Porto) é o teste ético do produto. Muitas fintechs e seguradoras impõem barreiras a pessoas com deficiência motora através de questionários clínicos intrusivos. No Pulso, o seguro é agnóstico à condição prévia: cobre o acidente fortuito da sessão contratada de handbike ou paracanoagem, com interface 100% acessível segundo a norma WCAG AAA.`;
    }
    if (promptLower.includes("dados") || promptLower.includes("pesquisa") || promptLower.includes("dl 10/2009")) {
      return `A base jurídica e estatística assenta em dois pilares: 1) O **Decreto-Lei n.º 10/2009** obriga ao seguro desportivo apenas em clubes federados, provas formais ou recintos fechados (ginásios), deixando o desporto outdoor individual num vazio legal completo; 2) O **Eurobarómetro 2022** indica que embora 73% dos portugueses sejam sedentários, a prática concentra-se nos 15 aos 39 anos com forte adoção de hábitos individuais e espontâneos.`;
    }
    return `Do ponto de vista metodológico (NN/g), cada atributo destas personas foi categorizado entre **Dado Comprovado** (estudos europeus, taxas de lesão por 1.000h) e **Hipótese Testável** (ex: adesão a ativação em < 60s no telemóvel). Podes explorar os cartões de persona e as jornadas completas nas outras abas da aplicação.`;
  }

  if (personaId === "maria") {
    if (promptLower.includes("telemóvel") || promptLower.includes("app") || promptLower.includes("pagar")) {
      return `Olhe, eu cá não meto números de cartões nem contas no telemóvel! Já vi tantas notícias na televisão de burlas e esquemas no WhatsApp. Se for para pagar um seguro, quero ir ao balcão da Caixa Geral de Depósitos, falar com o senhor Silva que já me conhece há 20 anos e levar o papel carimbado para guardar na pasta de arquivo em casa.`;
    }
    if (promptLower.includes("queda") || promptLower.includes("caminhada") || promptLower.includes("acidente")) {
      return `Tenho muito cuidado por onde piso na serra de Sintra. As pedras com musgo enganam muito. Se tiver o azar de escorregar e torcer um pé, as minhas amigas ajudam-me e vamos ao centro de saúde ou ao hospital de Cascais pelo SNS. Não preciso de uma aplicação de telemóvel a cobrar-me 2 euros para isso.`;
    }
    if (promptLower.includes("pulso") || promptLower.includes("seguro")) {
      return `Dizem que esse tal 'Pulso' ativa um seguro em 30 segundos... Isso parece-me bom demais para ser verdade. O que é que está escrito nas letras pequeninas que ninguém lê? E se eu precisar de ajuda no meio dos trilhos, quem é que me atende? Um robô daqueles automáticos? Com a minha saúde e a minha reforma não brinco.`;
    }
    return `Boa tarde. Faço as minhas caminhadas tranquilas aos sábados na serra, mas estas coisas modernas de aplicações e pagamentos rápidos não são para mim. Prefiro o meu médico de família, o meu banco de sempre e pessoas de carne e osso a atender-me.`;
  }

  if (personaId === "tiago") {
    if (promptLower.includes("preço") || promptLower.includes("quanto") || promptLower.includes("custo")) {
      return `Para mim, se custar à volta de 2,50€ ou 3€ por uma tarde de surf de 3 horas, é um 'no-brainer'. Gasto mais do que isso no café e na portagem para a Ericeira. O que me recuso terminantemente é pagar 25€ por mês o ano todo numa apólice tradicional, quando no inverno passo semanas sem tocar na prancha por causa do trabalho.`;
    }
    if (promptLower.includes("surf") || promptLower.includes("onda") || promptLower.includes("mar")) {
      return `O mar é imprevisível. Há 3 meses um amigo meu luxou a clavícula nos Coxos quando foi abalroado por uma prancha solta. Foi para o privado e pagou mais de 900€ porque o seguro de saúde dele excluía 'desportos náuticos de prancha'. Se eu tiver uma app onde clico em 'Surf', meto 3 horas e sei que tenho 5.000€ de despesas hospitalares privadas garantidas, vou para a água muito mais descontraído.`;
    }
    if (promptLower.includes("tempo") || promptLower.includes("rápido") || promptLower.includes("ativação")) {
      return `Tem de ser mesmo em menos de 1 minuto! Eu chego à praia, vejo as ondas a rebentar e quero vestir o fato e ir para a água. Se a app me começar a pedir NIF, morada de faturação ou a perguntar se o meu bisavô tinha tensão alta, fecho a app na hora e vou surfar sem seguro. Tem de ser MB Way ou Apple Pay e apólice ativa com 2 toques.`;
    }
    return `Boas! Tudo o que seja desporto ao ar livre sem complicações interessa-me. Corro durante a semana e surfo na Ericeira ao fim de semana. O que me lixa nas seguradoras normais é a papelada e a fidelização de 12 meses. Se o Pulso for direto ao assunto, sou cliente na hora.`;
  }

  if (personaId === "rita") {
    if (promptLower.includes("filho") || promptLower.includes("criança") || promptLower.includes("família")) {
      return `A minha prioridade número um é o meu filho Martim, de 12 anos. Ele adora vir comigo nos trilhos de BTT, mas os miúdos às vezes arriscam em descidas com pedras soltas. Se o Pulso me permitir adicionar o Martim com um clique na mesma sessão por mais 1 ou 2 euros, é perfeito. Não quero ter de preencher formulários separados para ele.`;
    }
    if (promptLower.includes("resgate") || promptLower.includes("serra") || promptLower.includes("btt")) {
      return `No Gerês ou no Sameiro não há hospitais ao virar da esquina. Um colega nosso partiu o braço numa descida e tivemos de esperar horas por socorro especializado. Quero ter a certeza absoluta de que a cobertura de busca, salvamento e transporte de urgência está garantida e de que a apólice indica claramente para onde podemos ligar sem hesitações.`;
    }
    if (promptLower.includes("antecedência") || promptLower.includes("quando") || promptLower.includes("planeamento")) {
      return `Eu não decido as coisas em cima da hora como os miúdos de 20 anos. Na sexta-feira à noite estudo a rota no Komoot e vejo as previsões. Para mim, dava muito jeito poder deixar o seguro agendado na véspera com ativação automática às 08h30 de sábado.`;
    }
    return `Olá! Sou arquiteta e aos sábados o meu refúgio é a serra com a bicicleta. Valorizo muito a transparência e a segurança da minha família. Se o Pulso me der paz de espírito sem letrinhas miudinhas, conta com a minha adesão.`;
  }

  if (personaId === "joana") {
    if (promptLower.includes("acessibilidade") || promptLower.includes("deficiência") || promptLower.includes("voiceover")) {
      return `Como utilizadora de cadeira de rodas e designer de acessibilidade, estou habituada a testar tudo. Se o Pulso tiver botões identificados para o VoiceOver, bom contraste e não usar barreiras como CAPTCHAs visuais, já está à frente de 90% das fintechs portuguesas. O design acessível não é um favor que me fazem; é um requisito básico de dignidade.`;
    }
    if (promptLower.includes("seguro") || promptLower.includes("exclusão") || promptLower.includes("questionário")) {
      return `Sempre que tento pedir um seguro normal, perguntam-me logo se tenho deficiência. Quando digo que tenho paraplegia, ou recusam a cobertura imediatamente ou mandam-me fazer exames clínicos e cobram o triplo! Eu pratico handbike na marginal e canoagem no Douro. O Pulso tem de cobrir o acidente súbito daquele treino, exatamente com as mesmas regras e preço de qualquer outra pessoa.`;
    }
    if (promptLower.includes("responsabilidade") || promptLower.includes("peões") || promptLower.includes("trânsito")) {
      return `A handbike é veloz e vai muito rente ao solo na ciclovia de Matosinhos. Há muitas pessoas a passear cães e a olhar para os telemóveis. Ter cobertura de Responsabilidade Civil para caso haja algum choque imprevisto com um peão é fundamental para a minha tranquilidade nos treinos.`;
    }
    return `Olá! Pratico desporto adaptado com muito orgulho e intensidade. Procuro serviços que me vejam como uma atleta e cidadã de pleno direito, sem preconceitos capacitistas. O Pulso tem aqui a oportunidade de ser pioneiro em inclusão real.`;
  }

  return `Obrigado pela questão! No âmbito do projeto Pulso, estamos a analisar o comportamento de consumo, as dores e a jornada dos praticantes de desporto individual ao ar livre em Portugal.`;
}
