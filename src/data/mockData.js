export const establishment = {
  name: "Bella Napoli Forneria",
  tagline: "Gestão Operacional & Forno a Lenha",
  status: "Aberta",
  currentShift: "Noite (18:00 - 23:45)",
  cnpj: "48.291.034/0001-92",
  address: "Rua Harmonia, 412 - Pinheiros, SP",
  phone: "(11) 3042-9900"
};

export const currentUser = {
  name: "Carlos Silva",
  role: "Gerente Geral",
  email: "carlos.silva@bellanapoli.com.br",
  initials: "CS",
  avatarUrl: null
};

export const couriersList = [
  { id: "cour-1", name: "Lucas Motoboy", vehicle: "Honda CG 160 Fan (Placa EKS-4819)", phone: "(11) 98112-4401", status: "Em trânsito" },
  { id: "cour-2", name: "Marcos Entrega", vehicle: "Yamaha Factor 150 (Placa DFL-9201)", phone: "(11) 97720-3392", status: "Disponível" },
  { id: "cour-3", name: "Gabriel Souza", vehicle: "Honda Biz 125 (Placa GHI-1042)", phone: "(11) 99104-5582", status: "Disponível" },
  { id: "cour-4", name: "Renato Dias", vehicle: "Honda Bros 160 (Placa RTO-8831)", phone: "(11) 98402-9918", status: "Em trânsito" }
];

export const menuCatalog = [
  { id: "p-1", name: "Pizza Margherita Especial (G)", category: "Pizzas Tradicionais", price: 72.00 },
  { id: "p-2", name: "Pizza Calabresa Artesanal (G)", category: "Pizzas Tradicionais", price: 68.50 },
  { id: "p-3", name: "Pizza Quatro Queijos da Casa (G)", category: "Pizzas Tradicionais", price: 76.00 },
  { id: "p-4", name: "Pizza Pepperoni Supreme (G)", category: "Pizzas Especiais", price: 78.00 },
  { id: "p-5", name: "Pizza Parma com Rúcula & Grana (G)", category: "Pizzas Especiais", price: 96.00 },
  { id: "p-6", name: "Pizza Frango com Catupiry Original (G)", category: "Pizzas Tradicionais", price: 69.90 },
  { id: "p-7", name: "Pizza Portuguesa Especial (G)", category: "Pizzas Tradicionais", price: 74.00 },
  { id: "p-8", name: "Coca-Cola 2L Gelada", category: "Bebidas", price: 14.00 },
  { id: "p-9", name: "Guaraná Antarctica 2L", category: "Bebidas", price: 14.00 },
  { id: "p-10", name: "Cerveja Heineken Long Neck 330ml", category: "Bebidas", price: 9.00 },
  { id: "p-11", name: "Borda Recheada Catupiry Tradicional", category: "Adicionais", price: 8.00 },
  { id: "p-12", name: "Torta Holandesa Artesanal (Fatia)", category: "Sobremesas", price: 15.00 }
];

