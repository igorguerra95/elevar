/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  ShieldCheck,
  Calendar,
  Sparkles,
  MessageCircle,
  Clock,
  ArrowRight,
  CheckCircle2,
  User,
  Mail,
  Phone,
  ChevronDown,
  Menu,
  X,
  Leaf,
  Lock,
  Compass,
  Sun,
  Quote,
  Send,
  Video,
  Building,
  Check
} from 'lucide-react';

import heroImg from './assets/images/hero_terapia_acolhimento_1793902740601.jpg';
import sobreImg from './assets/images/sobre_espaco_clinica_1793902741079.jpg';
import casalImg from './assets/images/terapia_casal_dialogo_1793902741807.jpg';
import ansiedadeImg from './assets/images/terapia_ansiedade_mindfulness_1793902741721.jpg';

interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  details: string;
  modalities: string;
  benefits: string[];
  image?: string;
  tag: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'ansiedade',
    title: 'Ansiedade e Gestão do Estresse',
    summary: 'Desacelere o fluxo de pensamentos intrusivos e restaure o equilíbrio do sistema nervoso com técnicas práticas de regulação.',
    details: 'Trabalhamos na identificação dos gatilhos somáticos e cognitivos, desenvolvendo ferramentas personalizadas para que você recupere o domínio sobre seu cotidiano e volte a respirar com serenidade.',
    modalities: 'Presencial e Online',
    benefits: ['Redução de crises de pânico', 'Regulação do sono', 'Manejo de pensamentos acelerados'],
    image: ansiedadeImg,
    tag: 'Saúde Emocional'
  },
  {
    id: 'depressao',
    title: 'Depressão e Regulação do Humor',
    summary: 'Acolhimento profundo e sem julgamentos para reconstruir o sentido, a energia vital e a conexão com o que realmente importa.',
    details: 'Uma abordagem empática que compreende a dor sem pressa, restabelecendo a autocompaixão e criando pequenas vitórias diárias para a retomada gradual da vitalidade.',
    modalities: 'Presencial e Online',
    benefits: ['Resgate da autoestima', 'Retomada de atividades prazerosas', 'Superação do desânimo crônico'],
    tag: 'Vitalidade'
  },
  {
    id: 'casal',
    title: 'Terapia de Casal e Vínculos',
    summary: 'Espaço neutro e seguro para transformar discussões repetitivas em diálogos autênticos, restaurando a cumplicidade e o afeto.',
    details: 'Mapeamos os ciclos de afastamento e reatividade, facilitando uma comunicação transparente onde ambos se sintam escutados, compreendidos e valorizados.',
    modalities: 'Presencial e Online',
    benefits: ['Comunicação não violenta', 'Alinhamento de expectativas', 'Reconexão emocional e íntima'],
    image: casalImg,
    tag: 'Relações Saudáveis'
  },
  {
    id: 'autoconhecimento',
    title: 'Autoconhecimento e Autoestima',
    summary: 'Fortalecimento da segurança pessoal, limites saudáveis e clareza existencial para tomadas de decisão corajosas.',
    details: 'Compreenda sua história e os padrões que você repete sem perceber. Descubra forças internas e aprenda a dizer não com firmeza e tranquilidade.',
    modalities: 'Presencial e Online',
    benefits: ['Segurança nas decisões', 'Construção de limites saudáveis', 'Independência emocional'],
    tag: 'Desenvolvimento'
  },
  {
    id: 'luto',
    title: 'Luto e Elaboração de Transições',
    summary: 'Apoio especializado para atravessar momentos de perda, rompimentos afetivos ou grandes mudanças de ciclo.',
    details: 'O luto não precisa ser vivido na solidão. Oferecemos continência emocional para elaborar a dor, honrar as memórias e reorganizar a vida com delicadeza.',
    modalities: 'Presencial e Online',
    benefits: ['Espaço seguro para sentir', 'Compreensão das fases do luto', 'Reorganização da rotina'],
    tag: 'Acolhimento'
  },
  {
    id: 'burnout',
    title: 'Burnout e Sobrecarga Profissional',
    summary: 'Descompressão da exaustão laboral e alinhamento de prioridades para quem sente que chegou ao limite da capacidade física e mental.',
    details: 'Estratégias clínicas para desacelerar o ritmo frenético, prevenir o colapso por estresse contínuo e recuperar o bem-estar e o prazer no cotidiano.',
    modalities: 'Presencial e Online',
    benefits: ['Redução da exaustão crônica', 'Restauração da clareza mental', 'Equilíbrio trabalho e vida'],
    tag: 'Prevenção'
  }
];

