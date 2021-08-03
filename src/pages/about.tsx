import { InformationCircleIcon, StarIcon } from "@heroicons/react/outline";
import { DefaultLayoutComponent } from "../components/DefaultLayout";


export default function About() {
  return (
    <DefaultLayoutComponent>
      <h1 className="text-3xl mb-4">Sobre o UIRAPURU</h1>
      <section className="bg-white shadow-md p-6 rounded-md mb-4 text-gray-600">
        <div className="flex items-center mb-2 text-brand">
          <InformationCircleIcon className="h-6 w-6 mr-2" />
          <h2 className="text-2xl ">O Projeto</h2>
        </div>
        <p className="leading-loose tracking-wide">Desenvolvido pela CIGEO, tem o intuito de automaziar a busca de proposições filtrando ou não por assuntos ou tipos de interesse do usuário, aplicando técnicas de automação e raspagem de dados.</p>
        <p className="leading-loose tracking-wide">Este projeto surgiu da necessidade de automaziar processos manuais e da ampla divulgação das propostas que são apresentadas no parlamento brasileiro.</p>
        <p className="leading-loose tracking-wide">O usuário tem possibilidade de criar vários agendamentos e recebê-los periodicamente ou executar uma busca em tempo real.</p>
      </section>
      <section className="bg-white shadow-md p-6 rounded-md mb-4 text-gray-600">
        <div className="flex items-center mb-2 text-brand">
          <StarIcon className="h-6 w-6 mr-2" />
          <h2 className="text-2xl ">Origem do nome</h2>
        </div>
        <div className="flex">
          <img src="/images/uirapuru.jpg" alt="Uirapuru"  className="h-32 w-32 rounded-full"/>
          <div className="ml-4"> 
            <p className="leading-loose tracking-wide">A lenda do Uirapuru é a lenda de um pássaro especial, pois dizem que ele é mágico, quem o encontra pode ter um desejo especial realizado.</p>
            <p className="leading-loose tracking-wide">O Uirapuru é um símbolo de felicidade.</p>
            <p className="leading-loose tracking-wide">Diz a lenda que um jovem guerreiro apaixonou-se pela filha do grande cacique.</p>
            <p className="leading-loose tracking-wide">Por se tratar de um amor proibido não poderia se aproximar dela. Sendo assim, pediu ao deus Tupã que o transformasse em um pássaro. Tupã transformou o em um pássaro vermelho telha, com um lindo canto.</p>
            <p className="leading-loose tracking-wide">O cacique foi quem logo observou o canto maravilhoso daquele pássaro. Ficou tão fascinado que passou a perseguir o pássaro para aprisoná-lo e ter seu canto só para ele.</p>
            <p className="leading-loose tracking-wide">Na ânsia de capturar o pássaro, o cacique se perdeu na floresta.</p>
            <p className="leading-loose tracking-wide">Todas as noites o Uirapuru canta para a sua amada. Tem esperança que um dia ela descubra o seu canto e saiba que ele é o jovem guerreiro.</p>
          </div>
        </div>
      </section>
      
    </DefaultLayoutComponent>
  )
}