// Espaços cadastrados para reservas e eventos
export const initialSpaces = [
  {
    id: "sp-1",
    name: "Salão Principal",
    capacity: 60,
    description: "Salão nobre com piso em mosaico, vista direta para o forno a lenha napolitano e climatização.",
    price: "Consumo mínimo R$ 2.500,00",
    availability: "Disponível para reservas",
    notes: "Ideal para reuniões de famílias e confraternizações médias.",
    type: "Salão"
  },
  {
    id: "sp-2",
    name: "Jardim de Inverno / Área Externa",
    capacity: 35,
    description: "Ambiente ao ar livre com pergolado, plantas ornamentais, aquecedores a gás e iluminação acolhedora.",
    price: "Consumo mínimo R$ 1.800,00",
    availability: "Disponível para reservas",
    notes: "Permitido música ambiente até às 22h.",
    type: "Área externa"
  },
  {
    id: "sp-3",
    name: "Espaço Aniversário & Confraternização",
    capacity: 30,
    description: "Área reservada com mesa comunitária ampla, ponto de bolo com iluminação cênica e buffet auxiliar.",
    price: "Locação R$ 350,00 + consumo",
    availability: "Disponível para reservas",
    notes: "Permitida decoração temática e entrada com bolo próprio.",
    type: "Espaço para aniversário"
  },
  {
    id: "sp-4",
    name: "Espaço para Casamento & Grandes Festas",
    capacity: 100,
    description: "Integração total do mezanino com salão superior, bar privativo de coquetéis e sistema de som dedicado.",
    price: "Locação sob consulta (Mínimo R$ 5.000,00)",
    availability: "Requer antecedência de 7 dias",
    notes: "Comporta cerimônia intimista e serviço de buffet de pizzas gourmet volante.",
    type: "Espaço para casamento"
  },
  {
    id: "sp-5",
    name: "Área VIP Lounge",
    capacity: 14,
    description: "Espaço privativo com sofás em couro capitonê, adega climatizada exclusiva e atendimento dedicado.",
    price: "Consumo mínimo R$ 1.200,00",
    availability: "Disponível para reservas",
    notes: "Ideal para jantares executivos e encontros reservados.",
    type: "Área VIP"
  }
];

// Mesas detalhadas do salão
export const initialTables = [
  {
    id: "M01",
    name: "Mesa 01",
    number: 1,
    capacity: 4,
    status: "Ocupada", // Livre, Ocupada, Reservada, Em atendimento
    location: "Salão Principal",
    currentClient: "Família Costa",
    currentBill: "R$ 164,00",
    occupiedSince: "19:40",
    items: "1x Pizza Portuguesa (G), 1x Pizza Calabresa (M), 2x Chopp",
    waiter: "Guilherme"
  },
  {
    id: "M02",
    name: "Mesa 02",
    number: 2,
    capacity: 2,
    status: "Livre",
    location: "Salão Principal",
    currentClient: null,
    currentBill: null,
    occupiedSince: null,
    items: null,
    waiter: null
  },
  {
    id: "M03",
    name: "Mesa 03",
    number: 3,
    capacity: 4,
    status: "Reservada",
    location: "Jardim de Inverno",
    currentClient: "André Ramos",
    reservationTime: "20:30",
    people: 4,
    currentBill: null,
    waiter: null
  },
  {
    id: "M04",
    name: "Mesa 04",
    number: 4,
    capacity: 4,
    status: "Em atendimento",
    location: "Salão Principal",
    currentClient: "Lucas Almeida",
    currentBill: "R$ 118,50",
    occupiedSince: "20:10",
    items: "1x Pizza Calabresa Artesanal (G), 1x Pizza Quatro Queijos (M)",
    waiter: "Matheus"
  },
  {
    id: "M05",
    name: "Mesa 05",
    number: 5,
    capacity: 6,
    status: "Livre",
    location: "Salão Principal",
    currentClient: null,
    currentBill: null,
    occupiedSince: null,
    items: null,
    waiter: null
  },
  {
    id: "M06",
    name: "Mesa 06",
    number: 6,
    capacity: 2,
    status: "Ocupada",
    location: "Salão Principal",
    currentClient: "Pedro & Julia",
    currentBill: "R$ 82,00",
    occupiedSince: "20:05",
    items: "1x Pizza Margherita (M), 2x Taça de Vinho Tinto",
    waiter: "Guilherme"
  },
  {
    id: "M07",
    name: "Mesa 07",
    number: 7,
    capacity: 4,
    status: "Livre",
    location: "Jardim de Inverno",
    currentClient: null,
    currentBill: null,
    occupiedSince: null,
    items: null,
    waiter: null
  },
  {
    id: "M08",
    name: "Mesa 08",
    number: 8,
    capacity: 6,
    status: "Em atendimento",
    location: "Salão Nobre",
    currentClient: "Beatriz Oliveira",
    currentBill: "R$ 210,00",
    occupiedSince: "19:50",
    items: "2x Pizza Especial Parma (G), 1x Borda Catupiry, 4x Chopp Artesanal",
    waiter: "Matheus"
  },
  {
    id: "M09",
    name: "Mesa 09",
    number: 9,
    capacity: 8,
    status: "Reservada",
    location: "Espaço Aniversário",
    currentClient: "Juliana Mendes",
    reservationTime: "21:00",
    people: 14,
    currentBill: null,
    waiter: null
  },
  {
    id: "M10",
    name: "Mesa 10",
    number: 10,
    capacity: 2,
    status: "Livre",
    location: "Balcão Gourmet",
    currentClient: null,
    currentBill: null,
    occupiedSince: null,
    items: null,
    waiter: null
  },
  {
    id: "M11",
    name: "Mesa 11",
    number: 11,
    capacity: 4,
    status: "Livre",
    location: "Salão Principal",
    currentClient: null,
    currentBill: null,
    occupiedSince: null,
    items: null,
    waiter: null
  },
  {
    id: "M12",
    name: "Mesa 12",
    number: 12,
    capacity: 4,
    status: "Reservada",
    location: "Balcão Gourmet",
    currentClient: "Marcos Vinicius",
    reservationTime: "21:15",
    people: 2,
    currentBill: null,
    waiter: null
  }
];

