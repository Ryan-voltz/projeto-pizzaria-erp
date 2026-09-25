export const establishment = {
  name: "Bella Napoli Forneria",
  tagline: "Gestão Operacional & Forno a Lenha",
  status: "Aberta",
  currentShift: "Noite (18:00 - 23:45)",
  cnpj: "48.291.034/0001-92",
  address: "Rua Harmonia, 412 - Pinheiros, SP",
  phone: "(11) 3042-9900",
  lat: -23.5558,
  lng: -46.6902
};

export const currentUser = {
  name: "Carlos Silva",
  role: "Gerente Geral",
  email: "carlos.silva@bellanapoli.com.br",
  initials: "CS",
  avatarUrl: null
};

// Entregadores detalhados para a página "Entregadores"
export const initialCouriers = [
  {
    id: "cour-1",
    name: "Lucas Motoboy",
    phone: "(11) 98112-4401",
    status: "Em entrega", // Offline, Disponível, Em entrega
    vehicle: "Honda CG 160 Fan",
    plate: "EKS-4819",
    completedToday: 9,
    activeDeliveries: 1,
    lastActive: "Há 4 min",
    rating: "4.9",
    initials: "LM"
  },
  {
    id: "cour-2",
    name: "Marcos Entrega",
    phone: "(11) 97720-3392",
    status: "Disponível",
    vehicle: "Yamaha Factor 150",
    plate: "DFL-9201",
    completedToday: 7,
    activeDeliveries: 0,
    lastActive: "Há 12 min",
    rating: "4.8",
    initials: "ME"
  },
  {
    id: "cour-3",
    name: "Gabriel Souza",
    phone: "(11) 99104-5582",
    status: "Disponível",
    vehicle: "Honda Biz 125",
    plate: "GHI-1042",
    completedToday: 5,
    activeDeliveries: 0,
    lastActive: "Há 25 min",
    rating: "4.9",
    initials: "GS"
  },
  {
    id: "cour-4",
    name: "Renato Dias",
    phone: "(11) 98402-9918",
    status: "Em entrega",
    vehicle: "Honda Bros 160",
    plate: "RTO-8831",
    completedToday: 6,
    activeDeliveries: 1,
    lastActive: "Há 8 min",
    rating: "4.7",
    initials: "RD"
  },
  {
    id: "cour-5",
    name: "Tiago Martins",
    phone: "(11) 97003-1289",
    status: "Offline",
    vehicle: "Yamaha Fazer 250",
    plate: "TMX-3310",
    completedToday: 4,
    activeDeliveries: 0,
    lastActive: "Há 2 horas",
    rating: "4.6",
    initials: "TM"
  }
];

export const couriersList = initialCouriers;