const FAQS = [
  {
    question: 'Como funciona a primeira sessão de psicoterapia?',
    answer: 'A primeira sessão é um encontro de acolhimento e escuta atenta. É o momento de você compartilhar o que te motivou a buscar ajuda, suas preocupações e expectativas. Também explicamos nossa abordagem de trabalho, tiramos todas as suas dúvidas e iniciamos o alinhamento de um plano terapêutico respeitoso com seu momento.'
  },
  {
    question: 'A terapia online tem a mesma eficácia que a presencial?',
    answer: 'Sim, comprovadamente. Diversas pesquisas científicas e regulamentações do Conselho Federal de Psicologia (CFP) atestam que a psicoterapia online oferece os mesmos resultados terapêuticos. Utilizamos plataformas criptografadas que asseguram privacidade total, no conforto e segurança do seu ambiente.'
  },
  {
    question: 'Vocês emitem recibo para reembolso em plano de saúde?',
    answer: 'Sim! Emitimos nota fiscal e recibo detalhado com registro profissional (CRP) para que você solicite o reembolso integral ou parcial junto ao seu plano de saúde, conforme as regras da sua operadora.'
  },
  {
    question: 'Qual é a duração e a frequência dos atendimentos?',
    answer: 'As sessões duram 50 minutos e acontecem semanalmente, o que permite o ritmo ideal de aprofundamento e reflexão entre um encontro e outro. Em estágios mais avançados do processo, a frequência pode ser ajustada conforme a evolução clínica.'
  },
  {
    question: 'Como é garantido o sigilo e a privacidade das minhas informações?',
    answer: 'O sigilo é absoluto e protegido pelo Código de Ética Profissional do Psicólogo. Todas as informações compartilhadas em sessão — sejam presenciais ou online — são estritamente confidenciais e jamais são divulgadas a terceiros.'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedArea, setSelectedArea] = useState<string>('ansiedade');
  const [modalidade, setModalidade] = useState<'online' | 'presencial'>('online');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    turno: 'tarde',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [showToastWhatsApp, setShowToastWhatsApp] = useState(true);

  // Formatar número de WhatsApp automaticamente
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setFormData(prev => ({ ...prev, whatsapp: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 800);
  };

  const handleSelectServiceAndScroll = (serviceId: string) => {
    setSelectedArea(serviceId);
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappMessage = encodeURIComponent(
    'Olá! Gostaria de receber mais informações e agendar um horário no ELEVAR Centro Terapêutico.'
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2820] font-body selection:bg-[#DCFCE7] selection:text-[#14532D]">
      {/* ──────────────────────────────────────────────────────────
          1. HEADER (Top Bar Contract: 3 Zones strictly)
          Zone 1: Wordmark / Zone 2: 4 nav links / Zone 3: 1 CTA
         ────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#16A34A]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark */}
          <a href="#inicio" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
            <span className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] group-hover:bg-[#16A34A] group-hover:text-white transition-colors duration-300">
              <Leaf className="w-4 h-4" />
            </span>
            <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-[#1C2820]">
              ELEVAR
            </span>
          </a>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#526356]">
            <a href="#inicio" className="hover:text-[#16A34A] transition-colors whitespace-nowrap shrink-0">
              Início
            </a>
            <a href="#areas" className="hover:text-[#16A34A] transition-colors whitespace-nowrap shrink-0">
              Áreas de Atuação
            </a>
            <a href="#sobre" className="hover:text-[#16A34A] transition-colors whitespace-nowrap shrink-0">
              Sobre a Clínica
            </a>
            <a href="#faq" className="hover:text-[#16A34A] transition-colors whitespace-nowrap shrink-0">
              Dúvidas Frequentes
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <a
              href="#contato"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#16A34A] hover:bg-[#15803D] rounded-full shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap shrink-0"
            >
              Entrar em contato
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1C2820] hover:text-[#16A34A] transition-colors"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FAF8F5] border-b border-[#16A34A]/10 px-6 py-6 overflow-hidden"
            >
              <div className="flex flex-col gap-4 text-base font-medium text-[#526356]">
                <a
                  href="#inicio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#16A34A] transition-colors"
                >
                  Início
                </a>
                <a
                  href="#areas"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#16A34A] transition-colors"
                >
                  Áreas de Atuação
                </a>
                <a
                  href="#sobre"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#16A34A] transition-colors"
                >
                  Sobre a Clínica
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#16A34A] transition-colors"
                >
                  Dúvidas Frequentes
                </a>
                <a
                  href="#contato"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 text-center py-3 text-sm font-medium text-white bg-[#16A34A] rounded-full hover:bg-[#15803D]"
                >
                  Entrar em contato
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ──────────────────────────────────────────────────────────
          SEÇÃO 1: INÍCIO (Hero Section)
         ────────────────────────────────────────────────────────── */}
      <section id="inicio" className="relative pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#16A34A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#EA580C]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Coluna de Texto (7 colunas) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Kicker editorial */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#16A34A] mb-4">
                <span>Psicoterapia Clínica</span>
                <span aria-hidden="true">·</span>
                <span>Atendimento Presencial e Online</span>
              </div>

              {/* Headline Principal */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.12] font-medium tracking-tight text-[#1C2820] mb-6 max-w-2xl text-balance">
                Um refúgio seguro para desacelerar o pensamento, acolher sua história e florescer.
              </h1>

              {/* Subheadline com profundidade */}
              <p className="text-base sm:text-lg md:text-xl text-[#526356] leading-relaxed mb-8 max-w-xl">
                Cuidado emocional humanizado, fundamentado na ciência e no respeito ao seu tempo. Um espaço confidencial para transformar ansiedade, dores e incertezas em clareza existencial.
              </p>

              {/* Ações / CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-medium text-white bg-[#16A34A] hover:bg-[#15803D] rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>Entrar em contato</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#areas"
                  className="inline-flex items-center justify-center px-7 py-3.5 text-base font-medium text-[#1C2820] hover:text-[#16A34A] bg-white hover:bg-[#FAF8F5] border border-[#16A34A]/20 rounded-full transition-all duration-200"
                >
                  Conhecer abordagens
                </a>
              </div>

              {/* Selos de Confiança rápidos */}
              <div className="pt-6 border-t border-[#16A34A]/10 w-full flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-[#526356]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  <span>Sigilo garantido pelo Código de Ética do CFP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Recibos para reembolso de convênio médico</span>
                </div>
              </div>
            </motion.div>

            {/* Coluna Visual (5 colunas) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/60 aspect-[4/3] lg:aspect-[16/13] bg-[#F4EFE6]">
                <img
                  src={heroImg}
                  alt="Consultório acolhedor e sereno do ELEVAR Centro Terapêutico"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Microcard flutuante de acolhimento */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/80 shadow-lg max-w-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#DCFCE7] text-[#16A34A] shrink-0">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1C2820]">Espaço Terapêutico Seguro</p>
                      <p className="text-xs text-[#526356] mt-0.5">
                        Consultório planejado com conforto térmico, luz natural e isolamento acústico total.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Faixa de Métricas / Prova Adjacente */}
          <div className="mt-16 md:mt-24 pt-12 border-t border-[#16A34A]/10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col">
              <span className="font-display text-4xl md:text-5xl font-semibold text-[#16A34A] tabular-nums">
                +1.200
              </span>
              <span className="text-sm font-medium text-[#1C2820] mt-1">Sessões realizadas</span>
              <span className="text-xs text-[#526356]">Acolhimento contínuo e consistente</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-4xl md:text-5xl font-semibold text-[#EA580C] tabular-nums">
                98%
              </span>
              <span className="text-sm font-medium text-[#1C2820] mt-1">Vínculo positivo</span>
              <span className="text-xs text-[#526356]">Satisfação e evolução percebida</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-4xl md:text-5xl font-semibold text-[#16A34A] tabular-nums">
                12+
              </span>
              <span className="text-sm font-medium text-[#1C2820] mt-1">Anos de experiência</span>
              <span className="text-xs text-[#526356]">Formação clínica sólida e atualizada</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-4xl md:text-5xl font-semibold text-[#1C2820] tabular-nums">
                100%
              </span>
              <span className="text-sm font-medium text-[#1C2820] mt-1">Sigilo e discrição</span>
              <span className="text-xs text-[#526356]">Código de Ética do Psicólogo</span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          SEÇÃO 2: ÁREAS DE ATUAÇÃO (#areas)
         ────────────────────────────────────────────────────────── */}
      <section id="areas" className="py-20 md:py-28 bg-[#F4EFE6]/70 border-y border-[#16A34A]/10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#EA580C] mb-3">
              <span>Especialidades Clínicas</span>
              <span aria-hidden="true">·</span>
              <span>Cuidado Personalizado</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1C2820] mb-4 text-balance">
              Cuidado especializado para cada momento da sua vida
            </h2>
            <p className="text-base sm:text-lg text-[#526356] leading-relaxed">
              Trabalhamos com metodologias consolidadas para investigar as origens do sofrimento, desenvolver recursos de enfrentamento e restabelecer sua harmonia interior.
            </p>
          </div>

          {/* Grid de Serviços com assimetria refinada */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-2xl p-7 border border-[#16A34A]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Visual Se Possuir Imagem */}
                  {service.image && (
                    <div className="mb-6 rounded-xl overflow-hidden aspect-[16/9] bg-[#FAF8F5] border border-[#16A34A]/10">
                      <img
                        src={service.image}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Kicker Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-[#16A34A]">{service.tag}</span>
                    <span className="text-xs text-[#526356]">{service.modalities}</span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-[#1C2820] mb-3 group-hover:text-[#16A34A] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#526356] leading-relaxed mb-6">
                    {service.summary}
                  </p>

                  {/* Benefícios chave */}
                  <ul className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {service.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2 text-xs text-[#1C2820]">
                        <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectServiceAndScroll(service.id)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-[#16A34A] group-hover:text-white bg-[#DCFCE7]/60 group-hover:bg-[#16A34A] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Agendar para esta área</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Destaque para modalidades */}
          <div className="mt-16 bg-white rounded-2xl p-8 border border-[#16A34A]/15 shadow-sm grid md:grid-cols-2 gap-8 items-center">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-xl font-semibold text-[#1C2820]">Atendimento Online em Todo o Brasil</h4>
                <p className="text-sm text-[#526356] mt-1 leading-relaxed">
                  Conecte-se de qualquer cidade com sigilo, pontualidade e praticidade via videoconferência protegida, sem o desgaste de deslocamento.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFEDD5] text-[#EA580C] flex items-center justify-center shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-xl font-semibold text-[#1C2820]">Atendimento Presencial Acolhedor</h4>
                <p className="text-sm text-[#526356] mt-1 leading-relaxed">
                  Ambiente desenhado para conforto absoluto, privacidade acústica e uma pausa restauradora no seu dia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          SEÇÃO 3: SOBRE A CLÍNICA (#sobre)
         ────────────────────────────────────────────────────────── */}
      <section id="sobre" className="py-20 md:py-28 bg-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual com foto temática e depoimento */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl border border-white aspect-[4/3] bg-[#F4EFE6] relative">
                <img
                  src={sobreImg}
                  alt="Cantinho acolhedor de leitura e relaxamento do centro terapêutico"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Box de Depoimento Adjacente */}
              <div className="mt-6 bg-white p-6 rounded-2xl border border-[#16A34A]/10 shadow-sm relative">
                <Quote className="w-8 h-8 text-[#EA580C]/20 absolute top-4 right-4" />
                <p className="text-sm italic text-[#526356] leading-relaxed mb-4">
                  "No ELEVAR encontrei um espaço onde pude ser vulnerável sem medo. Aprendi a lidar com a ansiedade que me paralisava e a estabelecer limites saudáveis na minha vida pessoal e profissional."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center font-display font-semibold text-sm">
                    M.S.
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1C2820]">Paciente acompanhada há 1 ano</p>
                    <p className="text-[11px] text-[#526356]">Tratamento para Ansiedade e Burnout</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Conteúdo Institucional & Abordagem */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#16A34A] mb-3">
                <span>Nossa Filosofia</span>
                <span aria-hidden="true">·</span>
                <span>Abordagem Clínica</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1C2820] mb-6 text-balance">
                Ciência, empatia e um compromisso irrestrito com você
              </h2>

              <p className="text-base text-[#526356] leading-relaxed mb-8">
                O <strong>ELEVAR - Centro Terapêutico</strong> nasceu do entendimento de que cada pessoa possui um ritmo único de amadurecimento e cura. Não acreditamos em fórmulas prontas ou diagnósticos frios: combinamos a fundamentação da <strong>Terapia Cognitivo-Comportamental (TCC)</strong> e da <strong>Terapia do Esquema</strong> com um olhar profundamente humano e afetuoso.
              </p>

              {/* 3 Pilares com Numeração Editorial Humana */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="font-display text-2xl font-semibold text-[#16A34A] tabular-nums shrink-0">
                    01.
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#1C2820]">
                      Escuta Ativa e Ausência de Julgamento
                    </h3>
                    <p className="text-sm text-[#526356] mt-1 leading-relaxed">
                      Um território de acolhimento genuíno onde todas as suas dores, medos e desejos encontram continência e respeito incondicional.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-display text-2xl font-semibold text-[#EA580C] tabular-nums shrink-0">
                    02.
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#1C2820]">
                      Psicologia Baseada em Evidências
                    </h3>
                    <p className="text-sm text-[#526356] mt-1 leading-relaxed">
                      Utilizamos protocolos terapêuticos validados internacionalmente, com metas claras e ferramentas práticas que produzem alívio sustentável.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-display text-2xl font-semibold text-[#16A34A] tabular-nums shrink-0">
                    03.
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#1C2820]">
                      Aliança Terapêutica Personalizada
                    </h3>
                    <p className="text-sm text-[#526356] mt-1 leading-relaxed">
                      O processo é co-construído a cada sessão. Respeitamos seu tempo e desenhamos estratégias sob medida para a sua realidade.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href="#contato"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#16A34A] hover:text-[#15803D] group"
                >
                  <span>Agendar uma primeira conversa de acolhimento</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          SEÇÃO FAQ: DÚVIDAS FREQUENTES (#faq)
         ────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 md:py-28 bg-[#F4EFE6]/50 border-t border-[#16A34A]/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#16A34A] mb-3">
              <span>Perguntas Frequentes</span>
              <span aria-hidden="true">·</span>
              <span>Transparência e Confiança</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1C2820] mb-4">
              Tudo o que você precisa saber antes de iniciar
            </h2>
            <p className="text-base text-[#526356]">
              Entendemos que dar o primeiro passo gera dúvidas. Aqui estão as respostas mais comuns para você se sentir seguro.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#16A34A]/10 overflow-hidden shadow-sm transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg sm:text-xl font-medium text-[#1C2820]">
                      {faq.question}
                    </span>
                    <span className={`p-1.5 rounded-full text-[#16A34A] bg-[#DCFCE7]/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm text-[#526356] leading-relaxed border-t border-slate-50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          SEÇÃO 4: CONTATO & AGENDAMENTO ONLINE (#contato)
         ────────────────────────────────────────────────────────── */}
      <section id="contato" className="py-20 md:py-28 bg-[#FAF8F5] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Lado Esquerdo: Orientações de Contato */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#EA580C] mb-3">
                <span>Agendamento & Contato</span>
                <span aria-hidden="true">·</span>
                <span>Resposta Rápida</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1C2820] mb-6 text-balance">
                Dê o primeiro passo em direção ao seu bem-estar
              </h2>

              <p className="text-base text-[#526356] leading-relaxed mb-8">
                Preencha o formulário com suas preferências ou fale diretamente pelo WhatsApp. Entraremos em contato com discrição e acolhimento em até 2 horas úteis para definir o melhor horário.
              </p>

              {/* Caixas de Informações de Segurança */}
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-white rounded-xl border border-[#16A34A]/10 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1C2820]">Privacidade e Proteção de Dados</h4>
                    <p className="text-xs text-[#526356] mt-0.5">
                      Suas informações de contato são utilizadas exclusivamente para retorno sobre a consulta e jamais são compartilhadas.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#16A34A]/10 flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1C2820]">Flexibilidade de Horários</h4>
                    <p className="text-xs text-[#526356] mt-0.5">
                      Opções matutinas, vespertinas e noturnas para se adequar à sua rotina sem fricção.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botão de WhatsApp direto */}
              <div className="pt-6 border-t border-[#16A34A]/10">
                <p className="text-xs text-[#526356] mb-3">Prefere agendar diretamente pelo WhatsApp?</p>
                <a
                  href={`https://wa.me/?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-full transition-all duration-200 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Conversar pelo WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Lado Direito: Formulário de Alta Conversão */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 sm:p-10 border border-[#16A34A]/15 shadow-lg relative">
              {submittedSuccess ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-3xl font-semibold text-[#1C2820] mb-3">
                    Solicitação Recebida com Sucesso
                  </h3>
                  <p className="text-base text-[#526356] max-w-md mx-auto mb-6 leading-relaxed">
                    Obrigado por nos procurar, <strong>{formData.nome || 'Amigo(a)'}</strong>. Já recebemos seus dados e retornaremos em breve com as opções de horários.
                  </p>
                  <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#16A34A]/10 text-xs text-[#526356] max-w-sm mb-6">
                    <span>Modalidade escolhida: </span>
                    <strong className="text-[#1C2820] uppercase">{modalidade}</strong>
                    <span className="block mt-1">Período preferido: {formData.turno}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setFormData({ nome: '', email: '', whatsapp: '', turno: 'tarde', mensagem: '' });
                    }}
                    className="text-xs font-semibold text-[#16A34A] hover:underline"
                  >
                    Enviar nova solicitação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[#1C2820] mb-1">
                      Agendar Consulta Inicial
                    </h3>
                    <p className="text-xs text-[#526356]">
                      Escolha suas preferências para que possamos organizar o atendimento ideal.
                    </p>
                  </div>

                  {/* Seleção de Modalidade (Segmented Control) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1C2820] uppercase tracking-wider mb-2">
                      Modalidade de Atendimento
                    </label>
                    <div className="grid grid-cols-2 gap-3 p-1 bg-[#FAF8F5] rounded-xl border border-[#16A34A]/10">
                      <button
                        type="button"
                        onClick={() => setModalidade('online')}
                        className={`flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-lg transition-all ${
                          modalidade === 'online'
                            ? 'bg-[#16A34A] text-white shadow-sm font-semibold'
                            : 'text-[#526356] hover:text-[#1C2820]'
                        }`}
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Online (Videoconferência)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setModalidade('presencial')}
                        className={`flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-lg transition-all ${
                          modalidade === 'presencial'
                            ? 'bg-[#16A34A] text-white shadow-sm font-semibold'
                            : 'text-[#526356] hover:text-[#1C2820]'
                        }`}
                      >
                        <Building className="w-3.5 h-3.5" />
                        <span>Presencial (Consultório)</span>
                      </button>
                    </div>
                  </div>

                  {/* Seleção de Especialidade / Motivo */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1C2820] uppercase tracking-wider mb-2">
                      Principal Motivo da Busca
                    </label>
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#16A34A]/20 rounded-xl text-sm text-[#1C2820] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40 transition-all"
                    >
                      {SERVICES.map((serv) => (
                        <option key={serv.id} value={serv.id}>
                          {serv.title}
                        </option>
                      ))}
                      <option value="outros">Outros motivos / Não sei especificar agora</option>
                    </select>
                  </div>

                  {/* Nome e WhatsApp */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C2820] mb-1.5">
                        Nome Completo *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#526356] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          placeholder="Seu nome"
                          className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#16A34A]/20 rounded-xl text-sm text-[#1C2820] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C2820] mb-1.5">
                        WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#526356] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={formData.whatsapp}
                          onChange={handlePhoneChange}
                          placeholder="(11) 98765-4321"
                          className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#16A34A]/20 rounded-xl text-sm text-[#1C2820] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* E-mail e Turno Preferido */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C2820] mb-1.5">
                        E-mail de Contato *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#526356] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="seu@email.com"
                          className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#16A34A]/20 rounded-xl text-sm text-[#1C2820] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C2820] mb-1.5">
                        Melhor Turno
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-[#526356] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={formData.turno}
                          onChange={(e) => setFormData({ ...formData, turno: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#16A34A]/20 rounded-xl text-sm text-[#1C2820] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40 transition-all"
                        >
                          <option value="manha">Manhã (08h às 12h)</option>
                          <option value="tarde">Tarde (13h às 18h)</option>
                          <option value="noite">Noite (18h às 21h)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Mensagem Opcional */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1C2820] mb-1.5">
                      Observação ou Mensagem (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      placeholder="Fique à vontade para relatar um resumo do que gostaria de conversar ou indicar preferências de dia..."
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#16A34A]/20 rounded-xl text-sm text-[#1C2820] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40 transition-all resize-none"
                    />
                  </div>

                  {/* Botão de Envio */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-70 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enviando solicitação...</span>
                      </>
                    ) : (
                      <>
                        <span>Entrar em contato</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          FOOTER INSTITUCIONAL DISCRETO
         ────────────────────────────────────────────────────────── */}
      <footer className="bg-[#1C2820] text-[#FAF8F5] pt-16 pb-12 border-t border-[#16A34A]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
            {/* Marca e Propósito */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#16A34A] flex items-center justify-center text-white">
                  <Leaf className="w-4 h-4" />
                </span>
                <span className="font-display text-2xl font-semibold tracking-tight">
                  ELEVAR
                </span>
              </div>
              <p className="text-xs text-white/70 max-w-sm leading-relaxed mb-4">
                Centro Terapêutico dedicado ao acolhimento psicológico, saúde mental e desenvolvimento humano integral, com rigor ético e empatia.
              </p>
              <p className="text-[11px] text-white/50">
                Atendimento clínico em conformidade com as diretrizes do Conselho Federal de Psicologia (CFP).
              </p>
            </div>

            {/* Links Rápidos */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DCFCE7] mb-3">
                Navegação
              </h4>
              <ul className="space-y-2 text-xs text-white/70">
                <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#areas" className="hover:text-white transition-colors">Áreas de Atuação</a></li>
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre a Clínica</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a></li>
                <li><a href="#contato" className="hover:text-white transition-colors">Agendamento</a></li>
              </ul>
            </div>

            {/* Apoio Emocional de Emergência (Rigor Ético da Psicologia) */}
            <div className="md:col-span-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-xs font-semibold text-[#FFEDD5] mb-2 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Precisa de ajuda imediata?</span>
              </h4>
              <p className="text-xs text-white/70 leading-relaxed mb-3">
                Se você ou alguém que você conhece está passando por uma crise emocional grave, ligue gratuitamente para o <strong>CVV (Centro de Valorização da Vida)</strong> pelo telefone <strong>188</strong> (atendimento 24h em todo o Brasil).
              </p>
              <a
                href="https://www.cvv.org.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium text-[#16A34A] hover:underline"
              >
                Acessar cvv.org.br
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>© {new Date().getFullYear()} ELEVAR - Centro Terapêutico. Todos os direitos reservados.</p>
            <p>Psicologia Clínica · Sigilo e Ética Profissional</p>
          </div>
        </div>
      </footer>

      {/* ──────────────────────────────────────────────────────────
          BOTÃO WHATSAPP FLUTUANTE (FIXO BOTTOM-RIGHT COM PULSO)
         ────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
        {/* Balão de Boas-vindas acolhedor (dispensável) */}
        <AnimatePresence>
          {showToastWhatsApp && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="hidden sm:flex items-center gap-2.5 bg-white px-4 py-3 rounded-2xl shadow-xl border border-[#16A34A]/20 max-w-xs text-xs text-[#1C2820]"
            >
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse shrink-0" />
              <span>Olá! Posso te ajudar a agendar um horário?</span>
              <button
                onClick={() => setShowToastWhatsApp(false)}
                className="text-[#526356] hover:text-[#1C2820] p-0.5 ml-1"
                aria-label="Fechar mensagem"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botão de WhatsApp */}
        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group p-4 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center focus:outline-none"
          aria-label="Falar no WhatsApp"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-[#16A34A]/30 animate-ping pointer-events-none" />
          <MessageCircle className="w-6 h-6 relative z-10" />
        </a>
      </div>
    </div>
  );
}