// Reservas detalhadas com status: Pendente, Confirmada, Em andamento, Finalizada, Cancelada
export const initialReservations = [
  {
    id: "res-1",
    code: "RES-101",
    date: "25/09/2026",
    time: "20:00",
    client: "Beatriz Oliveira",
    phone: "(11) 98112-9988",
    people: 6,
    table: "Mesa 08",
    space: "Salão Principal",
    type: "Aniversário", // Jantar tradicional, Aniversário, Confraternização, Casamento, Corporativo
    notes: "Comemoração de aniversário. Trazem bolo próprio.",
    status: "Em andamento" // Pendente, Confirmada, Em andamento, Finalizada, Cancelada
  },
  {
    id: "res-2",
    code: "RES-102",
    date: "25/09/2026",
    time: "20:30",
    client: "André Ramos",
    phone: "(11) 99420-1123",
    people: 4,
    table: "Mesa 03",
    space: "Jardim de Inverno / Área Externa",
    type: "Jantar",
    notes: "Prefere mesa próxima aos aquecedores do jardim.",
    status: "Confirmada"
  },
  {
    id: "res-3",
    code: "RES-103",
    date: "25/09/2026",
    time: "21:00",
    client: "Juliana Mendes",
    phone: "(11) 97654-3210",
    people: 14,
    table: "Mesa 09",
    space: "Espaço Aniversário & Confraternização",
    type: "Confraternização",
    notes: "Equipe de tecnologia da empresa. Comandas individuais.",
    status: "Confirmada"
  },
  {
    id: "res-4",
    code: "RES-104",
    date: "25/09/2026",
    time: "21:15",
    client: "Marcos Vinicius",
    phone: "(11) 98765-4321",
    people: 2,
    table: "Mesa 12",
    space: "Balcão Gourmet",
    type: "Jantar",
    notes: "Primeiro encontro do casal. Mesa discreta.",
    status: "Pendente"
  },
  {
    id: "res-5",
    code: "RES-105",
    date: "25/09/2026",
    time: "19:00",
    client: "Carla Duarte",
    phone: "(11) 99887-6543",
    people: 5,
    table: "Mesa 05",
    space: "Salão Principal",
    type: "Jantar",
    notes: "Cliente celíaca - avisar a cozinha para pizza sem glúten.",
    status: "Finalizada"
  },
  {
    id: "res-6",
    code: "RES-106",
    date: "26/09/2026",
    time: "19:30",
    client: "Fernando Prado",
    phone: "(11) 97123-4567",
    people: 8,
    table: "Mesa 01",
    space: "Salão Principal",
    type: "Corporativo",
    notes: "Reunião de diretoria com jantar.",
    status: "Confirmada"
  },
  {
    id: "res-7",
    code: "RES-107",
    date: "26/09/2026",
    time: "20:00",
    client: "Renata Vasconcellos",
    phone: "(11) 98321-7654",
    people: 30,
    table: "Espaço Aniversário",
    space: "Espaço Aniversário & Confraternização",
    type: "Aniversário",
    notes: "Festa de 40 anos. Contratou rodízio de pizzas.",
    status: "Confirmada"
  },
  {
    id: "res-8",
    code: "RES-108",
    date: "27/09/2026",
    time: "18:30",
    client: "Marcelo Lins",
    phone: "(11) 99345-6789",
    people: 4,
    table: "Mesa 07",
    space: "Jardim de Inverno / Área Externa",
    type: "Jantar",
    notes: "Comemoração de noivado.",
    status: "Pendente"
  },
  {
    id: "res-9",
    code: "RES-109",
    date: "25/09/2026",
    time: "18:00",
    client: "Eduardo Camargo",
    phone: "(11) 98711-2233",
    people: 4,
    table: "Mesa 04",
    space: "Salão Principal",
    type: "Jantar",
    notes: "Cancelamento solicitado por imprevisto.",
    status: "Cancelada"
  }
];