// Entregas da noite com coordenadas de simulação de rota para o mapa
export const initialDeliveries = [
  {
    id: "del-1",
    orderId: "#1049",
    client: "Letícia Ribeiro",
    phone: "(11) 97412-9934",
    address: "Rua Oscar Freire, 1020 - Cerqueira César",
    courier: null,
    time: "20:52",
    dispatchedAt: null,
    status: "Aguardando entregador", // Aguardando entregador, Entregador atribuído, Em rota, Entregue, Cancelada
    duration: "Prev. 28 min",
    elapsedMinutes: 4,
    estimatedArrival: "21:20",
    value: "R$ 94,00",
    paymentMethod: "Pix",
    items: "1x Pizza Quatro Queijos (G), 1x Guaraná 2L",
    mapCoords: { x: 68, y: 35 },
    routeProgress: 0
  },
  {
    id: "del-2",
    orderId: "#1048",
    client: "Mariana Souza",
    phone: "(11) 98452-1920",
    address: "Rua das Palmeiras, 142 - Apto 32 - Santa Cecília",
    courier: "Marcos Entrega",
    time: "20:41",
    dispatchedAt: "20:50",
    status: "Entregador atribuído",
    duration: "Prev. 22 min",
    elapsedMinutes: 8,
    estimatedArrival: "21:12",
    value: "R$ 94,00",
    paymentMethod: "Pix",
    items: "1x Pizza Margherita Especial (G), 1x Coca-Cola 2L",
    mapCoords: { x: 38, y: 28 },
    routeProgress: 25
  },
  {
    id: "del-3",
    orderId: "#1046",
    client: "Roberto Guimarães",
    phone: "(11) 97312-8809",
    address: "Rua Augusta, 850 - Consolação",
    courier: "Lucas Motoboy",
    time: "20:22",
    dispatchedAt: "20:38",
    status: "Em rota",
    duration: "Em trânsito (18 min)",
    elapsedMinutes: 18,
    estimatedArrival: "21:02",
    value: "R$ 78,00",
    paymentMethod: "Dinheiro (troco p/ 100)",
    items: "1x Pizza Pepperoni Supreme (G), 1x Guaraná 2L",
    mapCoords: { x: 55, y: 52 },
    routeProgress: 75
  },
  {
    id: "del-4",
    orderId: "#1050",
    client: "Bruno Castanho",
    phone: "(11) 98664-5501",
    address: "Av. Rebouças, 1450 - Pinheiros",
    courier: "Renato Dias",
    time: "20:30",
    dispatchedAt: "20:44",
    status: "Em rota",
    duration: "Em trânsito (12 min)",
    elapsedMinutes: 12,
    estimatedArrival: "21:06",
    value: "R$ 112,00",
    paymentMethod: "Cartão de Crédito",
    items: "1x Pizza Parma com Rúcula (G), 1x Torta Holandesa",
    mapCoords: { x: 32, y: 64 },
    routeProgress: 60
  },
  {
    id: "del-5",
    orderId: "#1044",
    client: "Felipe Andrade",
    phone: "(11) 99650-7731",
    address: "Rua Bela Cintra, 310 - Apto 81",
    courier: "Marcos Entrega",
    time: "19:58",
    dispatchedAt: "20:19",
    status: "Entregue",
    duration: "19 min (Total)",
    elapsedMinutes: 40,
    estimatedArrival: "Entregue às 20:38",
    value: "R$ 64,50",
    paymentMethod: "Cartão de Débito",
    items: "1x Pizza Frango com Catupiry (G)",
    mapCoords: { x: 62, y: 70 },
    routeProgress: 100
  },
  {
    id: "del-6",
    orderId: "#1043",
    client: "Patrícia Viana",
    phone: "(11) 97001-3429",
    address: "Rua Consolação, 2100 - Conj 102",
    courier: "Lucas Motoboy",
    time: "19:42",
    dispatchedAt: "20:05",
    status: "Entregue",
    duration: "20 min (Total)",
    elapsedMinutes: 56,
    estimatedArrival: "Entregue às 20:25",
    value: "R$ 126,00",
    paymentMethod: "Pix",
    items: "1x Pizza Parma com Rúcula (G), 2x Torta Holandesa",
    mapCoords: { x: 50, y: 80 },
    routeProgress: 100
  },
  {
    id: "del-7",
    orderId: "#1041",
    client: "Daniel Carvalho",
    phone: "(11) 98110-3329",
    address: "Rua Mourato Coelho, 920",
    courier: null,
    time: "19:15",
    dispatchedAt: null,
    status: "Cancelada",
    duration: "Cancelada",
    elapsedMinutes: 0,
    estimatedArrival: "Cancelada pelo cliente",
    value: "R$ 82,00",
    paymentMethod: "Pix",
    items: "1x Pizza Calabresa (G)",
    mapCoords: { x: 25, y: 40 },
    routeProgress: 0
  }
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

export const initialTables = [
  {
    id: "M01",
    name: "Mesa 01",
    number: 1,
    capacity: 4,
    status: "Ocupada",
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
    type: "Aniversário",
    notes: "Comemoração de aniversário. Trazem bolo próprio.",
    status: "Em andamento"
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

// ==========================================
// MÓDULO DE PRODUTOS, CATEGORIAS E ESTOQUE
// ==========================================

export const initialCategories = [
  { id: "cat-1", name: "Pizzas Tradicionais", description: "Pizzas clássicas napolitanas e tradicionais", status: "Ativo", color: "emerald", productCount: 4 },
  { id: "cat-2", name: "Pizzas Especiais", description: "Receitas autorais e queijos nobres", status: "Ativo", color: "blue", productCount: 3 },
  { id: "cat-3", name: "Pizzas Doces", description: "Sobremesas de massa fina crocante", status: "Ativo", color: "amber", productCount: 2 },
  { id: "cat-4", name: "Bebidas & Vinhos", description: "Vinhos italianos, cervejas artesanais e refrigerantes", status: "Ativo", color: "purple", productCount: 3 },
  { id: "cat-5", name: "Entradas & Antepastos", description: "Bruschettas, focaccias e burratas artesanais", status: "Ativo", color: "rose", productCount: 2 },
  { id: "cat-6", name: "Insumos & Matéria-Prima", description: "Farinhas, queijos, molhos e embalagens", status: "Ativo", color: "slate", productCount: 5 }
];

export const initialProducts = [
  {
    id: "prod-1",
    name: "Pizza Margherita Especial",
    category: "Pizzas Especiais",
    description: "Molho de tomate San Marzano D.O.P., mussarela de búfala fresca, manjericão gigante e azeite extravirgem.",
    price: 74.00,
    cost: 23.50,
    stock: 45,
    minStock: 20,
    unit: "un",
    status: "Ativo",
    image: "🍕",
    lastMovement: "Hoje, 18:20"
  },
  {
    id: "prod-2",
    name: "Pizza Quatro Queijos Suprema",
    category: "Pizzas Tradicionais",
    description: "Mussarela especial, gorgonzola doce, catupiry original e provolone curado.",
    price: 79.00,
    cost: 26.00,
    stock: 32,
    minStock: 15,
    unit: "un",
    status: "Ativo",
    image: "🧀",
    lastMovement: "Hoje, 17:40"
  },
  {
    id: "prod-3",
    name: "Pizza Pepperoni Supreme",
    category: "Pizzas Tradicionais",
    description: "Fatias generosas de pepperoni artesanal levemente picante, cebola roxa e orégano fresco.",
    price: 78.00,
    cost: 24.80,
    stock: 28,
    minStock: 15,
    unit: "un",
    status: "Ativo",
    image: "🍕",
    lastMovement: "Hoje, 17:15"
  },
  {
    id: "prod-4",
    name: "Pizza Calabresa Artesanal",
    category: "Pizzas Tradicionais",
    description: "Linguiça calabresa defumada artesanal, cebola em rodelas e azeitonas pretas chilenas.",
    price: 68.00,
    cost: 19.50,
    stock: 12,
    minStock: 15,
    unit: "un",
    status: "Ativo",
    image: "🍕",
    lastMovement: "Hoje, 16:50"
  },
  {
    id: "prod-5",
    name: "Pizza Nutella com Morangos",
    category: "Pizzas Doces",
    description: "Pura Nutella italiana com morangos frescos selecionados e raspas de chocolate branco.",
    price: 64.00,
    cost: 22.00,
    stock: 18,
    minStock: 10,
    unit: "un",
    status: "Ativo",
    image: "🍫",
    lastMovement: "Hoje, 15:30"
  },
  {
    id: "prod-6",
    name: "Burrata al Pesto Genovês",
    category: "Entradas & Antepastos",
    description: "Burrata de búfala cremosa, tomates confitados, pesto de manjericão genovês e focaccia da casa.",
    price: 54.00,
    cost: 18.20,
    stock: 6,
    minStock: 8,
    unit: "un",
    status: "Ativo",
    image: "🥗",
    lastMovement: "Ontem, 22:15"
  },
  {
    id: "prod-7",
    name: "Vinho Chianti Ruffino DOCG 750ml",
    category: "Bebidas & Vinhos",
    description: "Vinho tinto italiano elegante da região da Toscana, safra selecionada.",
    price: 135.00,
    cost: 68.00,
    stock: 14,
    minStock: 6,
    unit: "gf",
    status: "Ativo",
    image: "🍷",
    lastMovement: "Ontem, 19:00"
  },
  {
    id: "prod-8",
    name: "Cerveja Stella Artois 330ml",
    category: "Bebidas & Vinhos",
    description: "Premium American Lager puro malte, garrafa long neck gelada.",
    price: 14.00,
    cost: 5.20,
    stock: 64,
    minStock: 24,
    unit: "un",
    status: "Ativo",
    image: "🍺",
    lastMovement: "Ontem, 11:20"
  },
  {
    id: "prod-9",
    name: "Coca-Cola 2 Litros",
    category: "Bebidas & Vinhos",
    description: "Refrigerante garrafa PET 2L gelada para delivery e salão.",
    price: 16.00,
    cost: 7.10,
    stock: 3,
    minStock: 12,
    unit: "un",
    status: "Ativo",
    image: "🥤",
    lastMovement: "Hoje, 14:00"
  },
  {
    id: "prod-10",
    name: "Queijo Mussarela Fior di Latte",
    category: "Insumos & Matéria-Prima",
    description: "Queijo mussarela fresco especial para cobertura de pizzas de forno a lenha.",
    price: 0.00,
    cost: 38.50,
    stock: 4.2,
    minStock: 15,
    unit: "kg",
    status: "Ativo",
    image: "🧀",
    lastMovement: "Hoje, 17:45"
  },
  {
    id: "prod-11",
    name: "Farinha Italiana 00 Caputo",
    category: "Insumos & Matéria-Prima",
    description: "Farinha de trigo tipo 00 importada para fermentação lenta 48h.",
    price: 0.00,
    cost: 165.00,
    stock: 2,
    minStock: 6,
    unit: "saco 25kg",
    status: "Ativo",
    image: "🌾",
    lastMovement: "Hoje, 15:10"
  },
  {
    id: "prod-12",
    name: "Tomate Pelado San Marzano D.O.P.",
    category: "Insumos & Matéria-Prima",
    description: "Tomates italianos pelados inteiros em suco natural da Campania.",
    price: 0.00,
    cost: 14.20,
    stock: 0,
    minStock: 24,
    unit: "lata 2.5kg",
    status: "Ativo",
    image: "🍅",
    lastMovement: "Hoje, 16:30"
  },
  {
    id: "prod-13",
    name: "Azeite Extravirgem Italiano 5L",
    category: "Insumos & Matéria-Prima",
    description: "Azeite extravirgem acidez máxima 0.2% importado para finalização.",
    price: 0.00,
    cost: 210.00,
    stock: 1,
    minStock: 3,
    unit: "galão 5L",
    status: "Ativo",
    image: "🫒",
    lastMovement: "Ontem, 09:30"
  },
  {
    id: "prod-14",
    name: "Caixa de Pizza Oitavada G 35cm",
    category: "Insumos & Matéria-Prima",
    description: "Embalagem térmica oitavada com orifício de respiro para delivery crocante.",
    price: 0.00,
    cost: 2.15,
    stock: 85,
    minStock: 150,
    unit: "un",
    status: "Ativo",
    image: "📦",
    lastMovement: "Anteontem, 16:00"
  },
  {
    id: "prod-15",
    name: "Torta Tiramisù Tradicional",
    category: "Pizzas Doces",
    description: "Receita clássica com mascarpone, café espresso e biscoito champanhe.",
    price: 32.00,
    cost: 11.00,
    stock: 0,
    minStock: 6,
    unit: "fatia",
    status: "Inativo",
    image: "🍰",
    lastMovement: "3 dias atrás"
  }
];

export const initialStockMovements = [
  {
    id: "mov-1",
    date: "Hoje, 17:45",
    productId: "prod-10",
    productName: "Queijo Mussarela Fior di Latte",
    type: "Entrada",
    quantity: "+20 kg",
    user: "Carlos Silva",
    note: "Nota fiscal #88392 - Laticínios Serra"
  },
  {
    id: "mov-2",
    date: "Hoje, 16:30",
    productId: "prod-12",
    productName: "Tomate Pelado San Marzano D.O.P.",
    type: "Saída",
    quantity: "-6 latas",
    user: "Chef Giovanni",
    note: "Produção do molho base para o turno da noite"
  },
  {
    id: "mov-3",
    date: "Hoje, 15:10",
    productId: "prod-11",
    productName: "Farinha Italiana 00 Caputo",
    type: "Saída",
    quantity: "-2 sacos",
    user: "Matteo Pizzaiolo",
    note: "Massa fermentação 48h (300 massas)"
  },
  {
    id: "mov-4",
    date: "Hoje, 14:00",
    productId: "prod-9",
    productName: "Coca-Cola 2 Litros",
    type: "Ajuste",
    quantity: "-4 un",
    user: "Carlos Silva",
    note: "Contagem física semanal no almoxarifado"
  },
  {
    id: "mov-5",
    date: "Ontem, 22:15",
    productId: "prod-6",
    productName: "Burrata al Pesto Genovês",
    type: "Perda",
    quantity: "-2 un",
    user: "Chef Giovanni",
    note: "Embalagem perfurada pelo fornecedor no transporte"
  },
  {
    id: "mov-6",
    date: "Ontem, 11:20",
    productId: "prod-8",
    productName: "Cerveja Stella Artois 330ml",
    type: "Entrada",
    quantity: "+48 un",
    user: "Carlos Silva",
    note: "Recebimento Ambev pedido #44019"
  },
  {
    id: "mov-7",
    date: "Ontem, 09:30",
    productId: "prod-13",
    productName: "Azeite Extravirgem Italiano 5L",
    type: "Ajuste",
    quantity: "+1 galão",
    user: "Carlos Silva",
    note: "Correção de inventário inicial"
  }
];

// ==========================================
// MÓDULO FINANCEIRO E RELATÓRIOS
// ==========================================

export const initialFinancialEntries = [
  {
    id: "fin-1",
    date: "25/09/2026 20:52",
    description: "Pedido #1049 - Carlos Eduardo (Delivery)",
    category: "Venda Delivery",
    type: "Receita",
    value: 94.00,
    paymentMethod: "Pix",
    status: "Confirmado",
    note: "1x Pizza Quatro Queijos, 1x Guaraná 2L"
  },
  {
    id: "fin-2",
    date: "25/09/2026 20:41",
    description: "Pedido #1048 - Mariana Souza (Delivery)",
    category: "Venda Delivery",
    type: "Receita",
    value: 94.00,
    paymentMethod: "Pix",
    status: "Confirmado",
    note: "1x Pizza Margherita, 1x Coca 2L"
  },
  {
    id: "fin-3",
    date: "25/09/2026 20:30",
    description: "Mesa 08 - Conta Fechada (Salão)",
    category: "Venda Salão",
    type: "Receita",
    value: 210.00,
    paymentMethod: "Cartão de Crédito",
    status: "Confirmado",
    note: "2x Pizzas Especiais, 1x Vinho Chianti"
  },
  {
    id: "fin-4",
    date: "25/09/2026 19:15",
    description: "NF #88392 - Laticínios Serra (Queijo Mussarela)",
    category: "Insumos / Cozinha",
    type: "Despesa",
    value: 770.00,
    paymentMethod: "Boleto Bancário",
    status: "Confirmado",
    note: "20 kg Mussarela Fior di Latte fresca"
  },
  {
    id: "fin-5",
    date: "25/09/2026 18:40",
    description: "Mesa 01 - Consumo Salão",
    category: "Venda Salão",
    type: "Receita",
    value: 164.00,
    paymentMethod: "Cartão de Débito",
    status: "Confirmado",
    note: "Família Costa - 2x Pizzas Tradicionais"
  },
  {
    id: "fin-6",
    date: "25/09/2026 17:30",
    description: "Compra Emergencial Embalagens Térmicas G",
    category: "Embalagens",
    type: "Despesa",
    value: 182.75,
    paymentMethod: "Pix",
    status: "Confirmado",
    note: "85 caixas oitavadas para delivery"
  },
  {
    id: "fin-7",
    date: "25/09/2026 16:00",
    description: "Diária Motoboy Deslocamento Extra - Lucas",
    category: "Logística / Entregas",
    type: "Despesa",
    value: 120.00,
    paymentMethod: "Pix",
    status: "Confirmado",
    note: "Adiantamento de diária e taxa por entrega"
  },
  {
    id: "fin-8",
    date: "25/09/2026 14:20",
    description: "Recarga Botijões de Gás Industrial P-45",
    category: "Serviços & Utilidades",
    type: "Despesa",
    value: 380.00,
    paymentMethod: "Transferência",
    status: "Confirmado",
    note: "Fornecimento Ultragaz para forno auxiliar"
  },
  {
    id: "fin-9",
    date: "24/09/2026 21:50",
    description: "Vendas Delivery Noturnas (Lote Pix/Cartão)",
    category: "Venda Delivery",
    type: "Receita",
    value: 3120.00,
    paymentMethod: "Pix",
    status: "Confirmado",
    note: "Fechamento de caixa delivery dia anterior"
  },
  {
    id: "fin-10",
    date: "24/09/2026 15:00",
    description: "Fornecimento Hortifruti & Manjericão Genovês",
    category: "Insumos / Cozinha",
    type: "Despesa",
    value: 290.00,
    paymentMethod: "Pix",
    status: "Confirmado",
    note: "Tomates confitados, rúcula e ervas frescas"
  }
];

export const financialPeriodsData = {
  hoje: {
    label: "Hoje (25 de Setembro)",
    revenue: 3970.00,
    costs: 1240.00,
    expenses: 480.00,
    grossProfit: 2730.00,
    netProfit: 2250.00,
    ordersCount: 48,
    avgTicket: 82.70,
    deliveriesCount: 32,
    deliveriesCompleted: 31,
    avgDeliveryTime: "24 min",
    timeline: [
      { label: "18:00", revenue: 320, orders: 4, deliveries: 2 },
      { label: "19:00", revenue: 765, orders: 9, deliveries: 6 },
      { label: "20:00", revenue: 1520, orders: 18, deliveries: 13 },
      { label: "21:00", revenue: 985, orders: 12, deliveries: 8 },
      { label: "22:00", revenue: 380, orders: 5, deliveries: 3 }
    ]
  },
  "7dias": {
    label: "Últimos 7 dias",
    revenue: 28450.00,
    costs: 9120.00,
    expenses: 4200.00,
    grossProfit: 19330.00,
    netProfit: 15130.00,
    ordersCount: 342,
    avgTicket: 83.18,
    deliveriesCount: 228,
    deliveriesCompleted: 224,
    avgDeliveryTime: "26 min",
    timeline: [
      { label: "Sex", revenue: 4200, orders: 51, deliveries: 34 },
      { label: "Sáb", revenue: 5850, orders: 68, deliveries: 46 },
      { label: "Dom", revenue: 5120, orders: 62, deliveries: 41 },
      { label: "Seg", revenue: 1950, orders: 25, deliveries: 16 },
      { label: "Ter", revenue: 3400, orders: 42, deliveries: 28 },
      { label: "Qua", revenue: 3960, orders: 46, deliveries: 31 },
      { label: "Qui (Hoje)", revenue: 3970, orders: 48, deliveries: 32 }
    ]
  },
  "30dias": {
    label: "Últimos 30 dias",
    revenue: 114800.00,
    costs: 37200.00,
    expenses: 18400.00,
    grossProfit: 77600.00,
    netProfit: 59200.00,
    ordersCount: 1390,
    avgTicket: 82.59,
    deliveriesCount: 924,
    deliveriesCompleted: 912,
    avgDeliveryTime: "25 min",
    timeline: [
      { label: "Semana 1", revenue: 26800, orders: 325, deliveries: 215 },
      { label: "Semana 2", revenue: 29400, orders: 358, deliveries: 238 },
      { label: "Semana 3", revenue: 30150, orders: 365, deliveries: 243 },
      { label: "Semana 4", revenue: 28450, orders: 342, deliveries: 228 }
    ]
  },
  mesAtual: {
    label: "Mês Atual (Setembro)",
    revenue: 96350.00,
    costs: 31100.00,
    expenses: 15200.00,
    grossProfit: 65250.00,
    netProfit: 50050.00,
    ordersCount: 1165,
    avgTicket: 82.70,
    deliveriesCount: 774,
    deliveriesCompleted: 762,
    avgDeliveryTime: "25 min",
    timeline: [
      { label: "01 a 07", revenue: 24500, orders: 295, deliveries: 196 },
      { label: "08 a 14", revenue: 25800, orders: 312, deliveries: 208 },
      { label: "15 a 21", revenue: 26600, orders: 322, deliveries: 214 },
      { label: "22 a 25", revenue: 19450, orders: 236, deliveries: 156 }
    ]
  },
  personalizado: {
    label: "Período Personalizado",
    revenue: 42100.00,
    costs: 13600.00,
    expenses: 6100.00,
    grossProfit: 28500.00,
    netProfit: 22400.00,
    ordersCount: 510,
    avgTicket: 82.54,
    deliveriesCount: 338,
    deliveriesCompleted: 332,
    avgDeliveryTime: "25 min",
    timeline: [
      { label: "Dia 1", revenue: 5400, orders: 65, deliveries: 43 },
      { label: "Dia 2", revenue: 6100, orders: 74, deliveries: 49 },
      { label: "Dia 3", revenue: 5800, orders: 70, deliveries: 46 },
      { label: "Dia 4", revenue: 6400, orders: 78, deliveries: 52 },
      { label: "Dia 5", revenue: 6200, orders: 75, deliveries: 50 },
      { label: "Dia 6", revenue: 6050, orders: 73, deliveries: 48 },
      { label: "Dia 7", revenue: 6150, orders: 75, deliveries: 50 }
    ]
  }
};

export const topSellingProducts = [
  { rank: 1, name: "Pizza Margherita Especial", category: "Pizzas Especiais", qty: 142, revenue: 10508.00, margin: "68%" },
  { rank: 2, name: "Pizza Quatro Queijos Suprema", category: "Pizzas Tradicionais", qty: 118, revenue: 9322.00, margin: "67%" },
  { rank: 3, name: "Pizza Pepperoni Supreme", category: "Pizzas Tradicionais", qty: 96, revenue: 7488.00, margin: "68%" },
  { rank: 4, name: "Pizza Calabresa Artesanal", category: "Pizzas Tradicionais", qty: 84, revenue: 5712.00, margin: "71%" },
  { rank: 5, name: "Vinho Chianti Ruffino DOCG", category: "Bebidas & Vinhos", qty: 45, revenue: 6075.00, margin: "50%" },
  { rank: 6, name: "Coca-Cola 2 Litros", category: "Bebidas & Vinhos", qty: 132, revenue: 2112.00, margin: "56%" }
];

// ==========================================
// MÓDULO CLIENTES (CRM)
// ==========================================

export const initialCustomers = [
  {
    id: "cust-1",
    name: "Carlos Eduardo Mendes",
    phone: "(11) 98142-9901",
    email: "carlos.mendes@email.com",
    address: "Rua Mourato Coelho, 940 - Pinheiros, SP",
    cpf: "349.882.108-44",
    registeredAt: "12/03/2025",
    totalSpent: 1248.50,
    ordersCount: 14,
    lastOrder: "Hoje, 20:52",
    lastReservation: "18/09/2026 - Mesa 04 (4 pessoas)",
    notes: "Prefere borda vulcânica de Catupiry. Não consome cebola.",
    tier: "VIP",
    ordersHistory: [
      { id: "#1049", date: "Hoje, 20:52", items: "1x Pizza Quatro Queijos (G), 1x Guaraná 2L", value: 94.00, status: "Confirmado" },
      { id: "#1032", date: "19/09/2026", items: "2x Pizza Margherita (G), 1x Coca-Cola 2L", value: 164.00, status: "Entregue" },
      { id: "#1015", date: "12/09/2026", items: "1x Pizza Pepperoni (G)", value: 78.00, status: "Entregue" }
    ],
    reservationsHistory: [
      { id: "res-101", date: "18/09/2026", time: "20:00", table: "Mesa 04", people: 4, status: "Finalizada" },
      { id: "res-088", date: "22/08/2026", time: "19:30", table: "Mesa 06", people: 2, status: "Finalizada" }
    ]
  },
  {
    id: "cust-2",
    name: "Mariana Souza Ribeiro",
    phone: "(11) 98452-1920",
    email: "mari.souza@gmail.com",
    address: "Rua das Palmeiras, 142 - Apto 32 - Santa Cecília, SP",
    cpf: "219.043.918-12",
    registeredAt: "05/01/2025",
    totalSpent: 980.00,
    ordersCount: 11,
    lastOrder: "Hoje, 20:41",
    lastReservation: "25/09/2026 - Mesa 06 (2 pessoas)",
    notes: "Adora vinho Chianti e orégano fresco.",
    tier: "VIP",
    ordersHistory: [
      { id: "#1048", date: "Hoje, 20:41", items: "1x Pizza Margherita (G), 1x Coca-Cola 2L", value: 94.00, status: "Em preparo" },
      { id: "#1029", date: "16/09/2026", items: "1x Burrata al Pesto, 1x Vinho Chianti", value: 189.00, status: "Entregue" }
    ],
    reservationsHistory: [
      { id: "res-102", date: "25/09/2026", time: "21:00", table: "Mesa 06", people: 2, status: "Confirmada" }
    ]
  },
  {
    id: "cust-3",
    name: "Roberto Guimarães",
    phone: "(11) 97312-8809",
    email: "roberto.guimaraes@empresa.com",
    address: "Rua Augusta, 850 - Consolação, SP",
    cpf: "189.332.091-88",
    registeredAt: "20/04/2025",
    totalSpent: 620.00,
    ordersCount: 7,
    lastOrder: "Hoje, 20:22",
    lastReservation: "-",
    notes: "Sempre pede entrega expressa. Pagamento em dinheiro.",
    tier: "Frequente",
    ordersHistory: [
      { id: "#1046", date: "Hoje, 20:22", items: "1x Pizza Pepperoni (G), 1x Guaraná 2L", value: 78.00, status: "Saiu para entrega" },
      { id: "#1004", date: "08/09/2026", items: "1x Pizza Calabresa (G)", value: 68.00, status: "Entregue" }
    ],
    reservationsHistory: []
  },
  {
    id: "cust-4",
    name: "Beatriz Oliveira",
    phone: "(11) 99120-4491",
    email: "beatriz.oliveira@uol.com.br",
    address: "Rua dos Pinheiros, 610 - Pinheiros, SP",
    cpf: "410.998.223-01",
    registeredAt: "10/02/2024",
    totalSpent: 1890.00,
    ordersCount: 19,
    lastOrder: "Hoje, 19:30",
    lastReservation: "Hoje, 20:00 - Mesa 08 (6 pessoas)",
    notes: "Membro do clube de vinhos. Costuma reservar para comemorações.",
    tier: "VIP",
    ordersHistory: [
      { id: "#1044", date: "Hoje, 19:30", items: "Consumo Salão Mesa 08", value: 210.00, status: "Confirmado" }
    ],
    reservationsHistory: [
      { id: "res-004", date: "Hoje", time: "20:00", table: "Mesa 08", people: 6, status: "Em andamento" }
    ]
  },
  {
    id: "cust-5",
    name: "André Ramos",
    phone: "(11) 98841-2200",
    email: "andre.ramos@advocacia.com",
    address: "Av. Brigadeiro Faria Lima, 2100 - Itaim Bibi, SP",
    cpf: "099.112.443-55",
    registeredAt: "15/06/2025",
    totalSpent: 450.00,
    ordersCount: 5,
    lastOrder: "Ontem, 20:15",
    lastReservation: "Hoje, 20:30 - Mesa 03 (4 pessoas)",
    notes: "Alérgico a frutos do mar.",
    tier: "Frequente",
    ordersHistory: [
      { id: "#1039", date: "Ontem, 20:15", items: "1x Pizza Margherita (G)", value: 74.00, status: "Entregue" }
    ],
    reservationsHistory: [
      { id: "res-003", date: "Hoje", time: "20:30", table: "Mesa 03", people: 4, status: "Confirmada" }
    ]
  },
  {
    id: "cust-6",
    name: "Juliana Silveira",
    phone: "(11) 97601-3392",
    email: "juliana.silveira@design.com",
    address: "Rua Fradique Coutinho, 312 - Vila Madalena, SP",
    cpf: "288.771.602-99",
    registeredAt: "01/08/2025",
    totalSpent: 312.00,
    ordersCount: 4,
    lastOrder: "22/09/2026",
    lastReservation: "-",
    notes: "Prefere massas integrais ou sem glúten quando disponível.",
    tier: "Regular",
    ordersHistory: [
      { id: "#1022", date: "22/09/2026", items: "1x Burrata al Pesto, 1x Suco Natural", value: 68.00, status: "Entregue" }
    ],
    reservationsHistory: []
  }
];

// ==========================================
// MÓDULO WHATSAPP IA & ATENDIMENTO
// ==========================================

export const initialConversations = [
  {
    id: "conv-1",
    clientName: "Carlos Eduardo Mendes",
    phone: "(11) 98142-9901",
    status: "IA Respondendo", // 'IA Respondendo' | 'Aguardando Atendente' | 'Concluído'
    lastMessage: "O motoboy Lucas já está na Rua Mourato Coelho a caminho.",
    time: "20:54",
    unreadCount: 0,
    hasDraftOrder: false,
    messages: [
      { id: 1, sender: "client", text: "Boa noite! Gostaria de saber como está meu pedido #1049?", time: "20:51" },
      { id: 2, sender: "ai", text: "Buona sera, Carlos! 🍕 Sou a Bella da Forneria Bella Napoli. Seu pedido #1049 (1x Quatro Queijos + 1x Guaraná 2L) acabou de sair do forno e foi despachado com nosso motoboy Lucas!", time: "20:52" },
      { id: 3, sender: "client", text: "Excelente! Qual o tempo estimado de chegada?", time: "20:53" },
      { id: 4, sender: "ai", text: "O tempo estimado é de 18 a 22 minutos. Você pode acompanhar a rota no nosso link de rastreamento: bellanapoli.com.br/rastrear/PED-1049 🛵", time: "20:54" }
    ]
  },
  {
    id: "conv-2",
    clientName: "Mariana Souza",
    phone: "(11) 98452-1920",
    status: "IA Respondendo",
    lastMessage: "Perfeito! A Margherita já está no forno a lenha.",
    time: "20:43",
    unreadCount: 0,
    hasDraftOrder: true,
    draftOrder: {
      items: "1x Pizza Margherita Especial (G), 1x Coca-Cola 2L",
      total: 94.00,
      payment: "Pix",
      address: "Rua das Palmeiras, 142 - Apto 32"
    },
    messages: [
      { id: 1, sender: "client", text: "Olá, gostaria de pedir uma pizza grande de Margherita com massa bem crocante e uma Coca 2L no Pix por favor.", time: "20:40" },
      { id: 2, sender: "ai", text: "Olá Mariana! Que ótima escolha! Já anotei o seu pedido: 1x Pizza Margherita Especial (G) com massa fina crocante + 1x Coca-Cola 2L. Valor total: R$ 94,00. Confirma para entrega no seu endereço Rua das Palmeiras, 142?", time: "20:41" },
      { id: 3, sender: "client", text: "Isso mesmo, confirmado!", time: "20:42" },
      { id: 4, sender: "ai", text: "Pedido confirmado com sucesso (#1048)! Já geramos a chave Pix e enviamos para a nossa cozinha. Previsão de 35 a 45 min!", time: "20:43" }
    ]
  },
  {
    id: "conv-3",
    clientName: "Fernanda Alencar",
    phone: "(11) 97711-2290",
    status: "Aguardando Atendente",
    lastMessage: "Gostaria de fechar o Espaço Festa para 35 pessoas no sábado.",
    time: "20:20",
    unreadCount: 1,
    hasDraftOrder: false,
    messages: [
      { id: 1, sender: "client", text: "Boa noite! Vocês têm reserva para 35 pessoas no Espaço Festa para o próximo sábado às 19:30?", time: "20:18" },
      { id: 2, sender: "ai", text: "Buona sera, Fernanda! Nosso Espaço Festa comporta até 40 pessoas com buffet de pizzas napolitanas. Vou encaminhar você agora para nosso gerente Carlos para confirmar os detalhes do menu exclusivo!", time: "20:19" },
      { id: 3, sender: "client", text: "Ótimo, fico no aguardo dele!", time: "20:20" }
    ]
  },
  {
    id: "conv-4",
    clientName: "Bruno Castanho",
    phone: "(11) 98664-5501",
    status: "Concluído",
    lastMessage: "Muito obrigado, a pizza estava divina!",
    time: "19:45",
    unreadCount: 0,
    hasDraftOrder: false,
    messages: [
      { id: 1, sender: "client", text: "Boa noite, o entregador acabou de chegar!", time: "19:25" },
      { id: 2, sender: "ai", text: "Que maravilha, Bruno! Tenha um excelente jantar! Depois nos conte o que achou da nossa massa de fermentação 48h! 🍕", time: "19:26" },
      { id: 3, sender: "client", text: "Muito obrigado, a pizza estava divina!", time: "19:45" }
    ]
  }
];

export const initialAIConfig = {
  name: "Bella",
  role: "Atendente Virtual Especialista em Pizzas Napolitanas",
  tone: "Amigável, acolhedor e ágil (estilo trattoria italiana moderna)",
  establishmentName: "Bella Napoli Forneria",
  hours: "Terça a Domingo das 18:00 às 23:45",
  address: "Rua Harmonia, 412 - Pinheiros, São Paulo - SP",
  maxDeliveryRadiusKm: 8,
  averagePrepTime: "25 a 35 minutos",
  systemPrompt: `Você é a "Bella", assistente de inteligência artificial da pizzaria Bella Napoli Forneria.
Suas diretrizes:
1. Cumprimente os clientes com calor e simpatia italiana ("Buona sera!", "Ciao!").
2. Oriente os clientes quanto ao cardápio de pizzas artesanais, opções vegetarianas e harmonização com vinhos Chianti.
3. Colete dados de entrega (endereço com número e complemento) e forma de pagamento (Pix, Cartão, Dinheiro).
4. Para reservas acima de 15 pessoas ou espaço de eventos, faça a triagem e transfira para o gerente humano Carlos.
5. Sempre confirme o pedido repetindo os itens, valores e tempo estimado antes de finalizar.`,
  activeRules: [
    "Respostas automáticas em até 3 segundos",
    "Geração de pedido rascunho com cálculo automático de frete",
    "Envio automático de chave Pix copia-e-cola",
    "Transbordo para atendente humano quando cliente solicitar ou para eventos grandes"
  ]
};

export const initialAutomations = [
  {
    id: "auto-1",
    name: "Boas-vindas para Novos Clientes",
    description: "Envia saudação e cardápio digital quando cliente manda a primeira mensagem.",
    status: "Ativo",
    trigger: "Primeiro contato no WhatsApp",
    schedule: "Imediato",
    message: "Ciao! 🍕 Seja muito bem-vindo à Bella Napoli Forneria! Eu sou a Bella, sua assistente virtual. Como posso te atender hoje? Você pode pedir delivery, consultar o cardápio ou reservar uma mesa."
  },
  {
    id: "auto-2",
    name: "Confirmação de Pedido com Chave Pix",
    description: "Dispara resumo do pedido, valor e código Pix assim que o pedido é registrado.",
    status: "Ativo",
    trigger: "Novo pedido registrado",
    schedule: "Imediato pós-pedido",
    message: "Oba, {cliente}! Seu pedido {pedido} foi recebido com sucesso pela nossa cozinha. Valor total: {valor}. Segue o Pix copia e cola abaixo para pagamento instantâneo."
  },
  {
    id: "auto-3",
    name: "Confirmação de Reserva de Mesa",
    description: "Notifica data, horário e mesa reservada no salão ou espaço de eventos.",
    status: "Ativo",
    trigger: "Reserva confirmada no sistema",
    schedule: "Imediato pós-reserva",
    message: "Sua mesa está garantida na Bella Napoli! 🍷 Data: {data}, às {horario} para {pessoas} pessoas. Guardaremos sua mesa por até 15 minutos de tolerância. Até logo!"
  },
  {
    id: "auto-4",
    name: "Pedido Saiu para Entrega",
    description: "Alerta cliente com link de rastreamento no momento em que o motoboy retira a bag.",
    status: "Ativo",
    trigger: "Status alterado para 'Em rota'",
    schedule: "No despacho do motoboy",
    message: "Seu pedido {pedido} acabou de sair do forno e já está a caminho com o nosso motoboy {motoboy}! Acompanhe a entrega ao vivo: {link_rastreamento} 🛵"
  },
  {
    id: "auto-5",
    name: "Pesquisa de Satisfação Pós-Entrega",
    description: "Pergunta a avaliação do cliente 45 minutos após a confirmação de entrega.",
    status: "Ativo",
    trigger: "45 minutos após 'Entregue'",
    schedule: "Automático",
    message: "Esperamos que sua pizza tenha chegado quentinha e deliciosa! 🍕 Numa escala de 1 a 5 estrelas, qual nota você dá para a nossa forneria hoje?"
  },
  {
    id: "auto-6",
    name: "Disparo Promocional Semanal",
    description: "Campanha periódica de novidades e vinhos com frete grátis nas quintas-feiras.",
    status: "Ativo",
    trigger: "Agendamento semanal",
    schedule: "Toda Quinta-feira às 17:30",
    message: "Quinta da Forneria! 🍕 Peça hoje qualquer pizza especial e ganhe 50% de desconto na segunda unidade ou uma taça de vinho Chianti de cortesia! Peça agora respondendo esta mensagem."
  }
];

export const initialWeeklyCampaign = {
  name: "Quinta Napolitana - Dobradinha Especial",
  message: "Buona sera! A nossa lenha já está estalando! 🍕 Hoje na compra de qualquer pizza Speciale você ganha frete grátis e sobremesa grátis para pedidos até as 21h. Peça pelo cardápio digital ou responda EU QUERO!",
  dayOfWeek: "Quinta-feira",
  time: "17:30",
  audience: "Todos os clientes ativos (últimos 60 dias)",
  status: "Ativo",
  estimatedRecipients: 418
};

// ==========================================
// MÓDULO CONFIGURAÇÕES & USUÁRIOS
// ==========================================

export const initialSystemUsers = [
  {
    id: "usr-1",
    name: "Carlos Silva",
    email: "carlos.silva@bellanapoli.com.br",
    role: "Administrador",
    status: "Ativo",
    lastLogin: "Hoje, 18:02",
    allowedModules: ["dashboard", "pedidos", "reservas", "mesas", "entregas", "entregadores", "produtos", "estoque", "compras", "clientes", "whatsapp_ia", "financeiro", "relatorios", "configuracoes"]
  },
  {
    id: "usr-2",
    name: "Giovanni Bianchi",
    email: "chef.giovanni@bellanapoli.com.br",
    role: "Gerente",
    status: "Ativo",
    lastLogin: "Hoje, 17:15",
    allowedModules: ["dashboard", "pedidos", "reservas", "mesas", "produtos", "estoque", "compras", "relatorios"]
  },
  {
    id: "usr-3",
    name: "Juliana Santos",
    email: "juliana.atendimento@bellanapoli.com.br",
    role: "Atendente",
    status: "Ativo",
    lastLogin: "Hoje, 18:20",
    allowedModules: ["dashboard", "pedidos", "reservas", "mesas", "clientes", "whatsapp_ia"]
  },
  {
    id: "usr-4",
    name: "Marcos Almoxarife",
    email: "marcos.estoque@bellanapoli.com.br",
    role: "Estoque",
    status: "Ativo",
    lastLogin: "Hoje, 15:40",
    allowedModules: ["produtos", "estoque", "compras"]
  },
  {
    id: "usr-5",
    name: "Lucas Motoboy",
    email: "lucas.entrega@bellanapoli.com.br",
    role: "Entregador",
    status: "Ativo",
    lastLogin: "Hoje, 18:45",
    allowedModules: ["entregas"]
  }
];