export const initialOrders = [
  {
    id: "#1049",
    date: "25/09/2026",
    time: "20:52",
    createdAt: "2026-09-25T20:52:00",
    client: "Letícia Ribeiro",
    phone: "(11) 97412-9934",
    type: "Delivery",
    channel: "WhatsApp IA",
    status: "Novo",
    isUnread: true,
    paymentMethod: "Pix",
    paymentStatus: "Aguardando confirmação",
    subtotal: 86.00,
    deliveryFee: 8.00,
    discount: 0.00,
    total: 94.00,
    formattedValue: "R$ 94,00",
    address: "Rua Oscar Freire, 1020 - Cerqueira César",
    courier: null,
    items: [
      { name: "Pizza Quatro Queijos da Casa (G)", qty: 1, unitPrice: 76.00, price: "R$ 76,00" },
      { name: "Guaraná Antarctica 2L", qty: 1, unitPrice: 14.00, price: "R$ 14,00" },
      { name: "Borda Recheada Catupiry Tradicional", qty: 1, unitPrice: 8.00, price: "R$ 8,00" }
    ],
    notes: "Tocar interfone 42. Não bater na porta.",
    timeline: [
      { status: "Pedido recebido", time: "20:52", completed: true, details: "Registrado e transcrito via WhatsApp IA." },
      { status: "Pedido confirmado", time: null, completed: false, details: "Aguardando confirmação da equipe operacional." },
      { status: "Em preparo", time: null, completed: false, details: "Envio de comanda para pizzaiolo e forno." },
      { status: "Pronto", time: null, completed: false, details: "Embalado e conferido na expedição." },
      { status: "Saiu para entrega", time: null, completed: false, details: "Despachado com motoboy." },
      { status: "Entregue", time: null, completed: false, details: "Finalizado no destino." }
    ]
  },
  {
    id: "#1048",
    date: "25/09/2026",
    time: "20:41",
    createdAt: "2026-09-25T20:41:00",
    client: "Mariana Souza",
    phone: "(11) 98452-1920",
    type: "Delivery",
    channel: "WhatsApp IA",
    status: "Em preparo",
    isUnread: false,
    paymentMethod: "Pix",
    paymentStatus: "Pago",
    subtotal: 94.00,
    deliveryFee: 8.00,
    discount: 8.00,
    total: 94.00,
    formattedValue: "R$ 94,00",
    address: "Rua das Palmeiras, 142 - Apto 32",
    courier: "Marcos Entrega",
    items: [
      { name: "Pizza Margherita Especial (G)", qty: 1, unitPrice: 72.00, price: "R$ 72,00" },
      { name: "Coca-Cola 2L Gelada", qty: 1, unitPrice: 14.00, price: "R$ 14,00" },
      { name: "Borda Recheada Catupiry Tradicional", qty: 1, unitPrice: 8.00, price: "R$ 8,00" }
    ],
    notes: "Sem cebola na margherita, por gentileza.",
    timeline: [
      { status: "Pedido recebido", time: "20:41", completed: true, details: "Recebido via WhatsApp IA." },
      { status: "Pedido confirmado", time: "20:42", completed: true, details: "Confirmado pelo operador Carlos Silva." },
      { status: "Em preparo", time: "20:44", completed: true, details: "Montagem de massa e forno em andamento." },
      { status: "Pronto", time: null, completed: false, details: "Aguardando saída do forno." },
      { status: "Saiu para entrega", time: null, completed: false, details: "Entregador Marcos Entrega pré-escalado." },
      { status: "Entregue", time: null, completed: false, details: "" }
    ]
  },
  {
    id: "#1047",
    date: "25/09/2026",
    time: "20:35",
    createdAt: "2026-09-25T20:35:00",
    client: "Lucas Almeida",
    phone: "(11) 99120-4481",
    type: "Salão",
    channel: "Salão (Mesa 04)",
    status: "Confirmado",
    isUnread: false,
    paymentMethod: "Cartão de Crédito",
    paymentStatus: "Pendente (comanda mesa)",
    subtotal: 118.50,
    deliveryFee: 0.00,
    discount: 0.00,
    total: 118.50,
    formattedValue: "R$ 118,50",
    address: "Mesa 04 - Salão Principal",
    courier: null,
    items: [
      { name: "Pizza Calabresa Artesanal (G)", qty: 1, unitPrice: 68.50, price: "R$ 68,50" },
      { name: "Pizza Quatro Queijos da Casa (M)", qty: 1, unitPrice: 50.00, price: "R$ 50,00" }
    ],
    notes: "Massa bem crocante e azeite extra na mesa.",
    timeline: [
      { status: "Pedido recebido", time: "20:35", completed: true, details: "Comanda aberta pelo garçom." },
      { status: "Pedido confirmado", time: "20:36", completed: true, details: "Confirmado no sistema do salão." },
      { status: "Em preparo", time: null, completed: false, details: "Fila do forno a lenha." },
      { status: "Pronto", time: null, completed: false, details: "" },
      { status: "Saiu para entrega", time: null, completed: false, details: "Não aplicável (consumo local)." },
      { status: "Entregue", time: null, completed: false, details: "" }
    ]
  },
  {
    id: "#1046",
    date: "25/09/2026",
    time: "20:22",
    createdAt: "2026-09-25T20:22:00",
    client: "Roberto Guimarães",
    phone: "(11) 97312-8809",
    type: "Delivery",
    channel: "App Próprio",
    status: "Saiu para entrega",
    isUnread: false,
    paymentMethod: "Dinheiro",
    paymentStatus: "Pendente (pagar na entrega)",
    subtotal: 78.00,
    deliveryFee: 7.00,
    discount: 7.00,
    total: 78.00,
    formattedValue: "R$ 78,00",
    address: "Rua Augusta, 850 - Cerqueira César",
    courier: "Lucas Motoboy",
    items: [
      { name: "Pizza Pepperoni Supreme (G)", qty: 1, unitPrice: 78.00, price: "R$ 78,00" },
      { name: "Guaraná Antarctica 2L", qty: 1, unitPrice: 14.00, price: "R$ 14,00" }
    ],
    notes: "Troco para nota de R$ 100,00.",
    timeline: [
      { status: "Pedido recebido", time: "20:22", completed: true, details: "Pedido recebido pelo aplicativo." },
      { status: "Pedido confirmado", time: "20:23", completed: true, details: "Validado e enviado para cozinha." },
      { status: "Em preparo", time: "20:25", completed: true, details: "Assado no forno a lenha." },
      { status: "Pronto", time: "20:38", completed: true, details: "Conferido na caixa térmica." },
      { status: "Saiu para entrega", time: "20:41", completed: true, details: "Em rota com Lucas Motoboy (Honda CG 160)." },
      { status: "Entregue", time: null, completed: false, details: "" }
    ]
  },
  {
    id: "#1045",
    date: "25/09/2026",
    time: "20:15",
    createdAt: "2026-09-25T20:15:00",
    client: "Camila Fernandes",
    phone: "(11) 98834-2110",
    type: "Retirada",
    channel: "WhatsApp IA",
    status: "Pronto",
    isUnread: false,
    paymentMethod: "Pix",
    paymentStatus: "Pago",
    subtotal: 142.00,
    deliveryFee: 0.00,
    discount: 0.00,
    total: 142.00,
    formattedValue: "R$ 142,00",
    address: "Balcão / Retirada rápida",
    courier: null,
    items: [
      { name: "Pizza Portuguesa Especial (G)", qty: 2, unitPrice: 74.00, price: "R$ 148,00" },
      { name: "Cerveja Heineken Long Neck 330ml", qty: 2, unitPrice: 9.00, price: "R$ 18.00" }
    ],
    notes: "Cliente avisa que está a caminho do balcão.",
    timeline: [
      { status: "Pedido recebido", time: "20:15", completed: true, details: "Atendimento pelo WhatsApp IA." },
      { status: "Pedido confirmado", time: "20:16", completed: true, details: "Confirmado." },
      { status: "Em preparo", time: "20:18", completed: true, details: "Preparação concluída." },
      { status: "Pronto", time: "20:34", completed: true, details: "Aguardando retirada no balcão da forneria." },
      { status: "Saiu para entrega", time: null, completed: false, details: "Não aplicável (retirada)." },
      { status: "Entregue", time: null, completed: false, details: "" }
    ]
  },
  {
    id: "#1044",
    date: "25/09/2026",
    time: "19:58",
    createdAt: "2026-09-25T19:58:00",
    client: "Felipe Andrade",
    phone: "(11) 99650-7731",
    type: "Delivery",
    channel: "Cardápio Web",
    status: "Entregue",
    isUnread: false,
    paymentMethod: "Cartão de Débito",
    paymentStatus: "Pago na entrega",
    subtotal: 69.90,
    deliveryFee: 6.00,
    discount: 11.40,
    total: 64.50,
    formattedValue: "R$ 64,50",
    address: "Rua Bela Cintra, 310 - Apto 81",
    courier: "Marcos Entrega",
    items: [
      { name: "Pizza Frango com Catupiry Original (G)", qty: 1, unitPrice: 69.90, price: "R$ 69,90" }
    ],
    notes: "Deixar na portaria com Seu Antônio.",
    timeline: [
      { status: "Pedido recebido", time: "19:58", completed: true, details: "Registrado pelo cardápio online." },
      { status: "Pedido confirmado", time: "19:59", completed: true, details: "Confirmado." },
      { status: "Em preparo", time: "20:01", completed: true, details: "Preparado." },
      { status: "Pronto", time: "20:16", completed: true, details: "Embalado." },
      { status: "Saiu para entrega", time: "20:19", completed: true, details: "Despachado com Marcos Entrega." },
      { status: "Entregue", time: "20:38", completed: true, details: "Entregue com sucesso na portaria." }
    ]
  },
  {
    id: "#1043",
    date: "25/09/2026",
    time: "19:42",
    createdAt: "2026-09-25T19:42:00",
    client: "Patrícia Viana",
    phone: "(11) 97001-3429",
    type: "Delivery",
    channel: "WhatsApp IA",
    status: "Entregue",
    isUnread: false,
    paymentMethod: "Pix",
    paymentStatus: "Pago",
    subtotal: 126.00,
    deliveryFee: 8.00,
    discount: 8.00,
    total: 126.00,
    formattedValue: "R$ 126,00",
    address: "Rua Consolação, 2100 - Conj 102",
    courier: "Lucas Motoboy",
    items: [
      { name: "Pizza Parma com Rúcula & Grana (G)", qty: 1, unitPrice: 96.00, price: "R$ 96,00" },
      { name: "Torta Holandesa Artesanal (Fatia)", qty: 2, unitPrice: 15.00, price: "R$ 30,00" }
    ],
    notes: "",
    timeline: [
      { status: "Pedido recebido", time: "19:42", completed: true, details: "Recebido via IA." },
      { status: "Pedido confirmado", time: "19:43", completed: true, details: "Confirmado." },
      { status: "Em preparo", time: "19:45", completed: true, details: "Preparado no forno a lenha." },
      { status: "Pronto", time: "20:02", completed: true, details: "Pronto para entrega." },
      { status: "Saiu para entrega", time: "20:05", completed: true, details: "Despachado." },
      { status: "Entregue", time: "20:25", completed: true, details: "Concluído pelo entregador Lucas." }
    ]
  },
  {
    id: "#1042",
    date: "25/09/2026",
    time: "19:10",
    createdAt: "2026-09-25T19:10:00",
    client: "Rodrigo Toledo",
    phone: "(11) 98234-1190",
    type: "Delivery",
    channel: "WhatsApp IA",
    status: "Cancelado",
    isUnread: false,
    paymentMethod: "Pix",
    paymentStatus: "Estornado",
    subtotal: 82.00,
    deliveryFee: 8.00,
    discount: 0.00,
    total: 90.00,
    formattedValue: "R$ 90,00",
    address: "Rua Teodoro Sampaio, 1400",
    courier: null,
    items: [
      { name: "Pizza Calabresa Artesanal (G)", qty: 1, unitPrice: 68.50, price: "R$ 68,50" },
      { name: "Coca-Cola 2L Gelada", qty: 1, unitPrice: 14.00, price: "R$ 14,00" }
    ],
    notes: "Cliente precisou sair com urgência e solicitou cancelamento antes do forno.",
    cancelReason: "Solicitado pelo cliente antes do início do preparo.",
    timeline: [
      { status: "Pedido recebido", time: "19:10", completed: true, details: "Recebido via WhatsApp IA." },
      { status: "Pedido confirmado", time: "19:12", completed: true, details: "Confirmado." },
      { status: "Cancelado", time: "19:18", completed: true, details: "Cancelado pelo cliente. Pix estornado automaticamente." }
    ]
  }
];

export const initialKpis = [
  {
    id: "orders",
    label: "Pedidos hoje",
    value: "49",
    change: "+14%",
    positive: true,
    subtext: "vs. média de quinta-feira",
    icon: "ShoppingBag"
  },
  {
    id: "revenue",
    label: "Faturamento hoje",
    value: "R$ 3.934,50",
    change: "+8.2%",
    positive: true,
    subtext: "Ticket médio: R$ 80,29",
    icon: "DollarSign"
  },
  {
    id: "reservations",
    label: "Reservas hoje",
    value: "14",
    change: "52 pessoas",
    positive: true,
    subtext: "9 mesas alocadas, 1 salão",
    icon: "Calendar"
  },
  {
    id: "deliveries",
    label: "Entregas em andamento",
    value: "6",
    change: "24 min",
    positive: true,
    subtext: "Tempo médio de entrega",
    icon: "Truck"
  },
  {
    id: "low_stock",
    label: "Estoque baixo",
    value: "4 itens",
    change: "Atenção",
    warning: true,
    subtext: "Mussarela, Farinha 00, Azeite",
    icon: "AlertTriangle"
  },
  {
    id: "profit",
    label: "Lucro líquido",
    value: "R$ 1.458,20",
    change: "37.2%",
    positive: true,
    subtext: "Margem operacional do dia",
    icon: "BarChart3"
  }
];

export const initialAlerts = [
  {
    id: "alt-1",
    category: "order",
    title: "Novo pedido via WhatsApp IA",
    description: "Pedido #1049 recebido e transcrito automaticamente pela IA. Aguardando confirmação do operador.",
    time: "Há 1 min",
    type: "success",
    actionLabel: "Ver pedido",
    actionTarget: "#1049"
  },
  {
    id: "alt-2",
    category: "stock",
    title: "Estoque crítico: Queijo Mussarela Fior di Latte",
    description: "Restam apenas 4,2 kg no estoque de insumos (mínimo de segurança: 15 kg).",
    time: "Há 12 min",
    type: "warning",
    actionLabel: "Adicionar à lista de compras",
    actionTarget: "stock-cheese"
  },
  {
    id: "alt-3",
    category: "delivery",
    title: "Entrega em trânsito com tempo limite",
    description: "Pedido #1046 com Lucas Motoboy em deslocamento na Rua Augusta (22 min de trânsito).",
    time: "Há 18 min",
    type: "info",
    actionLabel: "Rastrear no mapa",
    actionTarget: "delivery-1046"
  },
  {
    id: "alt-4",
    category: "stock",
    title: "Estoque baixo: Farinha Italiana 00 Caputo",
    description: "Restam 2 sacos de 25 kg. Consumo estimado para o fim de semana: 6 sacos.",
    time: "Há 35 min",
    type: "warning",
    actionLabel: "Adicionar à lista de compras",
    actionTarget: "stock-flour"
  }
];

export const salesTimeline = [
  { hour: "18:00", orders: 4, revenue: 320, deliveries: 2 },
  { hour: "19:00", orders: 9, revenue: 765, deliveries: 4 },
  { hour: "20:00", orders: 18, revenue: 1520, deliveries: 7 },
  { hour: "21:00", orders: 12, revenue: 985, deliveries: 5 },
  { hour: "22:00", orders: 5, revenue: 380, deliveries: 2 }
];

export const tables3DData = [
  { id: 1, name: "M01", status: "occupied", capacity: 4, client: "Família Costa", bill: "R$ 164,00", x: -2.2, z: -1.5 },
  { id: 2, name: "M02", status: "free", capacity: 2, client: null, bill: null, x: -0.7, z: -1.5 },
  { id: 3, name: "M03", status: "reserved", capacity: 4, client: "André Ramos", time: "20:30", x: 0.8, z: -1.5 },
  { id: 4, name: "M04", status: "occupied", capacity: 4, client: "Lucas Almeida", bill: "R$ 118,50", x: 2.3, z: -1.5 },
  { id: 5, name: "M05", status: "free", capacity: 6, client: null, bill: null, x: -2.2, z: 0.2 },
  { id: 6, name: "M06", status: "occupied", capacity: 2, client: "Pedro & Julia", bill: "R$ 82,00", x: -0.7, z: 0.2 },
  { id: 7, name: "M07", status: "free", capacity: 4, client: null, bill: null, x: 0.8, z: 0.2 },
  { id: 8, name: "M08", status: "occupied", capacity: 6, client: "Beatriz Oliveira", bill: "R$ 210,00", x: 2.3, z: 0.2 },
  { id: 9, name: "M09", status: "reserved", capacity: 8, client: "Espaço Eventos", time: "21:00", x: -1.5, z: 1.8 },
  { id: 10, name: "M10", status: "free", capacity: 2, client: null, bill: null, x: 0.0, z: 1.8 },
  { id: 11, name: "M11", status: "free", capacity: 4, client: null, bill: null, x: 1.5, z: 1.8 }
];
